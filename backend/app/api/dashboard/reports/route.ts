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

    const reports = await prisma.report.findMany({
      where: {
        workspaceId,
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        periodStart: true,
        periodEnd: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return NextResponse.json({
      reports,
    });
  } catch (error) {
    console.error("Dashboard reports error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch dashboard reports.",
      },
      {
        status: 500,
      },
    );
    
  }
}

