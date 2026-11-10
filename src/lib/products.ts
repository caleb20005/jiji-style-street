import floralDress from "@/assets/p-floral-dress.jpg";
import sneakers from "@/assets/p-sneakers.jpg";
import hoodie from "@/assets/p-hoodie.jpg";
import jeans from "@/assets/p-jeans.jpg";
import tote from "@/assets/p-tote.jpg";
import satinDress from "@/assets/p-satin-dress.jpg";
import canvas from "@/assets/p-canvas.jpg";
import denimJacket from "@/assets/p-denim-jacket.jpg";
import tee from "@/assets/p-tee.jpg";
import slides from "@/assets/p-slides.jpg";
import sunglasses from "@/assets/p-sunglasses.jpg";

export type CategoryId = "dresses" | "streetwear" | "sneakers" | "denim" | "accessories";

export type Review = { name: string; rating: number; text: string; detail: string };

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  sold: number;
  image: string;
  colors: { name: string; swatch: string }[];
  sizes: string[];
  stock: number;
  /** Percentage of flash-sale stock already claimed; present only for flash-sale items. */
  flashClaimed?: number;
  description: string;
  reviews: Review[];
};

export const CATEGORIES: { id: CategoryId | "under999"; label: string; image: string }[] = [
  { id: "dresses", label: "Dresses", image: floralDress },
  { id: "streetwear", label: "Streetwear", image: hoodie },
  { id: "sneakers", label: "Sneakers", image: sneakers },
  { id: "denim", label: "Denim", image: jeans },
  { id: "accessories", label: "Bags & Shades", image: tote },
  { id: "under999", label: "Under KSh 999", image: tee },
];

