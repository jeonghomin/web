import prisma from "../lib/prisma";

async function main() {
  console.log("🌱 비급여 가격 데이터 추가를 시작합니다...");

  try {
    // 기존 데이터가 있는지 확인 후 삭제
    await prisma.priceItem.deleteMany({});
    await prisma.priceCategory.deleteMany({});

    console.log("📝 기존 데이터 삭제 완료");

    // 1. 주요 카테고리들 (level 0 - 최상위)
    const cat001 = await prisma.priceCategory.create({
      data: {
        id: "cat-001",
        name: "진료비",
        order: 1,
        level: 0,
        parentId: null,
      },
    });

    const cat002 = await prisma.priceCategory.create({
      data: {
        id: "cat-002",
        name: "검사비",
        order: 2,
        level: 0,
        parentId: null,
      },
    });

    const cat003 = await prisma.priceCategory.create({
      data: {
        id: "cat-003",
        name: "치료비",
        order: 3,
        level: 0,
        parentId: null,
      },
    });

    const cat004 = await prisma.priceCategory.create({
      data: {
        id: "cat-004",
        name: "기타비용",
        order: 4,
        level: 0,
        parentId: null,
      },
    });

    console.log("📂 최상위 카테고리 생성 완료");

    // 2. 진료비 하위 카테고리들
    const subCat001 = await prisma.priceCategory.create({
      data: {
        id: "cat-001-001",
        name: "초진료비",
        order: 1,
        level: 1,
        parentId: cat001.id,
      },
    });

    const subCat002 = await prisma.priceCategory.create({
      data: {
        id: "cat-001-002",
        name: "재진료비",
        order: 2,
        level: 1,
        parentId: cat001.id,
      },
    });

    const subCat003 = await prisma.priceCategory.create({
      data: {
        id: "cat-001-003",
        name: "응급진료비",
        order: 3,
        level: 1,
        parentId: cat001.id,
      },
    });

    // 3. 검사비 하위 카테고리들
    const subCat004 = await prisma.priceCategory.create({
      data: {
        id: "cat-002-001",
        name: "청력검사",
        order: 1,
        level: 1,
        parentId: cat002.id,
      },
    });

    const subCat005 = await prisma.priceCategory.create({
      data: {
        id: "cat-002-002",
        name: "평형기능검사",
        order: 2,
        level: 1,
        parentId: cat002.id,
      },
    });

    const subCat006 = await prisma.priceCategory.create({
      data: {
        id: "cat-002-003",
        name: "영상검사",
        order: 3,
        level: 1,
        parentId: cat002.id,
      },
    });

    // 4. 치료비 하위 카테고리들
    const subCat007 = await prisma.priceCategory.create({
      data: {
        id: "cat-003-001",
        name: "침치료",
        order: 1,
        level: 1,
        parentId: cat003.id,
      },
    });

    const subCat008 = await prisma.priceCategory.create({
      data: {
        id: "cat-003-002",
        name: "한약치료",
        order: 2,
        level: 1,
        parentId: cat003.id,
      },
    });

    const subCat009 = await prisma.priceCategory.create({
      data: {
        id: "cat-003-003",
        name: "물리치료",
        order: 3,
        level: 1,
        parentId: cat003.id,
      },
    });

    console.log("📂 하위 카테고리 생성 완료");

    // 5. 항목들 추가
    await prisma.priceItem.createMany({
      data: [
        // 초진료비 항목들
        {
          id: "item-001",
          categoryId: subCat001.id,
          name: "이비인후과 초진",
          description: "이비인후과 초진료비",
          specification: "30분",
          priceType: "FIXED",
          priceMin: 50000,
          order: 1,
        },
        {
          id: "item-002",
          categoryId: subCat001.id,
          name: "한의과 초진",
          description: "한의과 초진료비",
          specification: "30분",
          priceType: "FIXED",
          priceMin: 45000,
          order: 2,
        },
        // 재진료비 항목들
        {
          id: "item-003",
          categoryId: subCat002.id,
          name: "이비인후과 재진",
          description: "이비인후과 재진료비",
          specification: "20분",
          priceType: "FIXED",
          priceMin: 30000,
          order: 1,
        },
        {
          id: "item-004",
          categoryId: subCat002.id,
          name: "한의과 재진",
          description: "한의과 재진료비",
          specification: "20분",
          priceType: "FIXED",
          priceMin: 25000,
          order: 2,
        },
        // 응급진료비 항목들
        {
          id: "item-005",
          categoryId: subCat003.id,
          name: "응급진료",
          description: "응급실 진료비",
          specification: "응급시",
          priceType: "FIXED",
          priceMin: 80000,
          order: 1,
        },
        // 청력검사 항목들
        {
          id: "item-006",
          categoryId: subCat004.id,
          name: "순음청력검사",
          description: "기본 청력검사",
          specification: "양측",
          priceType: "FIXED",
          priceMin: 25000,
          order: 1,
        },
        {
          id: "item-007",
          categoryId: subCat004.id,
          name: "어음청력검사",
          description: "어음 청력검사",
          specification: "양측",
          priceType: "FIXED",
          priceMin: 30000,
          order: 2,
        },
        {
          id: "item-008",
          categoryId: subCat004.id,
          name: "고막운동성검사",
          description: "고막운동성 측정",
          specification: "양측",
          priceType: "FIXED",
          priceMin: 40000,
          order: 3,
        },
        // 평형기능검사 항목들
        {
          id: "item-009",
          categoryId: subCat005.id,
          name: "온도안진검사",
          description: "전정기능 검사",
          specification: "양측",
          priceType: "FIXED",
          priceMin: 60000,
          order: 1,
        },
        {
          id: "item-010",
          categoryId: subCat005.id,
          name: "회전의자검사",
          description: "전정기능 검사",
          specification: "1회",
          priceType: "FIXED",
          priceMin: 50000,
          order: 2,
        },
        // 영상검사 항목들
        {
          id: "item-011",
          categoryId: subCat006.id,
          name: "CT 촬영",
          description: "컴퓨터단층촬영",
          specification: "1부위",
          priceType: "FIXED",
          priceMin: 150000,
          order: 1,
        },
        {
          id: "item-012",
          categoryId: subCat006.id,
          name: "MRI 촬영",
          description: "자기공명영상",
          specification: "1부위",
          priceType: "FIXED",
          priceMin: 200000,
          order: 2,
        },
        // 침치료 항목들
        {
          id: "item-013",
          categoryId: subCat007.id,
          name: "침치료",
          description: "침술 치료",
          specification: "1회",
          priceType: "FIXED",
          priceMin: 20000,
          order: 1,
        },
        {
          id: "item-014",
          categoryId: subCat007.id,
          name: "전침치료",
          description: "전기침 치료",
          specification: "1회",
          priceType: "FIXED",
          priceMin: 25000,
          order: 2,
        },
        // 한약치료 항목들
        {
          id: "item-015",
          categoryId: subCat008.id,
          name: "한약처방",
          description: "한약 처방전",
          specification: "1일분",
          priceType: "FIXED",
          priceMin: 15000,
          order: 1,
        },
        {
          id: "item-016",
          categoryId: subCat008.id,
          name: "한약재료비",
          description: "한약재료비",
          specification: "1일분",
          priceType: "RANGE",
          priceMin: 10000,
          priceMax: 20000,
          order: 2,
        },
        // 물리치료 항목들
        {
          id: "item-017",
          categoryId: subCat009.id,
          name: "물리치료",
          description: "물리치료",
          specification: "1회",
          priceType: "FIXED",
          priceMin: 30000,
          order: 1,
        },
        {
          id: "item-018",
          categoryId: subCat009.id,
          name: "마사지치료",
          description: "마사지 치료",
          specification: "1회",
          priceType: "FIXED",
          priceMin: 25000,
          order: 2,
        },
        // 기타비용 항목들
        {
          id: "item-019",
          categoryId: cat004.id,
          name: "주차비",
          description: "병원 주차비",
          specification: "1시간",
          priceType: "FIXED",
          priceMin: 2000,
          order: 1,
        },
        {
          id: "item-020",
          categoryId: cat004.id,
          name: "진료서류발급",
          description: "진료확인서 발급",
          specification: "1통",
          priceType: "FIXED",
          priceMin: 5000,
          order: 2,
        },
        {
          id: "item-021",
          categoryId: cat004.id,
          name: "의료기기사용료",
          description: "의료기기 사용료",
          specification: "1회",
          priceType: "TEXT",
          priceText: "진료내용에 따라 상이",
          order: 3,
        },
      ],
    });

    console.log("✅ 비급여 가격 데이터 추가 완료!");
  } catch (error) {
    console.error("❌ 오류 발생:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
