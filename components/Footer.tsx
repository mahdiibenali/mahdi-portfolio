"use client";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-left">
          © {new Date().getFullYear()} Mahdi Ben Ali. Crafted with precision.
        </p>
        <div className="footer-right">
          <a href="https://github.com/mahdibenali" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/mahdi-ben-ali/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://wa.me/21699274539" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
