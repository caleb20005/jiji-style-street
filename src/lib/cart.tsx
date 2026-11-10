import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { addLine, cartTotals, lineKey, type CartLine } from "./cart-logic";

export const DELIVERY_LOCATIONS = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Nyeri"];

type CartContextValue = {
  lines: CartLine[];
  totals: ReturnType<typeof cartTotals>;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  add: (line: CartLine) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  location: string;
  setLocation: (loc: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "mavazi-cart-v1";
const LOCATION_KEY = "mavazi-location";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [location, setLocationState] = useState(DELIVERY_LOCATIONS[0]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
      const loc = localStorage.getItem(LOCATION_KEY);
      if (loc) setLocationState(loc);
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, loaded]);

  const setLocation = useCallback((loc: string) => {
    setLocationState(loc);
    localStorage.setItem(LOCATION_KEY, loc);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      totals: cartTotals(lines),
      isOpen,
      setOpen,
      add: (line) => setLines((prev) => addLine(prev, line)),
      setQty: (key, qty) =>
        setLines((prev) =>
          qty <= 0 ? prev.filter((l) => lineKey(l) !== key) : prev.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(10, qty) } : l)),
        ),
      remove: (key) => setLines((prev) => prev.filter((l) => lineKey(l) !== key)),
      clear: () => setLines([]),
      location,
      setLocation,
    }),
    [lines, isOpen, location, setLocation],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
