"use client";

import { ReservationDialog } from "@/components/home/reservation-dialog";
import { KakaoMap } from "@/components/map/kakao-map";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, Clock, Phone } from "lucide-react";
import { useState } from "react";
import { ContactHero } from "./components/contact-hero";
import { useHospital } from "@/app/providers/hospital-provider";
import { BrandLoader } from "@/components/ui/brand-loader";

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { hospitalInfo, isLoading } = useHospital();

  // 임시 하드코딩된 병원 정보 (데이터베이스 없이도 표시)
  const tempHospitalInfo = {
    name: "소리청 일곡에스한방병원",
    representative: "대표원장 민용태",
    businessNumber: "503-94-5547",
    address: "광주광역시 북구 일곡동 840-2",
    addressDetail: "양일로307",
    mainPhone: "062-571-2222",
    specialtyPhone: "062-369-2075 (이명치료)",
    weekdayOpen: "09:00",
    weekdayClose: "18:00",
    saturdayOpen: "09:00",
    saturdayClose: "13:00",
    lunchStart: "12:30",
    lunchEnd: "14:00",
    closedDays: "일요일, 공휴일, 매월 둘째주 목요일 오후"
  };

  // 데이터베이스 정보가 없으면 임시 정보 사용
  const displayInfo = hospitalInfo || tempHospitalInfo;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BrandLoader variant="default" />
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <ContactHero />

      <div className="container mx-auto px-4 py-16">
        <div className="mt-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">예약 문의하기</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">전화 예약</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  {displayInfo.specialtyPhone && <p>Tel: {displayInfo.specialtyPhone}</p>}
                  <p>Tel: {displayInfo.mainPhone}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <CalendarDays className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">진료 시간</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p>
                    평일: {displayInfo.weekdayOpen} - {displayInfo.weekdayClose}
                  </p>
                  {displayInfo.saturdayOpen && displayInfo.saturdayClose && (
                    <p>
                      토요일: {displayInfo.saturdayOpen} - {displayInfo.saturdayClose}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">진료 안내</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p>
                    점심시간: {displayInfo.lunchStart} - {displayInfo.lunchEnd}
                  </p>
                  <p className="text-red-600">{displayInfo.closedDays} 휴진</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4 pt-4 border-t">
              <p className="text-gray-600 text-center">
                온라인으로 간편하게 예약하실 수 있습니다.
                <br />
                예약 시 환자 정보와 희망 진료 시간을 입력해 주세요.
              </p>
              <Button size="lg" className="px-8" onClick={() => setIsOpen(true)}>
                예약하기
              </Button>
              <ReservationDialog open={isOpen} onOpenChange={setIsOpen} />
            </div>
          </Card>
        </div>

        <div className="mt-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">오시는 길</h2>
            <div className="space-y-4">
              <KakaoMap />
              <div className="text-gray-600">
                {displayInfo.parkingInfo && <p>주차: {displayInfo.parkingInfo}</p>}
                {displayInfo.specialtyPhone && <p>전화: {displayInfo.specialtyPhone}</p>}
                <p>전화: {displayInfo.mainPhone}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
