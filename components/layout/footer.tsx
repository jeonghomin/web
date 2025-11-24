"use client";

import { Building2, MapPin, Phone } from "lucide-react";
import { useFooter } from "@/app/providers/footer-provider";
import { useHospital } from "@/app/providers/hospital-provider";

export function Footer() {
  const { isFooterVisible } = useFooter();
  const { hospitalInfo, isLoading } = useHospital();
  const currentYear = new Date().getFullYear();

  // 임시 하드코딩된 병원 정보 (데이터베이스 없이도 표시)
  const tempHospitalInfo = {
    name: "소리청 일곡에스한방병원",
    representative: "대표원장 민용태",
    businessNumber: "503-94-5547",
    address: "광주광역시 북구 일곡동 840-2",
    addressDetail: "양일로307",
    parkingInfo: null,
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

  // 임시로 푸터 항상 표시 (디버깅용)
  // if (!isFooterVisible) return null;
  
  // 데이터베이스 정보가 없으면 임시 정보 사용
  const displayInfo = hospitalInfo || tempHospitalInfo;

  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">진료시간</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                평일: {displayInfo.weekdayOpen} - {displayInfo.weekdayClose}
              </p>
              <p>
                목요일, 토요일: 09:00 - 12:30
              </p>
              <p>
                점심시간: {displayInfo.lunchStart} - {displayInfo.lunchEnd}
              </p>
              <p className="text-primary text-red-600">일요일, 공휴일 휴진</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">연락처</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {displayInfo.specialtyPhone && (
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {displayInfo.specialtyPhone.split(" (")[0]}
                  <span className="ml-2 text-primary">({displayInfo.specialtyPhone.split(" (")[1]?.replace(")", "")})</span>
                </p>
              )}
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {displayInfo.mainPhone}
              </p>
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {displayInfo.address}
              </p>
              {displayInfo.addressDetail && <p className="ml-6">{displayInfo.addressDetail}</p>}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">진료과목</h3>
            <div className="text-sm text-gray-600">
              <div className="flex gap-8">
                <div>
                  <span className="font-medium text-primary">한방</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="space-x-2">
                    <span>이비인후과</span>&nbsp; ·<span>침구과</span>&nbsp; ·<span>내과</span>&nbsp; ·<span>재활의학과</span>&nbsp; ·<span>사상체질과</span>
                    &nbsp; ·<span>정신신경과</span>&nbsp; ·<span>부인과</span>&nbsp; ·<span>소아과</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-8 mt-2">
                <div>
                  <span className="font-medium text-primary">양방</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="space-x-2">
                    <span>이비인후과</span>&nbsp; ·<span>내과</span>&nbsp; ·<span>영상의학과</span>&nbsp; ·<span>재활의학과</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500 space-y-2">
            <p className="flex items-center justify-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>대표: {displayInfo.representative}</span>
              <span className="mx-2">|</span>
              <span>사업자등록번호: {displayInfo.businessNumber}</span>
            </p>
            <p>
              주소: {displayInfo.address}
              {displayInfo.addressDetail ? ` ${displayInfo.addressDetail}` : ""}
            </p>
            <p>
              © {currentYear} {displayInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
