"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export let reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typeof window !== "undefined") {
  window
    .matchMedia("(prefers-reduced-motion: reduce)")
    .addEventListener("change", (e) => {
      reducedMotion = e.matches;
    });
}

if (typeof document !== "undefined" && !reducedMotion) {
  document.documentElement.classList.remove("no-gsap");
}

export function initScrollRefresh() {
  if (typeof window === "undefined") return;

  const onLoad = () => ScrollTrigger.refresh();
  const onFonts = () => document.fonts.ready.then(() => ScrollTrigger.refresh());

  window.addEventListener("load", onLoad);
  void onFonts();

  let imgs: HTMLImageElement[] = [];
  const collect = () => {
    imgs.forEach((img) => img.removeEventListener("load", onLoad));
    imgs = Array.from(document.images);
    imgs.forEach((img) => img.addEventListener("load", onLoad));
  };

  collect();
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  const observer = new MutationObserver(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      collect();
      void onFonts();
    }, 200);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  return () => {
    window.removeEventListener("load", onLoad);
    observer.disconnect();
  };
}

export function ensureRevealVisible() {
  const timer = window.setTimeout(() => {
    const forceVisible = (el: HTMLElement) => {
      gsap.set(el, { autoAlpha: 1, y: 0, clearProps: "all" });
    };

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      if (getComputedStyle(el).opacity === "0") forceVisible(el);
    });

    gsap.utils.toArray<HTMLElement>(".gsap-init").forEach((section) => {
      section.querySelectorAll<HTMLElement>("*").forEach((child) => {
        if (child.style.opacity === "0" || child.style.visibility === "hidden") {
          forceVisible(child);
        }
      });
    });
  }, 3000);
  return () => window.clearTimeout(timer);
}

export { gsap, ScrollTrigger, useGSAP };
