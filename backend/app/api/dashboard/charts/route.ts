import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.workspaceId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const workspaceId = session.user.workspaceId;

    /*
     * --------------------------------------------------
     * MONTHLY FEEDBACK TREND
     * --------------------------------------------------
     *
     * Get the last 7 months including the current month.
     */
    const now = new Date();

    const startDate = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 6, 1),
    );

    const feedback = await prisma.feedback.findMany({
      where: {
        workspaceId,
        deletedAt: null,
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        createdAt: true,
        sentiment: true,
      },
    });

    const monthlyMap = new Map<string, number>();

    const monthFormatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone: "UTC",
    });

    for (let i = 0; i < 7; i++) {
      const date = new Date(
        Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() + i, 1),
      );

      const key = `${date.getUTCFullYear()}-${String(
        date.getUTCMonth() + 1,
      ).padStart(2, "0")}`;

      monthlyMap.set(key, 0);
    }

    for (const item of feedback) {
      const date = new Date(item.createdAt);

      const key = `${date.getUTCFullYear()}-${String(
        date.getUTCMonth() + 1,
      ).padStart(2, "0")}`;

      if (monthlyMap.has(key)) {
        monthlyMap.set(key, (monthlyMap.get(key) || 0) + 1);
      }
    }

    const monthlyTrend = Array.from(monthlyMap.entries()).map(
      ([key, count]) => {
        const [year, month] = key.split("-").map(Number);

        const date = new Date(Date.UTC(year, month - 1, 1));

        return {
          month: monthFormatter.format(date),
          feedback: count,
        };
      },
    );

    /*
     * --------------------------------------------------
     * SENTIMENT ANALYSIS
     * --------------------------------------------------
     *
     * Only classified feedback is included in the
     * sentiment distribution.
     */
    const positive = feedback.filter((item) => item.sentiment === "POS").length;

    const neutral = feedback.filter((item) => item.sentiment === "NEU").length;

    const negative = feedback.filter((item) => item.sentiment === "NEG").length;

    const classifiedTotal = positive + neutral + negative;

    const sentimentData =
      classifiedTotal === 0
        ? [
            {
              name: "Positive",
              value: 0,
              color: "#22C55E",
            },
            {
              name: "Neutral",
              value: 0,
              color: "#FACC15",
            },
            {
              name: "Negative",
              value: 0,
              color: "#EF4444",
            },
          ]
        : [
            {
              name: "Positive",
              value: Math.round((positive / classifiedTotal) * 100),
              color: "#22C55E",
            },
            {
              name: "Neutral",
              value: Math.round((neutral / classifiedTotal) * 100),
              color: "#FACC15",
            },
            {
              name: "Negative",
              value: Math.round((negative / classifiedTotal) * 100),
              color: "#EF4444",
            },
          ];

    return NextResponse.json({
      monthlyTrend,
      sentimentData,
    });
  } catch (error) {
    console.error("Dashboard charts error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch dashboard chart data.",
      },
      {
        status: 500,
      },
    );
  }
}
