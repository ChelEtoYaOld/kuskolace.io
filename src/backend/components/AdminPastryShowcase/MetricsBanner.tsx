"use client";

import React from "react";
import { PastryItem } from "@/backend/types/AdminPastryShowcase";
import { Sparkles, Cookie, AlertCircle } from "lucide-react";
interface MetricsBannerProps {
  items: PastryItem[];
}
export default function MetricsBanner({
  items = []
}: MetricsBannerProps) {
  const safeItems = items || [];
  const totalCount = safeItems.length;
  const soldOutCount = safeItems.filter(item => item.isSoldOut).length;
  const availableCount = totalCount - soldOutCount;
  const todaySpecialItem = safeItems.find(item => item.isTodaySpecial);
  return <div data-controller-name="Souhrnné metriky vitríny" className="w-full grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" data-api-unique-id='metricsbanner-r0471e29d709ac3eb-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
      {/* Celková denní nabídka */}
      <div className="flex min-w-0 flex-col justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='metricsbanner-re9b1b2ccad3a06e8-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
        <div className="flex items-center justify-between gap-2 min-w-0" data-api-unique-id='metricsbanner-r145a0a79da6319c2-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
          <span className="min-w-0 truncate text-xs font-medium text-muted-foreground uppercase tracking-wider" data-api-unique-id='metricsbanner-r2136f7c044f8e56b-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
            Denní vitrína celkem
          </span>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary" data-api-unique-id='metricsbanner-rcb465a821ca0d459-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
            <Cookie className="h-4 w-4" data-api-unique-id='metricsbanner-r0c10d3d15d9c45e2-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner' />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-2 min-w-0" data-api-unique-id='metricsbanner-rfd57ea66235cdd2d-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
          <div className="text-2xl font-bold tracking-tight text-foreground font-mono" data-api-unique-id='metricsbanner-r962bf46f52c9e8d2-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
            {totalCount} <span className="text-xs font-normal text-muted-foreground" data-api-unique-id='metricsbanner-r016a6340ab8d7c5d-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>druhů pečiva</span>
          </div>
          <span className="inline-flex shrink-0 items-center rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success whitespace-nowrap" data-api-unique-id='metricsbanner-r93b5b106b616c06b-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
            {availableCount} na pultu
          </span>
        </div>
      </div>

      {/* Vyprodáno */}
      <div className="flex min-w-0 flex-col justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='metricsbanner-r3a43064e7fe09bff-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
        <div className="flex items-center justify-between gap-2 min-w-0" data-api-unique-id='metricsbanner-r9c64b993e87e8288-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
          <span className="min-w-0 truncate text-xs font-medium text-muted-foreground uppercase tracking-wider" data-api-unique-id='metricsbanner-rfef6d9a5675f1c85-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
            Stav vyprodání
          </span>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive" data-api-unique-id='metricsbanner-r229eca8b9826a90f-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
            <AlertCircle className="h-4 w-4" data-api-unique-id='metricsbanner-rd43ac9847f60ad59-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner' />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-2 min-w-0" data-api-unique-id='metricsbanner-rd24eeb4aa6f9e17d-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
          <div className="text-2xl font-bold tracking-tight text-foreground font-mono" data-api-unique-id='metricsbanner-r85a69d45b43cff0f-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
            {soldOutCount} <span className="text-xs font-normal text-muted-foreground" data-api-unique-id='metricsbanner-r8e3e226c007925a4-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>vyprodáno</span>
          </div>
          <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${soldOutCount > 0 ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`} data-api-unique-id='metricsbanner-ra75786a59797a3b3-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
            {soldOutCount > 0 ? "Nutno dopéct / označit" : "Vše dostupné"}
          </span>
        </div>
      </div>

      {/* Dnešní specialita */}
      <div className="flex min-w-0 flex-col justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm sm:col-span-2 xl:col-span-1" data-api-unique-id='metricsbanner-ra1c5d5fbd93576e4-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
        <div className="flex items-center justify-between gap-2 min-w-0" data-api-unique-id='metricsbanner-rc9584f64fd6a9e98-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
          <span className="min-w-0 truncate text-xs font-medium text-muted-foreground uppercase tracking-wider" data-api-unique-id='metricsbanner-rdfaf631aeea15109-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
            Dnešní vlajková specialita
          </span>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-warning/10 text-warning" data-api-unique-id='metricsbanner-rc9a88b1da88e0131-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
            <Sparkles className="h-4 w-4" data-api-unique-id='metricsbanner-r10e3a7ad75f75ede-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner' />
          </div>
        </div>
        <div className="mt-2 min-w-0" data-api-unique-id='metricsbanner-rf09b18aa751c2219-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
          {todaySpecialItem ? <div className="min-w-0" data-api-unique-id='metricsbanner-r1ac804eccf7db98d-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
              <div className="truncate font-semibold text-foreground text-sm" title={todaySpecialItem.name} data-api-unique-id='metricsbanner-rd198ccd0e1c521fd-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
                {todaySpecialItem.name}
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground" data-api-unique-id='metricsbanner-r7f14c8636f6f0aae-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
                <span className="font-mono font-medium text-primary" data-api-unique-id='metricsbanner-rd63b48a57c8943c0-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>{todaySpecialItem.priceCzk} Kč</span>
                <span data-api-unique-id='metricsbanner-r3e070ebe94be685b-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>•</span>
                <span className="truncate" data-api-unique-id='metricsbanner-r093c9a18763bf4d6-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>{todaySpecialItem.freshnessLabel}</span>
              </div>
            </div> : <div className="text-xs text-muted-foreground italic py-1" data-api-unique-id='metricsbanner-r1b4fcc7737bb5b6c-s3557431496' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/MetricsBanner'>
              Žádná položka není označena jako dnešní specialita.
            </div>}
        </div>
      </div>
    </div>;
}