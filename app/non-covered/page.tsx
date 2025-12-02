"use client";

import { NonCoveredHero } from "./components/hero";
import { NonCoveredSection } from "./components/non-covered-section";
import { priceCategories } from "./data/price-data";

export default function NonCoveredPage() {
  return (
    <main className="pt-16">
      <NonCoveredHero />
      <NonCoveredSection items={priceCategories} isLoading={false} />
    </main>
  );
}
