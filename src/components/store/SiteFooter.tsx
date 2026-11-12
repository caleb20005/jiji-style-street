import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-3xl font-extrabold">
            Ben{" "}<span className="text-primary">Fashion</span>
          </p>
          <p className="mt-2 text-sm text-ink-foreground/70">
            Affordable everyday fashion, delivered across Kenya.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-bold">Shop</p>
          <ul className="space-y-1 text-ink-foreground/70">
            <li>Dresses</li>
            <li>Streetwear</li>
            <li>Sneakers</li>
            <li>Denim</li>
            <li>Menswear</li>
            <li>Kids</li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-bold">Help</p>
          <ul className="space-y-1 text-ink-foreground/70">
            <li>Delivery & pickup stations</li>
            <li>Returns & refunds</li>
            <li>Size guide</li>
            <li><Link to="/orders" className="hover:text-primary">Track my order</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-bold">We accept</p>
          <div className="flex flex-wrap gap-2">
            {["M-Pesa", "Visa", "Mastercard", "Cash on Delivery"].map((m) => (
              <span key={m} className="rounded-md border border-ink-foreground/20 px-2 py-1 text-xs font-semibold">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t border-ink-foreground/10 py-4 text-center text-xs text-ink-foreground/50">
        © {new Date().getFullYear()} Ben Fashion. All prices in Kenyan Shillings.
      </p>
    </footer>
  );
}
