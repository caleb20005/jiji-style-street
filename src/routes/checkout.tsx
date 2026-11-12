import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Banknote, CreditCard, Home, Lock, MapPin, Smartphone, Store } from "lucide-react";
import { DELIVERY_LOCATIONS, useCart } from "@/lib/cart";
import { getProduct, colorImage } from "@/lib/products";
import { ksh } from "@/lib/format";
import { lineKey } from "@/lib/cart-logic";
import {
  generateOrderId,
  isValidKenyanPhone,
  saveOrder,
  type DeliveryMethod,
  type PaymentMethod,
} from "@/lib/orders";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Ben Fashion" },
      { name: "description", content: "Complete your Ben Fashion order. Pay with M-Pesa, card or cash on delivery." },
      { property: "og:title", content: "Checkout — Ben Fashion" },
      { property: "og:description", content: "Complete your Ben Fashion order securely." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const PAYMENTS: { id: PaymentMethod; label: string; sub: string; icon: typeof Smartphone }[] = [
  { id: "mpesa", label: "M-Pesa", sub: "Get a payment prompt on your phone", icon: Smartphone },
  { id: "card", label: "Debit / Credit card", sub: "Visa or Mastercard", icon: CreditCard },
  { id: "cod", label: "Cash on Delivery", sub: "Pay the rider in cash or M-Pesa", icon: Banknote },
];

type Errors = Partial<Record<"name" | "phone" | "address", string>>;

function CheckoutPage() {
  const { lines, totals, location, setLocation, clear } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [method, setMethod] = useState<DeliveryMethod>("home");
  const [payment, setPayment] = useState<PaymentMethod>("mpesa");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  if (lines.length === 0 && !submitting) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-extrabold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">Add a few items before checking out.</p>
        <Link to="/" className="mt-5 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground">
          Start shopping
        </Link>
      </div>
    );
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Enter your full name";
    if (!isValidKenyanPhone(phone)) next.phone = "Enter a valid phone number, e.g. 0712 345 678";
    if (address.trim().length < 3)
      next.address = method === "home" ? "Enter your street, building or landmark" : "Enter your preferred pickup station";
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    const id = generateOrderId();
    saveOrder({
      id,
      createdAt: new Date().toISOString(),
      lines,
      subtotal: totals.subtotal,
      savings: totals.savings,
      delivery: totals.delivery,
      total: totals.total,
      customer: { name: name.trim(), phone: phone.trim(), email: email.trim() || undefined },
      shipping: { method, town: location, address: address.trim(), notes: notes.trim() || undefined },
      payment,
    });
    clear();
    navigate({ to: "/orders/$orderId", params: { orderId: id }, search: { placed: true } });
  }

  const field = "h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="font-display text-3xl font-extrabold">Checkout</h1>
      <form onSubmit={onSubmit} noValidate className="mt-5 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          <section className="rounded-2xl border bg-card p-5">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">1</span>
              Your details
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-semibold sm:col-span-2">
                Full name
                <input value={name} onChange={(e) => setName(e.target.value)} className={cn(field, "mt-1", errors.name && "border-destructive")} autoComplete="name" />
                {errors.name && <span className="mt-1 block text-xs text-destructive">{errors.name}</span>}
              </label>
              <label className="block text-sm font-semibold">
                Phone (M-Pesa)
                <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="0712 345 678" className={cn(field, "mt-1", errors.phone && "border-destructive")} autoComplete="tel" />
                {errors.phone && <span className="mt-1 block text-xs text-destructive">{errors.phone}</span>}
              </label>
              <label className="block text-sm font-semibold">
                Email <span className="font-normal text-muted-foreground">(optional)</span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={cn(field, "mt-1")} autoComplete="email" />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-5">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">2</span>
              Delivery
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {([
                { id: "home", label: "Home / office delivery", sub: "Rider brings it to your door", icon: Home },
                { id: "pickup", label: "Pickup station", sub: "Collect at a station near you", icon: Store },
              ] as const).map((o) => (
                <button
                  type="button"
                  key={o.id}
                  onClick={() => setMethod(o.id)}
                  aria-pressed={method === o.id}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border-2 p-3 text-left transition-colors",
                    method === o.id ? "border-primary bg-accent" : "hover:border-primary/40",
                  )}
                >
                  <o.icon className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    <span className="block text-sm font-bold">{o.label}</span>
                    <span className="block text-xs text-muted-foreground">{o.sub}</span>
                  </span>
                </button>
              ))}
              <label className="block text-sm font-semibold">
                Town
                <select value={location} onChange={(e) => setLocation(e.target.value)} className={cn(field, "mt-1")}>
                  {DELIVERY_LOCATIONS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-semibold">
                {method === "home" ? "Street, building or landmark" : "Preferred pickup station"}
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={method === "home" ? "e.g. Ngong Rd, Prestige Plaza" : "e.g. Kenyatta Ave station"}
                  className={cn(field, "mt-1", errors.address && "border-destructive")}
                  autoComplete="street-address"
                />
                {errors.address && <span className="mt-1 block text-xs text-destructive">{errors.address}</span>}
              </label>
              <label className="block text-sm font-semibold sm:col-span-2">
                Delivery notes <span className="font-normal text-muted-foreground">(optional)</span>
                <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Gate colour, call before arrival…" className={cn(field, "mt-1")} />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-5">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">3</span>
              Payment
            </h2>
            <div className="mt-4 grid gap-3">
              {PAYMENTS.map((o) => (
                <button
                  type="button"
                  key={o.id}
                  onClick={() => setPayment(o.id)}
                  aria-pressed={payment === o.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-colors",
                    payment === o.id ? "border-primary bg-accent" : "hover:border-primary/40",
                  )}
                >
                  <span className={cn("flex h-10 w-10 items-center justify-center rounded-full", o.id === "mpesa" ? "bg-success text-success-foreground" : "bg-secondary text-secondary-foreground")}>
                    <o.icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold">{o.label}</span>
                    <span className="block text-xs text-muted-foreground">{o.sub}</span>
                  </span>
                  <span className={cn("h-5 w-5 rounded-full border-2", payment === o.id ? "border-primary bg-primary ring-2 ring-inset ring-card" : "border-input")} />
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border bg-card p-5 lg:sticky lg:top-40">
          <h2 className="font-display text-lg font-bold">Order summary</h2>
          <ul className="max-h-72 space-y-3 overflow-y-auto">
            {lines.map((l) => {
              const p = getProduct(l.productId);
              if (!p) return null;
              return (
                <li key={lineKey(l)} className="flex gap-3">
                  <img src={colorImage(p, l.color)} alt="" width={768} height={960} loading="lazy" className="h-16 w-14 rounded-md bg-muted object-cover" />
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="line-clamp-1 font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {l.color} · {l.size} · ×{l.qty}
                    </p>
                  </div>
                  <span className="text-sm font-bold">{ksh(l.price * l.qty)}</span>
                </li>
              );
            })}
          </ul>
          <div className="space-y-1.5 border-t pt-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{ksh(totals.subtotal)}</span></div>
            <div className="flex justify-between text-success"><span>Savings</span><span>-{ksh(totals.savings)}</span></div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> Delivery to {location}</span>
              <span>{totals.delivery === 0 ? "FREE" : ksh(totals.delivery)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-base font-bold">
              <span>Total</span>
              <span className="font-display text-xl font-extrabold">{ksh(totals.total)}</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary font-bold text-primary-foreground shadow-pop transition-colors hover:bg-primary-deep disabled:opacity-60"
          >
            <Lock className="h-4 w-4" />
            {payment === "cod" ? "Place order" : `Pay ${ksh(totals.total)}`}
          </button>
          <p className="text-center text-xs text-muted-foreground">Easy 7-day returns on every order</p>
        </aside>
      </form>
    </div>
  );
}
