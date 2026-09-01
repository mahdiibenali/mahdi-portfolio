"use client";

import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { EASE, DURATION, SCROLL_START, STAGGER } from "@/lib/motion";
import { splitIntoLines } from "@/lib/text-split";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reducedMotion) return;

    const heading = ref.current?.querySelector<HTMLElement>(".section-heading");
    if (heading) {
      const lines = splitIntoLines(heading);
      gsap.from(lines, {
        y: "110%",
        autoAlpha: 0,
        stagger: STAGGER.tight,
        duration: DURATION.hero,
        ease: EASE.out,
        scrollTrigger: { trigger: ref.current, start: SCROLL_START, once: true },
      });
    }

    gsap.from(".about-text p", {
      y: 24,
      autoAlpha: 0,
      stagger: STAGGER.base,
      duration: DURATION.base,
      ease: EASE.out,
      scrollTrigger: { trigger: ".about-text", start: SCROLL_START, once: true },
    });

    gsap.from(".about-highlight", {
      y: 32,
      autoAlpha: 0,
      stagger: STAGGER.base,
      duration: DURATION.base,
      ease: EASE.out,
      scrollTrigger: { trigger: ".about-highlights", start: SCROLL_START, once: true },
    });
  }, { scope: ref });

  return (
    <section className="about gsap-init" id="about" ref={ref}>
      <div className="container">
        <p className="section-label">About Me</p>
        <h2 className="section-heading">The person behind<br />the pixels.</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I&apos;m a full-stack developer from Tunisia building things that sit at the
              intersection of AI, automation, and systems engineering. I don&apos;t just
              write code — I architect autonomous systems, design trading algorithms,
              and build tools that solve real problems.
            </p>
            <p>
              My work spans IoT platforms, multi-agent AI systems, algo-trading desks,
              and browser automation fleets. I ship fast, think in systems, and believe
              the best code is the code that makes complex things feel simple.
            </p>
            <p>
              12 published repositories. TypeScript and Python. From beehive sensors
              to trading bots, from AI content engines to stealth automation — if it&apos;s
              complex, I&apos;ve probably built it.
            </p>
          </div>
          <div className="about-highlights">
            <div className="about-highlight">
              <h4>Frontend</h4>
              <p>React, Next.js, TypeScript, Tailwind CSS, GSAP animations</p>
            </div>
            <div className="about-highlight">
              <h4>Backend & AI</h4>
              <p>Python, Node.js, LLMs, Multi-Agent Systems, REST & GraphQL</p>
            </div>
            <div className="about-highlight">
              <h4>Data & Trading</h4>
              <p>MT5, Algo-Trading, Quantitative Research, Data Pipelines</p>
            </div>
            <div className="about-highlight">
              <h4>Systems & DevOps</h4>
              <p>IoT, Browser Automation, CDP, Docker, Linux, CI/CD</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
