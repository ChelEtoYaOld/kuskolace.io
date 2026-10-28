"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, UtensilsCrossed, Clock, FileText, Instagram, LogOut, ShieldCheck, CheckCircle2, AlertTriangle, Radio, Sparkles } from "lucide-react";
import { useAdminSession } from "@/tools/BackendSession";
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}
const navItems: NavItem[] = [{
  name: "Přehled a diagnostika",
  href: "/adminhome",
  icon: LayoutDashboard
}, {
  name: "Správa vitríny pečiva",
  href: "/adminpastryshowcase",
  icon: UtensilsCrossed
}, {
  name: "Provozní údaje a otevírací doba",
  href: "/adminbusinessfacts",
  icon: Clock
}, {
  name: "Správa sekcí a textů",
  href: "/admincmssections",
  icon: FileText
}, {
  name: "Instagram integrace",
  href: "/admininstagramintegration",
  icon: Instagram
}];
export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    full_name,
    email,
    role,
    reset
  } = useAdminSession();
  const [authExpired, setAuthExpired] = useState(false);

  // Normalize pathname to strip trailing slash
  const normalizedPath = pathname && pathname !== "/" ? pathname.replace(/\/$/, "") : pathname || "/";

  // Listen for potential 401 events dispatched across client components
  useEffect(() => {
    const handleAuthExpired = () => {
      setAuthExpired(true);
    };
    window.addEventListener("auth:expired", handleAuthExpired);
    return () => {
      window.removeEventListener("auth:expired", handleAuthExpired);
    };
  }, []);
  const handleLogout = () => {
    reset();
    router.push("/adminlogin");
  };
  const handleExpiredConfirm = () => {
    setAuthExpired(false);
    reset();
    router.push("/adminlogin");
  };
  return <aside className="h-full min-h-0 shrink-0 w-60 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col select-none">
      {/* Brand header */}
      <div className="shrink-0 p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-md overflow-hidden bg-sidebar-primary/10 border border-sidebar-border shrink-0 flex items-center justify-center">
            <Image src="https://www.autocoder.cc/background/zaki_prod/user_upload/3ae5fd48dd7c4eddb2264322661028db.jpg" alt="Kus Koláče" width={36} height={36} className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-display text-sm font-bold tracking-tight text-sidebar-foreground truncate leading-snug">
              Kus Koláče
            </div>
            <div className="text-[11px] text-sidebar-foreground/70 truncate flex items-center gap-1 font-medium">
              <span>Administrace pekárny</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Diagnostic Status Bar (SystemStatusBar) */}
      <div className="shrink-0 p-3 mx-2.5 my-2.5 rounded-lg bg-sidebar-accent/50 border border-sidebar-border/80 text-xs space-y-2">
        <div className="flex items-center justify-between text-[11px] font-semibold text-sidebar-foreground">
          <span className="flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
            Stav systému
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
            Online
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-sidebar-border/50 text-[10px]">
          <div className="flex items-center gap-1 text-sidebar-foreground/80 truncate">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
            <span className="truncate">Vitrína: Aktivní</span>
          </div>
          <div className="flex items-center gap-1 text-sidebar-foreground/80 truncate">
            <Sparkles className="w-2.5 h-2.5 text-amber-600 shrink-0" />
            <span className="truncate">IG: Propojeno</span>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 min-h-0 overflow-y-auto px-2 py-1 space-y-1" aria-label="Administrační navigace">
        <div className="px-2 py-1 text-[10px] font-semibold tracking-wider text-sidebar-foreground/60 uppercase">
          Hlavní moduly
        </div>
        {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = normalizedPath === item.href || item.href !== "/adminhome" && normalizedPath.startsWith(item.href);
        return <Link key={item.href} href={item.href} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs transition-colors group ${isActive ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-xs" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-medium"}`}>
              <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"}`} />
              <span className="min-w-0 truncate whitespace-nowrap">
                {item.name}
              </span>
            </Link>;
      })}
      </nav>

      {/* Bottom User Area */}
      <div className="shrink-0 p-3 border-t border-sidebar-border bg-sidebar">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-sidebar-accent flex items-center justify-center shrink-0 border border-sidebar-border text-sidebar-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-sidebar-foreground truncate leading-tight">
                {full_name || email || "Správce pekárny"}
              </p>
              <p className="text-[10px] text-sidebar-foreground/60 truncate font-mono uppercase">
                {role || "ADMIN"}
              </p>
            </div>
          </div>
          <button type="button" onClick={handleLogout} title="Odhlásit se z administrace" className="p-1.5 rounded-md text-sidebar-foreground/70 hover:text-destructive hover:bg-sidebar-accent transition-colors shrink-0" aria-label="Odhlásit se">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Auth Expired Dialog */}
      {authExpired && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-card text-card-foreground border border-border rounded-lg shadow-warm max-w-sm w-full p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-header text-sm font-semibold text-foreground">
                  Platnost relace vypršela
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Byli jste odhlášeni z důvodu vypršení platnosti bezpečnostního tokenu.
                </p>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button type="button" onClick={handleExpiredConfirm} className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-xs font-medium hover:opacity-95 transition-opacity">
                Přejít na přihlášení
              </button>
            </div>
          </div>
        </div>}
    </aside>;
}
export { Sidebar as BackendSidebar };
export default Sidebar;
