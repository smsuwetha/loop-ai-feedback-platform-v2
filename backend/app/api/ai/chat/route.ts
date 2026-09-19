import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    // --------------------------------------------------
    // 1. Authentication
    // --------------------------------------------------

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        },
      );
    }

    // --------------------------------------------------
    // 2. Get workspace
    // --------------------------------------------------

    const workspaceId = session.user.workspaceId;

    if (!workspaceId) {
      return NextResponse.json(
        {
          message: "User is not associated with a workspace.",
        },
        {
          status: 400,
        },
      );
    }

    // --------------------------------------------------
    // 3. Read user message
    // --------------------------------------------------

    const body = await request.json();

    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        {
          message: "Message is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        {
          message: "Message is too long. Maximum 5000 characters.",
        },
        {
          status: 400,
        },
      );
    }

    // --------------------------------------------------
    // 4. Get workspace feedback
    // --------------------------------------------------

    const feedback = await prisma.feedback.findMany({
      where: {
        workspaceId,
        deletedAt: null,
      },

      select: {
        content: true,
        channel: true,
        sentiment: true,
        sentimentScore: true,
        featureArea: true,
        classificationRationale: true,
        status: true,
        createdAt: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 100,
    });

    // --------------------------------------------------
    // 5. Build AI context
    // --------------------------------------------------

    const context =
      feedback.length > 0
        ? feedback
            .map((item, index) => {
              return `
Feedback ${index + 1}
Content: ${item.content}
Channel: ${item.channel}
Sentiment: ${item.sentiment ?? "UNKNOWN"}
Sentiment Score: ${item.sentimentScore ?? "UNKNOWN"}
Feature Area: ${item.featureArea ?? "UNKNOWN"}
Status: ${item.status}
Date: ${item.createdAt.toISOString()}
Classification Rationale: ${item.classificationRationale ?? "N/A"}
`;
            })
            .join("\n")
        : "No customer feedback is currently available for this workspace.";

    // --------------------------------------------------
    // 6. Send request to Python AI service
    // --------------------------------------------------

    const aiResponse = await fetch(`${AI_SERVICE_URL}/api/ai/chat`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message,
        context,
      }),
    });

    // --------------------------------------------------
    // 7. Handle AI service failure
    // --------------------------------------------------

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();

      console.error("AI service error:", aiResponse.status, errorText);

      return NextResponse.json(
        {
          message: "AI service is currently unavailable.",
        },
        {
          status: 502,
        },
      );
    }

    // --------------------------------------------------
    // 8. Return AI response
    // --------------------------------------------------

    const result = await aiResponse.json();

    return NextResponse.json({
      answer: result.answer,
    });
  } catch (error) {
    console.error("POST /api/ai/chat error:", error);

    return NextResponse.json(
      {
        message: "Failed to process AI request.",
      },
      {
        status: 500,
      },
    );
  }
}
