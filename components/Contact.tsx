"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import { EASE, DURATION, SCROLL_START, STAGGER } from "@/lib/motion";
import { splitIntoLines } from "@/lib/text-split";

type FieldErrors = { name?: string; email?: string; message?: string };

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Name is required";
  if (!email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "Enter a valid email";
  if (!message.trim()) errors.message = "Message is required";
  else if (message.trim().length < 10) errors.message = "At least 10 characters";
  return errors;
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    if (reducedMotion) return;

    const heading = ref.current?.querySelector<HTMLElement>(".contact-heading");
    if (heading) {
      const lines = splitIntoLines(heading);
      gsap.from(lines, {
        y: "110%", autoAlpha: 0, stagger: STAGGER.tight, duration: DURATION.hero,
        ease: EASE.out, scrollTrigger: { trigger: ref.current, start: SCROLL_START, once: true },
      });
    }

    gsap.from(".contact-sub", {
      y: 24, autoAlpha: 0, duration: DURATION.base, ease: EASE.out, delay: 0.3,
      scrollTrigger: { trigger: ref.current, start: SCROLL_START, once: true },
    });

    gsap.from(".contact-link", {
      y: 16, autoAlpha: 0, stagger: STAGGER.base, duration: DURATION.base, ease: EASE.out,
      scrollTrigger: { trigger: ".contact-links", start: SCROLL_START, once: true },
    });
  }, { scope: ref });

  function onBlur(field: "name" | "email" | "message", value: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(
      field === "name" ? value : name,
      field === "email" ? value : email,
      field === "message" ? value : message
    );
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(name, email, message);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errs).length > 0) return;
    setSubmitted(true);
  }

  return (
    <section className="contact gsap-init" id="contact" ref={ref}>
      <div className="container">
        <div className="contact-grid">
          <div className="contact-left">
            <p className="section-label">Contact</p>
            <h2 className="contact-heading">
              Let&apos;s build<br />something great.
            </h2>
            <p className="contact-sub">
              Have a project in mind? Need a developer who cares about craft?
              Let&apos;s talk — no pitch, just a real conversation.
            </p>
            <div className="contact-links">
              <a href="https://wa.me/21699274539" target="_blank" rel="noopener noreferrer" className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
                +216 99 274 539
              </a>
              <a href="https://www.linkedin.com/in/mahdi-ben-ali/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                www.linkedin.com/in/mahdi-ben-ali/
              </a>
              <a href="https://github.com/mahdibenali" target="_blank" rel="noopener noreferrer" className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
                github.com/mahdibenali
              </a>
            </div>
          </div>
          <div>
            {submitted ? (
              <div style={{
                padding: "48px 32px",
                border: "1px solid var(--gray-border)",
                background: "var(--gray-card)",
                textAlign: "center",
              }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, marginBottom: "12px" }}>
                  Message sent!
                </p>
                <p style={{ color: "var(--gray-text)", fontSize: "15px" }}>
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit}>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="name">Name *</label>
                    <input
                      id="name"
                      required
                      aria-invalid={touched.name && errors.name ? true : undefined}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => onBlur("name", name)}
                      placeholder="Your name"
                    />
                    {touched.name && errors.name && <span className="error">{errors.name}</span>}
                  </div>
                  <div className="contact-field">
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      type="email"
                      required
                      aria-invalid={touched.email && errors.email ? true : undefined}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => onBlur("email", email)}
                      placeholder="you@example.com"
                    />
                    {touched.email && errors.email && <span className="error">{errors.email}</span>}
                  </div>
                </div>
                <div className="contact-field">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    aria-invalid={touched.message && errors.message ? true : undefined}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={() => onBlur("message", message)}
                    placeholder="Tell me about your project..."
                  />
                  {touched.message && errors.message && <span className="error">{errors.message}</span>}
                </div>
                <button type="submit" className="contact-submit">
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
