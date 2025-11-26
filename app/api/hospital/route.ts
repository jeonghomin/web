import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 실제 데이터베이스에서 병원 정보 가져오기
    const hospitalInfo = await prisma.hospitalInfo.findFirst();
    
    if (!hospitalInfo) {
      console.log("병원 정보를 찾을 수 없습니다.");
      return new NextResponse("병원 정보를 찾을 수 없습니다.", { status: 404 });
    }

    console.log("병원 정보 조회 성공:", hospitalInfo);
    
    // closedDays에서 "매월 둘째주 목요일 오후" 제거
    const sanitizedHospitalInfo = {
      ...hospitalInfo,
      closedDays: hospitalInfo.closedDays?.replace(/,?\s*매월 둘째주 목요일 오후/gi, "").trim() || "일요일, 공휴일"
    };
    
    return NextResponse.json(sanitizedHospitalInfo);
  } catch (error) {
    console.error("[HOSPITAL_GET]", error);
    return new NextResponse("내부 서버 오류", { status: 500 });
  }
}
