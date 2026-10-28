"use client";

import React, { useState } from "react";
import { PenLine, Sparkles, Eye, Code } from "lucide-react";
import type { CmsConfigDto, TextKey } from "@/backend/types/AdminCmsSections";
export type CmsConfig = CmsConfigDto;
export interface TextsEditorPanelProps {
  config: CmsConfig;
  onChange: (key: TextKey, value: string) => void;
}
export default function TextsEditorPanel({
  config,
  onChange
}: TextsEditorPanelProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const welcomeHeading = config?.welcomeHeading ?? "";
  const welcomePreamble = config?.welcomePreamble ?? "";
  const storyTitle = config?.storyTitle ?? "";
  const storyBody = config?.storyBody ?? "";
  return <div data-controller-name="Formulář editace textů a příběhu" className="flex min-w-0 flex-col rounded-lg border border-border bg-card text-card-foreground shadow-sm" data-api-unique-id='textseditorpanel-r17fd2080301a2d5f-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
      {/* Záhlaví panelu s přepínačem Editace / Náhled */}
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between lg:p-5" data-api-unique-id='textseditorpanel-r1cbc78ddd09afa72-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
        <div className="min-w-0 flex-1" data-api-unique-id='textseditorpanel-rce22b7833e5261f6-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
          <div className="flex items-center gap-2" data-api-unique-id='textseditorpanel-rb9c249da5966f9fc-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary" data-api-unique-id='textseditorpanel-rd5c9a5f79c98b076-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
              <PenLine className="h-4 w-4" data-api-unique-id='textseditorpanel-r8a8122936d5d8a4d-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel' />
            </span>
            <h2 className="font-header text-base font-semibold text-card-foreground sm:text-lg" data-api-unique-id='textseditorpanel-r5cb28d36ceec32c4-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
              Textový obsah a příběh pekárny
            </h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm" data-api-unique-id='textseditorpanel-r1a962f3d850c920f-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
            Úprava úvodního uvítání (Hero) a poctivého příběhu o kynutí těsta
          </p>
        </div>

        {/* Přepínač zobrazení: Editace / Živý náhled */}
        <div className="inline-flex items-center rounded-lg border border-border bg-muted p-1 text-xs font-medium text-muted-foreground shrink-0" data-api-unique-id='textseditorpanel-r39004d36b7e58757-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
          <button type="button" onClick={() => setActiveTab("edit")} className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors ${activeTab === "edit" ? "bg-card text-card-foreground shadow-xs font-semibold" : "hover:text-foreground"}`} data-api-unique-id='textseditorpanel-r971c22ee7a7a8cd8-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
            <Code className="h-3.5 w-3.5" data-api-unique-id='textseditorpanel-rd2541bfbe1fd87f3-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel' />
            <span data-api-unique-id='textseditorpanel-rdeefe2860de279bc-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>Formulář</span>
          </button>
          <button type="button" onClick={() => setActiveTab("preview")} className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors ${activeTab === "preview" ? "bg-card text-card-foreground shadow-xs font-semibold" : "hover:text-foreground"}`} data-api-unique-id='textseditorpanel-r2fd16a0ecd1fa06b-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
            <Eye className="h-3.5 w-3.5" data-api-unique-id='textseditorpanel-r2a75a790e359aeee-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel' />
            <span data-api-unique-id='textseditorpanel-r44eae75bcc321574-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>Živý náhled</span>
          </button>
        </div>
      </div>

      <div className="p-4 lg:p-5" data-api-unique-id='textseditorpanel-rec224b371e8149a0-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
        {activeTab === "edit" ? <div className="flex flex-col gap-6" data-api-unique-id='textseditorpanel-ra753c7744a4e9003-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
            {/* ODDÍL 1: UVÍTACÍ HERO SEKCE */}
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-background p-4 sm:p-5" data-api-unique-id='textseditorpanel-r62d0f9b12acfe1fb-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
              <div className="flex items-center justify-between border-b border-border pb-2.5" data-api-unique-id='textseditorpanel-re154a50793322e72-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                <div className="flex items-center gap-2" data-api-unique-id='textseditorpanel-rc89e51a52011c7a0-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                  <span className="h-2 w-2 rounded-full bg-primary" data-api-unique-id='textseditorpanel-r8cf13c7b578e9f01-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel' />
                  <h3 className="font-header text-sm font-semibold text-foreground" data-api-unique-id='textseditorpanel-rb6284e5984f128cb-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                    1. Úvodní Hero sekce (Vstupní uvítání)
                  </h3>
                </div>
                <span className="text-[11px] text-muted-foreground" data-api-unique-id='textseditorpanel-rda51c782aa93a2d7-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                  Zobrazuje se v záhlaví veřejného webu
                </span>
              </div>

              {/* welcome_heading */}
              <div className="flex flex-col gap-1.5" data-api-unique-id='textseditorpanel-rc68bd8a041066635-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                <div className="flex items-center justify-between" data-api-unique-id='textseditorpanel-ra3be8f00bbda382f-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                  <label htmlFor="field-welcome-heading" className="text-xs font-semibold text-foreground sm:text-sm" data-api-unique-id='textseditorpanel-rd8e17f91697e1bd9-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                    Hlavní uvítací nadpis (<code data-api-unique-id='textseditorpanel-rd779b94cfd1c9077-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>welcome_heading</code>)
                  </label>
                  <span className="text-[11px] font-mono text-muted-foreground" data-api-unique-id='textseditorpanel-rd2dbf5304bb42414-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                    {welcomeHeading.length}/255 znaků
                  </span>
                </div>
                <input id="field-welcome-heading" type="text" maxLength={255} value={welcomeHeading} onChange={e => onChange("welcomeHeading", e.target.value)} placeholder="např. Kus Koláče – Vůně poctivého pečení na Vinohradech" className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='textseditorpanel-r81f463e685a46159-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel' />
                <p className="text-[11px] text-muted-foreground" data-api-unique-id='textseditorpanel-r9114fde1e882b6ca-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                  Tento nadpis tvoří největší textovou dominantu na úvodní stránce před vitrínou.
                </p>
              </div>

              {/* welcome_preamble */}
              <div className="flex flex-col gap-1.5" data-api-unique-id='textseditorpanel-rff59e3f940b8ac41-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                <div className="flex items-center justify-between" data-api-unique-id='textseditorpanel-r561900d9340f9e8e-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                  <label htmlFor="field-welcome-preamble" className="text-xs font-semibold text-foreground sm:text-sm" data-api-unique-id='textseditorpanel-r716c0004497fc72d-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                    Úvodní popis čerstvého pečení (<code data-api-unique-id='textseditorpanel-r9bd3384c04927d08-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>welcome_preamble</code>)
                  </label>
                  <span className="text-[11px] font-mono text-muted-foreground" data-api-unique-id='textseditorpanel-rd341e43c3af06213-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                    {welcomePreamble.length} znaků
                  </span>
                </div>
                <textarea id="field-welcome-preamble" rows={3} value={welcomePreamble} onChange={e => onChange("welcomePreamble", e.target.value)} placeholder="Krátký popis ranního pečení, čerstvosti a atmosféry..." className="w-full rounded-md border border-input bg-card p-3 text-sm leading-relaxed text-card-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='textseditorpanel-r52b82c9d1ca2a26d-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel' />
                <p className="text-[11px] text-muted-foreground" data-api-unique-id='textseditorpanel-rd086b3c1f21f5d80-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                  Doprovodný perex pod hlavním nadpisem zvoucí hosty k ochutnání ranních várek.
                </p>
              </div>
            </div>

            {/* ODDÍL 2: PŘÍBĚH ŘEMESLNÉ PEKÁRNY */}
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-background p-4 sm:p-5" data-api-unique-id='textseditorpanel-ra6ee8f30ed2e760d-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
              <div className="flex items-center justify-between border-b border-border pb-2.5" data-api-unique-id='textseditorpanel-re80ef631028d7881-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                <div className="flex items-center gap-2" data-api-unique-id='textseditorpanel-rd2544b3204317fc9-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                  <span className="h-2 w-2 rounded-full bg-primary" data-api-unique-id='textseditorpanel-r82a4f92b0c76b001-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel' />
                  <h3 className="font-header text-sm font-semibold text-foreground" data-api-unique-id='textseditorpanel-r8d655c58b06b3f47-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                    2. Příběh řemeslné pekárny a tradice
                  </h3>
                </div>
                <span className="text-[11px] text-muted-foreground" data-api-unique-id='textseditorpanel-r185ae2c8d161f9f8-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                  Sekce o těstě, poctivém másle a kynutí
                </span>
              </div>

              {/* story_title */}
              <div className="flex flex-col gap-1.5" data-api-unique-id='textseditorpanel-r4555b2f76b4a6472-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                <div className="flex items-center justify-between" data-api-unique-id='textseditorpanel-rfcd24b8fed45e04d-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                  <label htmlFor="field-story-title" className="text-xs font-semibold text-foreground sm:text-sm" data-api-unique-id='textseditorpanel-rc7caa6b280ca5b55-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                    Nadpis příběhu (<code data-api-unique-id='textseditorpanel-r75f393b39c3e364b-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>story_title</code>)
                  </label>
                  <span className="text-[11px] font-mono text-muted-foreground" data-api-unique-id='textseditorpanel-rc475a3293b66fbb7-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                    {storyTitle.length}/255 znaků
                  </span>
                </div>
                <input id="field-story-title" type="text" maxLength={255} value={storyTitle} onChange={e => onChange("storyTitle", e.target.value)} placeholder="např. O našem těstě, ranním kynutí a vůni pravého másla" className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='textseditorpanel-r6c254697f4b6f58b-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel' />
                <p className="text-[11px] text-muted-foreground" data-api-unique-id='textseditorpanel-rdc9b68f69c8e7a95-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                  Záhlaví bloku věnovaného pekařskému řemeslu a výběru farmářských surovin.
                </p>
              </div>

              {/* story_body */}
              <div className="flex flex-col gap-1.5" data-api-unique-id='textseditorpanel-rfe1baaf6f874172d-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                <div className="flex items-center justify-between" data-api-unique-id='textseditorpanel-r681fa2079b4dc7ce-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                  <label htmlFor="field-story-body" className="text-xs font-semibold text-foreground sm:text-sm" data-api-unique-id='textseditorpanel-re747188b2102df42-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                    Podrobný text příběhu (<code data-api-unique-id='textseditorpanel-r3819cd5901b9e395-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>story_body</code>)
                  </label>
                  <span className="text-[11px] font-mono text-muted-foreground" data-api-unique-id='textseditorpanel-r6a90b398e61df06a-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                    {storyBody.length} znaků
                  </span>
                </div>
                <textarea id="field-story-body" rows={6} value={storyBody} onChange={e => onChange("storyBody", e.target.value)} placeholder="Napište podrobný příběh o tom, jak vzniká těsto, jaké používáte máslo a ovoce..." className="w-full rounded-md border border-input bg-card p-3 text-sm leading-relaxed text-card-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='textseditorpanel-r454f417faf4b3029-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel' />
                <p className="text-[11px] text-muted-foreground" data-api-unique-id='textseditorpanel-re0755f99ed1a627a-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                  Můžete formátovat do odstavců prázdnými řádky. Text se přenáší do veřejné sekce Příběh.
                </p>
              </div>
            </div>
          </div> : (/* ŽIVÝ NÁHLED PŘÍMO V ADMIN ROZHRANÍ */
      <div className="flex flex-col gap-6 rounded-lg border border-border bg-muted/40 p-5" data-api-unique-id='textseditorpanel-r6a079f7ae56e99bb-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
            <div className="flex items-center justify-between border-b border-border pb-3" data-api-unique-id='textseditorpanel-r6e510061d64bafe7-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
              <div className="flex items-center gap-2" data-api-unique-id='textseditorpanel-r456ef075cb4af9f7-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                <Sparkles className="h-4 w-4 text-primary" data-api-unique-id='textseditorpanel-rd0d02615006f7f3b-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel' />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground" data-api-unique-id='textseditorpanel-rb50ad4b58d4662de-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                  Živá vizualizace veřejného zobrazení
                </span>
              </div>
              <span className="text-xs text-muted-foreground" data-api-unique-id='textseditorpanel-ree5e19b74c92d55e-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                Tento náhled simuluje finální typografii webu
              </span>
            </div>

            {/* Náhled Hero */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-xs" data-api-unique-id='textseditorpanel-r5192f5a426bb28c3-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
              <span className="mb-2 inline-block rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary" data-api-unique-id='textseditorpanel-rac7e42852f222dab-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                Sekce: Uvítání hostů (Hero)
              </span>
              <h2 className="font-header text-xl font-bold tracking-tight text-card-foreground sm:text-2xl" data-api-unique-id='textseditorpanel-r1066add903a49579-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                {welcomeHeading || "— Bez nadpisu —"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground" data-api-unique-id='textseditorpanel-rafeb6997ca68a17e-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                {welcomePreamble || "— Bez úvodního popisu —"}
              </p>
            </div>

            {/* Náhled Příběh */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-xs" data-api-unique-id='textseditorpanel-ra76655567691c71b-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
              <span className="mb-2 inline-block rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary" data-api-unique-id='textseditorpanel-rcb11a5c9ba113295-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                Sekce: Příběh pekárny
              </span>
              <h3 className="font-header text-lg font-bold tracking-tight text-card-foreground" data-api-unique-id='textseditorpanel-r6f44ccc003b3648d-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                {storyTitle || "— Bez nadpisu příběhu —"}
              </h3>
              <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground" data-api-unique-id='textseditorpanel-r1856a4d9de41fb5d-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>
                {storyBody ? storyBody.split("\n\n").map((par, index) => <p key={index} data-api-unique-id='textseditorpanel-ra1565e33f2a2f3ec-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel' data-api-in-loop='1' data-api-bind-info={`storyBody-${index}-$item`} data-api-map-var-name='par'>{par}</p>) : <p data-api-unique-id='textseditorpanel-r98bbf416938faff2-s2107557527' data-api-unique-page-name='src/backend/components/AdminCmsSections/TextsEditorPanel'>— Text příběhu je prázdný —</p>}
              </div>
            </div>
          </div>)}
      </div>
    </div>;
}