const commonReviews: Review[] = [
  {
    name: "Wanjiru K.",
    rating: 5,
    text: "Fits exactly like the size chart. Delivered to Westlands in 2 days, paid cash on delivery.",
    detail: "Size M · Nairobi",
  },
  {
    name: "Brian O.",
    rating: 4,
    text: "Great quality for the price. Colour is slightly brighter than the photo but I love it.",
    detail: "Size L · Kisumu",
  },
  {
    name: "Aisha M.",
    rating: 5,
    text: "Second time ordering. M-Pesa checkout was super quick and the packaging was neat.",
    detail: "Size S · Mombasa",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "coral-bloom-wrap-dress",
    name: "Coral Bloom Flutter-Sleeve Wrap Midi Dress",
    brand: "Zuri Studio",
    category: "dresses",
    price: 1499,
    originalPrice: 2999,
    rating: 4.7,
    reviewCount: 842,
    sold: 3200,
    image: floralDress,
    colors: [
      { name: "Coral", swatch: "#e8735d" },
      { name: "Navy", swatch: "#1f2f4f" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 9,
    flashClaimed: 82,
    description:
      "Lightweight floral wrap dress with flutter sleeves and a self-tie waist. Breathable viscose that works for brunch, church and the office.",
    reviews: commonReviews,
  },
  {
    id: "volt-runner-sneakers",
    name: "Volt Runner Chunky Retro Sneakers",
    brand: "Kasi Kicks",
    category: "sneakers",
    price: 2299,
    originalPrice: 4599,
    rating: 4.6,
    reviewCount: 1310,
    sold: 5400,
    image: sneakers,
    colors: [
      { name: "White/Orange", swatch: "#f26b1d" },
      { name: "Triple White", swatch: "#f2f0ea" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    stock: 14,
    flashClaimed: 75,
    description:
      "Mesh-and-leather runners with a cushioned chunky sole. Built for all-day walking around town.",
    reviews: commonReviews,
  },
  {
    id: "peak-moon-graphic-hoodie",
    name: "Peak Moon Oversized Graphic Hoodie",
    brand: "Mtaa Supply",
    category: "streetwear",
    price: 1799,
    originalPrice: 2999,
    rating: 4.8,
    reviewCount: 560,
    sold: 1200,
    image: hoodie,
    colors: [
      { name: "Black", swatch: "#141414" },
      { name: "Stone", swatch: "#cfc6b8" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 6,
    flashClaimed: 64,
    description: "Heavyweight 320gsm fleece hoodie with a dropped shoulder and distressed print.",
    reviews: commonReviews,
  },
  {
    id: "classic-mom-jeans",
    name: "High-Rise Light Wash Mom Jeans",
    brand: "Denim Republic",
    category: "denim",
    price: 1299,
    originalPrice: 2499,
    rating: 4.5,
    reviewCount: 2104,
    sold: 8700,
    image: jeans,
    colors: [
      { name: "Light Wash", swatch: "#a9c3dd" },
      { name: "Mid Blue", swatch: "#4b6f9c" },
      { name: "Black", swatch: "#222222" },
    ],
    sizes: ["26", "28", "30", "32", "34", "36"],
    stock: 21,
    flashClaimed: 91,
    description: "Rigid cotton denim with a tapered leg and high waist. A wardrobe staple.",
    reviews: commonReviews,
  },
  {
    id: "mustard-city-tote",
    name: "City Structured Faux-Leather Tote Bag",
    brand: "Lulu & Co",
    category: "accessories",
    price: 1899,
    originalPrice: 3499,
    rating: 4.6,
    reviewCount: 390,
    sold: 980,
    image: tote,
    colors: [
      { name: "Mustard", swatch: "#c9a227" },
      { name: "Tan", swatch: "#a8754a" },
      { name: "Black", swatch: "#1b1b1b" },
    ],
    sizes: ["One Size"],
    stock: 4,
    flashClaimed: 58,
    description: "Roomy tote with laptop sleeve, inner zip pocket and sturdy rolled handles.",
    reviews: commonReviews,
  },
  {
    id: "emerald-satin-slip-dress",
    name: "Emerald Cowl-Neck Satin Slip Maxi Dress",
    brand: "Zuri Studio",
    category: "dresses",
    price: 2199,
    originalPrice: 3999,
    rating: 4.8,
    reviewCount: 276,
    sold: 1600,
    image: satinDress,
    colors: [
      { name: "Emerald", swatch: "#1f9d55" },
      { name: "Champagne", swatch: "#e5cfa8" },
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 11,
    description: "Bias-cut satin maxi with adjustable straps. Made for weddings and dinner dates.",
    reviews: commonReviews,
  },
  {
    id: "everyday-canvas-lowtops",
    name: "Everyday Canvas Low-Top Sneakers",
    brand: "Kasi Kicks",
    category: "sneakers",
    price: 999,
    originalPrice: 1799,
    rating: 4.4,
    reviewCount: 3021,
    sold: 12400,
    image: canvas,
    colors: [
      { name: "White", swatch: "#f5f5f2" },
      { name: "Black", swatch: "#1a1a1a" },
    ],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
    stock: 35,
    description: "Classic vulcanised canvas sneakers. Goes with literally everything.",
    reviews: commonReviews,
  },
  {
    id: "vintage-trucker-jacket",
    name: "Vintage Wash Denim Trucker Jacket",
    brand: "Denim Republic",
    category: "denim",
    price: 2499,
    originalPrice: 3999,
    rating: 4.7,
    reviewCount: 488,
    sold: 2100,
    image: denimJacket,
    colors: [{ name: "Vintage Blue", swatch: "#5a7394" }],
    sizes: ["S", "M", "L", "XL"],
    stock: 8,
    description: "Washed denim jacket with brass buttons and chest flap pockets.",
    reviews: commonReviews,
  },
  {
    id: "sunset-tie-dye-tee",
    name: "Sunset Tie-Dye Oversized Tee",
    brand: "Mtaa Supply",
    category: "streetwear",
    price: 649,
    originalPrice: 1299,
    rating: 4.5,
    reviewCount: 1760,
    sold: 6300,
    image: tee,
    colors: [
      { name: "Sunset", swatch: "#f38b4a" },
      { name: "Ocean", swatch: "#4aa3c9" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 27,
    flashClaimed: 47,
    description: "Hand-dyed 100% cotton tee with a boxy, oversized fit.",
    reviews: commonReviews,
  },
  {
    id: "cloud-platform-slides",
    name: "Cloud Platform Chunky Slides",
    brand: "Kasi Kicks",
    category: "sneakers",
    price: 899,
    originalPrice: 1599,
    rating: 4.3,
    reviewCount: 920,
    sold: 4100,
    image: slides,
    colors: [
      { name: "Black", swatch: "#151515" },
      { name: "Cream", swatch: "#ece3d2" },
    ],
    sizes: ["37", "38", "39", "40", "41", "42"],
    stock: 5,
    description: "Soft-touch platform slides with a lug sole. Pool, mall, everywhere.",
    reviews: commonReviews,
  },
  {
    id: "retro-square-sunglasses",
    name: "Retro Square Tortoiseshell Sunglasses",
    brand: "Lulu & Co",
    category: "accessories",
    price: 549,
    originalPrice: 1199,
    rating: 4.4,
    reviewCount: 640,
    sold: 2900,
    image: sunglasses,
    colors: [
      { name: "Tortoise", swatch: "#7a4a22" },
      { name: "Black", swatch: "#111111" },
    ],
    sizes: ["One Size"],
    stock: 18,
    description: "UV400 lenses in a bold square acetate frame. Comes with a pouch.",
    reviews: commonReviews,
  },
  {
    id: "street-baggy-jeans",
    name: "Street Baggy Wide-Leg Jeans",
    brand: "Mtaa Supply",
    category: "streetwear",
    price: 1599,
    originalPrice: 2799,
    rating: 4.6,
    reviewCount: 712,
    sold: 1900,
    image: jeans,
    colors: [{ name: "Mid Blue", swatch: "#4b6f9c" }],
    sizes: ["28", "30", "32", "34", "36"],
    stock: 12,
    description: "Relaxed wide-leg jeans with a low-slung fit for that 2000s look.",
    reviews: commonReviews,
  },
];

export const FLASH_PRODUCTS = PRODUCTS.filter((p) => p.flashClaimed !== undefined);

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function discountPercent(p: Pick<Product, "price" | "originalPrice">) {
  return Math.round((1 - p.price / p.originalPrice) * 100);
}

export function filterProducts(products: Product[], opts: { q?: string | undefined; cat?: string | undefined }) {
  const q = opts.q?.trim().toLowerCase();
  return products.filter((p) => {
    if (opts.cat === "under999" && p.price > 999) return false;
    if (opts.cat && opts.cat !== "under999" && p.category !== opts.cat) return false;
    if (q && !`${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q)) return false;
    return true;
  });
}
