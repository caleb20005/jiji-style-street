export const FREE_DELIVERY_THRESHOLD = 2500;
export const DELIVERY_FEE = 250;

export type CartLine = {
  productId: string;
  size: string;
  color: string;
  qty: number;
  price: number;
  originalPrice: number;
};

export function lineKey(l: Pick<CartLine, "productId" | "size" | "color">) {
  return `${l.productId}__${l.size}__${l.color}`;
}

export function cartTotals(lines: CartLine[]) {
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const savings = lines.reduce((s, l) => s + (l.originalPrice - l.price) * l.qty, 0);
  const itemCount = lines.reduce((s, l) => s + l.qty, 0);
  const freeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const delivery = subtotal === 0 || freeDelivery ? 0 : DELIVERY_FEE;
  const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
  return { subtotal, savings, itemCount, delivery, total: subtotal + delivery, remainingForFree, progress, freeDelivery };
}

export function addLine(lines: CartLine[], line: CartLine): CartLine[] {
  const key = lineKey(line);
  const existing = lines.find((l) => lineKey(l) === key);
  if (existing) {
    return lines.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(10, l.qty + line.qty) } : l));
  }
  return [...lines, line];
}
