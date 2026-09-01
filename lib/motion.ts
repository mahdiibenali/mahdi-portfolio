export const EASE = {
  out: "power3.out",
  inOut: "power3.inOut",
  sharp: "power4.out",
  elastic: "elastic.out(1, 0.5)",
} as const;

export const DURATION = {
  quick: 0.4,
  base: 0.7,
  slow: 1.0,
  hero: 1.2,
} as const;

export const STAGGER = {
  tight: 0.06,
  base: 0.1,
  wide: 0.18,
} as const;

export const SCROLL_START = "top 80%";

export const MAGNETIC = {
  strength: 0.3,
  ease: "power2.out",
} as const;

export const TILT = {
  maxDegrees: 8,
  perspective: 1000,
} as const;
