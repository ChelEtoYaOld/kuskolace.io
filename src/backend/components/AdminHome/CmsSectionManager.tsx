"use client";

import React, { useState, useEffect } from "react";
import type { CmsConfigDto, UpdateCmsTextsInput } from "@/backend/types/AdminHome";
import { Eye, EyeOff, FileText, Check } from "lucide-react";
import { toast } from "sonner";
export type CmsSectionKey = "isWebPublished" | "isStoryVisible" | "isShowcaseVisible" | "isInstagramVisible" | "isContactVisible";
export type CmsSectionVisibility = Pick<CmsConfigDto, "isWebPublished" | "isStoryVisible" | "isShowcaseVisible" | "isInstagramVisible" | "isContactVisible">;
export type CmsContentTexts = UpdateCmsTextsInput;
interface CmsSectionManagerProps {
  visibility: CmsSectionVisibility;
  texts: CmsContentTexts;
  onToggleSection: (key: keyof CmsSectionVisibility) => void;
  onUpdateTexts: (texts: CmsContentTexts) => void;
}
export default function CmsSectionManager({
  visibility,
  texts,
  onToggleSection,
  onUpdateTexts
}: CmsSectionManagerProps) {
  const [isEditingTexts, setIsEditingTexts] = useState(false);
  const [formTexts, setFormTexts] = useState<CmsContentTexts>(texts);
  useEffect(() => {
    if (texts) {
      setFormTexts(texts);
    }
  }, [texts]);
  const sectionsConfig: {
    key: keyof CmsSectionVisibility;
    name: string;
    description: string;
  }[] = [{
    key: "isWebPublished",
    name: "Veřejný stav webu",
    description: "Hlavní vypínač dostupnosti online prezentace kuskolace.cz"
  }, {
    key: "isStoryVisible",
    name: "Příběh pekárny",
    description: "Vyprávění o řemeslných receptech a poctivém másle na Korunní"
  }, {
    key: "isShowcaseVisible",
    name: "Vitrína pečiva",
    description: "Denní nabídka borůvkových koláčů, loupáků a buchet"
  }, {
    key: "isInstagramVisible",
    name: "Instagram feed (@kuskolace)",
    description: "Mřížka ranních příspěvků načítaná přímo ze sociální sítě"
  }, {
    key: "isContactVisible",
    name: "Kontakt & Otevírací doba",
    description: "Adresa Korunní 90, telefon a týdenní rozpis od 08:00"
  }];
  const handleSaveTexts = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTexts.welcomeHeading.trim()) {
      toast.error("Hlavní nadpis nemůže být prázdný");
      return;
    }
    onUpdateTexts(formTexts);
    setIsEditingTexts(false);
    toast.success("Texty CMS byly úspěšně uloženy");
  };
  return <div data-controller-name="Správa obsahu a sekcí" className="flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='cmssectionmanager-r38b0e44276276f01-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
      {/* Hlavička boxu */}
      <div className="flex min-w-0 items-center justify-between" data-api-unique-id='cmssectionmanager-r6e08edc39937b40c-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
        <div className="min-w-0" data-api-unique-id='cmssectionmanager-r139e58f368381193-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
          <h2 className="font-header text-base font-semibold tracking-tight text-foreground" data-api-unique-id='cmssectionmanager-r4bfe05ade0119a2d-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
            Viditelnost sekcí & CMS
          </h2>
          <p className="text-xs text-muted-foreground" data-api-unique-id='cmssectionmanager-r49ff8172c9bb220e-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
            Přepínání zobrazení sekcí a náhled uvítací textace webu
          </p>
        </div>

        <button type="button" onClick={() => {
        if (!isEditingTexts && texts) {
          setFormTexts(texts);
        }
        setIsEditingTexts(!isEditingTexts);
      }} className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted" data-api-unique-id='cmssectionmanager-r22e5112c2e626099-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
          <FileText className="h-3.5 w-3.5 text-muted-foreground" data-api-unique-id='cmssectionmanager-r3563bc2f44d73d37-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' />
          <span data-api-unique-id='cmssectionmanager-r0739bf934cce6a74-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>{isEditingTexts ? "Zavřít texty" : "Upravit texty"}</span>
        </button>
      </div>

      {/* Rychlý náhled textu webu */}
      <div className="rounded-md border border-border bg-background p-2.5 text-xs" data-api-unique-id='cmssectionmanager-r684a1b607f6bc28f-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
        <p className="font-header font-semibold text-foreground text-xs line-clamp-1" data-api-unique-id='cmssectionmanager-r7b8dbb8f914defa1-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
          {texts?.welcomeHeading}
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-1" data-api-unique-id='cmssectionmanager-r255e15a2ae1f7cb5-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
          {texts?.welcomePreamble}
        </p>
      </div>

      {/* Seznam 5 sekcí s rychlými přepínači */}
      <div className="flex min-w-0 flex-col divide-y divide-border rounded-md border border-border bg-background" data-api-unique-id='cmssectionmanager-r2903a98453fcb4f5-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
        {sectionsConfig.map((sec, index) => {
        const isVisible = visibility ? visibility[sec.key] : false;
        const isMasterPublish = sec.key === "isWebPublished";
        return <div key={sec.key} className={`flex min-w-0 items-center justify-between p-2.5 text-xs transition-colors hover:bg-muted/30 ${isMasterPublish ? "bg-muted/20 font-medium" : ""}`} data-api-unique-id='cmssectionmanager-rc25d267d2b34a92c-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' data-api-in-loop='1'>
              <div className="min-w-0 pr-2" data-api-unique-id='cmssectionmanager-r3a5e5288deb94287-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' data-api-in-loop='1'>
                <div className="flex items-center gap-1.5" data-api-unique-id='cmssectionmanager-r82b37463bcd426c4-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' data-api-in-loop='1'>
                  <span className="font-header font-semibold text-foreground truncate" data-api-unique-id='cmssectionmanager-re8c166287ec57963-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' data-api-in-loop='1' data-api-bind-info={`sectionsConfig-${index}-name`} data-api-map-var-name='sec'>
                    {sec.name}
                  </span>
                  <span className={`inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[10px] font-medium ${isVisible ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`} data-api-unique-id='cmssectionmanager-r56f1f1276ebc2a05-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' data-api-in-loop='1'>
                    {isVisible ? "Aktivní" : "Vypnuto"}
                  </span>
                </div>
                <p className="line-clamp-1 text-[11px] text-muted-foreground" data-api-unique-id='cmssectionmanager-r6a0ff1c06add3f84-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' data-api-in-loop='1' data-api-bind-info={`sectionsConfig-${index}-description`} data-api-map-var-name='sec'>
                  {sec.description}
                </p>
              </div>

              <button type="button" onClick={() => onToggleSection(sec.key)} className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isVisible ? "bg-primary text-primary-foreground shadow-xs" : "border border-border bg-card text-card-foreground hover:bg-muted"}`} title={`Kliknutím ${isVisible ? "skryjete" : "zobrazíte"} sekci na webu`} data-api-unique-id='cmssectionmanager-rbdf52f8b40bee667-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' data-api-in-loop='1'>
                {isVisible ? <Eye className="h-3.5 w-3.5" data-api-unique-id='cmssectionmanager-raf0b944024405b4c-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' data-api-in-loop='1' /> : <EyeOff className="h-3.5 w-3.5" data-api-unique-id='cmssectionmanager-r82a08fbdcb69892a-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' data-api-in-loop='1' />}
                <span data-api-unique-id='cmssectionmanager-rde081214f7466817-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' data-api-in-loop='1'>{isVisible ? "Viditelné" : "Skryté"}</span>
              </button>
            </div>;
      })}
      </div>

      {/* Rozbalovací formulář pro texty CMS */}
      {isEditingTexts && <form onSubmit={handleSaveTexts} className="mt-1 flex min-w-0 flex-col gap-2.5 rounded-md border border-border bg-background p-3 text-xs" data-api-unique-id='cmssectionmanager-rf5852034980409cb-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
          <div className="font-header font-semibold text-foreground" data-api-unique-id='cmssectionmanager-rda2eb0c9d36bd968-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
            Texty uvítacího bloku & příběhu
          </div>

          <div data-api-unique-id='cmssectionmanager-r1e9408a1e384f1ca-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
            <label className="block font-medium text-foreground mb-1" data-api-unique-id='cmssectionmanager-rff155d652f625f72-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
              Hlavní nadpis (H1)
            </label>
            <input type="text" value={formTexts.welcomeHeading} onChange={e => setFormTexts(prev => ({
          ...prev,
          welcomeHeading: e.target.value
        }))} className="h-8 w-full rounded border border-border bg-card px-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" data-api-unique-id='cmssectionmanager-ra601c174492439e7-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' />
          </div>

          <div data-api-unique-id='cmssectionmanager-r87c954ac27bd3e97-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
            <label className="block font-medium text-foreground mb-1" data-api-unique-id='cmssectionmanager-rd4d1699f6c56930b-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
              Úvodní slogan pekárny (Preamble)
            </label>
            <input type="text" value={formTexts.welcomePreamble} onChange={e => setFormTexts(prev => ({
          ...prev,
          welcomePreamble: e.target.value
        }))} className="h-8 w-full rounded border border-border bg-card px-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" data-api-unique-id='cmssectionmanager-r643ef36d67a37d12-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' />
          </div>

          <div data-api-unique-id='cmssectionmanager-r7141e18a98258d94-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
            <label className="block font-medium text-foreground mb-1" data-api-unique-id='cmssectionmanager-r9d8d20684ed6902e-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
              Nadpis příběhu pekárny
            </label>
            <input type="text" value={formTexts.storyTitle} onChange={e => setFormTexts(prev => ({
          ...prev,
          storyTitle: e.target.value
        }))} className="h-8 w-full rounded border border-border bg-card px-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" data-api-unique-id='cmssectionmanager-r454095cd087ce36a-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' />
          </div>

          <div data-api-unique-id='cmssectionmanager-r3388bdae34499e85-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
            <label className="block font-medium text-foreground mb-1" data-api-unique-id='cmssectionmanager-r14841badf611d495-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
              Text příběhu (odstavce o másle a kynutí)
            </label>
            <textarea value={formTexts.storyBody} onChange={e => setFormTexts(prev => ({
          ...prev,
          storyBody: e.target.value
        }))} rows={3} className="w-full rounded border border-border bg-card p-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" data-api-unique-id='cmssectionmanager-r44d7d3b4c6efc6f4-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' />
          </div>

          <div className="flex justify-end gap-2 pt-1" data-api-unique-id='cmssectionmanager-r3a77804604345da4-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
            <button type="button" onClick={() => {
          if (texts) {
            setFormTexts(texts);
          }
          setIsEditingTexts(false);
        }} className="rounded border border-border bg-card px-2.5 py-1 text-xs text-card-foreground hover:bg-muted" data-api-unique-id='cmssectionmanager-r35e2d4da6f6e218b-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
              Zrušit
            </button>
            <button type="submit" className="inline-flex items-center gap-1 rounded bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90" data-api-unique-id='cmssectionmanager-r578bc471c43c49af-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>
              <Check className="h-3.5 w-3.5" data-api-unique-id='cmssectionmanager-r8e17ee62ee0cefe8-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager' />
              <span data-api-unique-id='cmssectionmanager-rfe615ed5870b77fc-s337834191' data-api-unique-page-name='src/backend/components/AdminHome/CmsSectionManager'>Uložit texty</span>
            </button>
          </div>
        </form>}
    </div>;
}