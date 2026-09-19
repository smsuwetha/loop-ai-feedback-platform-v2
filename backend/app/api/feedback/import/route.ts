import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { parse } from "csv-parse/sync";

import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { classifyFeedback } from "@/lib/ai";

import {
  FeedbackChannel,
  FeedbackStatus,
  ClassificationStatus,
} from "@prisma/client";

type CSVRow = {
  content?: string;
  channel?: string;
  sourceRef?: string;
  customerLabel?: string;
};

export async function POST(request: NextRequest) {
  try {
    // --------------------------------------------------
    // 1. Authentication
    // --------------------------------------------------

    const session = await getServerSession(authOptions);

    if (!session?.user?.workspaceId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const workspaceId = session.user.workspaceId;

    // --------------------------------------------------
    // 2. Get uploaded file
    // --------------------------------------------------

    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          message: "CSV file is required.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------
    // 3. Read CSV
    // --------------------------------------------------

    const csvText = await file.text();

    if (!csvText.trim()) {
      return NextResponse.json(
        {
          message: "CSV file is empty.",
        },
        {
          status: 400,
        }
      );
    }

    const rows = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as CSVRow[];

    if (rows.length === 0) {
      return NextResponse.json(
        {
          message: "CSV file contains no records.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------
    // 4. Import rows
    // --------------------------------------------------

    let imported = 0;
    let failed = 0;

    for (const row of rows) {
      // Validate content before calling .trim()
      if (!row.content || !row.content.trim()) {
        failed++;
        continue;
      }

      const feedback = await prisma.feedback.create({
        data: {
          content: row.content.trim(),

          customerLabel:
            row.customerLabel?.trim() || null,

          sourceRef:
            row.sourceRef?.trim() || null,

          channel: FeedbackChannel.CSV_IMPORT,

          workspaceId,

          status: FeedbackStatus.NEW,

          classificationStatus:
            ClassificationStatus.PROCESSING,
        },
      });

      // ------------------------------------------------
      // 5. AI classification
      // ------------------------------------------------

      try {
        const result = await classifyFeedback(
          feedback.content
        );

        // ----------------------------------------------
        // Update feedback with AI result
        // ----------------------------------------------

        await prisma.feedback.update({
          where: {
            id: feedback.id,
          },

          data: {
            sentiment: result.sentiment,

            sentimentScore:
              result.sentimentScore,

            featureArea:
              result.featureArea,

            classificationRationale:
              result.rationale,

            classificationStatus:
              ClassificationStatus.COMPLETED,

            classificationError: null,
          },
        });

        // ----------------------------------------------
        // Create / find themes
        // ----------------------------------------------

        for (const theme of result.themes) {
          const themeName =
            theme.name.trim();

          if (!themeName) {
            continue;
          }

          const dbTheme =
            await prisma.theme.upsert({
              where: {
                workspaceId_name: {
                  workspaceId,
                  name: themeName,
                },
              },

              update: {},

              create: {
                workspaceId,
                name: themeName,
              },
            });

          // Avoid duplicate feedback-theme records
          await prisma.feedbackTheme.upsert({
            where: {
              feedbackId_themeId: {
                feedbackId: feedback.id,
                themeId: dbTheme.id,
              },
            },

            update: {
              confidence:
                theme.confidence,
            },

            create: {
              feedbackId: feedback.id,
              themeId: dbTheme.id,
              confidence:
                theme.confidence,
            },
          });
        }

        imported++;
      } catch (error) {
        console.error(
          "AI classification failed for imported feedback:",
          error
        );

        failed++;

        await prisma.feedback.update({
          where: {
            id: feedback.id,
          },

          data: {
            classificationStatus:
              ClassificationStatus.FAILED,

            classificationError:
              error instanceof Error
                ? error.message
                : String(error),
          },
        });
      }
    }

    // --------------------------------------------------
    // 6. Return result
    // --------------------------------------------------

    return NextResponse.json({
      message: "CSV import completed.",

      imported,

      failed,

      total: rows.length,
    });
  } catch (error) {
    console.error(
      "POST /api/feedback/import error:",
      error
    );

    return NextResponse.json(
      {
        message: "CSV import failed.",
      },
      {
        status: 500,
      }
    );
  }
}