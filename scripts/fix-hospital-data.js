const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixHospitalData() {
  try {
    console.log('🏥 병원 데이터 수정 시작...');
    
    const correctData = {
      representative: '대표원장 민용태',
      businessNumber: '503-94-5547',
      address: '광주광역시 북구 일곡동 840-2',
    };

    // 기존 데이터 확인
    const existingHospital = await prisma.hospitalInfo.findFirst({
      where: { id: 'hospital-001' }
    });

    if (!existingHospital) {
      console.log('❌ 병원 데이터가 없습니다.');
      return;
    }

    console.log('📋 현재 데이터:', {
      representative: existingHospital.representative,
      businessNumber: existingHospital.businessNumber,
      address: existingHospital.address,
    });

    // 데이터 수정
    await prisma.hospitalInfo.update({
      where: { id: 'hospital-001' },
      data: correctData
    });

    console.log('✅ 병원 데이터 수정 완료!');
    
    // 수정된 데이터 확인
    const updatedData = await prisma.hospitalInfo.findFirst({
      where: { id: 'hospital-001' }
    });
    
    console.log('📋 수정된 데이터:', {
      representative: updatedData.representative,
      businessNumber: updatedData.businessNumber,
      address: updatedData.address,
    });
    
  } catch (error) {
    console.error('❌ 오류 발생:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixHospitalData(); 