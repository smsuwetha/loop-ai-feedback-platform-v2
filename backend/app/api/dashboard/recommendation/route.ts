import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

interface RecommendationResponse {
  recommendation: string;
  rationale: string;
  priority: string;
}

export async function GET() {
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
        },
      );
    }

    const workspaceId = session.user.workspaceId;

    // --------------------------------------------------
    // 2. Get recent classified feedback
    // --------------------------------------------------

    const feedback = await prisma.feedback.findMany({
      where: {
        workspaceId,
        deletedAt: null,
        classificationStatus: "COMPLETED",
      },

      select: {
        content: true,
        sentiment: true,
        sentimentScore: true,
        featureArea: true,
        classificationRationale: true,

        feedbackThemes: {
          select: {
            theme: {
              select: {
                name: true,
              },
            },
            confidence: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 20,
    });

    // --------------------------------------------------
    // 3. Handle workspace with no classified feedback
    // --------------------------------------------------

    if (feedback.length === 0) {
      return NextResponse.json({
        recommendation:
          "Collect and classify customer feedback to generate an AI recommendation.",
        rationale:
          "There is not enough classified feedback in this workspace yet.",
        priority: "LOW",
      });
    }

    // --------------------------------------------------
    // 4. Build AI feedback summary
    // --------------------------------------------------

    const feedbackSummary = feedback
      .map((item, index) => {
        const themes = item.feedbackThemes
          .map((item) => item.theme.name)
          .join(", ");

        return `
Feedback ${index + 1}:
Content: ${item.content}
Sentiment: ${item.sentiment ?? "UNKNOWN"}
Sentiment Score: ${item.sentimentScore ?? "UNKNOWN"}
Feature Area: ${item.featureArea ?? "UNKNOWN"}
Rationale: ${item.classificationRationale ?? "UNKNOWN"}
Themes: ${themes || "None"}
        `.trim();
      })
      .join("\n\n");

    // --------------------------------------------------
    // 5. Ask Python AI service for recommendation
    // --------------------------------------------------

    const response = await fetch(`${AI_SERVICE_URL}/api/ai/recommend`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        feedbackSummary,
      }),

      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "AI recommendation service error:",
        response.status,
        errorText,
      );

      throw new Error("AI recommendation service failed.");
    }

    const result = (await response.json()) as RecommendationResponse;

    // --------------------------------------------------
    // 6. Return recommendation to frontend
    // --------------------------------------------------

    return NextResponse.json({
      recommendation: result.recommendation,
      rationale: result.rationale,
      priority: result.priority,
    });
  } catch (error) {
    console.error("Dashboard recommendation error:", error);

    return NextResponse.json(
      {
        message: "Failed to generate dashboard recommendation.",
      },
      {
        status: 500,
      },
    );
  }
}
