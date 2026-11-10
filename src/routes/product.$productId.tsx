import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Eye, Flame, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS, discountPercent, getProduct } from "@/lib/products";
import { compactCount, ksh } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { Stars } from "@/components/store/Stars";
import { TrustBadges } from "@/components/store/TrustBadges";
import { ProductCard } from "@/components/store/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product unavailable — Mavazi" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    const title = `${p.name} — ${ksh(p.price)} | Mavazi`;
    const description = `${p.description} Now ${discountPercent(p)}% off. Cash on Delivery available.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="font-display text-2xl font-extrabold">This item is no longer available</h1>
      <Link to="/" className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground">
        Keep shopping
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { add, setOpen, location } = useCart();
  const navigate = useNavigate();
  const [color, setColor] = useState(p.colors[0]?.name ?? "Default");
  const [size, setSize] = useState<string | null>(p.sizes.length === 1 ? (p.sizes[0] ?? null) : null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const off = discountPercent(p);
  const related = PRODUCTS.filter((x) => x.id !== p.id && x.category === p.category)
    .concat(PRODUCTS.filter((x) => x.id !== p.id && x.category !== p.category))
    .slice(0, 5);
  const viewing = 8 + (p.sold % 23);

  function addToCart(goToCheckout: boolean) {
    if (!size) {
      setSizeError(true);
      toast.error("Please pick a size first");
      return;
    }
    add({ productId: p.id, size, color, qty, price: p.price, originalPrice: p.originalPrice });
    if (goToCheckout) {
      navigate({ to: "/checkout" });
    } else {
      toast.success("Added to cart", { description: `${p.name} · ${color} · ${size}` });
      setOpen(true);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-5">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/" search={{ cat: p.category }} hash="shop" className="capitalize hover:text-primary">
          {p.category}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="line-clamp-1 text-foreground">{p.name}</span>
      </nav>

      <div className="grid gap-6 rounded-2xl border bg-card p-4 sm:p-6 lg:grid-cols-2 lg:gap-10">
        <div className="relative overflow-hidden rounded-xl bg-muted">
          <img src={p.image} alt={p.name} width={768} height={960} className="aspect-[4/5] w-full object-cover" />
          <span className="absolute left-3 top-3 rounded-lg bg-flash px-2 py-1 font-display text-lg font-extrabold text-flash-foreground">
            -{off}%
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">{p.brand}</p>
            <h1 className="mt-1 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{p.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="flex items-center gap-1">
                <Stars rating={p.rating} /> <strong>{p.rating}</strong>
              </span>
              <a href="#reviews" className="text-muted-foreground underline-offset-2 hover:underline">
                {compactCount(p.reviewCount)} reviews
              </a>
              <span className="font-semibold text-muted-foreground">{compactCount(p.sold)} sold</span>
            </div>
          </div>

          <div className="rounded-xl bg-secondary p-4">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold text-primary-deep">{ksh(p.price)}</span>
              <span className="text-lg text-muted-foreground line-through">{ksh(p.originalPrice)}</span>
              <span className="rounded-md bg-flash px-2 py-0.5 text-sm font-bold text-flash-foreground">
                Save {ksh(p.originalPrice - p.price)}
              </span>
            </div>
            {p.flashClaimed !== undefined && (
              <div className="mt-3">
                <div className="h-2 overflow-hidden rounded-full bg-card">
                  <div className="h-full rounded-full bg-gradient-flash" style={{ width: `${p.flashClaimed}%` }} />
                </div>
                <p className="mt-1 text-xs font-semibold text-secondary-foreground">⚡ Flash deal · {p.flashClaimed}% claimed</p>
              </div>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm font-bold">
              Colour: <span className="font-medium text-muted-foreground">{color}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {p.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  className={cn(
                    "flex items-center gap-2 rounded-full border-2 py-1 pl-1 pr-3 text-sm font-semibold transition-colors",
                    color === c.name ? "border-primary bg-accent" : "border-border hover:border-primary/50",
                  )}
                >
                  <span className="h-6 w-6 rounded-full border" style={{ backgroundColor: c.swatch }} />
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className={cn("text-sm font-bold", sizeError && "text-destructive")}>
                Size{size ? `: ${size}` : sizeError ? " — please select" : ""}
              </p>
              <span className="text-xs font-semibold text-primary">Size guide</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {p.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  aria-pressed={size === s}
                  className={cn(
                    "h-11 min-w-12 rounded-lg border-2 px-3 text-sm font-bold transition-colors",
                    size === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : sizeError
                        ? "border-destructive/60 hover:border-primary"
                        : "border-border hover:border-primary/50",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 rounded-xl border border-flash/30 bg-flash/5 p-3 text-sm">
            <p className="flex items-center gap-2 font-bold text-flash">
              <Flame className="h-4 w-4" />
              {p.stock <= 10 ? `Hurry! Only ${p.stock} left in stock` : `Selling fast · ${p.stock} left`}
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Eye className="h-4 w-4" /> {viewing} people are viewing this right now
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Truck className="h-4 w-4" /> Delivery to <strong className="text-foreground">{location}</strong> in 1–3 days
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-12 items-center rounded-full border-2">
              <button aria-label="Decrease quantity" onClick={() => setQty((n) => Math.max(1, n - 1))} className="flex h-full w-11 items-center justify-center hover:text-primary">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-bold tabular-nums">{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty((n) => Math.min(p.stock, 10, n + 1))} className="flex h-full w-11 items-center justify-center hover:text-primary">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => addToCart(false)}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border-2 border-primary px-5 font-bold text-primary transition-colors hover:bg-accent"
            >
              <ShoppingBag className="h-5 w-5" /> Add to cart
            </button>
            <button
              onClick={() => addToCart(true)}
              className="flex h-12 flex-1 items-center justify-center rounded-full bg-primary px-5 font-bold text-primary-foreground shadow-pop transition-colors hover:bg-primary-deep"
            >
              Buy now
            </button>
          </div>

          <TrustBadges compact />
          <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
        </div>
      </div>

      <section id="reviews" className="mt-8 scroll-mt-40 rounded-2xl border bg-card p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-extrabold sm:text-2xl">Customer reviews</h2>
          <div className="flex items-center gap-2">
            <span className="font-display text-3xl font-extrabold">{p.rating}</span>
            <div>
              <Stars rating={p.rating} />
              <p className="text-xs text-muted-foreground">{p.reviewCount.toLocaleString()} verified ratings</p>
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {p.reviews.map((r) => (
            <article key={r.name} className="rounded-xl bg-muted p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">{r.name}</p>
                <Stars rating={r.rating} />
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{r.detail} · Verified purchase</p>
              <p className="mt-2 text-sm leading-relaxed">“{r.text}”</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 font-display text-xl font-extrabold sm:text-2xl">You may also like</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {related.map((r) => (
            <ProductCard key={r.id} product={r} />
          ))}
        </div>
      </section>
    </div>
  );
}
