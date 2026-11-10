import { describe, expect, it } from "vitest";
import { addLine, cartTotals, type CartLine } from "@/lib/cart-logic";
import { isValidKenyanPhone, trackingStageIndex, TRACKING_STAGES } from "@/lib/orders";
import { filterProducts, PRODUCTS } from "@/lib/products";

const line = (price: number, qty = 1, extra: Partial<CartLine> = {}): CartLine => ({
  productId: "p1",
  size: "M",
  color: "Black",
  qty,
  price,
  originalPrice: price * 2,
  ...extra,
});

describe("free delivery", () => {
  it("charges KSh 250 delivery below KSh 2,500", () => {
    const t = cartTotals([line(1499)]);
    expect(t.delivery).toBe(250);
    expect(t.total).toBe(1749);
    expect(t.remainingForFree).toBe(1001);
  });

  it("gives free delivery from KSh 2,500 upwards", () => {
    const t = cartTotals([line(1250, 2)]);
    expect(t.delivery).toBe(0);
    expect(t.total).toBe(2500);
  });

  it("charges no delivery on an empty cart", () => {
    expect(cartTotals([]).delivery).toBe(0);
  });
});

describe("cart lines", () => {
  it("merges the same item, size and colour into one line", () => {
    const lines = addLine([line(999)], line(999, 2));
    expect(lines).toHaveLength(1);
    expect(lines[0]?.qty).toBe(3);
  });

  it("keeps different sizes as separate lines", () => {
    expect(addLine([line(999)], line(999, 1, { size: "L" }))).toHaveLength(2);
  });
});

describe("deals under KSh 999", () => {
  it("only includes items priced at or below KSh 999", () => {
    const deals = filterProducts(PRODUCTS, { cat: "under999" });
    expect(deals.length).toBeGreaterThan(0);
    expect(deals.every((p) => p.price <= 999)).toBe(true);
  });
});

describe("phone validation", () => {
  it("accepts Kenyan mobile formats", () => {
    expect(isValidKenyanPhone("0712 345 678")).toBe(true);
    expect(isValidKenyanPhone("+254712345678")).toBe(true);
    expect(isValidKenyanPhone("0112345678")).toBe(true);
  });
  it("rejects short or foreign numbers", () => {
    expect(isValidKenyanPhone("071234")).toBe(false);
    expect(isValidKenyanPhone("+447912345678")).toBe(false);
  });
});

describe("shipment tracking", () => {
  const placed = new Date("2026-11-10T10:00:00Z");
  const after = (h: number) => new Date(placed.getTime() + h * 3_600_000);
  it("starts at order placed", () => {
    expect(TRACKING_STAGES[trackingStageIndex(placed, placed)]?.key).toBe("placed");
  });
  it("is dispatched after 6 hours", () => {
    expect(TRACKING_STAGES[trackingStageIndex(placed, after(6))]?.key).toBe("dispatched");
  });
  it("is delivered after 48 hours", () => {
    expect(TRACKING_STAGES[trackingStageIndex(placed, after(48))]?.key).toBe("delivered");
  });
});
