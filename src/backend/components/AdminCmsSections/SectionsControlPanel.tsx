"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Globe, Cake, BookOpen, Instagram, MapPin, AlertCircle } from "lucide-react";
import type { CmsConfigDto as CmsConfig, SectionKey } from "@/backend/types/AdminCmsSections";
interface SectionsControlPanelProps {
  config: CmsConfig;
  onToggle: (key: SectionKey, value: boolean) => void;
  bakerySealUrl: string;
}
export default function SectionsControlPanel({
  config,
  onToggle,
  bakerySealUrl
}: SectionsControlPanelProps) {
  const sectionsList: Array<{
    key: SectionKey;
    title: string;
    description: string;
    impact: string;
    icon: React.ReactNode;
  }> = [{
    key: "isShowcaseVisible",
    title: "Denní vitrína pečiva",
    description: "Prezentace čerstvých koláčů, buchet a pečiva v reálném čase s cenovkami.",
    impact: "Návštěvníci vidí nabídku dne, složení a stav vyprodání jednotlivých položek.",
    icon: <Cake className="h-4 w-4 text-primary" data-api-unique-id='sectionscontrolpanel-ra6fa100d693a0d7f-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' />
  }, {
    key: "isStoryVisible",
    title: "Příběh řemeslné pekárny",
    description: "Kapitola o kynutí kváskového těsta, poctivém másle a vinohradské tradici.",
    impact: "Zobrazuje hodnoty, původ surovin a řemeslnou filozofii pekařů.",
    icon: <BookOpen className="h-4 w-4 text-primary" data-api-unique-id='sectionscontrolpanel-r86b1cc545092c77f-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' />
  }, {
    key: "isInstagramVisible",
    title: "Instagram fotogalerie",
    description: "Živý feed snímků z ranního pečení a čerstvě vytažených plechů z pece.",
    impact: "Vytváří vizuální atmosféru a láká návštěvníky k osobní návštěvě provozovny.",
    icon: <Instagram className="h-4 w-4 text-primary" data-api-unique-id='sectionscontrolpanel-r3e490c7220068ebc-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' />
  }, {
    key: "isContactVisible",
    title: "Mapa a kontaktní údaje",
    description: "Interaktivní mapa Vinohrad, adresa, spojení MHD a aktuální otevírací doba.",
    impact: "Poskytuje praktické informace pro navigaci a ověření, zda máme právě otevřeno.",
    icon: <MapPin className="h-4 w-4 text-primary" data-api-unique-id='sectionscontrolpanel-r053c678824dd6926-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' />
  }];
  const isWebPublished = Boolean(config?.isWebPublished);
  return <div data-controller-name="Ovládací panel viditelnosti sekcí" className="flex min-w-0 flex-col rounded-lg border border-border bg-card text-card-foreground shadow-sm" data-api-unique-id='sectionscontrolpanel-rf9cf4f765d6512c2-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
      {/* Záhlaví panelu s pečetí pekárny */}
      <div className="flex items-start justify-between gap-3 border-b border-border p-4 lg:p-5" data-api-unique-id='sectionscontrolpanel-rb5ad2d5a5bb96756-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
        <div className="min-w-0 flex-1" data-api-unique-id='sectionscontrolpanel-racd4dff846084cef-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
          <div className="flex items-center gap-2" data-api-unique-id='sectionscontrolpanel-r90d4ae8e11290432-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary" data-api-unique-id='sectionscontrolpanel-rc8cb907da6eaeecf-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
              <Globe className="h-4 w-4" data-api-unique-id='sectionscontrolpanel-racbdd7b58799a24c-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' />
            </span>
            <h2 className="font-header text-base font-semibold text-card-foreground sm:text-lg" data-api-unique-id='sectionscontrolpanel-r6620d5a8709dee57-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
              Publikace a viditelnost modulů
            </h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm" data-api-unique-id='sectionscontrolpanel-r6ee379c62b8c6c1b-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
            Okamžité řízení zapnutí či dočasného skrytí částí webu pro veřejnost
          </p>
        </div>

        {/* Drobná autentická pečeť koláče */}
        {bakerySealUrl && <div title="Kus Koláče – Vinohrady pečeť kvality" className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-muted p-1 pr-2.5" data-api-unique-id='sectionscontrolpanel-r1212163f49b56431-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
            <img src={bakerySealUrl} alt="Kus Koláče pečeť" className="h-7 w-7 rounded-full object-cover" data-api-unique-id='sectionscontrolpanel-r1414b8ac6b2ec10f-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' />
            <span className="hidden text-[11px] font-medium tracking-tight text-muted-foreground xl:inline" data-api-unique-id='sectionscontrolpanel-r5264814f96a61a8b-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
              Vinohrady
            </span>
          </div>}
      </div>

      {/* Hlavní přepínač publikace celého webu */}
      <div className="p-4 lg:p-5" data-api-unique-id='sectionscontrolpanel-r36b7e845c295d567-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
        <div className={`relative rounded-lg border p-4 transition-colors ${isWebPublished ? "border-success/40 bg-success/5" : "border-warning/40 bg-warning/5"}`} data-api-unique-id='sectionscontrolpanel-r9a2a4fd608d2ca35-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
          <div className="flex items-start justify-between gap-3" data-api-unique-id='sectionscontrolpanel-r9f3e9e8bf7160b79-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
            <div className="min-w-0 flex-1" data-api-unique-id='sectionscontrolpanel-r357f9df08c2af72b-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
              <div className="flex flex-wrap items-center gap-2" data-api-unique-id='sectionscontrolpanel-r7745b6715a2db442-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
                <span className="font-header text-sm font-bold text-card-foreground sm:text-base" data-api-unique-id='sectionscontrolpanel-rbc046600d8b216c7-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
                  Hlavní publikace webu
                </span>
                {isWebPublished ? <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-success px-2.5 py-0.5 text-[11px] font-semibold text-success-foreground whitespace-nowrap" data-api-unique-id='sectionscontrolpanel-r0003f37fc6c6a845-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
                    ON-LINE
                  </span> : <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-destructive px-2.5 py-0.5 text-[11px] font-semibold text-destructive-foreground whitespace-nowrap" data-api-unique-id='sectionscontrolpanel-r2a0326568d0a2ee4-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
                    ODSTÁVKA
                  </span>}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm" data-api-unique-id='sectionscontrolpanel-r6d314aad48cbf280-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
                Globální spínač (<code data-api-unique-id='sectionscontrolpanel-rc221be1ebd81b1ff-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>is_web_published</code>). Při vypnutí se návštěvníkům zobrazí
                pouze informační stránka o probíhající údržbě pekařského systému.
              </p>
              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground" data-api-unique-id='sectionscontrolpanel-r9d52ce13d4f7a5ff-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-primary" data-api-unique-id='sectionscontrolpanel-r7fc6d64d3c59f13a-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' />
                <span data-api-unique-id='sectionscontrolpanel-rf5a0eadc68205309-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
                  {isWebPublished ? "Web je plně přístupný všem zákazníkům z internetu." : "Zákazníci nemají přístup k objednávkám ani nabídce vitríny."}
                </span>
              </div>
            </div>

            <div className="pt-0.5 shrink-0" data-api-unique-id='sectionscontrolpanel-rbe0a7034594029b6-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
              <Switch id="switch-master-web" checked={isWebPublished} onCheckedChange={checked => onToggle("isWebPublished", checked)} aria-label="Přepínač globální publikace webu" data-api-unique-id='sectionscontrolpanel-re9b03f53c0a7de46-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' />
            </div>
          </div>
        </div>

        {/* Mezilehlý oddělovač */}
        <div className="my-4 flex items-center justify-between border-b border-border pb-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground" data-api-unique-id='sectionscontrolpanel-re6fcf32412419b6d-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
          <span data-api-unique-id='sectionscontrolpanel-r2544ba69b6c7f413-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>Jednotlivé sekce veřejné prezentace</span>
          <span className="text-[11px] font-normal lowercase" data-api-unique-id='sectionscontrolpanel-r52b1ca9a38a2f11f-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
            aktivní:{" "}
            {[config?.isShowcaseVisible, config?.isStoryVisible, config?.isInstagramVisible, config?.isContactVisible].filter(Boolean).length}
            /4
          </span>
        </div>

        {/* 4 podružné sekce */}
        <div className="flex flex-col gap-3" data-api-unique-id='sectionscontrolpanel-r5957e175ef51b508-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel'>
          {sectionsList.map((sec, index) => {
          const isChecked = Boolean(config?.[sec.key]);
          return <div key={sec.key} className="flex flex-col justify-between gap-3 rounded-lg border border-border bg-background p-3.5 transition-colors sm:flex-row sm:items-center sm:gap-4" data-api-unique-id='sectionscontrolpanel-r7c3073806e851cd3-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' data-api-in-loop='1'>
                <div className="min-w-0 flex-1" data-api-unique-id='sectionscontrolpanel-r41136edd56d551b4-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' data-api-in-loop='1'>
                  <div className="flex items-center gap-2" data-api-unique-id='sectionscontrolpanel-r7b18f2fb692d55aa-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' data-api-in-loop='1'>
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted" data-api-unique-id='sectionscontrolpanel-r7f35e5ebdf570b17-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' data-api-in-loop='1' data-api-bind-info={`sectionsList-${index}-icon`} data-api-map-var-name='sec'>
                      {sec.icon}
                    </span>
                    <h3 className="font-header text-sm font-semibold text-foreground" data-api-unique-id='sectionscontrolpanel-r1ae01084e6e26a48-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' data-api-in-loop='1' data-api-bind-info={`sectionsList-${index}-title`} data-api-map-var-name='sec'>
                      {sec.title}
                    </h3>
                    {isChecked ? <span className="inline-flex shrink-0 items-center rounded-full bg-success px-2 py-0.2 text-[10px] font-medium text-success-foreground whitespace-nowrap" data-api-unique-id='sectionscontrolpanel-rc91af7b9b68df334-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' data-api-in-loop='1'>
                        Zobrazeno
                      </span> : <span className="inline-flex shrink-0 items-center rounded-full bg-muted px-2 py-0.2 text-[10px] font-medium text-muted-foreground whitespace-nowrap" data-api-unique-id='sectionscontrolpanel-r3715f9cb23db5def-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' data-api-in-loop='1'>
                        Skryto
                      </span>}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground" data-api-unique-id='sectionscontrolpanel-r25243b36bf577e72-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' data-api-in-loop='1' data-api-bind-info={`sectionsList-${index}-description`} data-api-map-var-name='sec'>
                    {sec.description}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground/90 italic" data-api-unique-id='sectionscontrolpanel-ra9fb58f3dcd2683f-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' data-api-in-loop='1' data-api-bind-info={`sectionsList-${index}-impact`} data-api-map-var-name='sec'>
                    Dopad: {sec.impact}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end shrink-0 pt-1 sm:pt-0 border-t border-border/50 sm:border-t-0" data-api-unique-id='sectionscontrolpanel-r003d6ee73d8d30b3-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' data-api-in-loop='1'>
                  <span className="text-xs text-muted-foreground sm:hidden" data-api-unique-id='sectionscontrolpanel-r3ad64c55fb4013e7-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' data-api-in-loop='1'>
                    {isChecked ? "Viditelné na webu" : "Skryto před hosty"}
                  </span>
                  <Switch id={`switch-${sec.key}`} checked={isChecked} onCheckedChange={checked => onToggle(sec.key, checked)} aria-label={`Přepínač viditelnosti: ${sec.title}`} data-api-unique-id='sectionscontrolpanel-ra18cda0bed3a8381-s205531247' data-api-unique-page-name='src/backend/components/AdminCmsSections/SectionsControlPanel' data-api-in-loop='1' />
                </div>
              </div>;
        })}
        </div>
      </div>
    </div>;
}