import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.workspaceId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const workspaceId = session.user.workspaceId;

    const [
      totalFeedback,
      processedFeedback,
      totalReports,
      totalUsers,
    ] = await Promise.all([
      prisma.feedback.count({
        where: {
          workspaceId,
          deletedAt: null,
        },
      }),

      prisma.feedback.count({
        where: {
          workspaceId,
          deletedAt: null,
          classificationStatus: "COMPLETED",
        },
      }),

      prisma.report.count({
        where: {
          workspaceId,
          deletedAt: null,
        },
      }),

      prisma.user.count({
        where: {
          workspaceId,
          deletedAt: null,
        },
      }),
    ]);

    const feedbackProcessed =
      totalFeedback === 0
        ? 0
        : Math.round(
            (processedFeedback / totalFeedback) * 100
          );

    const aiCompletion = feedbackProcessed;

    const reportGeneration =
      totalFeedback === 0
        ? 0
        : Math.min(
            100,
            Math.round(
              (totalReports / Math.max(totalUsers, 1)) * 100
            )
          );

    return NextResponse.json({
      feedbackProcessed,
      aiCompletion,
      reportGeneration,
    });
  } catch (error) {
    console.error(
      "Dashboard overview error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to fetch dashboard overview.",
      },
      {
        status: 500,
      }
    );
  }
}