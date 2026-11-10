import { Banknote, RotateCcw, ShieldCheck, Smartphone } from "lucide-react";

const BADGES = [
  { icon: Banknote, title: "Cash on Delivery", sub: "Pay when your order arrives" },
  { icon: Smartphone, title: "M-Pesa & Card", sub: "Fast, secure checkout" },
  { icon: RotateCcw, title: "Easy 7-day returns", sub: "Free returns at pickup stations" },
  { icon: ShieldCheck, title: "Quality checked", sub: "Every item inspected before dispatch" },
];

export function TrustBadges({ compact = false }: { compact?: boolean }) {
  return (
    <section
      aria-label="Why shop with us"
      className={compact ? "grid grid-cols-2 gap-2" : "grid grid-cols-2 gap-3 rounded-2xl bg-secondary p-4 sm:p-5 lg:grid-cols-4"}
    >
      {BADGES.map(({ icon: Icon, title, sub }) => (
        <div key={title} className={compact ? "flex items-center gap-2 rounded-lg bg-secondary p-2.5" : "flex items-center gap-3"}>
          <span className={compact ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground" : "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"}>
            <Icon className={compact ? "h-4 w-4" : "h-5 w-5"} />
          </span>
          <div>
            <p className={compact ? "text-xs font-bold" : "text-sm font-bold"}>{title}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
