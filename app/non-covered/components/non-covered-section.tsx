"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PriceItem {
  id: string;
  name: string;
  specification?: string | null;
  priceType: "FIXED" | "RANGE" | "TEXT";
  priceMin?: number | null;
  priceMax?: number | null;
  priceText?: string | null;
  order: number;
}

interface PriceCategory {
  id: string;
  name: string;
  parentId: string | null;
  level: number;
  items: PriceItem[];
  children: PriceCategory[];
}

interface NonCoveredSectionProps {
  items: PriceCategory[];
  isLoading?: boolean;
}

function formatPrice(item: PriceItem) {
  switch (item.priceType) {
    case "FIXED":
      return `${item.priceMin?.toLocaleString()}원`;
    case "RANGE":
      return `${item.priceMin?.toLocaleString()}원~${item.priceMax?.toLocaleString()}원`;
    case "TEXT":
      return item.priceText || "-";
    default:
      return "-";
  }
}

export function NonCoveredSection({ items, isLoading = false }: NonCoveredSectionProps) {
  const renderCategory = (category: PriceCategory) => {
    // 카테고리에 직접 항목이 있으면 표시
    if (category.items && category.items.length > 0) {
      return (
        <div key={category.id} className="space-y-4 mb-8">
          <h3 className="text-2xl font-semibold mb-4">{category.name}</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">항목</TableHead>
                <TableHead className="w-[20%]">구분</TableHead>
                <TableHead className="w-[40%] text-right">비용</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {category.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.specification || "-"}</TableCell>
                  <TableCell className="text-right">{formatPrice(item)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
    }

    // 하위 카테고리가 있으면 재귀적으로 렌더링
    if (category.children && category.children.length > 0) {
      return (
        <div key={category.id} className="space-y-4">
          {category.level === 0 && <h3 className="text-2xl font-semibold mb-4">{category.name}</h3>}
          {category.children.map(renderCategory)}
        </div>
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-96 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">{items.map(renderCategory)}</div>
          <div className="mt-8 space-y-2">
            <p className="text-sm text-gray-500">※ 위 금액은 변동될 수 있으며, 실제 진료비는 환자의 상태와 치료 방법에 따라 달라질 수 있습니다.</p>
            <p className="text-sm text-gray-600 font-medium">* 의료보험 적용이 안되는 제증명서류, 약제 및 치료제, 진료행위등을 기재</p>
          </div>
        </div>
      </div>
    </section>
  );
}
