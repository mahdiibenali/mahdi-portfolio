"use client";

import { useRef } from "react";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import { splitIntoLines } from "@/lib/text-split";
import NumberTicker from "./NumberTicker";
import Image from "next/image";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const headingEl = ref.current?.querySelector<HTMLElement>(".hero-heading") ?? null;
      const descEl = ref.current?.querySelector<HTMLElement>(".hero-desc") ?? null;
      const headingLines = splitIntoLines(headingEl);
      const descLines = splitIntoLines(descEl);

      const tl = gsap.timeline({ defaults: { ease: EASE.out } });
      tl.from(".hero-label", { y: 16, autoAlpha: 0, duration: DURATION.base })
        .from(headingLines, { y: "110%", autoAlpha: 0, stagger: STAGGER.base, duration: DURATION.hero }, "-=0.4")
        .from(descLines, { y: "100%", autoAlpha: 0, stagger: STAGGER.tight, duration: DURATION.base }, "-=0.6")
        .from(".hero-ctas", { y: 16, autoAlpha: 0, duration: DURATION.quick }, "-=0.3")
        .from(".hero-stat", { y: 20, autoAlpha: 0, stagger: STAGGER.base, duration: DURATION.base }, "-=0.2")
        .from(".hero-photo-frame", { clipPath: "inset(100% 0 0 0)", scale: 1.05, duration: DURATION.slow, ease: EASE.out }, "-=1.0");

      const cta = ref.current?.querySelector<HTMLElement>(".hero-cta-primary");
      const onCtaMove = (e: MouseEvent) => {
        if (!cta) return;
        const rect = cta.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        gsap.to(cta, { x, y, duration: 0.3, ease: "power2.out" });
      };
      const onCtaLeave = () => {
        if (!cta) return;
        gsap.to(cta, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      };
      if (cta) {
        cta.addEventListener("mousemove", onCtaMove);
        cta.addEventListener("mouseleave", onCtaLeave);
      }

      return () => {
        if (cta) {
          cta.removeEventListener("mousemove", onCtaMove);
          cta.removeEventListener("mouseleave", onCtaLeave);
        }
      };
    },
    { scope: ref }
  );

  return (
    <section className="hero gsap-init" id="hero" ref={ref}>
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-content">
          <span className="hero-label">Full-Stack Developer</span>
          <h1 className="hero-heading">
            I build things<br />
            that <em>work.</em>
          </h1>
          <p className="hero-desc">
            Crafting high-performance digital experiences from Tunisia.
            Clean code, sharp design, and systems that scale.
          </p>
          <div className="hero-ctas">
            <a href="#projects" className="hero-cta-primary">
              View My Work →
            </a>
            <a href="#contact" className="hero-cta-secondary">
              Get In Touch
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">
                <NumberTicker text="3+" />
              </span>
              <span className="hero-stat-label">Years Experience</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">
                <NumberTicker text="12" />
              </span>
              <span className="hero-stat-label">Published Projects</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">
                <NumberTicker text="10+" />
              </span>
              <span className="hero-stat-label">Happy Clients</span>
            </div>
          </div>
        </div>
        <div className="hero-photo">
          <div className="hero-photo-frame">
            <Image
              src="/photos/pdp-picsart.jpeg"
              alt="Mahdi Ben Ali"
              fill
              priority
              sizes="(max-width: 900px) 280px, 420px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <span className="hero-photo-label">Tunisia 🇹🇳</span>
        </div>
      </div>
    </section>
  );
}
