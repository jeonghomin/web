const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateHospitalInfo() {
  try {
    console.log('병원 정보를 업데이트합니다...');
    
    // 기존 병원 정보 확인
    let hospitalInfo = await prisma.hospitalInfo.findFirst();
    
    const hospitalData = {
      name: "소리청 일곡에스한방병원",
      representative: "대표자명", // 실제 대표자명으로 변경 필요
      businessNumber: "사업자등록번호", // 실제 사업자등록번호로 변경 필요
      address: "주소", // 실제 주소로 변경 필요
      addressDetail: null,
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

    if (hospitalInfo) {
      // 기존 정보 업데이트
      console.log('기존 병원 정보를 업데이트합니다...');
      await prisma.hospitalInfo.update({
        where: { id: hospitalInfo.id },
        data: hospitalData
      });
      console.log('병원 정보가 성공적으로 업데이트되었습니다.');
    } else {
      // 새 정보 생성
      console.log('새로운 병원 정보를 생성합니다...');
      await prisma.hospitalInfo.create({
        data: hospitalData
      });
      console.log('병원 정보가 성공적으로 생성되었습니다.');
    }
    
    console.log('업데이트된 병원 정보:');
    console.log('- 대표전화:', hospitalData.mainPhone);
    console.log('- 특수진료전화:', hospitalData.specialtyPhone);
    console.log('- 평일 진료시간:', hospitalData.weekdayOpen + ' - ' + hospitalData.weekdayClose);
    console.log('- 토요일 진료시간:', hospitalData.saturdayOpen + ' - ' + hospitalData.saturdayClose);
    console.log('- 점심시간:', hospitalData.lunchStart + ' - ' + hospitalData.lunchEnd);
    console.log('- 휴진일:', hospitalData.closedDays);
    
  } catch (error) {
    console.error('병원 정보 업데이트 중 오류가 발생했습니다:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateHospitalInfo(); 