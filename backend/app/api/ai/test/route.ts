import { NextRequest, NextResponse } from "next/server";

import { classifyFeedback } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.feedback || typeof body.feedback !== "string") {
      return NextResponse.json(
        {
          message: "Feedback is required.",
        },
        {
          status: 400,
        }
      );
    }

    const result = await classifyFeedback(
      body.feedback
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI test error:", error);

    return NextResponse.json(
      {
        message: "AI service unavailable.",
      },
      {
        status: 500,
      }
    );
  }
}