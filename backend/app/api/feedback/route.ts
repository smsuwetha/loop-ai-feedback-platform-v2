import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { classifyFeedback } from "@/lib/ai";

import {
  FeedbackChannel,
  ClassificationStatus,
  FeedbackStatus,
} from "@prisma/client";

/**
 * POST /api/feedback
 *
 * Creates feedback and automatically sends it
 * to the Python AI service for classification.
 */
export async function POST(request: NextRequest) {
  try {
    // --------------------------------------------------
    // 1. Get authenticated session
    // --------------------------------------------------

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    // --------------------------------------------------
    // 2. Get request body
    // --------------------------------------------------

    const body = await request.json();

    const {
      content,
      channel,
      sourceRef,
      customerLabel,
    } = body;

    // --------------------------------------------------
    // 3. Basic validation
    // --------------------------------------------------

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        {
          message: "Feedback content is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (content.trim().length === 0) {
      return NextResponse.json(
        {
          message: "Feedback content cannot be empty.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------
    // 4. Validate channel
    // --------------------------------------------------

    const feedbackChannel =
      channel || FeedbackChannel.MANUAL;

    if (
      !Object.values(FeedbackChannel).includes(
        feedbackChannel
      )
    ) {
      return NextResponse.json(
        {
          message: "Invalid feedback channel.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------
    // 5. Get workspace from authenticated user
    // --------------------------------------------------

    const workspaceId =
      session.user.workspaceId;

    if (!workspaceId) {
      return NextResponse.json(
        {
          message:
            "User is not associated with a workspace.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------
    // 6. Create initial feedback record
    // --------------------------------------------------

    const feedback = await prisma.feedback.create({
      data: {
        content: content.trim(),

        channel: feedbackChannel,

        sourceRef:
          sourceRef || null,

        customerLabel:
          customerLabel || null,

        workspaceId,

        status: FeedbackStatus.NEW,

        classificationStatus:
          ClassificationStatus.PROCESSING,
      },
    });

    // --------------------------------------------------
    // 7. Send feedback to AI service
    // --------------------------------------------------

    try {
      const classification =
        await classifyFeedback(
          feedback.content
        );

      // ------------------------------------------------
      // 8. Update feedback with AI classification
      // ------------------------------------------------

      const updatedFeedback =
        await prisma.feedback.update({
          where: {
            id: feedback.id,
          },

          data: {
            sentiment:
              classification.sentiment,

            sentimentScore:
              classification.sentimentScore,

            featureArea:
              classification.featureArea,

            classificationRationale:
              classification.rationale,

            classificationStatus:
              ClassificationStatus.COMPLETED,

            classificationError: null,
          },
        });

      // ------------------------------------------------
      // 9. Create / find themes
      // ------------------------------------------------

      const themeResults = [];

      for (const themeResult of classification.themes) {
        const themeName =
          themeResult.name.trim();

        if (!themeName) {
          continue;
        }

        // Find existing theme in this workspace
        let theme =
          await prisma.theme.findUnique({
            where: {
              workspaceId_name: {
                workspaceId,
                name: themeName,
              },
            },
          });

        // Create theme if it doesn't exist
        if (!theme) {
          theme = await prisma.theme.create({
            data: {
              name: themeName,
              workspaceId,
            },
          });
        }

        // Link feedback to theme
        await prisma.feedbackTheme.upsert({
          where: {
            feedbackId_themeId: {
              feedbackId: feedback.id,
              themeId: theme.id,
            },
          },

          update: {
            confidence:
              themeResult.confidence,
          },

          create: {
            feedbackId: feedback.id,
            themeId: theme.id,
            confidence:
              themeResult.confidence,
          },
        });

        themeResults.push({
          id: theme.id,
          name: theme.name,
          confidence:
            themeResult.confidence,
        });
      }

      // ------------------------------------------------
      // 10. Return complete result
      // ------------------------------------------------

      return NextResponse.json(
        {
          message:
            "Feedback created and classified successfully.",

          feedback: {
            id: updatedFeedback.id,

            content:
              updatedFeedback.content,

            channel:
              updatedFeedback.channel,

            sourceRef:
              updatedFeedback.sourceRef,

            customerLabel:
              updatedFeedback.customerLabel,

            sentiment:
              updatedFeedback.sentiment,

            sentimentScore:
              updatedFeedback.sentimentScore,

            featureArea:
              updatedFeedback.featureArea,

            classificationRationale:
              updatedFeedback.classificationRationale,

            classificationStatus:
              updatedFeedback.classificationStatus,

            status:
              updatedFeedback.status,

            workspaceId:
              updatedFeedback.workspaceId,

            createdAt:
              updatedFeedback.createdAt,

            updatedAt:
              updatedFeedback.updatedAt,

            themes: themeResults,
          },
        },
        {
          status: 201,
        }
      );
    } catch (aiError) {
      // ----------------------------------------------
      // AI failed
      // ----------------------------------------------

      console.error(
        "AI classification failed:",
        aiError
      );

      const errorMessage =
        aiError instanceof Error
          ? aiError.message
          : "Unknown AI error.";

      await prisma.feedback.update({
        where: {
          id: feedback.id,
        },

        data: {
          classificationStatus:
            ClassificationStatus.FAILED,

          classificationError:
            errorMessage,
        },
      });

      return NextResponse.json(
        {
          message:
            "Feedback was created, but AI classification failed.",

          feedback: {
            id: feedback.id,

            classificationStatus:
              ClassificationStatus.FAILED,
          },
        },
        {
          status: 202,
        }
      );
    }
  } catch (error) {
    console.error(
      "POST /api/feedback error:",
      error
    );

    return NextResponse.json(
      {
        message: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}


/**
 * GET /api/feedback
 *
 * Returns feedback belonging to the
 * authenticated user's workspace.
 */
export async function GET() {
  try {
    // --------------------------------------------------
    // 1. Authentication
    // --------------------------------------------------

    const session = await getServerSession(
      authOptions
    );

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    // --------------------------------------------------
    // 2. Workspace
    // --------------------------------------------------

    const workspaceId =
      session.user.workspaceId;

    if (!workspaceId) {
      return NextResponse.json(
        {
          message:
            "User is not associated with a workspace.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------
    // 3. Get feedback
    // --------------------------------------------------

    const feedback =
      await prisma.feedback.findMany({
        where: {
          workspaceId,

          deletedAt: null,
        },

        include: {
          feedbackThemes: {
            include: {
              theme: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    // --------------------------------------------------
    // 4. Return feedback
    // --------------------------------------------------

    return NextResponse.json({
      feedback,
    });
  } catch (error) {
    console.error(
      "GET /api/feedback error:",
      error
    );

    return NextResponse.json(
      {
        message: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}