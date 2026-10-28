"use client";

import React, { useState } from "react";
import { Save, RotateCcw, Check, Loader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
interface ActionDockProps {
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  lastSavedAt: string;
  onSave: () => void;
  onReset: () => void;
}
export default function ActionDock({
  hasUnsavedChanges,
  isSaving,
  lastSavedAt,
  onSave,
  onReset
}: ActionDockProps) {
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  return <div data-controller-name="Spodní akční panel a ukládání" className="sticky bottom-4 z-20 w-full rounded-lg border border-border bg-card p-3.5 text-card-foreground shadow-lg transition-all lg:p-4" data-api-unique-id='actiondock-rd8df6f394cb1316f-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" data-api-unique-id='actiondock-r234599cf0af55388-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
        {/* Levá část: Stav úprav a čas uložení */}
        <div className="flex min-w-0 items-center gap-2.5" data-api-unique-id='actiondock-refe2bdf740f8fd0f-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
          {hasUnsavedChanges ? <div className="flex items-center gap-2" data-api-unique-id='actiondock-rc682187ea1ad9db6-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
              <span className="flex h-2.5 w-2.5 rounded-full bg-warning animate-ping" data-api-unique-id='actiondock-rd6a979d117f4f824-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock' />
              <span className="text-xs font-semibold text-warning sm:text-sm" data-api-unique-id='actiondock-r5203d3f77ac09d4f-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
                Máte neuložené úpravy v konfiguraci sekcí
              </span>
            </div> : <div className="flex items-center gap-2" data-api-unique-id='actiondock-r38edad9a1cd2b5af-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
              <Check className="h-4 w-4 text-success" data-api-unique-id='actiondock-rd4a463c09649fe45-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock' />
              <span className="text-xs font-medium text-muted-foreground sm:text-sm" data-api-unique-id='actiondock-r1eb462034bc95ba3-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
                Všechny změny jsou uloženy v databázi pekárny
              </span>
            </div>}
          <span className="hidden text-xs text-muted-foreground md:inline" data-api-unique-id='actiondock-r925d60fbf5324d48-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
            • Poslední aktualizace: {lastSavedAt}
          </span>
        </div>

        {/* Pravá část: Tlačítka Uložit a Obnovit */}
        <div className="flex items-center gap-2.5 shrink-0" data-api-unique-id='actiondock-r778d09892b75f1e4-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
          {/* Tlačítko Obnovit do posledního stavu z DB s AlertDialog potvrzením */}
          <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen} data-api-unique-id='actiondock-re14526ba75cb6604-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
            <AlertDialogTrigger asChild data-api-unique-id='actiondock-r25661cebb96338bf-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
              <button type="button" disabled={!hasUnsavedChanges || isSaving} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='actiondock-r1666f8c7fc4f1267-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
                <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" data-api-unique-id='actiondock-r3674ccc4b53942d5-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock' />
                <span data-api-unique-id='actiondock-rf8435568ec3a0db0-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>Obnovit původní</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-md" data-api-unique-id='actiondock-rbeedee5304541ec8-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
              <AlertDialogHeader data-api-unique-id='actiondock-ra6c7d774f7b66b24-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
                <AlertDialogTitle className="font-header text-base text-foreground" data-api-unique-id='actiondock-r27937d43d4d043bb-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
                  Zahodit neuložené úpravy?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-muted-foreground" data-api-unique-id='actiondock-recb6d774dd9b16ec-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
                  Tato akce vrátí všechny texty, nadpisy a přepínače viditelnosti do naposledy uloženého stavu v databázi pekárny Kus Koláče. Veškeré provedené změny budou ztraceny.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter data-api-unique-id='actiondock-r03470dd1aaad8ecf-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
                <AlertDialogCancel className="text-xs sm:text-sm" data-api-unique-id='actiondock-r6faeac1b2a686a7f-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
                  Zpět k úpravám
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                onReset();
                setResetDialogOpen(false);
              }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs sm:text-sm" data-api-unique-id='actiondock-reff4f2c0e84a3712-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
                  Ano, obnovit ze zálohy
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Hlavní tlačítko Uložit změny */}
          <button type="button" onClick={onSave} disabled={!hasUnsavedChanges || isSaving} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm" data-api-unique-id='actiondock-r52906d4f92c2b3d4-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>
            {isSaving ? <>
                <Loader2 className="h-4 w-4 animate-spin" data-api-unique-id='actiondock-r9915f116728593fe-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock' />
                <span data-api-unique-id='actiondock-r74639bef4095155b-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>Ukládám do webu...</span>
              </> : <>
                <Save className="h-4 w-4" data-api-unique-id='actiondock-r44e4c60cccd6b19f-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock' />
                <span data-api-unique-id='actiondock-r7675426e80ddf5ec-s852541157' data-api-unique-page-name='src/backend/components/AdminCmsSections/ActionDock'>Uložit změny</span>
              </>}
          </button>
        </div>
      </div>
    </div>;
}