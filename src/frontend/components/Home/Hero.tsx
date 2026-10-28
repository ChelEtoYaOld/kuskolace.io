"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { ArrowDown, ArrowUpRight, MapPin, Star } from "lucide-react";

import type { BusinessFactsDTO, CmsConfigDTO } from "@/frontend/types/Home";

export interface HeroProps {
  onScrollToShowcase: () => void;
  onScrollToContact: () => void;
  kolacStampUrl?: string;
  businessFacts?: BusinessFactsDTO | null;
  cmsConfig?: CmsConfigDTO | null;
}

export default function Hero({ onScrollToShowcase, onScrollToContact, businessFacts, cmsConfig }: HeroProps) {
  const heading = cmsConfig?.welcomeHeading || "Řemeslné pečení s vůní poctivého másla";
  const introduction = cmsConfig?.welcomePreamble || "Každé ráno zaděláváme kynutá těsta podle staročeských receptur. Koláče s tvarohem, povidly, mákem a sezónním ovocem. Přímo tady, na Vinohradech.";
  return (
    <section className="bakery-hero" aria-labelledby="bakery-heading" data-controller-name="Úvodní hrdinská sekce pekárny">
      <div className="bakery-hero-grid">
        <div className="bakery-hero-copy">
          <p className="bakery-eyebrow"><span aria-hidden="true" /> ŘEMESLNÁ PEKÁRNA · PRAHA</p>
          <h1 id="bakery-heading">{heading}</h1>
          <p className="bakery-intro">{introduction}</p>
          <div className="bakery-actions">
            <button type="button" onClick={onScrollToShowcase} className="bakery-button bakery-button-primary">Co jsme napekli <ArrowUpRight size={19} /></button>
            <button type="button" onClick={onScrollToContact} className="bakery-button bakery-button-outline">Zastavte se <MapPin size={17} /></button>
          </div>
          <div className="bakery-hero-details">
            <span><MapPin size={15} /> {businessFacts?.streetAddress || "Korunní 90, Vinohrady"}</span>
            {businessFacts?.ratingScore != null && <span><Star size={15} fill="currentColor" /> {businessFacts.ratingScore.toLocaleString("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}{businessFacts.reviewsCount != null && <small> / {businessFacts.reviewsCount.toLocaleString("cs-CZ")} recenzí</small>}</span>}
          </div>
        </div>
        <div className="bakery-hero-visual">
          <div className="bakery-photo-frame">
            <EditableImg propKey="bakery-hero-kolac" src="/images/instagram/fig-pastries.jpg" alt="Pečivo s fíky a krémem z Instagramu @kuskolace" className="bakery-hero-photo" fetchPriority="high" decoding="async" />
            <div className="bakery-photo-caption"><span>KUS KOLÁČE</span><span>A piece of happiness.</span></div>
          </div>
          <div className="bakery-stamp" aria-label="S láskou a máslem"><span>S LÁSKOU</span><b>&</b><span>A MÁSLEM</span></div>
          <p className="bakery-photo-note">Malý kousek. Velká radost.</p>
        </div>
      </div>
      <div className="bakery-hero-bottom"><span>POCTIVÉ SUROVINY. POMALÉ TĚSTO. RADOST Z PEČENÍ.</span><button onClick={onScrollToShowcase} aria-label="Přejít na dnešní vitrínu"><ArrowDown size={18} /></button></div>
    </section>
  );
}
