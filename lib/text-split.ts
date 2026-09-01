"use client";

export function splitIntoLines(el: HTMLElement | null): HTMLElement[] {
  if (!el) return [];

  const textNodes: Text[] = [];
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      textNodes.push(node as Text);
    }
    node.childNodes.forEach(walk);
  };
  walk(el);

  const rawHtml = el.innerHTML;
  const hasBreak = /<br\s*\/?>/i.test(rawHtml);

  if (hasBreak) {
    const parts = rawHtml.split(/<br\s*\/?>/i);
    el.innerHTML = parts
      .map(
        (part) =>
          `<span class="line"><span class="line-inner">${part.trim()}</span></span>`
      )
      .join(" ");
    return Array.from(el.querySelectorAll<HTMLElement>(".line-inner"));
  }

  if (textNodes.length > 0) {
    textNodes.forEach((tn) => {
      const words = (tn.textContent || "").split(/\s+/).filter(Boolean);
      const span = document.createElement("span");
      span.innerHTML = words
        .map((w) => `<span class="line"><span class="line-inner">${w}</span></span>`)
        .join(" ");
      tn.replaceWith(span);
    });
    return Array.from(el.querySelectorAll<HTMLElement>(".line-inner"));
  }

  const words = (el.textContent || "").split(/\s+/).filter(Boolean);
  el.innerHTML = words
    .map((w) => `<span class="line"><span class="line-inner">${w}</span></span>`)
    .join(" ");
  return Array.from(el.querySelectorAll<HTMLElement>(".line-inner"));
}
