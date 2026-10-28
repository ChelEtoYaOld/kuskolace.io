"use client";

import React from "react";
import { Instagram, RefreshCw, Clock, Star, ExternalLink } from "lucide-react";
import { InstagramConfig, InstagramPost } from "@/backend/types/AdminInstagramIntegration";
interface StatsAndMetricsProps {
  config: InstagramConfig;
  posts: InstagramPost[];
  onTriggerSync: () => void;
  isSyncing: boolean;
}
export default function StatsAndMetrics({
  config,
  posts,
  onTriggerSync,
  isSyncing
}: StatsAndMetricsProps) {
  const safePosts = posts ?? [];
  const apiCount = safePosts.filter(p => p.isFromApi).length;
  const manualCount = safePosts.filter(p => !p.isFromApi).length;
  const featuredPost = safePosts.find(p => p.isFeatured);
  const totalLikes = safePosts.reduce((sum, p) => sum + (p.likesCount || 0), 0);
  const instagramHandle = config?.accountHandle || "@kuskolace";
  const cleanHandle = instagramHandle.replace("@", "");
  return <div className="flex flex-col gap-4" data-controller-name="Souhrn a metriky Instagramu" data-api-unique-id='statsandmetrics-r30355b3d48c946c5-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
      {/* Hlavní lišta stránky */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1 border-b border-border" data-api-unique-id='statsandmetrics-rfb57705e7ef8c1ca-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
        <div data-api-unique-id='statsandmetrics-r94658758bcfb721a-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2" data-api-unique-id='statsandmetrics-r73ee6406452c4931-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
            <Instagram className="w-6 h-6 text-primary" data-api-unique-id='statsandmetrics-r7d89ecfbfadc07ca-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics' />
            <span data-api-unique-id='statsandmetrics-ra5b2c717fc718ad4-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>Správa Instagram integrace</span>
          </h1>
          <p className="text-xs lg:text-sm text-muted-foreground mt-0.5" data-api-unique-id='statsandmetrics-r346e31714ca8b46f-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
            Propojení s profilem {instagramHandle}, přepínání záložního feedu a řízení výkladní skříně ranních výpeků
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0" data-api-unique-id='statsandmetrics-r1c1ae6f5753052e2-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
          <a href={`https://www.instagram.com/${cleanHandle}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-background text-foreground hover:bg-muted transition-colors" data-api-unique-id='statsandmetrics-rd8a90f25a98e0dce-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
            <span data-api-unique-id='statsandmetrics-re5ff1d6515d2fa19-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>Instagram profil</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" data-api-unique-id='statsandmetrics-rf728252ec77ee394-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics' />
          </a>

          <button type="button" onClick={onTriggerSync} disabled={isSyncing} className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none shadow-sm" data-api-unique-id='statsandmetrics-ref9a58cd301707a8-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} data-api-unique-id='statsandmetrics-r1f0daa0169e92501-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics' />
            <span data-api-unique-id='statsandmetrics-r9abe5c74ce006b41-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>{isSyncing ? "Synchronizuji..." : "Synchronizovat nyní"}</span>
          </button>
        </div>
      </div>

      {/* Rychlé informační KPI dlaždice */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3" data-api-unique-id='statsandmetrics-r4766796487736f8b-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
        {/* Stav propojení a aktivní režim */}
        <div className="bg-card text-card-foreground rounded-lg border border-border p-3.5 flex flex-col justify-between shadow-sm" data-api-unique-id='statsandmetrics-re0b6e40d5266be78-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
          <div className="flex items-center justify-between gap-2 min-w-0" data-api-unique-id='statsandmetrics-r2fc6d48e59e97993-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
            <span className="text-xs text-muted-foreground truncate font-medium" data-api-unique-id='statsandmetrics-r5a7f1004be4d56b4-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>Režim zobrazení na webu</span>
            <span className={`inline-flex shrink-0 items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${config?.feedMode === "API" ? "bg-primary text-primary-foreground" : "bg-warning text-warning-foreground"}`} data-api-unique-id='statsandmetrics-rf0efa594facbb3a5-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
              {config?.feedMode === "API" ? "Meta Graph API" : "FALLBACK (Záložní)"}
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between" data-api-unique-id='statsandmetrics-rfa32325c5aa50cd5-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
            <span className="text-lg font-bold font-mono tracking-tight text-foreground" data-api-unique-id='statsandmetrics-raea4dbbae10d658c-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
              {config?.feedMode === "API" ? "Automatický" : "Ruční správa"}
            </span>
            <span className="text-xs text-muted-foreground" data-api-unique-id='statsandmetrics-r6f2760d4bcec48ce-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
              {config?.autoSync ? "Auto-sync zapnut" : "Auto-sync pozastaven"}
            </span>
          </div>
        </div>

        {/* Počty příspěvků */}
        <div className="bg-card text-card-foreground rounded-lg border border-border p-3.5 flex flex-col justify-between shadow-sm" data-api-unique-id='statsandmetrics-r7cc2eb7fa66b4322-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
          <div className="flex items-center justify-between gap-2 min-w-0" data-api-unique-id='statsandmetrics-r28cd1c01f55ed84d-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
            <span className="text-xs text-muted-foreground truncate font-medium" data-api-unique-id='statsandmetrics-rc52c3c426d85f6cd-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>Příspěvky ve feedu</span>
            <span className="inline-flex shrink-0 items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-secondary text-secondary-foreground font-semibold whitespace-nowrap" data-api-unique-id='statsandmetrics-r629e49e686c31aed-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
              {safePosts.length} aktivních
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between text-xs" data-api-unique-id='statsandmetrics-rda5024008c84431c-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
            <div className="flex items-center gap-1.5 font-mono" data-api-unique-id='statsandmetrics-rdc1968ae12eb56eb-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
              <span className="text-lg font-bold tracking-tight text-foreground" data-api-unique-id='statsandmetrics-r6928305b2fe3ed2e-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>{apiCount}</span>
              <span className="text-muted-foreground" data-api-unique-id='statsandmetrics-rb4852d3ded3e72ab-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>z API</span>
              <span className="text-muted-foreground" data-api-unique-id='statsandmetrics-r28e8a5c584db81b3-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>/</span>
              <span className="text-lg font-bold tracking-tight text-foreground" data-api-unique-id='statsandmetrics-r311e59c69bbdb23c-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>{manualCount}</span>
              <span className="text-muted-foreground" data-api-unique-id='statsandmetrics-r5d821515f259f095-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>ručně</span>
            </div>
            <span className="text-muted-foreground font-mono" data-api-unique-id='statsandmetrics-r921645fe3173555d-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
              ♥ {totalLikes.toLocaleString("cs-CZ")} lajků
            </span>
          </div>
        </div>

        {/* Poslední synchronizace a hlavní poutač */}
        <div className="bg-card text-card-foreground rounded-lg border border-border p-3.5 flex flex-col justify-between shadow-sm sm:col-span-2 xl:col-span-1" data-api-unique-id='statsandmetrics-r8886edef54b17d8e-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
          <div className="flex items-center justify-between gap-2 min-w-0" data-api-unique-id='statsandmetrics-r0677056bbc0a0e35-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
            <span className="text-xs text-muted-foreground truncate font-medium" data-api-unique-id='statsandmetrics-r8a0d82f10ca3c581-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>Poslední synchronizace</span>
            <span className="inline-flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground font-mono" data-api-unique-id='statsandmetrics-r65dd5358854a922d-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
              <Clock className="w-3 h-3 text-primary" data-api-unique-id='statsandmetrics-r85275c19e91949c9-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics' />
              <span data-api-unique-id='statsandmetrics-r982951d78c6cd6e0-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>{config?.lastSyncAt || "Zatím nespuštěno"}</span>
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs" data-api-unique-id='statsandmetrics-rb5c1f8e9aebac8a6-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
            <span className="text-muted-foreground truncate" data-api-unique-id='statsandmetrics-rcb3f74c9b9750996-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>Hlavní zvýrazněný výpek:</span>
            {featuredPost ? <span className="inline-flex items-center gap-1 font-medium text-foreground truncate max-w-[160px]" data-api-unique-id='statsandmetrics-r77dd7460ee0b39e4-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>
                <Star className="w-3 h-3 text-warning fill-warning shrink-0" data-api-unique-id='statsandmetrics-rbc5f814fee55ccb8-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics' />
                <span className="truncate" data-api-unique-id='statsandmetrics-r466e0bfc04021859-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>{featuredPost.caption.slice(0, 22)}...</span>
              </span> : <span className="text-muted-foreground italic" data-api-unique-id='statsandmetrics-r969568edcbf38908-s494235722' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/StatsAndMetrics'>Není vybrán</span>}
          </div>
        </div>
      </div>
    </div>;
}