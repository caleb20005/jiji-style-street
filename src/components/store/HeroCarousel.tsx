import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import heroDresses from "@/assets/hero-dresses.jpg";
import heroStreet from "@/assets/hero-streetwear.jpg";
import heroClearance from "@/assets/hero-clearance.jpg";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    image: heroDresses,
    eyebrow: "Mega Fashion Week",
    title: "Dresses from KSh 899",
    sub: "Up to 60% off flowy midis, wraps & party looks.",
    cta: "Shop dresses",
    cat: "dresses",
    tone: "bg-ink",
    light: false,
  },
  {
    image: heroStreet,
    eyebrow: "New drop",
    title: "Streetwear & Sneakers",
    sub: "Oversized hoodies, baggy denim and chunky kicks. Buy 2, get 10% off.",
    cta: "Shop the drop",
    cat: "streetwear",
    tone: "bg-primary-deep",
    light: true,
  },
  {
    image: heroClearance,
    eyebrow: "Clearance · Last pieces",
    title: "Everything under KSh 999",
    sub: "Tees, shades and slides. When they're gone, they're gone.",
    cta: "Grab a deal",
    cat: "under999",
    tone: "bg-flash",
    light: false,
  },
] as const;

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    const id = setInterval(() => api.scrollNext(), 5500);
    return () => {
      clearInterval(id);
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="ml-0">
          {SLIDES.map((s, i) => (
            <CarouselItem key={s.title} className="pl-0">
              <div className="relative aspect-[16/10] w-full sm:aspect-[16/7]">
                <img
                  src={s.image}
                  alt=""
                  width={1920}
                  height={848}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover object-right"
                />
                <div className="relative flex h-full max-w-[62%] flex-col justify-center gap-2 p-5 sm:max-w-md sm:gap-3 sm:p-10">
                  <span className={cn("w-fit rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-primary-foreground sm:text-xs", s.tone)}>
                    {s.eyebrow}
                  </span>
                  <h2 className={cn("font-display text-2xl font-extrabold leading-[0.95] sm:text-5xl lg:text-6xl", s.light ? "text-ink-foreground" : "text-ink")}>
                    {s.title}
                  </h2>
                  <p className={cn("hidden text-sm font-medium sm:block sm:text-base", s.light ? "text-ink-foreground/85" : "text-ink/80")}>{s.sub}</p>
                  <Link
                    to="/"
                    search={{ cat: s.cat }}
                    hash="shop"
                    className={cn("mt-1 w-fit rounded-full px-5 py-2.5 text-xs font-bold transition-transform hover:scale-105 sm:text-sm", s.light ? "bg-sun text-sun-foreground" : "bg-ink text-ink-foreground")}
                  >
                    {s.cta} →
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={cn("h-2 rounded-full transition-all", current === i ? "w-7 bg-sun" : "w-2 bg-muted-foreground/60")}
          />
        ))}
      </div>
    </div>
  );
}
