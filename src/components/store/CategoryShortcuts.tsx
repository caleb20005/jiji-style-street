import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/products";
import { cn } from "@/lib/utils";

export function CategoryShortcuts({ active }: { active?: string }) {
  return (
    <section aria-label="Shop by category" className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {CATEGORIES.map((c) => (
        <Link
          key={c.id}
          to="/"
          search={{ cat: active === c.id ? undefined : c.id }}
          hash="shop"
          className="group flex flex-col items-center gap-2 text-center"
        >
          <span
            className={cn(
              "relative block aspect-square w-full max-w-28 overflow-hidden rounded-full border-4 bg-secondary transition-all group-hover:border-primary",
              active === c.id ? "border-primary" : "border-card",
              c.id === "under999" && "border-sun",
            )}
          >
            <img src={c.image} alt="" width={768} height={960} loading="lazy" className="h-full w-full object-cover" />
            {c.id === "under999" && (
              <span className="absolute inset-x-0 bottom-0 bg-sun py-0.5 text-[10px] font-extrabold text-sun-foreground">
                DEALS
              </span>
            )}
          </span>
          <span className="text-xs font-bold sm:text-sm">{c.label}</span>
        </Link>
      ))}
    </section>
  );
}
