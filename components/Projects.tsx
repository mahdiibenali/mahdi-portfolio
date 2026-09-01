"use client";

import { useRef } from "react";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";
import { EASE, DURATION, SCROLL_START, STAGGER, TILT } from "@/lib/motion";

const projects = [
  {
    num: "01",
    title: "Beehive Monitor",
    desc: "Full-stack beehive monitoring and apiary management platform with IoT sensor integration, RBAC, and a mobile companion app.",
    tags: ["TypeScript", "IoT", "RBAC", "Mobile"],
    link: "https://github.com/mahdibenali/beehive-monitor",
  },
  {
    num: "02",
    title: "QuestUp",
    desc: "Gamified goal and habit platform with XP engine, streak tracking, and AI-powered proof verification for real accountability.",
    tags: ["TypeScript", "AI", "Gamification", "Full-Stack"],
    link: "https://github.com/mahdibenali/questup",
  },
  {
    num: "03",
    title: "YT Shorts Engine",
    desc: "End-to-end AI YouTube Shorts factory with multi-tier LLM fallbacks, automated scripting, and content pipeline orchestration.",
    tags: ["Python", "LLM", "Automation", "Content"],
    link: "https://github.com/mahdibenali/yt-shorts-engine",
  },
  {
    num: "04",
    title: "Job Pipeline",
    desc: "Autonomous job-leads scraper with CDP browser attach, circuit breakers, and a state machine for resilient lead processing.",
    tags: ["Python", "CDP", "Scraping", "State Machine"],
    link: "https://github.com/mahdibenali/job-pipeline",
  },
  {
    num: "05",
    title: "QuantDesk",
    desc: "Multi-specialist algo-trading research desk for MetaTrader 5 with agent-based analysis and strategy generation.",
    tags: ["Python", "Trading", "MT5", "Agents"],
    link: "https://github.com/mahdibenali/quantdesk",
  },
  {
    num: "06",
    title: "Stealth Agents",
    desc: "Human-simulated browser automation fleet for undetectable web interaction at scale.",
    tags: ["Python", "Browser", "Automation", "Stealth"],
    link: "https://github.com/mahdibenali/stealth-agents",
  },
  {
    num: "07",
    title: "Trading King",
    desc: "Autonomous multi-agent trading system with an LLM research brain for market analysis and trade execution.",
    tags: ["Python", "Multi-Agent", "LLM", "Trading"],
    link: "https://github.com/mahdibenali/trading-king",
  },
  {
    num: "08",
    title: "CV Optimizer",
    desc: "AI-powered CV tailoring engine that rewrites resumes to match specific job descriptions for maximum ATS compatibility.",
    tags: ["Python", "AI", "NLP", "ATS"],
    link: "https://github.com/mahdibenali/cv-optimizer",
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reducedMotion) return;

    const heading = ref.current?.querySelector<HTMLElement>(".section-heading");
    if (heading) {
      const lines = heading.querySelectorAll<HTMLElement>(".line-inner");
      if (lines.length === 0) {
        const words = (heading.textContent || "").split(/\s+/).filter(Boolean);
        heading.innerHTML = words.map((w) => `<span class="line"><span class="line-inner">${w}</span></span>`).join(" ");
        const newLines = heading.querySelectorAll<HTMLElement>(".line-inner");
        gsap.from(newLines, {
          y: "110%", autoAlpha: 0, stagger: STAGGER.tight, duration: DURATION.hero,
          ease: EASE.out, scrollTrigger: { trigger: ref.current, start: SCROLL_START, once: true },
        });
      }
    }

    gsap.from(".project-card", {
      y: 48,
      autoAlpha: 0,
      stagger: STAGGER.wide,
      duration: DURATION.base,
      ease: EASE.out,
      scrollTrigger: { trigger: ".projects-grid", start: SCROLL_START, once: true },
    });

    const cleanups: (() => void)[] = [];
    gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * TILT.maxDegrees * 2,
          rotateX: -y * TILT.maxDegrees * 2,
          transformPerspective: TILT.perspective,
          duration: 0.3,
          ease: "power2.out",
        });
      };
      const onLeave = () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, { scope: ref });

  return (
    <section className="projects gsap-init" id="projects" ref={ref}>
      <div className="container">
        <p className="section-label">Selected Work</p>
        <h2 className="section-heading">Projects that<br />speak for themselves.</h2>
        <p className="section-desc">
          Every project is a story of problem-solving, precision, and craft.
          Here&apos;s a selection of what I&apos;ve built.
        </p>
        <div className="projects-grid">
          {projects.map((p) => (
            <div key={p.num} className="project-card">
              <div className="project-card-header">
                <span className="project-card-num">{p.num}</span>
                <div className="project-card-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="project-card-tag">{t}</span>
                  ))}
                </div>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-card-link">View on GitHub →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
