import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Instagram, Clock, ShoppingBag } from "lucide-react";
export function Footer() {
  const currentYear = new Date().getFullYear();
  return <footer className="w-full bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & mission */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border shrink-0 bg-background">
                <Image src="https://www.autocoder.cc/background/zaki_prod/user_upload/3ae5fd48dd7c4eddb2264322661028db.jpg" alt="Kus Koláče logo" width={40} height={40} className="object-cover" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                Kus Koláče
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Řemeslná vinohradská pekárna a koláčové bistro na Korunní ulici.
              Poctivé kynuté těsto, spousta máslové drobenky a čerstvě pražená výběrová káva.
            </p>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h3 className="font-header text-sm font-semibold text-foreground uppercase tracking-wider">
              Kde nás najdete
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Korunní 90, 101 00 Praha 2 – Vinohrady</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:608903828" className="hover:text-foreground transition-colors font-mono">
                  608 903 828
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Service */}
          <div className="space-y-3">
            <h3 className="font-header text-sm font-semibold text-foreground uppercase tracking-wider">
              Otevírací doba
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Ranní výpek od 08:00 do vyprodání</span>
              </li>
              <li className="text-xs text-muted-foreground/80 pl-6.5">
                Pečeme čerstvé várky v průběhu celého dopoledne.
              </li>
            </ul>
          </div>

          {/* Social connection & Walk-in notice */}
          <div className="space-y-3">
            <h3 className="font-header text-sm font-semibold text-foreground uppercase tracking-wider">
              Sledujte pečení
            </h3>
            <p className="text-sm text-muted-foreground">
              Denní vitrínu a čerstvě vytažené plechy sdílíme každé ráno na Instagramu.
            </p>
            <div>
              <a href="https://www.instagram.com/kuskolace" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                <Instagram className="w-4 h-4 text-primary" />
                <span>@kuskolace</span>
              </a>
            </div>
            <div className="pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/60 px-3 py-2 rounded-md border border-border/70">
                <ShoppingBag className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Pouze osobní nákup na místě (walk-in). Bez rozvozu a rezervací.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-3">
          <p>© {currentYear} Kus Koláče. Všechna práva vyhrazena.</p>
          <div className="flex items-center gap-4">
            <Link href="/#vitrina" className="hover:text-foreground transition-colors">
              Denní vitrína
            </Link>
            <Link href="/#pribeh" className="hover:text-foreground transition-colors">
              Náš příběh
            </Link>
            <Link href="/#kontakty" className="hover:text-foreground transition-colors">
              Kontakty
            </Link>
          </div>
        </div>
      </div>
    </footer>;
}
export { Footer as FrontendFooter };
export default Footer;
