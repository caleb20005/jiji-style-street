import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { HeroCarousel } from "@/components/store/HeroCarousel";
import { CategoryShortcuts } from "@/components/store/CategoryShortcuts";
import { FlashSale } from "@/components/store/FlashSale";
import { TrustBadges } from "@/components/store/TrustBadges";
import { ProductCard } from "@/components/store/ProductCard";
import { CATEGORIES, PRODUCTS, discountPercent, filterProducts } from "@/lib/products";
import { cn } from "@/lib/utils";

type HomeSearch = { q?: string; cat?: string };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): HomeSearch => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
    cat: typeof search.cat === "string" && search.cat ? search.cat : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Mavazi — Flash Deals on Dresses, Sneakers & Streetwear" },
      {
        name: "description",
        content:
          "Up to 60% off everyday fashion in Kenya. Dresses, streetwear, sneakers, denim and deals under KSh 999 with Cash on Delivery.",
      },
      { property: "og:title", content: "Mavazi — Flash Deals on Dresses, Sneakers & Streetwear" },
      {
        property: "og:description",
        content: "Up to 60% off everyday fashion in Kenya. Pay with M-Pesa, card or cash on delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const SORTS = {
  popular: { label: "Best selling", fn: (a: (typeof PRODUCTS)[number], b: (typeof PRODUCTS)[number]) => b.sold - a.sold },
  low: { label: "Price: low to high", fn: (a: (typeof PRODUCTS)[number], b: (typeof PRODUCTS)[number]) => a.price - b.price },
  high: { label: "Price: high to low", fn: (a: (typeof PRODUCTS)[number], b: (typeof PRODUCTS)[number]) => b.price - a.price },
  discount: {
    label: "Biggest discount",
    fn: (a: (typeof PRODUCTS)[number], b: (typeof PRODUCTS)[number]) => discountPercent(b) - discountPercent(a),
  },
} as const;

function Home() {
  const { q, cat } = Route.useSearch();
  const [sort, setSort] = useState<keyof typeof SORTS>("popular");
  const results = useMemo(() => [...filterProducts(PRODUCTS, { q, cat })].sort(SORTS[sort].fn), [q, cat, sort]);
  const activeCat = CATEGORIES.find((c) => c.id === cat);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-5">
      <h1 className="sr-only">Mavazi affordable fashion store</h1>
      <HeroCarousel />
      <CategoryShortcuts active={cat} />
      <FlashSale />
      <TrustBadges />

      <section id="shop" className="scroll-mt-40">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              {q ? `Results for “${q}”` : activeCat ? activeCat.label : "Just for you"}
            </h2>
            <p className="text-sm text-muted-foreground">{results.length} items · prices include VAT</p>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as keyof typeof SORTS)}
              className="h-9 rounded-full border bg-card px-3 text-sm font-semibold"
            >
              {Object.entries(SORTS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto scrollbar-none">
          <Link
            to="/"
            search={{ q }}
            hash="shop"
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold",
              !cat ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary",
            )}
          >
            All
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to="/"
              search={{ q, cat: c.id }}
              hash="shop"
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold",
                cat === c.id ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary",
              )}
            >
              {c.label}
            </Link>
          ))}
          {q && (
            <Link
              to="/"
              search={{ cat }}
              hash="shop"
              className="flex shrink-0 items-center gap-1 rounded-full bg-ink px-3 py-1.5 text-sm font-semibold text-ink-foreground"
            >
              “{q}” <X className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
            <p className="font-display text-lg font-bold">No items match that search</p>
            <p className="mt-1 text-sm text-muted-foreground">Try “dress”, “sneakers” or “denim”.</p>
            <Link to="/" hash="shop" className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground">
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
