const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function insertHospitalData() {
  try {
    console.log('🏥 병원 데이터 삽입 시작...');
    
    const hospitalData = {
      id: 'hospital-001',
      name: '소리청 일곡에스한방병원',
      representative: '대표원장 민용태',
      businessNumber: '503-94-5547',
      address: '광주광역시 북구 일곡동 840-2',
      addressDetail: null,
      parkingInfo: null,
      mainPhone: '062-571-2222',
      specialtyPhone: '062-369-2075 (이명치료)',
      weekdayOpen: '09:00',
      weekdayClose: '18:00',
      saturdayOpen: '09:00',
      saturdayClose: '13:00',
      lunchStart: '12:30',
      lunchEnd: '14:00',
      closedDays: '일요일, 공휴일, 매월 둘째주 목요일 오후',
    };

    // 기존 데이터가 있는지 확인
    const existingHospital = await prisma.hospitalInfo.findFirst({
      where: { id: 'hospital-001' }
    });

    if (existingHospital) {
      console.log('🏥 기존 병원 데이터 업데이트...');
      await prisma.hospitalInfo.update({
        where: { id: 'hospital-001' },
        data: hospitalData
      });
    } else {
      console.log('🏥 새로운 병원 데이터 삽입...');
      await prisma.hospitalInfo.create({
        data: hospitalData
      });
    }

    console.log('✅ 병원 데이터 삽입 완료!');
    
    // 삽입된 데이터 확인
    const insertedData = await prisma.hospitalInfo.findFirst({
      where: { id: 'hospital-001' }
    });
    console.log('📋 삽입된 데이터:', insertedData);
    
  } catch (error) {
    console.error('❌ 병원 데이터 삽입 실패:', error);
  } finally {
    await prisma.$disconnect();
  }
}

insertHospitalData(); 