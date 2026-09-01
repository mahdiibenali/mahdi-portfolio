"use client";

import { useEffect } from "react";
import { initScrollRefresh, ensureRevealVisible } from "@/lib/gsap";

export default function ClientInit() {
  useEffect(() => {
    const cleanup = initScrollRefresh();
    const cancelSafety = ensureRevealVisible();
    return () => {
      cleanup?.();
      cancelSafety();
    };
  }, []);

  return null;
}
