"use client";

import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { EASE, DURATION, SCROLL_START, STAGGER } from "@/lib/motion";

const timeline = [
  {
    date: "2025 — Present",
    title: "AI & Trading Systems",
    company: "Independent R&D",
    desc: "Building autonomous multi-agent trading systems (Trading King), algo-trading research desks (QuantDesk), and AI content pipelines. Pushing the boundaries of LLM-powered automation.",
  },
  {
    date: "2024 — 2025",
    title: "Full-Stack & IoT",
    company: "Freelance / Open Source",
    desc: "Shipped Beehive Monitor (IoT + RBAC + mobile), QuestUp (gamified habits with AI verification), and CV Optimizer. 10+ published repositories across TypeScript and Python.",
  },
  {
    date: "2023 — 2024",
    title: "Automation & Scraping",
    company: "Independent Projects",
    desc: "Built Stealth Agents (human-simulated browser fleet), Job Pipeline (autonomous scraper with circuit breakers), and YT Shorts Engine (AI content factory with LLM fallbacks).",
  },
  {
    date: "2022 — 2023",
    title: "Client Work & Foundations",
    company: "Freelance",
    desc: "Delivered client projects including Mena Capital Partners and FoodExpress. Built production APIs, designed database schemas, and learned to ship under real constraints.",
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reducedMotion) return;

    const heading = ref.current?.querySelector<HTMLElement>(".section-heading");
    if (heading) {
      const words = (heading.textContent || "").split(/\s+/).filter(Boolean);
      heading.innerHTML = words.map((w) => `<span class="line"><span class="line-inner">${w}</span></span>`).join(" ");
      const lines = heading.querySelectorAll<HTMLElement>(".line-inner");
      gsap.from(lines, {
        y: "110%", autoAlpha: 0, stagger: STAGGER.tight, duration: DURATION.hero,
        ease: EASE.out, scrollTrigger: { trigger: ref.current, start: SCROLL_START, once: true },
      });
    }

    gsap.from(".timeline-item", {
      x: -32,
      autoAlpha: 0,
      stagger: STAGGER.wide,
      duration: DURATION.base,
      ease: EASE.out,
      scrollTrigger: { trigger: ".timeline", start: SCROLL_START, once: true },
    });
  }, { scope: ref });

  return (
    <section className="experience gsap-init" id="experience" ref={ref}>
      <div className="container">
        <p className="section-label">Experience</p>
        <h2 className="section-heading">Where I&apos;ve been.</h2>
        <p className="section-desc">
          A timeline of my journey through the world of software development.
        </p>
        <div className="timeline">
          {timeline.map((item) => (
            <div key={item.date} className="timeline-item">
              <div className="timeline-dot" />
              <span className="timeline-date">{item.date}</span>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-company">{item.company}</p>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
