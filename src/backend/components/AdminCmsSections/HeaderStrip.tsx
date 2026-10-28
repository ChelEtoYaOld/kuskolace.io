"use client";

import React from "react";
import { ExternalLink, CheckCircle2, AlertTriangle, Eye, ShieldCheck, Clock } from "lucide-react";
interface HeaderStripProps {
  isWebPublished: boolean;
  hasUnsavedChanges: boolean;
  lastUpdatedText: string;
}
export default function HeaderStrip({
  isWebPublished,
  hasUnsavedChanges,
  lastUpdatedText
}: HeaderStripProps) {
  return <header data-controller-name="Přehled a stav publikace" className="w-full rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm lg:p-5" data-api-unique-id='headerstrip-rd6d6525cb369186a-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" data-api-unique-id='headerstrip-r436fded23d42ac1d-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>
        <div className="min-w-0 flex-1" data-api-unique-id='headerstrip-rb9883f499d16d07f-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>
          <div className="flex flex-wrap items-center gap-2.5" data-api-unique-id='headerstrip-r74c8cc5b64ee0bd7-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>
            <h1 className="font-header text-xl font-bold tracking-tight text-card-foreground sm:text-2xl" data-api-unique-id='headerstrip-r1383942999020ae2-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>
              Správa sekcí a textů webu
            </h1>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground whitespace-nowrap" data-api-unique-id='headerstrip-r2b93efdd7621aff8-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>
              <ShieldCheck className="h-3.5 w-3.5" data-api-unique-id='headerstrip-r2b0e2974bb333388-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip' />
              B07 CMS
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground" data-api-unique-id='headerstrip-r811ff128f5028b68-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>
            Globální publikace a nastavení viditelnosti sekcí veřejné prezentace Kus Koláče včetně uvítacích textů
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0" data-api-unique-id='headerstrip-r6ef4f827dd5f5672-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>
          {/* Status webu */}
          {isWebPublished ? <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-success px-3 py-1 text-xs font-medium text-success-foreground whitespace-nowrap shadow-xs" data-api-unique-id='headerstrip-r553aa80d45b864a2-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>
              <span className="h-2 w-2 rounded-full bg-success-foreground animate-pulse" data-api-unique-id='headerstrip-rc66f62fd270d9063-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip' />
              Veřejný web: Aktivní
            </span> : <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-destructive px-3 py-1 text-xs font-medium text-destructive-foreground whitespace-nowrap shadow-xs" data-api-unique-id='headerstrip-r3c403aa48fa34f59-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>
              <span className="h-2 w-2 rounded-full bg-destructive-foreground" data-api-unique-id='headerstrip-r6f875a451f905dc8-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip' />
              Režim údržby (Skryto)
            </span>}

          {/* Stav synchronizace */}
          {hasUnsavedChanges ? <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-warning px-3 py-1 text-xs font-medium text-warning-foreground whitespace-nowrap shadow-xs" data-api-unique-id='headerstrip-r5a7ac250f669f02f-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>
              <AlertTriangle className="h-3.5 w-3.5" data-api-unique-id='headerstrip-r8511695d269aff9e-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip' />
              Neuložené změny
            </span> : <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground whitespace-nowrap" data-api-unique-id='headerstrip-r9ef2b536ee7a6b8a-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>
              <CheckCircle2 className="h-3.5 w-3.5 text-success" data-api-unique-id='headerstrip-r26107f329bca5dda-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip' />
              Synchronizováno
            </span>}

          {/* Čas poslední aktualizace */}
          {lastUpdatedText ? <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground whitespace-nowrap" data-api-unique-id='headerstrip-re39fda2c2a172eef-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>
              <Clock className="h-3.5 w-3.5" data-api-unique-id='headerstrip-r59c1c20e1d2e622e-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip' />
              <span data-api-unique-id='headerstrip-re8048b56ee8c292a-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>{lastUpdatedText}</span>
            </span> : null}

          {/* Odkaz na veřejný web */}
          <a href="/" target="_blank" rel="noopener noreferrer" title="Otevřít veřejnou prezentaci v novém okně" className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='headerstrip-r34ceb8cc94d407b9-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>
            <Eye className="h-3.5 w-3.5 text-muted-foreground" data-api-unique-id='headerstrip-rde23dfe2c4fde6f1-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip' />
            <span data-api-unique-id='headerstrip-r9d6a28f1ae6d8f3c-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip'>Zobrazit veřejný web</span>
            <ExternalLink className="h-3 w-3 text-muted-foreground" data-api-unique-id='headerstrip-r07cf815ac14741f4-s58185176' data-api-unique-page-name='src/backend/components/AdminCmsSections/HeaderStrip' />
          </a>
        </div>
      </div>
    </header>;
}