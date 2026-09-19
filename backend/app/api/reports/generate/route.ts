import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    // -----------------------------
    // 1. Authentication
    // -----------------------------

    const session = await getServerSession(authOptions);

    if (!session?.user?.workspaceId || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const workspaceId = session.user.workspaceId;
    const generatedBy = session.user.id;

    // -----------------------------
    // 2. Get feedback
    // -----------------------------

    const feedback = await prisma.feedback.findMany({
      where: {
        workspaceId,
        deletedAt: null,
      },
      select: {
        id: true,
        sentiment: true,
        sentimentScore: true,
        featureArea: true,
        createdAt: true,
        feedbackThemes: {
          select: {
            confidence: true,
            theme: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (feedback.length === 0) {
      return NextResponse.json(
        {
          message:
            "No feedback available. Import feedback before generating a report.",
        },
        { status: 400 },
      );
    }

    // -----------------------------
    // 3. Determine report period
    // -----------------------------

    const periodStart = feedback[0].createdAt;
    const periodEnd = feedback[feedback.length - 1].createdAt;

    // -----------------------------
    // 4. Sentiment statistics
    // -----------------------------

    const sentiment = {
      positive: 0,
      negative: 0,
      neutral: 0,
    };

    for (const item of feedback) {
      if (item.sentiment === "POS") {
        sentiment.positive++;
      } else if (item.sentiment === "NEG") {
        sentiment.negative++;
      } else if (item.sentiment === "NEU") {
        sentiment.neutral++;
      }

      // -----------------------------
      // 5. Feature-area statistics
      // -----------------------------

      const featureAreas: Record<string, number> = {};

      for (const item of feedback) {
        if (!item.featureArea) {
          continue;
        }

        featureAreas[item.featureArea] =
          (featureAreas[item.featureArea] || 0) + 1;
      }

      // -----------------------------
      // 6. Theme statistics
      // -----------------------------

      const themes: Record<string, number> = {};

      for (const item of feedback) {
        for (const feedbackTheme of item.feedbackThemes) {
          const name = feedbackTheme.theme.name;

          themes[name] = (themes[name] || 0) + 1;
        }
      }

      // -----------------------------
      // 7. Average sentiment score
      // -----------------------------

      const scores = feedback
        .map((item) => item.sentimentScore)
        .filter((score): score is number => typeof score === "number");

      const averageSentimentScore =
        scores.length > 0
          ? scores.reduce((sum, score) => sum + score, 0) / scores.length
          : null;

      // -----------------------------
      // 8. Build report content
      // -----------------------------

      const contentJson = {
        summary: {
          totalFeedback: feedback.length,
          averageSentimentScore,
        },

        sentiment,

        featureAreas,

        themes,

        period: {
          start: periodStart,
          end: periodEnd,
        },

        generatedAt: new Date(),
      };

      // -----------------------------
      // 9. Create report
      // -----------------------------

      const report = await prisma.report.create({
        data: {
          title: "Feedback Analysis Report",
          periodStart,
          periodEnd,
          contentJson,
          workspaceId,
          generatedBy,
        },

        select: {
          id: true,
          title: true,
          periodStart: true,
          periodEnd: true,
          createdAt: true,
        },
      });

      // -----------------------------
      // 10. Return report
      // -----------------------------

      return NextResponse.json({
        message: "Report generated successfully.",
        report,
      });
    }
  } catch (error) {
    console.error("POST /api/reports/generate error:", error);

    return NextResponse.json(
      {
        message: "Failed to generate report.",
      },
      {
        status: 500,
      },
    );
  }
}
