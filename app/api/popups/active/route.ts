import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 더미 팝업 데이터
    const dummyActivePopups = [
      {
        id: "popup-1",
        title: "진료시간 안내",
        content: "평일 09:00-18:00, 토요일 09:00-13:00, 점심시간 12:30-14:00",
        imageUrl: "https://picsum.photos/800/600",
        startDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
        isActive: true,
        priority: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        authorId: "user-1"
      },
      {
        id: "popup-2",
        title: "코로나19 예방접종 안내",
        content: "코로나19 예방접종은 예약제로 운영됩니다.",
        imageUrl: "https://picsum.photos/800/600",
        startDate: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
        isActive: true,
        priority: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        authorId: "user-1"
      }
    ];

    return new NextResponse(JSON.stringify(dummyActivePopups), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    console.error("[ACTIVE_POPUPS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
