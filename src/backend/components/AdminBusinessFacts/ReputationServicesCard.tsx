"use client";

import React from "react";
import { BusinessFacts } from "@/backend/types/AdminBusinessFacts";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Star, ShoppingBag, Truck, Banknote, ThumbsUp } from "lucide-react";
interface ReputationServicesCardProps {
  facts: BusinessFacts;
  onChange: (updatedFacts: BusinessFacts) => void;
}
export default function ReputationServicesCard({
  facts,
  onChange
}: ReputationServicesCardProps) {
  const handleTextChange = (field: keyof BusinessFacts, value: string) => {
    onChange({
      ...facts,
      [field]: value
    });
  };
  const handleNumberChange = (field: "ratingScore" | "reviewsCount", value: string) => {
    const num = field === "reviewsCount" ? parseInt(value, 10) : parseFloat(value);
    onChange({
      ...facts,
      [field]: isNaN(num) ? 0 : num
    });
  };
  const handleToggle = (field: "takeawayAvailable" | "deliveryAvailable", checked: boolean) => {
    onChange({
      ...facts,
      [field]: checked
    });
  };
  return <section data-controller-name="Reputace a dostupné služby pekárny" className="flex min-w-0 flex-col rounded-xl border border-border bg-card p-4 sm:p-6 text-card-foreground shadow-sm" data-api-unique-id='reputationservicescard-r0c1db6e509e8ad2a-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
      <div className="flex items-center gap-2 border-b border-border/80 pb-3" data-api-unique-id='reputationservicescard-rddbdafaeaecbac41-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
        <Star className="h-5 w-5 text-warning" data-api-unique-id='reputationservicescard-rab2e80d96ee527e0-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard' />
        <div data-api-unique-id='reputationservicescard-r47e97c9a4c2672dc-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
          <h2 className="text-base sm:lg font-bold tracking-tight text-card-foreground" data-api-unique-id='reputationservicescard-rfc52c60875b1d421-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
            Reputace & nabídka služeb
          </h2>
          <p className="text-xs text-muted-foreground" data-api-unique-id='reputationservicescard-r811cb6bb01d74fdd-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
            Data převzatá z mapového profilu a režimy odběru pečiva
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-5" data-api-unique-id='reputationservicescard-rbf781e81cf5c70b9-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
        {/* Číselné parametry: Cena, Hodnocení, Recenze */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3" data-api-unique-id='reputationservicescard-r80e80c772a208eab-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
          {/* Cenové rozpětí */}
          <div data-api-unique-id='reputationservicescard-r3173c2ae304e2645-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
            <label htmlFor="price-range" className="block text-xs font-semibold text-card-foreground mb-1.5" data-api-unique-id='reputationservicescard-r3f4842029af23982-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
              Cenová hladina
            </label>
            <div className="relative flex items-center" data-api-unique-id='reputationservicescard-rc06412fb56e4d632-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
              <Banknote className="absolute left-2.5 h-4 w-4 text-muted-foreground pointer-events-none" data-api-unique-id='reputationservicescard-r0aae74252a655285-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard' />
              <Input id="price-range" type="text" maxLength={50} value={facts.priceRangeCzk ?? ""} onChange={e => handleTextChange("priceRangeCzk", e.target.value)} placeholder="100–200 Kč" className="h-9 text-xs pl-8 font-mono" data-api-unique-id='reputationservicescard-r0cb778df856ae7a8-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard' />
            </div>
          </div>

          {/* Průměrné hodnocení */}
          <div data-api-unique-id='reputationservicescard-r2cb46094327bb488-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
            <label htmlFor="rating-score" className="block text-xs font-semibold text-card-foreground mb-1.5" data-api-unique-id='reputationservicescard-rcb9f97ca00c0834d-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
              Průměrné hodnocení (1–5)
            </label>
            <div className="relative flex items-center" data-api-unique-id='reputationservicescard-rb83a9cfbcb1eed2e-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
              <Star className="absolute left-2.5 h-4 w-4 text-warning pointer-events-none" data-api-unique-id='reputationservicescard-r361042c2315ee30d-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard' />
              <Input id="rating-score" type="number" step="0.1" min="1" max="5" value={facts.ratingScore ?? 0} onChange={e => handleNumberChange("ratingScore", e.target.value)} className="h-9 text-xs pl-8 font-mono" data-api-unique-id='reputationservicescard-r1835b94241a97143-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard' />
            </div>
          </div>

          {/* Počet recenzí */}
          <div data-api-unique-id='reputationservicescard-rba3fa5d78390520e-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
            <label htmlFor="reviews-count" className="block text-xs font-semibold text-card-foreground mb-1.5" data-api-unique-id='reputationservicescard-ref99d77787824145-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
              Počet recenzí
            </label>
            <div className="relative flex items-center" data-api-unique-id='reputationservicescard-r3d5e76c2fd6e474f-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
              <ThumbsUp className="absolute left-2.5 h-4 w-4 text-muted-foreground pointer-events-none" data-api-unique-id='reputationservicescard-ra2a43a25ed8103ae-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard' />
              <Input id="reviews-count" type="number" step="1" min="0" value={facts.reviewsCount ?? 0} onChange={e => handleNumberChange("reviewsCount", e.target.value)} className="h-9 text-xs pl-8 font-mono" data-api-unique-id='reputationservicescard-rd3f06dfdde9402d6-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard' />
            </div>
          </div>
        </div>

        {/* Přepínače služeb: Osobní odběr / Rozvoz */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-1 border-t border-border/50" data-api-unique-id='reputationservicescard-r8bd57fddf1e8920f-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
          {/* Osobní odběr (takeaway) */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3" data-api-unique-id='reputationservicescard-r86a6c732057d4cbe-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
            <div className="flex items-center gap-2.5" data-api-unique-id='reputationservicescard-r8e4c6a5c4da8c1d2-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary" data-api-unique-id='reputationservicescard-rcdbfd960552158c7-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
                <ShoppingBag className="h-4 w-4" data-api-unique-id='reputationservicescard-r996723034f4c2352-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard' />
              </div>
              <div data-api-unique-id='reputationservicescard-r7439e6425280c090-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
                <span className="block text-xs font-bold text-card-foreground" data-api-unique-id='reputationservicescard-rc5f57fc204896630-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
                  Osobní odběr (S sebou)
                </span>
                <span className="block text-[11px] text-muted-foreground" data-api-unique-id='reputationservicescard-rf34ebdd7c7dfb3f5-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
                  {facts.takeawayAvailable ? "Aktivní v nabídce" : "Dočasně pozastaveno"}
                </span>
              </div>
            </div>
            <Switch id="switch-takeaway" checked={Boolean(facts.takeawayAvailable)} onCheckedChange={checked => handleToggle("takeawayAvailable", checked)} data-api-unique-id='reputationservicescard-r24c0e3c86522788a-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard' />
          </div>

          {/* Rozvoz (delivery) */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3" data-api-unique-id='reputationservicescard-rdbf3c09d8ffb0035-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
            <div className="flex items-center gap-2.5" data-api-unique-id='reputationservicescard-r9e30b22142571fa4-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground" data-api-unique-id='reputationservicescard-r58112a43fed1451b-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
                <Truck className="h-4 w-4" data-api-unique-id='reputationservicescard-r06c993f7ddbd9424-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard' />
              </div>
              <div data-api-unique-id='reputationservicescard-rdde86ae24bc53adf-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
                <span className="block text-xs font-bold text-card-foreground" data-api-unique-id='reputationservicescard-r860644fd13036e89-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
                  Doručovací služba / Rozvoz
                </span>
                <span className="block text-[11px] text-muted-foreground" data-api-unique-id='reputationservicescard-re92128d3f123c311-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard'>
                  {facts.deliveryAvailable ? "Kurýrní služba aktivní" : "Pouze na místě"}
                </span>
              </div>
            </div>
            <Switch id="switch-delivery" checked={Boolean(facts.deliveryAvailable)} onCheckedChange={checked => handleToggle("deliveryAvailable", checked)} data-api-unique-id='reputationservicescard-rf82853a4de14b8f5-s677422575' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ReputationServicesCard' />
          </div>
        </div>
      </div>
    </section>;
}