import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, CircleCheckBig, MapPin, Phone } from "lucide-react";
import { loadOrders, PAYMENT_LABELS, stageTime, trackingStageIndex, TRACKING_STAGES, type Order } from "@/lib/orders";
import { getProduct, colorImage } from "@/lib/products";
import { ksh } from "@/lib/format";
import { cn } from "@/lib/utils";

type OrderSearch = { placed?: boolean | undefined };

export const Route = createFileRoute("/orders/$orderId")({
  validateSearch: (search: Record<string, unknown>): OrderSearch => ({
    placed: search["placed"] === true || search["placed"] === "true" ? true : undefined,
  }),
  head: ({ params }) => ({
    meta: [
      { title: `Track order ${params.orderId} — Ben Fashion` },
      { name: "description", content: "Follow your Ben Fashion parcel from dispatch to delivery." },
      { property: "og:title", content: `Track order ${params.orderId} — Ben Fashion` },
      { property: "og:description", content: "Live shipment status for your Ben Fashion order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderTrackingPage,
});

function fmt(d: Date) {
  return d.toLocaleString("en-KE", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function OrderTrackingPage() {
  const { orderId } = Route.useParams();
  const { placed } = Route.useSearch();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    setOrder(loadOrders().find((o) => o.id === orderId) ?? null);
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, [orderId]);

  if (order === undefined) {
    return <div className="mx-auto mt-6 h-96 max-w-4xl animate-pulse rounded-2xl bg-muted" />;
  }

  if (order === null) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-extrabold">Order not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">We couldn't find order {orderId} on this device.</p>
        <Link to="/orders" className="mt-5 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground">
          View my orders
        </Link>
      </div>
    );
  }

  const created = new Date(order.createdAt);
  const idx = trackingStageIndex(created, now);
  const delivered = TRACKING_STAGES[idx]?.key === "delivered";
  const eta = stageTime(created, TRACKING_STAGES.length - 1);

  return (
    <div className="mx-auto max-w-4xl space-y-5 px-4 py-6">
      {placed && (
        <div className="flex items-start gap-3 rounded-2xl bg-success p-5 text-success-foreground">
          <CircleCheckBig className="h-7 w-7 shrink-0" />
          <div>
            <h1 className="font-display text-xl font-extrabold">Thank you, {order.customer.name.split(" ")[0]}! Your order is placed.</h1>
            <p className="mt-1 text-sm opacity-90">
              {order.payment === "mpesa"
                ? `An M-Pesa prompt for ${ksh(order.total)} will be sent to ${order.customer.phone}.`
                : order.payment === "cod"
                  ? `Have ${ksh(order.total)} ready when the rider arrives.`
                  : "We'll confirm your card payment shortly."}{" "}
              Save your order number: <strong>{order.id}</strong>
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link to="/orders" className="text-xs font-semibold text-primary hover:underline">← My orders</Link>
          {placed ? (
            <h2 className="font-display text-2xl font-extrabold">Order {order.id}</h2>
          ) : (
            <h1 className="font-display text-2xl font-extrabold">Order {order.id}</h1>
          )}
          <p className="text-sm text-muted-foreground">Placed {fmt(created)}</p>
        </div>
        <div className="rounded-xl bg-secondary px-4 py-2 text-right">
          <p className="text-xs font-semibold text-secondary-foreground">{delivered ? "Delivered" : "Estimated delivery"}</p>
          <p className="font-display text-lg font-extrabold">{fmt(eta).split(",").slice(0, 2).join(",")}</p>
        </div>
      </div>

      <section className="rounded-2xl border bg-card p-5" aria-label="Shipment tracking">
        <h3 className="font-display text-lg font-bold">Shipment status</h3>
        <ol className="mt-4">
          {TRACKING_STAGES.map((s, i) => {
            const done = i <= idx;
            const current = i === idx;
            return (
              <li key={s.key} className="relative flex gap-4 pb-6 last:pb-0">
                {i < TRACKING_STAGES.length - 1 && (
                  <span className={cn("absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5", i < idx ? "bg-primary" : "bg-border")} />
                )}
                <span
                  className={cn(
                    "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                    done ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground",
                    current && !delivered && "ring-4 ring-primary/20",
                    current && delivered && "border-success bg-success text-success-foreground",
                  )}
                >
                  {done ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                </span>
                <div className="pt-1">
                  <p className={cn("text-sm font-bold", !done && "text-muted-foreground")}>
                    {s.label}
                    {current && !delivered && <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">CURRENT</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {done ? `${fmt(stageTime(created, i))} · ${s.key === "transit" ? `${s.detail.replace("regional", order.shipping.town)}` : s.detail}` : "Pending"}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <section className="rounded-2xl border bg-card p-5">
          <h3 className="font-display text-lg font-bold">Items</h3>
          <ul className="mt-3 space-y-3">
            {order.lines.map((l) => {
              const p = getProduct(l.productId);
              if (!p) return null;
              return (
                <li key={`${l.productId}${l.size}${l.color}`} className="flex gap-3">
                  <img src={colorImage(p, l.color)} alt="" width={768} height={960} loading="lazy" className="h-16 w-14 rounded-md bg-muted object-cover" />
                  <div className="min-w-0 flex-1 text-sm">
                    <Link to="/product/$productId" params={{ productId: p.id }} className="line-clamp-1 font-medium hover:text-primary">
                      {p.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{l.color} · {l.size} · ×{l.qty}</p>
                  </div>
                  <span className="text-sm font-bold">{ksh(l.price * l.qty)}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 space-y-1 border-t pt-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{ksh(order.subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{order.delivery === 0 ? "FREE" : ksh(order.delivery)}</span></div>
            <div className="flex justify-between font-bold"><span>Total</span><span>{ksh(order.total)}</span></div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border bg-card p-5 text-sm">
          <h3 className="font-display text-lg font-bold">Delivery details</h3>
          <p className="flex gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>
              <strong>{order.shipping.method === "home" ? "Home delivery" : "Pickup station"}</strong>
              <br />
              {order.shipping.address}, {order.shipping.town}
              {order.shipping.notes && <><br /><span className="text-muted-foreground">Note: {order.shipping.notes}</span></>}
            </span>
          </p>
          <p className="flex gap-2">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{order.customer.name} · {order.customer.phone}</span>
          </p>
          <div className="rounded-xl bg-secondary p-3">
            <p className="text-xs font-semibold text-secondary-foreground">Payment</p>
            <p className="font-bold">{PAYMENT_LABELS[order.payment]}</p>
          </div>
          <Link to="/" className="block rounded-full bg-primary py-2.5 text-center font-bold text-primary-foreground">
            Continue shopping
          </Link>
        </section>
      </div>
    </div>
  );
}
