const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 비급여 가격 데이터 추가 시작...");

  try {
    // 기존 데이터 삭제
    await prisma.priceItem.deleteMany({});
    await prisma.priceCategory.deleteMany({});
    console.log("✅ 기존 데이터 삭제 완료");

    // 1. 제증명서류 카테고리
    const cat001 = await prisma.priceCategory.create({
      data: { id: "cat-001", name: "제증명서류", order: 1, level: 0, parentId: null },
    });

    // 2. 약제 및 치료제 카테고리
    const cat002 = await prisma.priceCategory.create({
      data: { id: "cat-002", name: "약제 및 치료제", order: 2, level: 0, parentId: null },
    });

    // 3. 진료 행위 카테고리
    const cat003 = await prisma.priceCategory.create({
      data: { id: "cat-003", name: "진료 행위", order: 3, level: 0, parentId: null },
    });

    // 4. 비급여 수액 카테고리
    const cat004 = await prisma.priceCategory.create({
      data: { id: "cat-004", name: "비급여 수액", order: 4, level: 0, parentId: null },
    });

    // 5. 검사 카테고리
    const cat005 = await prisma.priceCategory.create({
      data: { id: "cat-005", name: "검사", order: 5, level: 0, parentId: null },
    });

    console.log("✅ 카테고리 생성 완료");

    // 6. 가격 항목들 추가
    const items = [
      // 제증명서류 항목들
      { id: "item-001", categoryId: cat001.id, name: "일반진단서", description: "일반진단서", specification: "1통", priceType: "FIXED", priceMin: 20000, order: 1 },
      { id: "item-002", categoryId: cat001.id, name: "상해진단서 (3주미만)", description: "상해진단서 (3주미만)", specification: "1통", priceType: "FIXED", priceMin: 100000, order: 2 },
      { id: "item-003", categoryId: cat001.id, name: "상해진단서 (3주이상)", description: "상해진단서 (3주이상)", specification: "1통", priceType: "FIXED", priceMin: 150000, order: 3 },
      { id: "item-004", categoryId: cat001.id, name: "일반소견서", description: "일반소견서", specification: "1통", priceType: "FIXED", priceMin: 3000, order: 4 },
      { id: "item-005", categoryId: cat001.id, name: "소견서(보험회사제출용)", description: "소견서(보험회사제출용)", specification: "1통", priceType: "FIXED", priceMin: 10000, order: 5 },
      { id: "item-006", categoryId: cat001.id, name: "진료확인서", description: "진료확인서", specification: "1통", priceType: "FIXED", priceMin: 3000, order: 6 },
      { id: "item-007", categoryId: cat001.id, name: "입(통)원확인서", description: "입(통)원확인서", specification: "1통", priceType: "FIXED", priceMin: 3000, order: 7 },
      { id: "item-008", categoryId: cat001.id, name: "진료기록사본(1~5매)", description: "진료기록사본(1~5매)", specification: "1통", priceType: "FIXED", priceMin: 1000, order: 8 },
      { id: "item-009", categoryId: cat001.id, name: "진료기록사본(6매이상)", description: "진료기록사본(6매이상)", specification: "1매", priceType: "FIXED", priceMin: 100, order: 9 },
      { id: "item-010", categoryId: cat001.id, name: "진료기록(영상/CD) 복사", description: "진료기록(영상/CD) 복사", specification: "1건", priceType: "FIXED", priceMin: 10000, order: 10 },
      { id: "item-011", categoryId: cat001.id, name: "근로능력평가진단서", description: "근로능력평가진단서", specification: "1통", priceType: "FIXED", priceMin: 10000, order: 11 },

      // 약제 및 치료제 항목들
      { id: "item-012", categoryId: cat002.id, name: "첩약(일반) 1제", description: "첩약(일반) 1제", specification: "1제", priceType: "RANGE", priceMin: 200000, priceMax: 500000, order: 1 },
      { id: "item-013", categoryId: cat002.id, name: "첩약(녹용) 1제", description: "첩약(녹용) 1제", specification: "1제", priceType: "RANGE", priceMin: 600000, priceMax: 800000, order: 2 },
      { id: "item-014", categoryId: cat002.id, name: "다이어트첩약 30일", description: "다이어트첩약 30일", specification: "30일", priceType: "FIXED", priceMin: 300000, order: 3 },
      { id: "item-015", categoryId: cat002.id, name: "다이어트환(슬림환) 30일~120일", description: "다이어트환(슬림환) 30일~120일", specification: "30일~120일", priceType: "RANGE", priceMin: 250000, priceMax: 750000, order: 4 },
      { id: "item-016", categoryId: cat002.id, name: "한방파스", description: "한방파스", specification: "1포", priceType: "TEXT", priceText: "5,000/10,000/20,000", order: 5 },
      { id: "item-017", categoryId: cat002.id, name: "약침", description: "약침", specification: "1회", priceType: "TEXT", priceText: "5,000/10,000/20,000/50,000", order: 6 },

      // 진료 행위 항목들
      { id: "item-018", categoryId: cat003.id, name: "도수치료(외래)", description: "도수치료(외래)", specification: "1회", priceType: "FIXED", priceMin: 100000, order: 1 },
      { id: "item-019", categoryId: cat003.id, name: "도수치료(입원)", description: "도수치료(입원)", specification: "1회", priceType: "FIXED", priceMin: 150000, order: 2 },
      { id: "item-020", categoryId: cat003.id, name: "체외충격파", description: "체외충격파", specification: "1회", priceType: "FIXED", priceMin: 100000, order: 3 },
      { id: "item-021", categoryId: cat003.id, name: "신장분사", description: "신장분사", specification: "1회", priceType: "FIXED", priceMin: 50000, order: 4 },

      // 비급여 수액 항목들
      { id: "item-022", categoryId: cat004.id, name: "영양제수액", description: "영양제수액", specification: "1회", priceType: "RANGE", priceMin: 30000, priceMax: 50000, order: 1 },
      { id: "item-023", categoryId: cat004.id, name: "신데렐라주사", description: "신데렐라주사", specification: "1회", priceType: "FIXED", priceMin: 30000, order: 2 },
      { id: "item-024", categoryId: cat004.id, name: "백옥주사", description: "백옥주사", specification: "1회", priceType: "FIXED", priceMin: 30000, order: 3 },
      { id: "item-025", categoryId: cat004.id, name: "비타민주사", description: "비타민주사", specification: "1회", priceType: "FIXED", priceMin: 30000, order: 4 },
      { id: "item-026", categoryId: cat004.id, name: "와인주사", description: "와인주사", specification: "1회", priceType: "FIXED", priceMin: 30000, order: 5 },
      { id: "item-027", categoryId: cat004.id, name: "마늘주사", description: "마늘주사", specification: "1회", priceType: "FIXED", priceMin: 30000, order: 6 },

      // 검사 항목들
      { id: "item-028", categoryId: cat005.id, name: "적외선체열진단/체형분석기", description: "적외선체열진단/체형분석기", specification: "1회", priceType: "FIXED", priceMin: 50000, order: 1 },
    ];

    await prisma.priceItem.createMany({ data: items });
    console.log("✅ 가격 항목 추가 완료!");
    console.log(`총 ${items.length}개 항목이 추가되었습니다.`);
  } catch (error) {
    console.error("❌ 오류:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();