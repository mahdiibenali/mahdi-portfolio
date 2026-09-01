"use client";

import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { EASE, DURATION, SCROLL_START, STAGGER } from "@/lib/motion";

const skills = [
  { name: "TypeScript", level: "Expert", icon: "TS" },
  { name: "Python", level: "Expert", icon: "🐍" },
  { name: "React / Next.js", level: "Expert", icon: "⚛" },
  { name: "Node.js", level: "Advanced", icon: "⚡" },
  { name: "LLMs / AI Agents", level: "Advanced", icon: "🧠" },
  { name: "PostgreSQL", level: "Advanced", icon: "🐘" },
  { name: "MongoDB", level: "Advanced", icon: "🍃" },
  { name: "MT5 / Trading", level: "Advanced", icon: "📈" },
  { name: "Browser Automation", level: "Advanced", icon: "🤖" },
  { name: "IoT / Sensors", level: "Intermediate", icon: "📡" },
  { name: "Docker / Linux", level: "Intermediate", icon: "🐳" },
  { name: "Tailwind CSS", level: "Expert", icon: "🎨" },
];

export default function Skills() {
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

    gsap.from(".skill-item", {
      y: 32,
      autoAlpha: 0,
      stagger: { each: 0.05, grid: "auto", from: "start" },
      duration: DURATION.base,
      ease: EASE.out,
      scrollTrigger: { trigger: ".skills-grid", start: SCROLL_START, once: true },
    });
  }, { scope: ref });

  return (
    <section className="skills gsap-init" id="skills" ref={ref}>
      <div className="container">
        <p className="section-label">Tech Stack</p>
        <h2 className="section-heading">Tools I master.</h2>
        <p className="section-desc">
          A curated set of technologies I use to build production-grade applications.
        </p>
        <div className="skills-grid">
          {skills.map((s) => (
            <div key={s.name} className="skill-item">
              <div className="skill-icon">{s.icon}</div>
              <span className="skill-name">{s.name}</span>
              <span className="skill-level">{s.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
