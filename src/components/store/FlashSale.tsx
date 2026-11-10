import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { FLASH_PRODUCTS, discountPercent } from "@/lib/products";
import { ksh } from "@/lib/format";

function nextMidnight() {
  const d = new Date();
  d.setHours(24, 0, 0, 0);
  return d.getTime();
}

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    let end = nextMidnight();
    const tick = () => {
      let ms = end - Date.now();
      if (ms <= 0) {
        end = nextMidnight();
        ms = end - Date.now();
      }
      setLeft(ms);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  if (left === null) return ["--", "--", "--"];
  const s = Math.floor(left / 1000);
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, "0"));
}

export function FlashSale() {
  const [h, m, s] = useCountdown();

  return (
    <section id="flash-sale" className="scroll-mt-40 overflow-hidden rounded-2xl border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-flash px-4 py-3 text-flash-foreground sm:px-5">
        <div className="flex items-center gap-3">
          <h2 className="flex items-center gap-1.5 font-display text-xl font-extrabold sm:text-2xl">
            <Zap className="h-6 w-6 fill-sun text-sun" /> Flash Sale
          </h2>
          <div className="flex items-center gap-1.5 text-sm font-semibold" aria-live="off">
            <span className="hidden sm:inline">Ends in</span>
            {[h, m, s].map((v, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="min-w-9 rounded-md bg-ink px-1.5 py-1 text-center font-display text-base font-bold tabular-nums text-ink-foreground">
                  {v}
                </span>
                {i < 2 && <span className="animate-tick font-bold">:</span>}
              </span>
            ))}
          </div>
        </div>
        <Link to="/" hash="shop" className="text-sm font-bold underline-offset-4 hover:underline">
          See all deals →
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto p-4 scrollbar-none sm:p-5">
        {FLASH_PRODUCTS.map((p) => (
          <Link
            key={p.id}
            to="/product/$productId"
            params={{ productId: p.id }}
            className="group w-40 shrink-0 sm:w-48"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
              <img
                src={p.image}
                alt={p.name}
                width={768}
                height={960}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute right-0 top-0 rounded-bl-xl bg-sun px-2 py-1 font-display text-sm font-extrabold text-sun-foreground">
                -{discountPercent(p)}%
              </span>
            </div>
            <p className="mt-2 line-clamp-1 text-sm font-medium">{p.name}</p>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-base font-extrabold text-flash">{ksh(p.price)}</span>
              <span className="text-xs text-muted-foreground line-through">{ksh(p.originalPrice)}</span>
            </div>
            <div className="mt-1.5">
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-gradient-flash" style={{ width: `${p.flashClaimed}%` }} />
              </div>
              <p className="mt-1 text-[11px] font-semibold text-muted-foreground">
                {p.flashClaimed! >= 80 ? "🔥 Almost gone · " : ""}
                {p.flashClaimed}% claimed
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
