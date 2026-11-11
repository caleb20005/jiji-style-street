import { Link, useNavigate } from "@tanstack/react-router";
import { MapPin, Search, ShoppingBag, Truck, Smartphone, Package } from "lucide-react";
import { useState, type FormEvent } from "react";
import { DELIVERY_LOCATIONS, useCart } from "@/lib/cart";
import { CATEGORIES } from "@/lib/products";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SiteHeader() {
  const { totals, setOpen, location, setLocation } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  function onSearch(e: FormEvent) {
    e.preventDefault();
    navigate({ to: "/", search: { q: q.trim() || undefined }, hash: "shop" });
  }

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 overflow-x-auto px-4 py-1.5 text-xs font-semibold scrollbar-none sm:justify-between">
          <span className="flex shrink-0 items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-sun" /> Free delivery on orders over KSh 2,500
          </span>
          <span className="hidden shrink-0 items-center gap-1.5 sm:flex">
            <Smartphone className="h-3.5 w-3.5 text-sun" /> Pay with M-Pesa, Card or Cash on Delivery
          </span>
          <span className="hidden shrink-0 md:inline">Easy 7-day returns</span>
        </div>
      </div>

      <div className="border-t border-sun/15 bg-primary text-primary-foreground shadow-pop">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 md:flex-nowrap md:gap-5">
          <Link to="/" className="font-display text-3xl font-extrabold leading-none tracking-tight">
            mavazi<span className="text-sun">.</span>
          </Link>

          <div className="order-3 flex w-full items-center md:order-none md:w-auto">
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger
                aria-label="Delivery location"
                className="h-11 w-full gap-2 border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground md:w-44 [&>svg]:text-primary-foreground"
              >
                <MapPin className="h-4 w-4 shrink-0" />
                <div className="min-w-0 flex-1 text-left text-xs leading-tight">
                  <div className="opacity-80">Deliver to</div>
                  <div className="truncate font-bold">
                    <SelectValue />
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                {DELIVERY_LOCATIONS.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <form onSubmit={onSearch} className="order-4 flex w-full flex-1 md:order-none" role="search">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search dresses, sneakers, denim…"
              aria-label="Search products"
              className="h-11 min-w-0 flex-1 rounded-l-full border-0 bg-card px-5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-sun"
            />
            <button
              type="submit"
              className="flex h-11 items-center gap-2 rounded-r-full bg-sun px-5 text-sm font-bold text-sun-foreground transition-colors hover:bg-sun/85"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <Link
              to="/orders"
              className="flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold hover:bg-primary-foreground/10"
            >
              <Package className="h-5 w-5" /> <span className="hidden lg:inline">My orders</span>
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label={`Open cart, ${totals.itemCount} items`}
              className="relative flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold hover:bg-primary-foreground/10"
            >
              <ShoppingBag className="h-6 w-6" />
              <span className="hidden sm:inline">Cart</span>
              {totals.itemCount > 0 && (
                <span className="absolute left-6 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sun px-1 text-[11px] font-extrabold text-sun-foreground ring-2 ring-primary">
                  {totals.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-2 text-sm font-semibold scrollbar-none">
          <Link
            to="/"
            hash="flash-sale"
            className="shrink-0 rounded-full bg-sun px-3 py-1 text-sun-foreground"
          >
            ⚡ Flash Sale
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to="/"
              search={{ cat: c.id }}
              hash="shop"
              className="shrink-0 rounded-full px-3 py-1 hover:bg-primary-foreground/10"
            >
              {c.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
