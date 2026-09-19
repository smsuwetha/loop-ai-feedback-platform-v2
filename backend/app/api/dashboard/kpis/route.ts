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

    const [totalFeedback, positive, negative, neutral] =
      await Promise.all([
        prisma.feedback.count({
          where: {
            workspaceId,
            deletedAt: null,
          },
        }),

        prisma.feedback.count({
          where: {
            workspaceId,
            sentiment: "POS",
            deletedAt: null,
          },
        }),

        prisma.feedback.count({
          where: {
            workspaceId,
            sentiment: "NEG",
            deletedAt: null,
          },
        }),

        prisma.feedback.count({
          where: {
            workspaceId,
            sentiment: "NEU",
            deletedAt: null,
          },
        }),
      ]);

    return NextResponse.json({
      totalFeedback,
      positive,
      negative,
      neutral,
    });
  } catch (error) {
    console.error("Dashboard KPI error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch dashboard KPIs.",
      },
      {
        status: 500,
      }
    );
  }
}