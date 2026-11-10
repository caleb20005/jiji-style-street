import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { discountPercent, type Product } from "@/lib/products";
import { compactCount, ksh } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { Stars } from "./Stars";

export function ProductCard({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  const off = discountPercent(product);

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    add({
      productId: product.id,
      size: product.sizes[Math.floor(product.sizes.length / 2)] ?? "One Size",
      color: product.colors[0]?.name ?? "Default",
      qty: 1,
      price: product.price,
      originalPrice: product.originalPrice,
    });
    toast.success("Added to cart", {
      description: product.name,
      action: { label: "View cart", onClick: () => setOpen(true) },
    });
  }

  return (
    <Link
      to="/product/$productId"
      params={{ productId: product.id }}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-pop"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          width={768}
          height={960}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-md bg-flash px-1.5 py-0.5 text-xs font-extrabold text-flash-foreground">
          -{off}%
        </span>
        {product.stock <= 6 && (
          <span className="absolute bottom-2 left-2 rounded-md bg-ink/85 px-1.5 py-0.5 text-[10px] font-bold text-ink-foreground">
            Only {product.stock} left
          </span>
        )}
        <button
          onClick={quickAdd}
          aria-label={`Quick add ${product.name} to cart`}
          className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-pop transition-transform hover:scale-110"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{product.brand}</p>
        <h3 className="line-clamp-2 font-sans text-sm font-medium leading-snug tracking-normal text-foreground">
          {product.name}
        </h3>
        <div className="mt-auto pt-1">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-extrabold text-primary-deep">{ksh(product.price)}</span>
            <span className="text-xs text-muted-foreground line-through">{ksh(product.originalPrice)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Stars rating={product.rating} />
              <span>({compactCount(product.reviewCount)})</span>
            </span>
            <span className="font-semibold">{compactCount(product.sold)} sold</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
