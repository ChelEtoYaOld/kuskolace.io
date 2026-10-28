"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Save, RotateCcw } from "lucide-react";
interface StickyActionBarProps {
  isDirty: boolean;
  isSaving: boolean;
  onSave: () => void;
  onReset: () => void;
}
export default function StickyActionBar({
  isDirty,
  isSaving,
  onSave,
  onReset
}: StickyActionBarProps) {
  if (!isDirty) {
    return null;
  }
  return <aside aria-label="Ovládací lišta pro uložení změn" className="sticky bottom-4 z-40 mt-6 flex min-w-0 w-full items-center justify-between gap-3 rounded-xl border border-warning/40 bg-card p-3 sm:px-5 sm:py-3.5 text-card-foreground shadow-lg backdrop-blur-sm" data-api-unique-id='stickyactionbar-r5f11d6a90e959a7f-s3638768263' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/StickyActionBar'>
      <div className="flex items-center gap-2.5 min-w-0" data-api-unique-id='stickyactionbar-r4914db9f59e59974-s3638768263' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/StickyActionBar'>
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-warning/15 text-warning" data-api-unique-id='stickyactionbar-r6ebb9842685eb4aa-s3638768263' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/StickyActionBar'>
          <AlertCircle className="h-4 w-4" data-api-unique-id='stickyactionbar-r5020aac8425dc98d-s3638768263' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/StickyActionBar' />
        </div>
        <div className="min-w-0" data-api-unique-id='stickyactionbar-r42a7ad2932d7a40c-s3638768263' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/StickyActionBar'>
          <p className="truncate text-xs font-semibold text-card-foreground sm:text-sm" data-api-unique-id='stickyactionbar-r0f0656883efecad7-s3638768263' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/StickyActionBar'>
            Máte neuložené úpravy provozních dat pekárny
          </p>
          <p className="hidden text-[11px] text-muted-foreground sm:block" data-api-unique-id='stickyactionbar-r78688f7c6a2d80e3-s3638768263' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/StickyActionBar'>
            Nezapomeňte změny uložit, aby se promítly do veřejné vitríny a otevírací doby.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0" data-api-unique-id='stickyactionbar-r3dc0e08546bf9a65-s3638768263' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/StickyActionBar'>
        <Button type="button" variant="outline" size="sm" onClick={onReset} disabled={isSaving} className="h-8 gap-1.5 text-xs font-medium" data-api-unique-id='stickyactionbar-r588ae22a9b125abe-s3638768263' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/StickyActionBar'>
          <RotateCcw className="h-3.5 w-3.5" data-api-unique-id='stickyactionbar-r61d7eee79acb157b-s3638768263' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/StickyActionBar' />
          <span className="hidden sm:inline" data-api-unique-id='stickyactionbar-rd120e45ece89187f-s3638768263' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/StickyActionBar'>Vrátit změny</span>
          <span className="sm:hidden" data-api-unique-id='stickyactionbar-r490e8753e4825136-s3638768263' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/StickyActionBar'>Zrušit</span>
        </Button>
        <Button type="button" size="sm" onClick={onSave} disabled={isSaving} className="h-8 gap-1.5 bg-primary px-4 text-xs font-medium text-primary-foreground hover:bg-primary/90" data-api-unique-id='stickyactionbar-r8149cee5cfa5165e-s3638768263' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/StickyActionBar'>
          <Save className="h-3.5 w-3.5" data-api-unique-id='stickyactionbar-rb921d5e8667230d7-s3638768263' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/StickyActionBar' />
          <span data-api-unique-id='stickyactionbar-r2875d252af24a470-s3638768263' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/StickyActionBar'>{isSaving ? "Ukládám..." : "Uložit veškeré změny"}</span>
        </Button>
      </div>
    </aside>;
}