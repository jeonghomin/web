import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// 서버 사이드 Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    // Supabase에서 병원 정보 가져오기
    const { data: hospitalInfo, error } = await supabase
      .from("hospital_info")
      .select("*")
      .limit(1)
      .single();
    
    if (error) {
      console.error("Supabase 조회 오류:", error);
      return new NextResponse("병원 정보를 찾을 수 없습니다.", { status: 404 });
    }
    
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
