"use client";

import { useRef } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function Nav() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const nav = ref.current;
      if (!nav) return;

      ScrollTrigger.create({
        start: 24,
        end: "max",
        onToggle: (self) => nav.classList.toggle("shrunk", self.isActive),
      });

      const sections = ["about", "projects", "skills", "experience", "contact"].map((id) =>
        document.getElementById(id)
      );
      const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>(".nav-links a"));

      const setActive = (id: string | null) => {
        links.forEach((link) => {
          const active = id !== null && link.getAttribute("href") === `#${id}`;
          link.classList.toggle("active", active);
        });
      };

      sections.forEach((section) => {
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => setActive(self.isActive ? section.id : null),
        });
      });
    },
    { scope: ref }
  );

  return (
    <nav className="nav" id="nav" ref={ref}>
      <div className="container nav-inner">
        <a href="#hero" className="nav-name">
          Mahdi<span style={{ color: "var(--accent)" }}>.</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Work</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="#contact" className="hero-cta-primary" style={{ padding: "10px 24px", fontSize: "12px" }}>
          Let&apos;s Talk
        </a>
        <button className="nav-mobile-btn" aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
