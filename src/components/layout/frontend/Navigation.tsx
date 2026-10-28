// allow-nav-meta-tags: Požadavek na provozní štítek Osobní návštěva & Walk-in na Korunní 90
"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Store } from "lucide-react";
interface NavLinkItem {
  id: string;
  name: string;
  href: string;
}
const navLinks: NavLinkItem[] = [{
  id: "prehled",
  name: "Přehled",
  href: "/"
}, {
  id: "vitrina",
  name: "Denní vitrína",
  href: "/#vitrina"
}, {
  id: "pribeh",
  name: "Náš příběh",
  href: "/#pribeh"
}, {
  id: "kontakty",
  name: "Kde nás najdete",
  href: "/#kontakt"
}];
export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(navLinks.length);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const navTrackRef = useRef<HTMLElement>(null);
  const itemMeasureRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMoreDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const toggleMoreDropdown = () => {
    if (!moreDropdownOpen && moreButtonRef.current) {
      const rect = moreButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: Math.max(16, rect.right - 192)
      });
    }
    setMoreDropdownOpen(prev => !prev);
  };

  // Responsive item width measurement via ResizeObserver
  useEffect(() => {
    const calculateVisibleItems = () => {
      if (!navTrackRef.current) return;
      const trackWidth = navTrackRef.current.clientWidth;
      if (trackWidth <= 0) return;
      const gap = 24; // gap-6
      const moreButtonWidth = 84; // Reserved width for "Více" trigger button

      let totalWidth = 0;
      let count = 0;
      for (let i = 0; i < navLinks.length; i++) {
        const el = itemMeasureRefs.current[i];
        const itemWidth = el ? el.offsetWidth : 110;
        const widthWithGap = (i > 0 ? gap : 0) + itemWidth;
        if (totalWidth + widthWithGap <= trackWidth) {
          totalWidth += widthWithGap;
          count++;
        } else {
          // If we cannot fit this item, reserve space for "Více" button
          while (count > 0 && totalWidth + moreButtonWidth > trackWidth) {
            const prevEl = itemMeasureRefs.current[count - 1];
            const prevWidth = (count > 1 ? gap : 0) + (prevEl ? prevEl.offsetWidth : 110);
            totalWidth -= prevWidth;
            count--;
          }
          break;
        }
      }
      setVisibleCount(Math.max(1, count));
    };
    const observer = new ResizeObserver(() => {
      calculateVisibleItems();
    });
    if (navTrackRef.current) {
      observer.observe(navTrackRef.current);
    }
    calculateVisibleItems();
    return () => {
      observer.disconnect();
    };
  }, []);
  const visibleLinks = navLinks.slice(0, visibleCount);
  const hiddenLinks = navLinks.slice(visibleCount);

  // Check active state
  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return false;
  };
  const isMoreActive = hiddenLinks.some(l => isLinkActive(l.href));
  return <header className="sticky top-0 z-50 min-h-16 bg-background border-b border-border">
      <a className="bakery-skip-link" href="#main-content">Přeskočit na obsah</a>
      <div ref={containerRef} className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-16 flex items-center justify-between gap-4 py-2">
        {/* Brand & Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border bg-card shrink-0 flex items-center justify-center shadow-xs">
            <Image src="https://www.autocoder.cc/background/zaki_prod/user_upload/3ae5fd48dd7c4eddb2264322661028db.jpg" alt="Kus Koláče" width={36} height={36} className="object-cover" priority />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight" style={{
            fontStyle: `italic`
          } as React.CSSProperties}>
              Kus Koláče
            </span>
            <span className="text-[11px] text-muted-foreground font-medium hidden sm:inline leading-tight">
              Korunní 90, Praha – Vinohrady
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Link Track */}
        <nav ref={navTrackRef} className="hidden md:flex flex-1 min-w-0 items-center justify-center gap-6 overflow-visible" aria-label="Hlavní navigace pekárny">
          {visibleLinks.map((item, index) => {
          const active = isLinkActive(item.href);
          return <Link key={item.id} ref={el => {
            itemMeasureRefs.current[index] = el;
          }} href={item.href} className={`text-sm font-medium whitespace-nowrap shrink-0 transition-colors py-1 ${active ? "text-primary font-semibold border-b-2 border-primary" : "text-foreground/85 hover:text-primary"}`}>
                {item.name}
              </Link>;
        })}

          {/* More Dropdown (if items do not fit) */}
          {hiddenLinks.length > 0 && <div ref={dropdownRef} className="relative shrink-0 overflow-visible">
              <button type="button" ref={moreButtonRef} onClick={toggleMoreDropdown} className={`flex items-center gap-1 text-sm font-medium whitespace-nowrap py-1 transition-colors ${isMoreActive ? "text-primary font-semibold" : "text-foreground/85 hover:text-primary"}`} aria-expanded={moreDropdownOpen} aria-haspopup="true">
                <span>Více</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {moreDropdownOpen && mounted && dropdownPosition && createPortal(<div style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`
          }} className="fixed w-48 rounded-md bg-card text-card-foreground border border-border shadow-warm py-1 z-50">
                  {hiddenLinks.map((item, index) => {
              const active = isLinkActive(item.href);
              return <Link key={item.id} href={item.href} onClick={() => setMoreDropdownOpen(false)} className={`block px-4 py-2 text-sm transition-colors ${active ? "bg-muted text-primary font-semibold" : "text-foreground/85 hover:bg-muted/70 hover:text-primary"}`}>
                        {item.name}
                      </Link>;
            })}
                </div>, document.body)}
            </div>}
        </nav>

        {/* Operating info label (Walk-in only) */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-medium text-accent-foreground bg-accent px-3 py-1.5 rounded-full border border-accent/20 shadow-xs">
            <Store className="w-3.5 h-3.5" />
            <span>Osobní návštěva &amp; Walk-in</span>
          </div>
        </div>

        {/* Mobile menu button */}
        <button type="button" onClick={() => setMobileMenuOpen(prev => !prev)} className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors shrink-0" aria-label={mobileMenuOpen ? "Zavřít menu" : "Otevřít menu"} aria-expanded={mobileMenuOpen}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer panel */}
      {mobileMenuOpen && <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-3 shadow-lg">
          <div className="flex items-center gap-2 pb-3 mb-2 border-b border-border text-xs text-muted-foreground">
            <Store className="w-4 h-4 text-primary shrink-0" />
            <span className="font-medium text-foreground">
              Osobní návštěva &amp; Walk-in na Korunní 90 (bez rezervací)
            </span>
          </div>
          <nav className="flex flex-col space-y-2" aria-label="Mobilní navigace">
            {navLinks.map((item, index) => <Link key={item.id} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-foreground hover:text-primary transition-colors py-1.5">
                {item.name}
              </Link>)}
          </nav>
        </div>}
    </header>;
}
export { Navigation as FrontendNavigation };
export default Navigation;
