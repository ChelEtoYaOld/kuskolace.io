"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { ShieldCheck } from "lucide-react";
interface BrandCardHeaderProps {
  logoUrl?: string;
}
export default function BrandCardHeader({
  logoUrl
}: BrandCardHeaderProps) {
  return <div className="relative flex flex-col items-center text-center" data-api-unique-id='brandcardheader-r5652e53dc5555510-s3632471982' data-api-unique-page-name='src/backend/components/AdminLogin/BrandCardHeader'>
      {/* Vintage Stamp Badge in the top corner */}
      <div className="absolute -top-3 -right-2 hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-secondary text-secondary-foreground text-[11px] font-mono tracking-tight shadow-sm" data-api-unique-id='brandcardheader-r034ceb418ddce13f-s3632471982' data-api-unique-page-name='src/backend/components/AdminLogin/BrandCardHeader'>
        <span className="w-1.5 h-1.5 rounded-full bg-accent" data-api-unique-id='brandcardheader-rddac22fe03913172-s3632471982' data-api-unique-page-name='src/backend/components/AdminLogin/BrandCardHeader' />
        <span data-api-unique-id='brandcardheader-r55203a7795e08c28-s3632471982' data-api-unique-page-name='src/backend/components/AdminLogin/BrandCardHeader'>Vinohrady · Korunní 90</span>
      </div>

      {/* Official Circular Seal with Koláč Icon */}
      <div className="relative mb-4 flex items-center justify-center" data-api-unique-id='brandcardheader-r597498df89924b89-s3632471982' data-api-unique-page-name='src/backend/components/AdminLogin/BrandCardHeader'>
        <div className="w-20 h-20 rounded-full border-2 border-border bg-card p-1 shadow-md flex items-center justify-center overflow-hidden" data-api-unique-id='brandcardheader-r05eeb13f6dbfb775-s3632471982' data-api-unique-page-name='src/backend/components/AdminLogin/BrandCardHeader'>
          <EditableImg propKey="admin-login-kolac-seal" src={logoUrl} alt="Kus Koláče pečeť" className="w-full h-full object-cover rounded-full" data-api-unique-id='brandcardheader-r363f558ff618bc21-s3632471982' data-api-unique-page-name='src/backend/components/AdminLogin/BrandCardHeader' />
        </div>
      </div>

      {/* Main Bakery Display Title */}
      <h1 className="text-2xl sm:text-3xl font-display font-bold text-card-foreground tracking-tight" data-api-unique-id='brandcardheader-r364a8df3a9dc5058-s3632471982' data-api-unique-page-name='src/backend/components/AdminLogin/BrandCardHeader'>
        Kus Koláče
      </h1>
      <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-medium max-w-[340px]" data-api-unique-id='brandcardheader-re0f089de9bd1da94-s3632471982' data-api-unique-page-name='src/backend/components/AdminLogin/BrandCardHeader'>
        Provozní systém pekárny · Správa vitríny & pečení
      </p>

      {/* Warm role indicator tag */}
      <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-accent text-accent-foreground text-xs font-medium shadow-sm" data-api-unique-id='brandcardheader-r5194bdbc12b2c6de-s3632471982' data-api-unique-page-name='src/backend/components/AdminLogin/BrandCardHeader'>
        <ShieldCheck className="w-3.5 h-3.5 shrink-0" data-api-unique-id='brandcardheader-r12d62d73b790bfb3-s3632471982' data-api-unique-page-name='src/backend/components/AdminLogin/BrandCardHeader' />
        <span data-api-unique-id='brandcardheader-rf833f820e974f456-s3632471982' data-api-unique-page-name='src/backend/components/AdminLogin/BrandCardHeader'>Role: Správce pekárny (Pouze walk-in provoz)</span>
      </div>
    </div>;
}