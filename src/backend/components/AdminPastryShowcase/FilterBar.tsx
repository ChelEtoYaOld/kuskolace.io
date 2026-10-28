"use client";

import React from "react";
import { PastryCategory, PastryFilterState, AvailabilityFilter } from "@/backend/types/AdminPastryShowcase";
import { Search, Plus, Filter, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface FilterBarProps {
  filter: PastryFilterState;
  onFilterChange: (newFilter: PastryFilterState) => void;
  onOpenCreate: () => void;
  totalFiltered: number;
}
const CATEGORY_OPTIONS: {
  value: "ALL" | PastryCategory;
  label: string;
}[] = [{
  value: "ALL",
  label: "Všechny kategorie"
}, {
  value: "OVOCNE_KOLACE",
  label: "Ovocné koláče"
}, {
  value: "KYNUTE_BUCHTY_A_LOUPAKY",
  label: "Kynuté buchty a loupáky"
}, {
  value: "SLANE_PECIVO",
  label: "Slané pečivo"
}];
const AVAILABILITY_OPTIONS: {
  value: AvailabilityFilter;
  label: string;
}[] = [{
  value: "ALL",
  label: "Dostupnost: Vše"
}, {
  value: "AVAILABLE",
  label: "Pouze na pultu (dostupné)"
}, {
  value: "SOLD_OUT",
  label: "Pouze vyprodáno"
}];
export default function FilterBar({
  filter,
  onFilterChange,
  onOpenCreate,
  totalFiltered
}: FilterBarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filter,
      searchQuery: e.target.value
    });
  };
  const handleCategoryChange = (val: string) => {
    onFilterChange({
      ...filter,
      category: val as "ALL" | PastryCategory
    });
  };
  const handleAvailabilityChange = (val: string) => {
    onFilterChange({
      ...filter,
      availability: val as AvailabilityFilter
    });
  };
  const handleReset = () => {
    onFilterChange({
      category: "ALL",
      availability: "ALL",
      searchQuery: ""
    });
  };
  const isFiltered = filter.category !== "ALL" || filter.availability !== "ALL" || filter.searchQuery.trim().length > 0;
  return <div data-controller-name="Ovládací a filtrační panel vitríny" className="w-full flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='filterbar-r7198327237a473b4-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between" data-api-unique-id='filterbar-r392688e5450652a3-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
        {/* Vyhledávací pole */}
        <div className="relative min-w-0 flex-1" data-api-unique-id='filterbar-raf41eb625b87f076-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" data-api-unique-id='filterbar-r7463f74b87f91f1c-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar' />
          <input type="text" placeholder="Hledat pečivo dle názvu nebo ingrediencí..." value={filter.searchQuery} onChange={handleSearchChange} className="w-full rounded-md border border-input bg-background pl-9 pr-8 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" data-api-unique-id='filterbar-r8ec3678275d36b9f-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar' />
          {filter.searchQuery && <button type="button" onClick={() => onFilterChange({
          ...filter,
          searchQuery: ""
        })} className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground" aria-label="Vymazat hledání" data-api-unique-id='filterbar-r9e32a259335c1943-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
              <X className="h-3.5 w-3.5" data-api-unique-id='filterbar-r1fc9aa6ec4832aff-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar' />
            </button>}
        </div>

        {/* Filtry a akční tlačítko */}
        <div className="flex min-w-0 flex-wrap items-center gap-2" data-api-unique-id='filterbar-rb6c94c12e1e24d37-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
          {/* Kategorie výběr */}
          <div className="w-full sm:w-auto min-w-[170px]" data-api-unique-id='filterbar-r8f4b3b4ba2621400-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
            <Select value={filter.category} onValueChange={handleCategoryChange} data-api-unique-id='filterbar-r752d0b1efcaaf41e-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
              <SelectTrigger size="sm" className="w-full min-w-[170px] bg-background" data-api-unique-id='filterbar-redc4bc3621bdecf4-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
                <SelectValue placeholder="Vyberte kategorii" data-api-unique-id='filterbar-re75aab14cc0fc098-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar' />
              </SelectTrigger>
              <SelectContent data-api-unique-id='filterbar-r01bd6744ae071cdd-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
                {CATEGORY_OPTIONS.map((opt, index) => <SelectItem key={opt.value} value={opt.value} data-api-unique-id='filterbar-r73403f4a404adf34-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar' data-api-in-loop='1' data-api-bind-info={`CATEGORY_OPTIONS-${index}-label`} data-api-map-var-name='opt'>
                    {opt.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Dostupnost výběr */}
          <div className="w-full sm:w-auto min-w-[170px]" data-api-unique-id='filterbar-rbcfe6881ba01a955-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
            <Select value={filter.availability} onValueChange={handleAvailabilityChange} data-api-unique-id='filterbar-re237d447891d4adf-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
              <SelectTrigger size="sm" className="w-full min-w-[170px] bg-background" data-api-unique-id='filterbar-r6632c24d6c3a7712-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
                <SelectValue placeholder="Dostupnost" data-api-unique-id='filterbar-r31006d25bbbb9cb1-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar' />
              </SelectTrigger>
              <SelectContent data-api-unique-id='filterbar-r3abb1ecff9232caa-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
                {AVAILABILITY_OPTIONS.map((opt, index) => <SelectItem key={opt.value} value={opt.value} data-api-unique-id='filterbar-rcd37c8936bfd6bb9-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar' data-api-in-loop='1' data-api-bind-info={`AVAILABILITY_OPTIONS-${index}-label`} data-api-map-var-name='opt'>
                    {opt.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Reset filtrů */}
          {isFiltered && <button type="button" onClick={handleReset} className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" data-api-unique-id='filterbar-rcb99557d5a396d9c-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
              <Filter className="h-3.5 w-3.5" data-api-unique-id='filterbar-r7107508eee123b02-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar' />
              <span data-api-unique-id='filterbar-r33c3f89809e8a3e0-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>Resetovat</span>
            </button>}

          {/* Hlavní CTA Přidat do vitríny */}
          <button type="button" onClick={onOpenCreate} className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors ml-auto sm:ml-0" data-api-unique-id='filterbar-r1a9caf79db7fd0c4-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
            <Plus className="h-4 w-4" data-api-unique-id='filterbar-rbf898718ed81c8ed-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar' />
            <span data-api-unique-id='filterbar-r29462c8b452673dd-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>Přidat do vitríny</span>
          </button>
        </div>
      </div>

      {/* Stavový proužek s počtem nalezených položek */}
      <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-2.5" data-api-unique-id='filterbar-r656f0867730aa9c3-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
        <div className="flex items-center gap-2" data-api-unique-id='filterbar-re0c0b06ed12a14f1-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
          <span data-api-unique-id='filterbar-r97cade8742cff574-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
            Zobrazeno <strong className="font-semibold text-foreground font-mono" data-api-unique-id='filterbar-rc077fefc4f3ad040-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>{totalFiltered}</strong> položek
          </span>
          {isFiltered && <span className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground" data-api-unique-id='filterbar-r0601299b0a9e2e5e-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
              Aktivní filtr
            </span>}
        </div>
        <div className="hidden sm:inline-block text-[11px]" data-api-unique-id='filterbar-r928d748bf7be20f4-s3496712142' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/FilterBar'>
          Řazeno dle pořadí zobrazení (display_order)
        </div>
      </div>
    </div>;
}