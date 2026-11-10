import type { CartLine } from "./cart-logic";

export type PaymentMethod = "mpesa" | "card" | "cod";
export type DeliveryMethod = "home" | "pickup";

export type Order = {
  id: string;
  createdAt: string;
  lines: CartLine[];
  subtotal: number;
  savings: number;
  delivery: number;
  total: number;
  customer: { name: string; phone: string; email?: string | undefined };
  shipping: { method: DeliveryMethod; town: string; address: string; notes?: string | undefined };
  payment: PaymentMethod;
};

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  mpesa: "M-Pesa",
  card: "Debit / Credit card",
  cod: "Cash on Delivery",
};

/** Shipment stages and how many hours after the order each one is reached. */
export const TRACKING_STAGES = [
  { key: "placed", label: "Order placed", detail: "We've received your order.", afterHours: 0 },
  { key: "confirmed", label: "Confirmed", detail: "Payment / order confirmed by our team.", afterHours: 0.25 },
  { key: "dispatched", label: "Packed & dispatched", detail: "Your parcel has left our Nairobi warehouse.", afterHours: 6 },
  { key: "transit", label: "In transit", detail: "Arrived at the regional delivery hub.", afterHours: 24 },
  { key: "out", label: "Out for delivery", detail: "Our rider is on the way to you.", afterHours: 40 },
  { key: "delivered", label: "Delivered", detail: "Enjoy your new look!", afterHours: 48 },
] as const;

/** Index of the latest stage reached for an order placed at `createdAt`, as of `now`. */
export function trackingStageIndex(createdAt: Date, now: Date) {
  const hours = (now.getTime() - createdAt.getTime()) / 3_600_000;
  let idx = 0;
  TRACKING_STAGES.forEach((s, i) => {
    if (hours >= s.afterHours) idx = i;
  });
  return idx;
}

export function stageTime(createdAt: Date, stageIdx: number) {
  return new Date(createdAt.getTime() + (TRACKING_STAGES[stageIdx]?.afterHours ?? 0) * 3_600_000);
}

export function generateOrderId() {
  return `MV${Math.floor(10_000_000 + Math.random() * 89_999_999)}`;
}

const KEY = "mavazi-orders-v1";

export function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  const all = loadOrders();
  localStorage.setItem(KEY, JSON.stringify([order, ...all]));
}

/** Kenyan mobile number: 07XXXXXXXX, 01XXXXXXXX, or +254 / 254 followed by 9 digits. */
export function isValidKenyanPhone(phone: string) {
  return /^(?:\+?254|0)(?:7|1)\d{8}$/.test(phone.replace(/[\s-]/g, ""));
}
