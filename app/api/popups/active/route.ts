import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 더미 팝업 데이터
    const dummyActivePopups = [
      {
        id: "popup-1",
        title: "🎊 설날 진료 안내",
        content: `<p style="text-align:center;margin-bottom:12px"><strong style="font-size:17px;color:#dc2626">설날 연휴 진료 안내</strong></p>
<table style="width:100%;border-collapse:collapse;margin-bottom:12px">
<tr style="background:#fef2f2">
<td style="padding:8px 12px;border:1px solid #fecaca;font-weight:bold;color:#dc2626">2/16 (월)</td>
<td style="padding:8px 12px;border:1px solid #fecaca;color:#dc2626;font-weight:bold">휴진</td>
</tr>
<tr style="background:#fef2f2">
<td style="padding:8px 12px;border:1px solid #fecaca;font-weight:bold;color:#dc2626">2/17 (화)</td>
<td style="padding:8px 12px;border:1px solid #fecaca;color:#dc2626;font-weight:bold">휴진</td>
</tr>
<tr style="background:#eff6ff">
<td style="padding:8px 12px;border:1px solid #bfdbfe;font-weight:bold;color:#1d4ed8">2/18 (수)</td>
<td style="padding:8px 12px;border:1px solid #bfdbfe;color:#1d4ed8;font-weight:bold">오전 진료 (09:00 ~ 12:30)</td>
</tr>
</table>
<p style="text-align:center;color:#6b7280;font-size:13px">즐거운 설 명절 보내세요! 🙏</p>`,
        imageUrl: null,
        startDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
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
