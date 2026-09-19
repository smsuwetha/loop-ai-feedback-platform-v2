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

    const [feedback, reports, users] = await Promise.all([
      prisma.feedback.findMany({
        where: {
          workspaceId,
          deletedAt: null,
        },
        select: {
          id: true,
          createdAt: true,
          classificationStatus: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      }),

      prisma.report.findMany({
        where: {
          workspaceId,
          deletedAt: null,
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      }),

      prisma.user.findMany({
        where: {
          workspaceId,
          deletedAt: null,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      }),
    ]);

    const activities = [
      ...feedback.map((item) => ({
        id: `feedback-${item.id}`,
        type: "feedback",
        message: "New feedback received",
        createdAt: item.createdAt,
      })),

      ...reports.map((item) => ({
        id: `report-${item.id}`,
        type: "report",
        message: `Report generated: ${item.title}`,
        createdAt: item.createdAt,
      })),

      ...users.map((item) => ({
        id: `user-${item.id}`,
        type: "user",
        message: `New user joined: ${item.name}`,
        createdAt: item.createdAt,
      })),
    ];

    activities.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return NextResponse.json({
      activities: activities.slice(0, 6),
    });
  } catch (error) {
    console.error("Dashboard activity error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch dashboard activity.",
      },
      {
        status: 500,
      },
    );
  }
}
