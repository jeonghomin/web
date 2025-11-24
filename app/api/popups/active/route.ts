import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 더미 팝업 데이터
    const dummyActivePopups = [
      {
        id: "popup-1",
        title: "진료시간 변경 안내",
        content: `<p><strong>변경 기준일</strong> 2025년 12월 1일(월)</p>
<p><strong>현재:</strong> 오전 9시 ~ 오후 5시 30분</p>
<p><strong>변경후:</strong> 오전 9시 ~ 오후 6시</p>
<p><strong>진료 마감 시간:</strong> 오후 5시 30분</p>
<p>(초진 시는 마감 시간 1시간 30분 전까지는 내원 하시기 바랍니다.)</p>`,
        imageUrl: null,
        startDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
        isActive: true,
        priority: 3,
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
