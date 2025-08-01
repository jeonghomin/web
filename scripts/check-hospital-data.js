const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkAndInsertHospitalData() {
  try {
    console.log('🏥 병원 데이터 확인 중...');
    
    // 기존 데이터 확인
    const existingHospital = await prisma.hospitalInfo.findFirst();
    
    if (existingHospital) {
      console.log('✅ 병원 데이터가 이미 존재합니다:');
      console.log('📋 ID:', existingHospital.id);
      console.log('📋 이름:', existingHospital.name);
      console.log('📋 전화번호:', existingHospital.mainPhone);
      return;
    }
    
    console.log('❌ 병원 데이터가 없습니다. 데이터를 삽입합니다...');
    
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

    await prisma.hospitalInfo.create({
      data: hospitalData
    });

    console.log('✅ 병원 데이터 삽입 완료!');
    
    // 삽입된 데이터 확인
    const insertedData = await prisma.hospitalInfo.findFirst();
    console.log('📋 삽입된 데이터:', insertedData);
    
  } catch (error) {
    console.error('❌ 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAndInsertHospitalData(); 