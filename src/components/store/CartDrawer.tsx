import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { lineKey, FREE_DELIVERY_THRESHOLD } from "@/lib/cart-logic";
import { getProduct, colorImage } from "@/lib/products";
import { ksh } from "@/lib/format";

export function CartDrawer() {
  const { lines, totals, isOpen, setOpen, setQty, remove, location } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b px-5 py-4 text-left">
          <SheetTitle className="font-display text-xl font-extrabold">
            Your cart <span className="text-muted-foreground">({totals.itemCount})</span>
          </SheetTitle>
          <SheetDescription className="text-xs">Delivering to {location}</SheetDescription>
        </SheetHeader>

        <div className="border-b bg-secondary px-5 py-3">
          <p className="flex items-center gap-2 text-sm font-semibold text-secondary-foreground">
            <Truck className="h-4 w-4" />
            {totals.freeDelivery ? (
              <span>🎉 You've unlocked FREE delivery!</span>
            ) : (
              <span>
                Add <strong>{ksh(totals.remainingForFree)}</strong> more for free delivery
              </span>
            )}
          </p>
          <div
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-card"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={FREE_DELIVERY_THRESHOLD}
            aria-valuenow={Math.min(totals.subtotal, FREE_DELIVERY_THRESHOLD)}
            aria-label="Progress to free delivery"
          >
            <div
              className={totals.freeDelivery ? "h-full rounded-full bg-success transition-all" : "h-full rounded-full bg-primary transition-all"}
              style={{ width: `${totals.progress}%` }}
            />
          </div>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-7 w-7 text-primary" />
            </span>
            <p className="font-display text-lg font-bold">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Today's flash deals won't last. Go grab something!</p>
            <Link
              to="/"
              hash="flash-sale"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
            >
              Shop flash deals
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y overflow-y-auto px-5">
              {lines.map((l) => {
                const p = getProduct(l.productId);
                if (!p) return null;
                const key = lineKey(l);
                return (
                  <li key={key} className="flex gap-3 py-4">
                    <img src={colorImage(p, l.color)} alt={`${p.name} in ${l.color}`} width={768} height={960} loading="lazy" className="h-24 w-20 shrink-0 rounded-lg bg-muted object-cover" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="line-clamp-2 text-sm font-medium leading-snug">{p.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {l.color} · Size {l.size}
                      </p>
                      <div className="mt-auto flex items-end justify-between pt-2">
                        <div className="flex items-center rounded-full border">
                          <button aria-label="Decrease quantity" onClick={() => setQty(key, l.qty - 1)} className="flex h-8 w-8 items-center justify-center hover:text-primary">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold tabular-nums">{l.qty}</span>
                          <button aria-label="Increase quantity" onClick={() => setQty(key, l.qty + 1)} className="flex h-8 w-8 items-center justify-center hover:text-primary">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-extrabold text-primary-deep">{ksh(l.price * l.qty)}</p>
                          <button onClick={() => remove(key)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-3 w-3" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-2 border-t bg-card px-5 py-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{ksh(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-success">
                <span>You save</span>
                <span className="font-semibold">-{ksh(totals.savings)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-semibold">{totals.delivery === 0 ? "FREE" : ksh(totals.delivery)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-base">
                <span className="font-bold">Total</span>
                <span className="font-display text-xl font-extrabold">{ksh(totals.total)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-primary font-bold text-primary-foreground shadow-pop transition-colors hover:bg-primary-deep"
              >
                Checkout · {ksh(totals.total)}
              </Link>
              <p className="text-center text-xs text-muted-foreground">M-Pesa · Card · Cash on Delivery</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
