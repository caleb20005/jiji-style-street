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
import floralDressNavy from "@/assets/p-floral-dress-navy.jpg";
import sneakersWhite from "@/assets/p-sneakers-white.jpg";
import hoodieStone from "@/assets/p-hoodie-stone.jpg";
import jeansMidBlue from "@/assets/p-jeans-midblue.jpg";
import jeansBlack from "@/assets/p-jeans-black.jpg";
import toteTan from "@/assets/p-tote-tan.jpg";
import toteBlack from "@/assets/p-tote-black.jpg";
import satinDressChampagne from "@/assets/p-satin-dress-champagne.jpg";
import canvasBlack from "@/assets/p-canvas-black.jpg";
import teeOcean from "@/assets/p-tee-ocean.jpg";
import slidesCream from "@/assets/p-slides-cream.jpg";
import sunglassesBlack from "@/assets/p-sunglasses-black.jpg";
import oxfordShirt from "@/assets/p-oxford-shirt.jpg";
import oxfordShirtWhite from "@/assets/p-oxford-shirt-white.jpg";
import chinos from "@/assets/p-chinos.jpg";
import chinosNavy from "@/assets/p-chinos-navy.jpg";
import kidsDinoSet from "@/assets/p-kids-dino-set.jpg";
import kidsDinoSetBlue from "@/assets/p-kids-dino-set-blue.jpg";
import kidsTulleDress from "@/assets/p-kids-tulle-dress.jpg";
import kidsTulleDressLilac from "@/assets/p-kids-tulle-dress-lilac.jpg";

export type CategoryId = "dresses" | "streetwear" | "sneakers" | "denim" | "accessories" | "menswear" | "kids";

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
  /** Each colour may carry its own photo; the product page swaps to it when that colour is picked. */
  colors: { name: string; swatch: string; image?: string }[];
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
  { id: "menswear", label: "Menswear", image: oxfordShirt },
  { id: "kids", label: "Kids", image: kidsDinoSet },
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
      { name: "Coral", swatch: "#e8735d", image: floralDress },
      { name: "Navy", swatch: "#1f2f4f", image: floralDressNavy },
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
      { name: "White/Orange", swatch: "#f26b1d", image: sneakers },
      { name: "Triple White", swatch: "#f2f0ea", image: sneakersWhite },
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
      { name: "Black", swatch: "#141414", image: hoodie },
      { name: "Stone", swatch: "#cfc6b8", image: hoodieStone },
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
      { name: "Light Wash", swatch: "#a9c3dd", image: jeans },
      { name: "Mid Blue", swatch: "#4b6f9c", image: jeansMidBlue },
      { name: "Black", swatch: "#222222", image: jeansBlack },
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
      { name: "Mustard", swatch: "#c9a227", image: tote },
      { name: "Tan", swatch: "#a8754a", image: toteTan },
      { name: "Black", swatch: "#1b1b1b", image: toteBlack },
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
      { name: "Emerald", swatch: "#1f9d55", image: satinDress },
      { name: "Champagne", swatch: "#e5cfa8", image: satinDressChampagne },
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
      { name: "White", swatch: "#f5f5f2", image: canvas },
      { name: "Black", swatch: "#1a1a1a", image: canvasBlack },
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
      { name: "Sunset", swatch: "#f38b4a", image: tee },
      { name: "Ocean", swatch: "#4aa3c9", image: teeOcean },
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
      { name: "Black", swatch: "#151515", image: slides },
      { name: "Cream", swatch: "#ece3d2", image: slidesCream },
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
      { name: "Tortoise", swatch: "#7a4a22", image: sunglasses },
      { name: "Black", swatch: "#111111", image: sunglassesBlack },
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
    image: jeansMidBlue,
    colors: [{ name: "Mid Blue", swatch: "#4b6f9c", image: jeansMidBlue }],
    sizes: ["28", "30", "32", "34", "36"],
    stock: 12,
    description: "Relaxed wide-leg jeans with a low-slung fit for that 2000s look.",
    reviews: commonReviews,
  },
  {
    id: "slim-oxford-shirt",
    name: "Slim Fit Button-Down Oxford Shirt",
    brand: "Ben Fashion Men",
    category: "menswear",
    price: 1299,
    originalPrice: 2299,
    rating: 4.6,
    reviewCount: 534,
    sold: 2400,
    image: oxfordShirt,
    colors: [
      { name: "Sky Blue", swatch: "#8fb3e0", image: oxfordShirt },
      { name: "White", swatch: "#f7f7f5", image: oxfordShirtWhite },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 16,
    description: "Breathable cotton Oxford with a button-down collar. Office on Monday, out on Friday.",
    reviews: commonReviews,
  },
  {
    id: "tailored-chino-trousers",
    name: "Tailored Stretch Chino Trousers",
    brand: "Ben Fashion Men",
    category: "menswear",
    price: 1499,
    originalPrice: 2699,
    rating: 4.5,
    reviewCount: 418,
    sold: 1800,
    image: chinos,
    colors: [
      { name: "Khaki", swatch: "#b9a77f", image: chinos },
      { name: "Navy", swatch: "#24324d", image: chinosNavy },
    ],
    sizes: ["30", "32", "34", "36", "38"],
    stock: 10,
    flashClaimed: 69,
    description: "Slim tapered chinos in soft stretch cotton twill. Smart enough for work, easy enough for weekends.",
    reviews: commonReviews,
  },
  {
    id: "kids-dino-tee-shorts-set",
    name: "Kids Dino Tee & Shorts Set",
    brand: "Ben Fashion Kids",
    category: "kids",
    price: 799,
    originalPrice: 1499,
    rating: 4.8,
    reviewCount: 362,
    sold: 2700,
    image: kidsDinoSet,
    colors: [
      { name: "Sunny Yellow", swatch: "#f2c919", image: kidsDinoSet },
      { name: "Sky Blue", swatch: "#3aa0e6", image: kidsDinoSetBlue },
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    stock: 19,
    description: "Soft cotton tee and pull-on shorts with a friendly dino print. Easy for play and school holidays.",
    reviews: commonReviews,
  },
  {
    id: "girls-tulle-party-dress",
    name: "Girls Satin & Tulle Party Dress",
    brand: "Ben Fashion Kids",
    category: "kids",
    price: 1199,
    originalPrice: 2199,
    rating: 4.7,
    reviewCount: 241,
    sold: 1100,
    image: kidsTulleDress,
    colors: [
      { name: "Blush Pink", swatch: "#f0b7c4", image: kidsTulleDress },
      { name: "Lilac", swatch: "#c9a7ec", image: kidsTulleDressLilac },
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    stock: 7,
    description: "Satin bodice, layered tulle skirt and a bow at the waist. Made for birthdays, weddings and Sunday best.",
    reviews: commonReviews,
  },
];

export const FLASH_PRODUCTS = PRODUCTS.filter((p) => p.flashClaimed !== undefined);

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

/** Photo for the chosen colour, falling back to the product's main photo. */
export function colorImage(p: Pick<Product, "image" | "colors">, color?: string) {
  return p.colors.find((c) => c.name === color)?.image ?? p.image;
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
