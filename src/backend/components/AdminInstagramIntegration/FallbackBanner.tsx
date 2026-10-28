"use client";

import React from "react";
import { AlertTriangle, Info } from "lucide-react";
import { FeedMode } from "@/backend/types/AdminInstagramIntegration";
interface FallbackBannerProps {
  feedMode: FeedMode;
  accountHandle: string;
}
export default function FallbackBanner({
  feedMode,
  accountHandle
}: FallbackBannerProps) {
  if (feedMode === "FALLBACK") {
    return <div className="rounded-lg border border-warning/40 bg-warning/10 text-card-foreground p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm" data-controller-name="Upozornění na záložní režim Instagramu" data-api-unique-id='fallbackbanner-r20f78e62418e8fc7-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner'>
        <div className="flex items-start gap-3 min-w-0" data-api-unique-id='fallbackbanner-rb938b3b74ca803a1-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner'>
          <div className="w-8 h-8 rounded-full bg-warning text-warning-foreground flex items-center justify-center shrink-0 mt-0.5 sm:mt-0" data-api-unique-id='fallbackbanner-ra2525ae0dc32c556-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner'>
            <AlertTriangle className="w-4 h-4" data-api-unique-id='fallbackbanner-r096ac3bd91f5b284-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner' />
          </div>
          <div className="min-w-0" data-api-unique-id='fallbackbanner-r64ba5c7ae8b67811-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner'>
            <h4 className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2" data-api-unique-id='fallbackbanner-r07adf4dbefb3b737-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner'>
              <span data-api-unique-id='fallbackbanner-rc885d6995b8e71df-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner'>Aktivován záložní režim feedu (FALLBACK)</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-warning text-warning-foreground font-mono font-bold uppercase" data-api-unique-id='fallbackbanner-r1cfb5afbe65412ad-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner'>
                Veřejně aktivní
              </span>
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed" data-api-unique-id='fallbackbanner-r1451e831aded2a08-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner'>
              Veřejným návštěvníkům webu Kus Koláče se namísto automatických dat z Instagram Graph API zobrazují ručně spravované příspěvky ze seznamu níže. Toto zajišťuje 100% dostupnost i při výpadku Meta serverů či expirovaném tokenu.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 sm:self-center" data-api-unique-id='fallbackbanner-rda7da62133408f74-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner'>
          <span className="text-[11px] text-muted-foreground font-mono bg-background/80 px-2 py-1 rounded border border-border" data-api-unique-id='fallbackbanner-r9cd5fe3406883379-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner'>
            Účet: {accountHandle}
          </span>
        </div>
      </div>;
  }
  return <div className="rounded-lg border border-border bg-muted/40 p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted-foreground" data-controller-name="Informační lišta stavu napojení" data-api-unique-id='fallbackbanner-r9802617b5dc46dbb-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner'>
      <div className="flex items-center gap-2 min-w-0" data-api-unique-id='fallbackbanner-r5bdbdd5e396db00a-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner'>
        <Info className="w-4 h-4 text-primary shrink-0" data-api-unique-id='fallbackbanner-r7da880eb295e030a-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner' />
        <span className="truncate" data-api-unique-id='fallbackbanner-r5ea1a6b0f9ce9136-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner'>
          Aktivní režim <strong data-api-unique-id='fallbackbanner-r0a50007ee99afc8a-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner'>Meta Graph API</strong>. Veřejný web čerpá čerstvé příspěvky přímo ze sociální sítě profilu {accountHandle}.
        </span>
      </div>
      <div className="text-[11px] font-mono shrink-0" data-api-unique-id='fallbackbanner-rd40a6001e78b7490-s2447700158' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/FallbackBanner'>
        Záloha připravena pro okamžité přepnutí
      </div>
    </div>;
}