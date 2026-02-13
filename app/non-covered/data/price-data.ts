export interface PriceItem {
  id: string;
  name: string;
  specification?: string | null;
  priceType: "FIXED" | "RANGE" | "TEXT";
  priceMin?: number | null;
  priceMax?: number | null;
  priceText?: string | null;
  order: number;
}

export interface PriceCategory {
  id: string;
  name: string;
  parentId: string | null;
  level: number;
  items: PriceItem[];
  children: PriceCategory[];
}

// 하드코딩된 비급여 가격 데이터
export const priceCategories: PriceCategory[] = [
  {
    id: "cat-001",
    name: "제증명서류",
    parentId: null,
    level: 0,
    items: [
      { id: "item-001", name: "일반진단서", specification: "1통", priceType: "FIXED", priceMin: 20000, order: 1 },
      { id: "item-002", name: "상해진단서 (3주미만)", specification: "1통", priceType: "FIXED", priceMin: 100000, order: 2 },
      { id: "item-003", name: "상해진단서 (3주이상)", specification: "1통", priceType: "FIXED", priceMin: 150000, order: 3 },
      { id: "item-004", name: "일반소견서", specification: "1통", priceType: "FIXED", priceMin: 3000, order: 4 },
      { id: "item-005", name: "소견서(보험회사제출용)", specification: "1통", priceType: "FIXED", priceMin: 10000, order: 5 },
      { id: "item-006", name: "진료확인서", specification: "1통", priceType: "FIXED", priceMin: 3000, order: 6 },
      { id: "item-007", name: "입(통)원확인서", specification: "1통", priceType: "FIXED", priceMin: 3000, order: 7 },
      { id: "item-008", name: "진료기록사본(1~5매)", specification: "1통", priceType: "FIXED", priceMin: 1000, order: 8 },
      { id: "item-009", name: "진료기록사본(6매이상)", specification: "1매", priceType: "FIXED", priceMin: 100, order: 9 },
      { id: "item-010", name: "진료기록(영상/CD) 복사", specification: "1건", priceType: "FIXED", priceMin: 10000, order: 10 },
      { id: "item-011", name: "근로능력평가진단서", specification: "1통", priceType: "FIXED", priceMin: 10000, order: 11 },
    ],
    children: [],
  },
  {
    id: "cat-002",
    name: "약제 및 치료제",
    parentId: null,
    level: 0,
    items: [
      { id: "item-012", name: "첩약(일반) 1제", specification: "1제", priceType: "RANGE", priceMin: 200000, priceMax: 500000, order: 1 },
      { id: "item-013", name: "첩약(녹용) 1제", specification: "1제", priceType: "RANGE", priceMin: 600000, priceMax: 800000, order: 2 },
      { id: "item-014", name: "다이어트첩약 30일", specification: "30일", priceType: "FIXED", priceMin: 300000, order: 3 },
      { id: "item-015", name: "다이어트환(슬림환) 30일~120일", specification: "30일~120일", priceType: "RANGE", priceMin: 250000, priceMax: 750000, order: 4 },
      { id: "item-016", name: "한방파스", specification: "1포", priceType: "TEXT", priceText: "5,000/10,000/20,000", order: 5 },
      { id: "item-017", name: "약침", specification: "1회", priceType: "TEXT", priceText: "5,000/10,000/20,000/50,000", order: 6 },
    ],
    children: [],
  },
  {
    id: "cat-003",
    name: "진료 행위",
    parentId: null,
    level: 0,
    items: [
      { id: "item-018", name: "도수치료(외래)", specification: "1회", priceType: "FIXED", priceMin: 100000, order: 1 },
      { id: "item-019", name: "도수치료(입원)", specification: "1회", priceType: "FIXED", priceMin: 150000, order: 2 },
      { id: "item-020", name: "체외충격파", specification: "1회", priceType: "FIXED", priceMin: 100000, order: 3 },
      { id: "item-021", name: "신장분사", specification: "1회", priceType: "FIXED", priceMin: 50000, order: 4 },
    ],
    children: [],
  },
  {
    id: "cat-004",
    name: "비급여 수액",
    parentId: null,
    level: 0,
    items: [
      { id: "item-022", name: "영양제수액", specification: "1회", priceType: "RANGE", priceMin: 30000, priceMax: 50000, order: 1 },
      { id: "item-023", name: "신데렐라주사", specification: "1회", priceType: "FIXED", priceMin: 30000, order: 2 },
      { id: "item-024", name: "백옥주사", specification: "1회", priceType: "FIXED", priceMin: 30000, order: 3 },
      { id: "item-025", name: "비타민주사", specification: "1회", priceType: "FIXED", priceMin: 30000, order: 4 },
      { id: "item-026", name: "와인주사", specification: "1회", priceType: "FIXED", priceMin: 30000, order: 5 },
      { id: "item-027", name: "마늘주사", specification: "1회", priceType: "FIXED", priceMin: 30000, order: 6 },
    ],
    children: [],
  },
  {
    id: "cat-005",
    name: "검사",
    parentId: null,
    level: 0,
    items: [
      { id: "item-028", name: "적외선체열진단/체형분석기", specification: "1회", priceType: "FIXED", priceMin: 50000, order: 1 },
    ],
    children: [],
  },
];


