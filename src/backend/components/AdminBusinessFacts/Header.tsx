"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { CheckCircle2, AlertCircle, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
interface HeaderProps {
  isDirty: boolean;
  lastSavedAt: string | null;
  onSave: () => void;
  onReset: () => void;
  isSaving: boolean;
}
export default function Header({
  isDirty,
  lastSavedAt,
  onSave,
  onReset,
  isSaving
}: HeaderProps) {
  const avatarUrl = "https://www.autocoder.cc/background/zaki_prod/user_upload/cc028c3da5ce475d8792196ee0d47824.jpg";
  return <header className="flex min-w-0 flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:p-5 text-card-foreground shadow-sm" data-api-unique-id='header-rdc8262da12edf7cc-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" data-api-unique-id='header-r9937da859ace15da-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>
        {/* Levá část: Avatar pekárny + Titulky */}
        <div className="flex min-w-0 items-center gap-3.5" data-api-unique-id='header-re4b9a851cbfc26fe-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border bg-muted shadow-inner" data-api-unique-id='header-rc2f8e476c00af3d7-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>
            <EditableImg propKey="bakery-admin-avatar" src={avatarUrl} alt="Kus Koláče ilustrace" className="h-full w-full object-cover" data-api-unique-id='header-r2422f4924dfea51b-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header' />
          </div>
          <div className="min-w-0" data-api-unique-id='header-rc7aa7a5c81551e24-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>
            <div className="flex min-w-0 items-center gap-2" data-api-unique-id='header-r26024d450ef7680c-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>
              <h1 className="truncate text-xl font-bold tracking-tight text-card-foreground sm:text-2xl" data-api-unique-id='header-r00daba963650117c-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>
                Provozní údaje a otevírací doba
              </h1>
            </div>
            <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm" data-api-unique-id='header-rccdedabb5f352a05-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>
              Správa veřejného profilu pekárny, kontaktů a týdenního harmonogramu pečení na Vinohradech
            </p>
          </div>
        </div>

        {/* Pravá část: Indikátor synchronizace a hlavní akce */}
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:shrink-0" data-api-unique-id='header-r76c352e6e578188c-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>
          {isDirty ? <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-xs font-medium text-warning" data-api-unique-id='header-rf3a80ffd83818eb0-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>
              <AlertCircle className="h-3.5 w-3.5 shrink-0" data-api-unique-id='header-r8c9690cdf8496a4f-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header' />
              <span className="whitespace-nowrap" data-api-unique-id='header-r127f491cae3cdd39-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>Neuložené změny</span>
            </div> : <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-xs font-medium text-success" data-api-unique-id='header-rb0e5e116cb4d9d81-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" data-api-unique-id='header-r62346160b50c0387-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header' />
              <span className="whitespace-nowrap" data-api-unique-id='header-r52cfb7c8eabc6258-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>
                {lastSavedAt ? `Uloženo v ${lastSavedAt}` : "Aktuální stav"}
              </span>
            </div>}

          {isDirty && <Button type="button" variant="outline" size="sm" onClick={onReset} disabled={isSaving} className="h-9 gap-1.5 text-xs font-medium" data-api-unique-id='header-r6e366bb0affde208-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>
              <RotateCcw className="h-3.5 w-3.5 shrink-0" data-api-unique-id='header-rc0a7afa21b2d8ad0-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header' />
              <span className="whitespace-nowrap" data-api-unique-id='header-rb3ab0607c1fd5589-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>Vrátit</span>
            </Button>}

          <Button type="button" size="sm" onClick={onSave} disabled={!isDirty || isSaving} className="h-9 gap-1.5 bg-primary px-4 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50" data-api-unique-id='header-r42fcb7829d46bfca-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>
            <Save className="h-3.5 w-3.5 shrink-0" data-api-unique-id='header-r92177c5c0e1852d7-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header' />
            <span className="whitespace-nowrap" data-api-unique-id='header-r22e3c701a7bde4e2-s812913648' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/Header'>
              {isSaving ? "Ukládání..." : "Uložit změny"}
            </span>
          </Button>
        </div>
      </div>
    </header>;
}