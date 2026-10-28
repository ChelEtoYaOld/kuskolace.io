"use client";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/** Progressive enhancement: content remains visible without JavaScript or motion support. */
export default function RevealOnScroll({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target as HTMLElement;
        target.animate?.([{ opacity: 0, transform: "translateY(22px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 700, easing: "cubic-bezier(.22,1,.36,1)" });
        observer.unobserve(target);
      }
    }, { threshold: 0.08 });
    element.querySelectorAll("section > .container, .bakery-hero-copy, .bakery-hero-visual").forEach(node => observer.observe(node));
    const stop = () => {
      if (preference.matches) {
        observer.disconnect();
        element.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
      }
    };
    preference.addEventListener("change", stop);
    return () => { observer.disconnect(); preference.removeEventListener("change", stop); element.getAnimations({ subtree: true }).forEach(animation => animation.cancel()); };
  }, []);
  return <div ref={root}>{children}</div>;
}
