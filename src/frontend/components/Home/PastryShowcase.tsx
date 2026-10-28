"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { generatedImage000001, generatedImagesByFilename } from "@/lib/generated-images/frontend-home";
import type { PastryCategoryFilter, PastryItem, CmsConfig } from "@/frontend/types/Home";
import { Sparkles, Info, ChevronRight, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
interface PastryShowcaseProps {
  items: PastryItem[];
  selectedCategory: PastryCategoryFilter;
  onSelectCategory: (category: PastryCategoryFilter) => void;
  activePastryModal: PastryItem | null;
  onOpenModal: (item: PastryItem) => void;
  onCloseModal: () => void;
  cmsConfig?: CmsConfig | null;
}
export default function PastryShowcase({
  items = [],
  selectedCategory,
  onSelectCategory,
  activePastryModal,
  onOpenModal,
  onCloseModal,
  cmsConfig
}: PastryShowcaseProps) {
  if (cmsConfig && !cmsConfig.isShowcaseVisible) {
    return null;
  }
  const categories: {
    key: PastryCategoryFilter;
    label: string;
  }[] = [{
    key: "ALL",
    label: "Všechno čerstvé pečivo"
  }, {
    key: "OVOCNE_KOLACE",
    label: "Ovocné koláče"
  }, {
    key: "KYNUTE_BUCHTY_A_LOUPAKY",
    label: "Kynuté buchty"
  }, {
    key: "SLANE_PECIVO",
    label: "Slané pečení"
  }];
  const safeItems = items || [];
  const filteredItems = selectedCategory === "ALL" ? safeItems : safeItems.filter(item => item.category === selectedCategory);
  const flagshipItem = safeItems.find(i => i.isTodaySpecial) || safeItems[0];
  const standardItems = flagshipItem ? filteredItems.filter(i => i.id !== flagshipItem.id) : filteredItems;
  const getImageSrc = (item: PastryItem) => {
    if (item.photoKey && item.photoKey in generatedImagesByFilename) {
      return generatedImagesByFilename[item.photoKey as keyof typeof generatedImagesByFilename] || item.photoKey;
    }
    return item.photoKey || generatedImage000001;
  };
  return <section id="vitrina" data-controller-name="Vitrína dnešního pečiva pekárny" className="w-full bg-background py-16 sm:py-24 border-t border-border" data-api-unique-id='pastryshowcase-raa25d190ca8a7bbc-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-10" data-api-unique-id='pastryshowcase-r33de92569342a51e-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
        {/* Section Header & Category Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" data-api-unique-id='pastryshowcase-rd4c46f0fc4e0ac2c-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
          <div className="space-y-3 max-w-2xl" data-api-unique-id='pastryshowcase-r576538ab6bb5ebb4-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground" data-api-unique-id='pastryshowcase-r5aa2ee7f966b82c2-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
              Dnešní vitrína pečiva
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground" data-api-unique-id='pastryshowcase-rafee3447593bbd92-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
              Pečeme každé ráno od 05:00 na Korunní 90. Používáme výhradně 84% české máslo, bio mouku a sezónní ovoce.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2" data-api-unique-id='pastryshowcase-r6d2c110dd990b7fb-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
            {categories.map((cat, index) => {
            const isSelected = selectedCategory === cat.key;
            return <button key={cat.key} type="button" aria-pressed={isSelected} onClick={() => onSelectCategory(cat.key)} className={`inline-flex shrink-0 items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isSelected ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='pastryshowcase-r5e665cc23ed4b136-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1' data-api-bind-info={`categories-${index}-label`} data-api-map-var-name='cat'>
                  {cat.label}
                </button>;
          })}
          </div>
        </div>

        {/* Flagship Hero Card - Golden highlight for the authentic Koláč */}
        {flagshipItem && (selectedCategory === "ALL" || selectedCategory === flagshipItem.category) && <article className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm transition-all hover:border-primary/40 hover:shadow-md" data-api-unique-id='pastryshowcase-r78e07272f47690c3-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center" data-api-unique-id='pastryshowcase-ra6ba2ed731cad8ef-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
              {/* Flagship Image */}
              <div className="lg:col-span-6 relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted" data-api-unique-id='pastryshowcase-r5245eff4e596b183-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                <EditableImg propKey="flagship-kolac-img" src={getImageSrc(flagshipItem)} alt={flagshipItem.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-api-unique-id='pastryshowcase-r6ac539cae0802e6d-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' />
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5" data-api-unique-id='pastryshowcase-r84eeda0303c92e9d-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-sm" data-api-unique-id='pastryshowcase-r68f986a4d1695650-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                    <Sparkles className="h-3.5 w-3.5" data-api-unique-id='pastryshowcase-r7d885a6e7f62b5d4-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' />
                    <span data-api-unique-id='pastryshowcase-r1e44f193976dfcbc-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>{flagshipItem.freshnessLabel}</span>
                  </div>
                  {flagshipItem.isSoldOut && <div className="inline-flex items-center rounded-full bg-destructive text-destructive-foreground px-2.5 py-1 text-xs font-semibold shadow-sm" data-api-unique-id='pastryshowcase-r33bb5f5f1cc3aa09-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                      Vyprodáno
                    </div>}
                </div>
              </div>

              {/* Flagship Content */}
              <div className="lg:col-span-6 flex flex-col justify-center space-y-4" data-api-unique-id='pastryshowcase-rb2037689cad364f2-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                <div className="space-y-2" data-api-unique-id='pastryshowcase-r7563ff7d8cc80a4f-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary" data-api-unique-id='pastryshowcase-rffe8d114432c8d00-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                    Vlajková řemeslná specialita
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-card-foreground" data-api-unique-id='pastryshowcase-r1df007ce599f9dd7-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                    {flagshipItem.name}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed" data-api-unique-id='pastryshowcase-r783e20837fad4d59-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                    {flagshipItem.fullDescription || flagshipItem.shortDescription}
                  </p>
                </div>

                {/* Key ingredients badges */}
                <div className="flex flex-wrap gap-2 pt-1" data-api-unique-id='pastryshowcase-r7208737b3afcb644-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                  <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground" data-api-unique-id='pastryshowcase-r1d68e96f9c1f1c2c-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                    Jihočeské máslo & tvaroh
                  </span>
                  <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground" data-api-unique-id='pastryshowcase-r4cc56d3cddf1f54f-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                    Hustá křupavá drobenka
                  </span>
                </div>

                {/* Bottom Row: Price & Details Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border" data-api-unique-id='pastryshowcase-ra7f17c0da76a1623-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                  <div data-api-unique-id='pastryshowcase-r6388c4d571fb89d9-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                    <span className="text-2xl sm:text-3xl font-bold text-card-foreground" data-api-unique-id='pastryshowcase-r2f37fdfc05d0a967-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                      {flagshipItem.priceCzk} Kč
                    </span>
                    <span className="text-xs text-muted-foreground ml-2" data-api-unique-id='pastryshowcase-rd6d012f6ec7aad9d-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>/ kus (velká porce)</span>
                  </div>

                  <button type="button" onClick={() => onOpenModal(flagshipItem)} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 active:bg-primary/80 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='pastryshowcase-rad48f1b7aa51c188-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                    <span data-api-unique-id='pastryshowcase-r954b595b66883847-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>Složení a alergeny</span>
                    <Info className="h-4 w-4" data-api-unique-id='pastryshowcase-r139a1f4e98b8c3b7-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' />
                  </button>
                </div>
              </div>
            </div>
          </article>}

        {/* Standard Pastry Cards Grid */}
        {standardItems.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-api-unique-id='pastryshowcase-r41e7518c84885dd0-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
            {standardItems.map((item, index) => <article key={item.id} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md" data-api-unique-id='pastryshowcase-r5849418ff26b67ea-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1'>
                {/* Card Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted mb-4" data-api-unique-id='pastryshowcase-r7303121217769c3f-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1'>
                  <EditableImg propKey={`pastry-card-${item.id}`} src={getImageSrc(item)} alt={item.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" data-api-unique-id='pastryshowcase-r435ee76fda5b13ab-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1' />
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1.5" data-api-unique-id='pastryshowcase-r80c821b71cfb8a0a-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1'>
                    <span className="inline-flex items-center rounded-full bg-card border border-border px-2.5 py-0.5 text-xs font-medium text-card-foreground shadow-sm" data-api-unique-id='pastryshowcase-r6c97bb7aa715b697-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1' data-api-bind-info={`standardItems-${index}-freshnessLabel`} data-api-map-var-name='item'>
                      {item.freshnessLabel}
                    </span>
                    {item.isSoldOut && <span className="inline-flex items-center rounded-full bg-destructive/10 border border-destructive/20 px-2 py-0.5 text-xs font-semibold text-destructive shadow-sm" data-api-unique-id='pastryshowcase-r9b76cdd2663b4a98-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1'>
                        Vyprodáno
                      </span>}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="flex-1 space-y-2" data-api-unique-id='pastryshowcase-r15ec4d62b620f802-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1'>
                  <h3 className="font-display text-xl font-bold text-card-foreground line-clamp-1" data-api-unique-id='pastryshowcase-rfee8fd08d5b6c043-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1' data-api-bind-info={`standardItems-${index}-name`} data-api-map-var-name='item'>
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2" data-api-unique-id='pastryshowcase-r5e15b7e7c42caacf-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1' data-api-bind-info={`standardItems-${index}-shortDescription`} data-api-map-var-name='item'>
                    {item.shortDescription}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="mt-5 flex min-w-0 flex-col gap-3 border-t border-border pt-4" data-api-unique-id='pastryshowcase-r1aa63e72f584ca47-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1'>
                  <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-2" data-api-unique-id='pastryshowcase-r229f6d02d2cceea9-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1'>
                    <span className="text-xl font-bold text-card-foreground" data-api-unique-id='pastryshowcase-ra9d83f545f853bc3-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1' data-api-bind-info={`standardItems-${index}-priceCzk`} data-api-map-var-name='item'>
                      {item.priceCzk} Kč
                    </span>
                    <span className="text-xs text-muted-foreground" data-api-unique-id='pastryshowcase-ra9a2af8253d52ed2-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1'>Čerstvě napečeno</span>
                  </div>

                  <button type="button" onClick={() => onOpenModal(item)} className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-card py-2 text-xs font-semibold text-card-foreground shadow-sm hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='pastryshowcase-rc3b5b41d10717ab8-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1'>
                    <span data-api-unique-id='pastryshowcase-r2d48e8af5e5739f2-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1'>Detail složení</span>
                    <ChevronRight className="h-3.5 w-3.5" data-api-unique-id='pastryshowcase-r0348d0650bf3468e-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1' />
                  </button>
                </div>
              </article>)}
          </div>}

        {safeItems.length === 0 && <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground" data-api-unique-id='pastryshowcase-r7f34b30de13c5a14-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
            Vitrína se právě připravuje. Dnes ráno pro vás pečeme čerstvou várku.
          </div>}
      </div>

      {/* Pastry Detail Dialog */}
      <Dialog open={!!activePastryModal} onOpenChange={open => !open && onCloseModal()} data-api-unique-id='pastryshowcase-r2c97c513459cc1f4-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
        {activePastryModal && <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-lg bg-card text-card-foreground border-border" data-api-unique-id='pastryshowcase-r1f9abb1de05288fe-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
            <DialogHeader className="space-y-2" data-api-unique-id='pastryshowcase-r75cc63c34f831034-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
              <div className="flex items-center justify-between" data-api-unique-id='pastryshowcase-r2540234f6641c146-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                <div className="flex items-center gap-2" data-api-unique-id='pastryshowcase-r23c0f5c3859a8b55-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                  <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground" data-api-unique-id='pastryshowcase-r4cf1c699b66707f1-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                    {activePastryModal.freshnessLabel}
                  </span>
                  {activePastryModal.isSoldOut && <span className="inline-flex items-center rounded-full bg-destructive/10 text-destructive border border-destructive/20 px-2 py-0.5 text-xs font-semibold" data-api-unique-id='pastryshowcase-ra99b993923c12f59-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                      Vyprodáno
                    </span>}
                </div>
                <span className="text-lg font-bold text-primary" data-api-unique-id='pastryshowcase-r6524f6b3959ab173-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                  {activePastryModal.priceCzk} Kč
                </span>
              </div>
              <DialogTitle className="font-display text-2xl font-bold text-card-foreground" data-api-unique-id='pastryshowcase-rf54dc6d7a3d1c8f4-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                {activePastryModal.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground" data-api-unique-id='pastryshowcase-r14025ea54630ec94-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                {activePastryModal.fullDescription || activePastryModal.shortDescription}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-3 border-t border-border" data-api-unique-id='pastryshowcase-r12d1bc10e28025e3-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
              {/* Ingredients */}
              {activePastryModal.ingredients && activePastryModal.ingredients.length > 0 && <div className="space-y-2" data-api-unique-id='pastryshowcase-r34047c07293eaf54-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-card-foreground" data-api-unique-id='pastryshowcase-ra7c1a2e95b9b88b3-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                    Hlavní poctivé suroviny
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground" data-api-unique-id='pastryshowcase-r13f5522e7d0bf8e5-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                    {activePastryModal.ingredients.map((ing, index) => <li key={index} className="flex items-center gap-2" data-api-unique-id='pastryshowcase-rdd350842847a8f42-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1'>
                        <Check className="h-3.5 w-3.5 text-primary shrink-0" data-api-unique-id='pastryshowcase-rad130a8ac13503fe-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1' />
                        <span data-api-unique-id='pastryshowcase-re3471cf54ed42dbf-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase' data-api-in-loop='1' data-api-bind-info={`activePastryModal.ingredients-${index}-$item`} data-api-map-var-name='ing'>{ing}</span>
                      </li>)}
                  </ul>
                </div>}

              {/* Allergens */}
              {activePastryModal.allergens && activePastryModal.allergens.length > 0 && <div className="space-y-1.5 bg-muted rounded-lg p-3 text-xs text-muted-foreground" data-api-unique-id='pastryshowcase-r751ebb54f53c1d8d-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                  <span className="font-semibold text-card-foreground" data-api-unique-id='pastryshowcase-r249b3b3b2495ef56-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>Alergeny: </span>
                  {activePastryModal.allergens.join(", ")}
                </div>}

              {/* Takeaway note */}
              <p className="text-xs text-muted-foreground italic" data-api-unique-id='pastryshowcase-r4eb4bb680acb6279-s4236188478' data-api-unique-page-name='src/frontend/components/Home/PastryShowcase'>
                Pečivo je připraveno k okamžitému nákupu s sebou na Korunní 90. Rezervace ani rozvoz neposkytujeme z důvodu zachování nejvyšší čerstvosti.
              </p>
            </div>
          </DialogContent>}
      </Dialog>
    </section>;
}