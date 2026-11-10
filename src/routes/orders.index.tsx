import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Package, Search } from "lucide-react";
import { loadOrders, trackingStageIndex, TRACKING_STAGES, type Order } from "@/lib/orders";
import { getProduct } from "@/lib/products";
import { ksh } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders/")({
  head: () => ({
    meta: [
      { title: "My Orders — Mavazi" },
      { name: "description", content: "See your Mavazi order history and track every shipment to your door." },
      { property: "og:title", content: "My Orders — Mavazi" },
      { property: "og:description", content: "Order history and shipment tracking for your Mavazi fashion orders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [lookup, setLookup] = useState("");
  const [lookupError, setLookupError] = useState("");
  const navigate = useNavigate();

  useEffect(() => setOrders(loadOrders()), []);

  function onTrack(e: FormEvent) {
    e.preventDefault();
    const id = lookup.trim().toUpperCase();
    if (!orders?.some((o) => o.id === id)) {
      setLookupError("We couldn't find that order number on this device.");
      return;
    }
    navigate({ to: "/orders/$orderId", params: { orderId: id }, search: { placed: undefined } });
  }

  const now = new Date();

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold">My orders</h1>
          <p className="text-sm text-muted-foreground">Track your parcels from our warehouse to your door.</p>
        </div>
        <form onSubmit={onTrack} className="flex w-full sm:w-auto">
          <input
            value={lookup}
            onChange={(e) => {
              setLookup(e.target.value);
              setLookupError("");
            }}
            placeholder="Order number, e.g. MV12345678"
            aria-label="Order number"
            className="h-10 min-w-0 flex-1 rounded-l-full border bg-card px-4 text-sm outline-none focus:border-primary sm:w-64"
          />
          <button className="flex h-10 items-center gap-1.5 rounded-r-full bg-primary px-4 text-sm font-bold text-primary-foreground">
            <Search className="h-4 w-4" /> Track
          </button>
        </form>
      </div>
      {lookupError && <p className="mt-2 text-right text-xs text-destructive">{lookupError}</p>}

      {orders === null ? (
        <div className="mt-6 space-y-3">
          {[0, 1].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed bg-card p-10 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <Package className="h-6 w-6 text-primary" />
          </span>
          <p className="mt-3 font-display text-lg font-bold">No orders yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Once you check out, your orders and tracking will show up here.</p>
          <Link to="/" className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground">
            Start shopping
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {orders.map((o) => {
            const idx = trackingStageIndex(new Date(o.createdAt), now);
            const stage = TRACKING_STAGES[idx] ?? TRACKING_STAGES[0];
            const delivered = stage.key === "delivered";
            const count = o.lines.reduce((s, l) => s + l.qty, 0);
            return (
              <li key={o.id}>
                <Link
                  to="/orders/$orderId"
                  params={{ orderId: o.id }}
                  search={{ placed: undefined }}
                  className="block rounded-2xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-pop"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-display font-bold">Order {o.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(o.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })} · {count} item{count > 1 ? "s" : ""} · {ksh(o.total)}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-bold",
                        delivered ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground",
                      )}
                    >
                      {stage.label}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    {o.lines.slice(0, 5).map((l) => {
                      const p = getProduct(l.productId);
                      return p ? (
                        <img key={`${l.productId}${l.size}${l.color}`} src={p.image} alt={p.name} width={768} height={960} loading="lazy" className="h-14 w-12 rounded-md bg-muted object-cover" />
                      ) : null;
                    })}
                    {o.lines.length > 5 && <span className="text-xs text-muted-foreground">+{o.lines.length - 5}</span>}
                  </div>
                  <div className="mt-3 flex gap-1">
                    {TRACKING_STAGES.map((s, i) => (
                      <span key={s.key} className={cn("h-1.5 flex-1 rounded-full", i <= idx ? (delivered ? "bg-success" : "bg-primary") : "bg-muted")} />
                    ))}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
