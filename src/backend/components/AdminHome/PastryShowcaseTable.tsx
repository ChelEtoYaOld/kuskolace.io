"use client";

import React, { useState } from "react";
import EditableImg from "@/@base/EditableImg";
import { generatedImagesByFilename, type GeneratedImageFilename } from "@/lib/generated-images/backend-admin_home";
import type { PastryItemDto, PastryCategory, PastryFilterCategory } from "@/backend/types/AdminHome";
import { Plus, Sparkles, ArrowUp, ArrowDown, Trash2, Edit2, Check, X, Search, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
export type PastryItem = PastryItemDto;
export type PastryCategoryEnum = PastryCategory;
export type { PastryFilterCategory };
export interface PastryShowcaseTableProps {
  items: PastryItem[];
  onToggleSpecial: (id: string) => void;
  onToggleSoldOut: (id: string) => void;
  onAddItem: (item: Omit<PastryItem, "id" | "displayOrder">) => void;
  onUpdateItem: (id: string, updates: Partial<PastryItem>) => void;
  onDeleteItem: (id: string) => void;
  onReorder: (sourceIndex: number, destinationIndex: number) => void;
}
const CATEGORY_LABELS: Record<PastryCategoryEnum, string> = {
  OVOCNE_KOLACE: "Ovocné koláče",
  KYNUTE_BUCHTY_A_LOUPAKY: "Kynuté & Loupáky",
  SLANE_PECIVO: "Slané pečivo"
};
const PHOTO_LABELS: Record<GeneratedImageFilename, string> = {
  "kolac-boruvkovy": "Borůvkový koláč s drobenkou",
  "skoricovy-snek": "Skořicový šnek s karamelem",
  "moravsky-kolac": "Moravský koláč s povidly a tvarohem",
  "jahodovy-kolac": "Jahodový koláč s drobenkou",
  "pistaciovy-loupak": "Pistáciový máslový loupák",
  "ig-ranni-vune": "Ranní vůně křídla pekárny",
  "ig-cerstvy-plech": "Čerstvý plech s koláči",
  "ig-korunni-vyloha": "Vinohradská výloha"
};
export default function PastryShowcaseTable({
  items = [],
  onToggleSpecial,
  onToggleSoldOut,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onReorder
}: PastryShowcaseTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<PastryFilterCategory>("VSE");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Formulář pro nové pečivo
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<PastryCategoryEnum>("OVOCNE_KOLACE");
  const [newPrice, setNewPrice] = useState("145");
  const [newPhotoKey, setNewPhotoKey] = useState<GeneratedImageFilename>("kolac-boruvkovy");
  const [newDesc, setNewDesc] = useState("Čerstvě upečeno z kynutého těsta s poctivou máslovou drobenkou.");
  const [newFreshness, setNewFreshness] = useState("Ranní várka 06:30");
  const [newIsSpecial, setNewIsSpecial] = useState(true);

  // In-line editace existující položky
  const [editPrice, setEditPrice] = useState("");
  const [editName, setEditName] = useState("");
  const handleStartEdit = (item: PastryItem) => {
    setEditingItemId(item.id);
    setEditName(item.name);
    setEditPrice(String(item.priceCzk));
  };
  const handleSaveEdit = (id: string) => {
    const parsedPrice = parseInt(editPrice, 10);
    if (!editName.trim()) {
      toast.error("Zadejte název pečiva");
      return;
    }
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      toast.error("Cena musí být kladné číslo");
      return;
    }
    onUpdateItem(id, {
      name: editName.trim(),
      priceCzk: parsedPrice
    });
    setEditingItemId(null);
    toast.success("Položka byla úspěšně aktualizována");
  };
  const handleCancelEdit = () => {
    setEditingItemId(null);
  };
  const handleCreateItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = parseInt(newPrice, 10);
    if (!newName.trim()) {
      toast.error("Zadejte název nového pečiva");
      return;
    }
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      toast.error("Cena musí být platné číslo");
      return;
    }
    onAddItem({
      name: newName.trim(),
      category: newCategory,
      priceCzk: parsedPrice,
      shortDescription: newDesc.trim(),
      fullDescription: null,
      itemCode: null,
      ingredients: [],
      allergens: [],
      photoKey: newPhotoKey,
      freshnessLabel: newFreshness.trim() || "Dnes upečeno",
      isTodaySpecial: newIsSpecial,
      isSoldOut: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    setIsAddDialogOpen(false);
    setNewName("");
    setNewPrice("145");
    setNewDesc("Čerstvě upečeno z kynutého těsta s poctivou máslovou drobenkou.");
    toast.success("Nové pečivo bylo zařazeno do vitríny");
  };
  const filteredItems = items.filter(item => {
    const matchesCat = selectedCategory === "VSE" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });
  return <div data-controller-name="Správa nabídky pečiva" className="flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='pastryshowcasetable-rdb95cb0ecaafa783-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
      {/* Hlavička sekce */}
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" data-api-unique-id='pastryshowcasetable-rf90c090ea4ad0232-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
        <div className="min-w-0" data-api-unique-id='pastryshowcasetable-r26b7f8f2c780a4a1-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
          <div className="flex items-center gap-2" data-api-unique-id='pastryshowcasetable-r51614bab65dfe076-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
            <h2 className="font-header text-base font-semibold tracking-tight text-foreground sm:text-lg" data-api-unique-id='pastryshowcasetable-r142032c80cb98d74-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
              Denní vitrína pečiva
            </h2>
            <span className="inline-flex shrink-0 items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground whitespace-nowrap" data-api-unique-id='pastryshowcasetable-rae4c6b05dc32b481-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
              {items.length} položek v nabídce
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm" data-api-unique-id='pastryshowcasetable-r506a337574d85104-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
            Okamžitá kontrola ranního sortimentu na Korunní 90, cen a stavu vyprodání
          </p>
        </div>

        <button type="button" onClick={() => setIsAddDialogOpen(true)} className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='pastryshowcasetable-r42ce23eabb03e591-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
          <Plus className="h-4 w-4" data-api-unique-id='pastryshowcasetable-r282ebe6bb9f85cde-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' />
          <span data-api-unique-id='pastryshowcasetable-r73c68c460f2006c6-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>Přidat do vitríny</span>
        </button>
      </div>

      {/* Ovládací a vyhledávací lišta */}
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between" data-api-unique-id='pastryshowcasetable-r899d05f4d73cb008-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center" data-api-unique-id='pastryshowcasetable-r7e5b110562f421c5-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
          <div className="relative min-w-0 w-full sm:max-w-xs" data-api-unique-id='pastryshowcasetable-r879c8a2198392bbd-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" data-api-unique-id='pastryshowcasetable-ra915b46867d52efd-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Hledat koláč, šnek, loupák..." className="h-8 w-full rounded-md border border-border bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='pastryshowcasetable-rea9b57990287da6a-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' />
          </div>

          {/* Filtry kategorií */}
          <div className="flex min-w-0 items-center gap-1 overflow-x-auto text-xs pb-1 sm:pb-0" data-api-unique-id='pastryshowcasetable-re6009885f84b5210-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
            <button type="button" onClick={() => setSelectedCategory("VSE")} className={`inline-flex shrink-0 items-center rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${selectedCategory === "VSE" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='pastryshowcasetable-r7cf2a78eb7780db9-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
              Všechny ({items.length})
            </button>
            {(["OVOCNE_KOLACE", "KYNUTE_BUCHTY_A_LOUPAKY", "SLANE_PECIVO"] as PastryCategoryEnum[]).map((cat, index) => <button key={cat} type="button" onClick={() => setSelectedCategory(cat)} className={`inline-flex shrink-0 items-center rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${selectedCategory === cat ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='pastryshowcasetable-rc86398d4348a7875-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                  {CATEGORY_LABELS[cat]}
                </button>)}
          </div>
        </div>

        <div className="text-left sm:text-right text-xs text-muted-foreground shrink-0" data-api-unique-id='pastryshowcasetable-r0702f1c0091099de-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
          Zobrazeno: {filteredItems.length} z {items.length}
        </div>
      </div>

      {/* Samotná tabulka pečiva */}
      <div className="w-full max-w-full min-w-0 overflow-x-auto rounded-md border border-border bg-background" data-api-unique-id='pastryshowcasetable-rf5d124458e3a155c-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
        <table className="w-full min-w-[780px] text-left text-xs" data-api-unique-id='pastryshowcasetable-r628692de37703515-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
          <thead className="border-b border-border bg-muted text-muted-foreground" data-api-unique-id='pastryshowcasetable-r3a77b4d10fac317a-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
            <tr data-api-unique-id='pastryshowcasetable-r47487eaca381273f-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
              <th className="py-2.5 pl-3 pr-2 font-medium w-[72px]" data-api-unique-id='pastryshowcasetable-rd730087e19b14497-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>Foto</th>
              <th className="py-2.5 px-3 font-medium min-w-[220px]" data-api-unique-id='pastryshowcasetable-re29d3c48381473d5-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>Název & popis</th>
              <th className="py-2.5 px-3 font-medium min-w-[140px] whitespace-nowrap" data-api-unique-id='pastryshowcasetable-r13c1255f12f24003-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>Kategorie</th>
              <th className="py-2.5 px-3 font-medium min-w-[90px] whitespace-nowrap" data-api-unique-id='pastryshowcasetable-r6db16d4e8df10327-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>Cena (Kč)</th>
              <th className="py-2.5 px-3 font-medium min-w-[130px] whitespace-nowrap text-center" data-api-unique-id='pastryshowcasetable-r082f430c8eb7dadb-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                Specialita dne
              </th>
              <th className="py-2.5 px-3 font-medium min-w-[130px] whitespace-nowrap text-center" data-api-unique-id='pastryshowcasetable-r1bb96ef67f7b5bdf-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                Stav várky
              </th>
              <th className="py-2.5 px-3 font-medium min-w-[120px] whitespace-nowrap text-center" data-api-unique-id='pastryshowcasetable-r74caf4b64e704ced-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                Čerstvost
              </th>
              <th className="py-2.5 pr-3 pl-2 font-medium min-w-[110px] text-right whitespace-nowrap" data-api-unique-id='pastryshowcasetable-r84205d8429289688-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                Akce
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border" data-api-unique-id='pastryshowcasetable-r6e7aa12fb51d69cb-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
            {filteredItems.length === 0 ? <tr data-api-unique-id='pastryshowcasetable-rd02141e1ac890b2a-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                <td colSpan={8} className="py-8 text-center text-muted-foreground" data-api-unique-id='pastryshowcasetable-r47611fd28fa5bf79-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                  Nebylo nalezeno žádné pečivo vyhovující filtru.
                </td>
              </tr> : filteredItems.map((item, index) => {
            const isEditing = editingItemId === item.id;
            const imageSrc = (generatedImagesByFilename as Record<string, string>)[item.photoKey] || item.photoKey;
            return <tr key={item.id} className="hover:bg-muted/40 transition-colors" data-api-unique-id='pastryshowcasetable-r8147f3d6c14e5f71-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                    {/* Náhledové foto */}
                    <td className="py-2.5 pl-3 pr-2 align-middle" data-api-unique-id='pastryshowcasetable-r098889ec9cc433b4-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-muted" data-api-unique-id='pastryshowcasetable-r903f1d5323e9dfac-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                        <EditableImg propKey={`pastry-img-${item.id}`} src={imageSrc} alt={item.name} className="h-full w-full object-cover" data-api-unique-id='pastryshowcasetable-r26965044efbf7ba4-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' />
                      </div>
                    </td>

                    {/* Název & popis */}
                    <td className="py-2.5 px-3 align-middle" data-api-unique-id='pastryshowcasetable-r530e07c769ad443e-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                      {isEditing ? <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="h-7 w-full rounded border border-border bg-background px-2 text-xs font-semibold text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" data-api-unique-id='pastryshowcasetable-r83b400a12202891b-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' /> : <div className="min-w-0 max-w-[280px]" data-api-unique-id='pastryshowcasetable-r2f2c3c898cbf2e8a-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                          <p className="font-header text-xs font-semibold text-foreground truncate" data-api-unique-id='pastryshowcasetable-r014224bb05a09713-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' data-api-bind-info={`filteredItems-${index}-name`} data-api-map-var-name='item'>
                            {item.name}
                          </p>
                          <p className="line-clamp-1 text-[11px] text-muted-foreground" data-api-unique-id='pastryshowcasetable-r94c0cea617987f1c-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' data-api-bind-info={`filteredItems-${index}-shortDescription`} data-api-map-var-name='item'>
                            {item.shortDescription}
                          </p>
                        </div>}
                    </td>

                    {/* Kategorie */}
                    <td className="py-2.5 px-3 align-middle whitespace-nowrap" data-api-unique-id='pastryshowcasetable-r64dc0c6d5b63ba3d-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                      <span className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground" data-api-unique-id='pastryshowcasetable-raff7044edf432724-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                        {CATEGORY_LABELS[item.category] || item.category}
                      </span>
                    </td>

                    {/* Cena */}
                    <td className="py-2.5 px-3 align-middle whitespace-nowrap font-mono" data-api-unique-id='pastryshowcasetable-r71531993ae6e525b-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                      {isEditing ? <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} className="h-7 w-20 rounded border border-border bg-background px-2 text-xs font-mono font-bold text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" data-api-unique-id='pastryshowcasetable-rb7d066d56a455a36-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' /> : <span className="font-bold text-foreground" data-api-unique-id='pastryshowcasetable-r3ce247ab0c9a1388-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' data-api-bind-info={`filteredItems-${index}-priceCzk`} data-api-map-var-name='item'>
                          {item.priceCzk} Kč
                        </span>}
                    </td>

                    {/* Specialita dne toggle */}
                    <td className="py-2.5 px-3 align-middle text-center whitespace-nowrap" data-api-unique-id='pastryshowcasetable-r092a5b1beb7122d8-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                      <button type="button" onClick={() => onToggleSpecial(item.id)} className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${item.isTodaySpecial ? "bg-primary text-primary-foreground shadow-xs" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`} title="Kliknutím přepnete označení Dnešní specialita" data-api-unique-id='pastryshowcasetable-r3235c55425246a95-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                        <Sparkles className="h-3 w-3" data-api-unique-id='pastryshowcasetable-r8d35e563047b2839-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' />
                        <span data-api-unique-id='pastryshowcasetable-r83e06e602a76d89a-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>{item.isTodaySpecial ? "Specialita" : "Běžná nabídka"}</span>
                      </button>
                    </td>

                    {/* Stav várky (Dnes upečeno / Vyprodáno) */}
                    <td className="py-2.5 px-3 align-middle text-center whitespace-nowrap" data-api-unique-id='pastryshowcasetable-re57484e1d1d224cf-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                      <button type="button" onClick={() => onToggleSoldOut(item.id)} className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${item.isSoldOut ? "bg-warning text-warning-foreground" : "bg-success text-success-foreground"}`} title="Kliknutím přepnete dostupnost v pekárně" data-api-unique-id='pastryshowcasetable-r484afcedb58ff30f-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                        {item.isSoldOut ? <>
                            <AlertCircle className="h-3 w-3" data-api-unique-id='pastryshowcasetable-r1d99eab0fd9fb870-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' />
                            <span data-api-unique-id='pastryshowcasetable-r7434c1289ebe3133-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>Vyprodáno</span>
                          </> : <>
                            <CheckCircle2 className="h-3 w-3" data-api-unique-id='pastryshowcasetable-r1c1e10c7d2e9b7da-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' />
                            <span data-api-unique-id='pastryshowcasetable-rb8eb9ad4a53743fe-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>Dnes upečeno</span>
                          </>}
                      </button>
                    </td>

                    {/* Čerstvost */}
                    <td className="py-2.5 px-3 align-middle text-center whitespace-nowrap text-muted-foreground" data-api-unique-id='pastryshowcasetable-rb7a617d74a63b0ec-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                      <span className="inline-flex items-center gap-1 text-[11px]" data-api-unique-id='pastryshowcasetable-ra7058d52c9807b58-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                        <Clock className="h-3 w-3 text-muted-foreground" data-api-unique-id='pastryshowcasetable-r32a3c35b6f745d2c-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' />
                        <span data-api-unique-id='pastryshowcasetable-r5b94d6a738216c8d-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' data-api-bind-info={`filteredItems-${index}-freshnessLabel`} data-api-map-var-name='item'>{item.freshnessLabel}</span>
                      </span>
                    </td>

                    {/* Akce (Edit, Pořadí, Smazat) */}
                    <td className="py-2.5 pr-3 pl-2 align-middle text-right whitespace-nowrap" data-api-unique-id='pastryshowcasetable-r54c024e1193fa429-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                      <div className="inline-flex items-center gap-1" data-api-unique-id='pastryshowcasetable-r1593f9191d260774-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                        {isEditing ? <>
                            <button type="button" onClick={() => handleSaveEdit(item.id)} className="rounded p-1 text-success hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" title="Uložit změny" data-api-unique-id='pastryshowcasetable-rfdbbdb12b34c1afe-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                              <Check className="h-4 w-4" data-api-unique-id='pastryshowcasetable-r6a31697fabd54adb-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' />
                            </button>
                            <button type="button" onClick={handleCancelEdit} className="rounded p-1 text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" title="Zrušit úpravy" data-api-unique-id='pastryshowcasetable-r9346d7ea36023dce-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                              <X className="h-4 w-4" data-api-unique-id='pastryshowcasetable-r1a3d3e09f0f55af5-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' />
                            </button>
                          </> : <>
                            <button type="button" onClick={() => handleStartEdit(item)} className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" title="Rychle upravit název a cenu" data-api-unique-id='pastryshowcasetable-r33d203de6bdb21b1-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                              <Edit2 className="h-3.5 w-3.5" data-api-unique-id='pastryshowcasetable-re32713e2c6eaaeee-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' />
                            </button>
                            <button type="button" onClick={() => onReorder(index, index - 1)} disabled={index === 0} className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" title="Posunout nahoru v nabídce" data-api-unique-id='pastryshowcasetable-r566a553690404c03-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                              <ArrowUp className="h-3.5 w-3.5" data-api-unique-id='pastryshowcasetable-r4327a1317bdb04c8-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' />
                            </button>
                            <button type="button" onClick={() => onReorder(index, index + 1)} disabled={index === items.length - 1} className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" title="Posunout dolů v nabídce" data-api-unique-id='pastryshowcasetable-ra628514dde7fdad5-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                              <ArrowDown className="h-3.5 w-3.5" data-api-unique-id='pastryshowcasetable-rec05e890597dcd90-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' />
                            </button>
                            <button type="button" onClick={() => onDeleteItem(item.id)} className="rounded p-1 text-destructive hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" title="Odstranit z vitríny" data-api-unique-id='pastryshowcasetable-re5c1298c7cd274b5-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1'>
                              <Trash2 className="h-3.5 w-3.5" data-api-unique-id='pastryshowcasetable-r174ef1a42d7ef1be-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' data-api-in-loop='1' />
                            </button>
                          </>}
                      </div>
                    </td>
                  </tr>;
          })}
          </tbody>
        </table>
      </div>

      {/* Dialog pro přidání nového pečiva */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} data-api-unique-id='pastryshowcasetable-rf936a582b4a25fce-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
        <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-lg" data-api-unique-id='pastryshowcasetable-raa48025706313566-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
          <DialogHeader data-api-unique-id='pastryshowcasetable-rc2f788f8c5bbd780-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
            <DialogTitle className="font-header text-base text-foreground" data-api-unique-id='pastryshowcasetable-r96adafa5ba6302d0-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
              Přidat nové pečivo do nabídky
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground" data-api-unique-id='pastryshowcasetable-r82ec6e652ad750d8-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
              Zadejte podrobnosti pro ranní vitrínu na Korunní 90 včetně fotografie a označení speciality.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateItemSubmit} className="space-y-3.5 py-2 text-xs" data-api-unique-id='pastryshowcasetable-r881db158821bf76f-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
            <div data-api-unique-id='pastryshowcasetable-r82497f4cd824836f-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
              <label className="block font-medium text-foreground mb-1" data-api-unique-id='pastryshowcasetable-r0feb2f5331e57803-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                Název pečiva *
              </label>
              <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Např. Tvarohový koláč s meruňkami a mandlemi" className="h-8 w-full rounded-md border border-border bg-background px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required data-api-unique-id='pastryshowcasetable-rbbb0cb28f4f3c438-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' />
            </div>

            <div className="grid grid-cols-2 gap-3" data-api-unique-id='pastryshowcasetable-r379fb9788f894d86-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
              <div data-api-unique-id='pastryshowcasetable-r19480cefad24eddb-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                <label className="block font-medium text-foreground mb-1" data-api-unique-id='pastryshowcasetable-r80422307f8eef425-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                  Kategorie *
                </label>
                <Select value={newCategory} onValueChange={val => setNewCategory(val as PastryCategoryEnum)} data-api-unique-id='pastryshowcasetable-r22eda97e03b18a19-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                  <SelectTrigger className="h-8 w-full" data-api-unique-id='pastryshowcasetable-r4ac9b460837c665e-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                    <SelectValue placeholder="Vyberte kategorii" data-api-unique-id='pastryshowcasetable-re48bf01ae761a5ba-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                      {CATEGORY_LABELS[newCategory]}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent data-api-unique-id='pastryshowcasetable-r0ce219d5fb56429b-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                    <SelectItem value="OVOCNE_KOLACE" data-api-unique-id='pastryshowcasetable-r3de901c7e5b0fba5-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>Ovocné koláče</SelectItem>
                    <SelectItem value="KYNUTE_BUCHTY_A_LOUPAKY" data-api-unique-id='pastryshowcasetable-r0f718c01662b526f-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>Kynuté & Loupáky</SelectItem>
                    <SelectItem value="SLANE_PECIVO" data-api-unique-id='pastryshowcasetable-rb024213f2ad6c37a-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>Slané pečivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div data-api-unique-id='pastryshowcasetable-r5d4980151e13a66b-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                <label className="block font-medium text-foreground mb-1" data-api-unique-id='pastryshowcasetable-rbbb0eb23bf3097af-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                  Cena za kus (Kč) *
                </label>
                <input type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} placeholder="145" className="h-8 w-full rounded-md border border-border bg-background px-3 font-mono text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required data-api-unique-id='pastryshowcasetable-rc2daa5a6351d1fc8-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3" data-api-unique-id='pastryshowcasetable-r15b12d98ce823d02-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
              <div data-api-unique-id='pastryshowcasetable-rf9842def833c4bc7-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                <label className="block font-medium text-foreground mb-1" data-api-unique-id='pastryshowcasetable-r3355e9201ef6764f-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                  Přiřazená fotografie *
                </label>
                <Select value={newPhotoKey} onValueChange={val => setNewPhotoKey(val as GeneratedImageFilename)} data-api-unique-id='pastryshowcasetable-r353f197ff7f0980d-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                  <SelectTrigger className="h-8 w-full" data-api-unique-id='pastryshowcasetable-r91fb5245d7960439-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                    <SelectValue placeholder="Vyberte foto" data-api-unique-id='pastryshowcasetable-r00b9fc471283fe7a-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                      {PHOTO_LABELS[newPhotoKey] || "Vyberte foto"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent data-api-unique-id='pastryshowcasetable-r9af93ad30d24b0f7-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                    <SelectItem value="kolac-boruvkovy" data-api-unique-id='pastryshowcasetable-r84f10883482d5d78-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>Borůvkový koláč s drobenkou</SelectItem>
                    <SelectItem value="skoricovy-snek" data-api-unique-id='pastryshowcasetable-r393a086127059bb0-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>Skořicový šnek s karamelem</SelectItem>
                    <SelectItem value="moravsky-kolac" data-api-unique-id='pastryshowcasetable-r2a98960beee7bb92-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>Moravský koláč s povidly a tvarohem</SelectItem>
                    <SelectItem value="jahodovy-kolac" data-api-unique-id='pastryshowcasetable-r3fbd29178730112d-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>Jahodový koláč s drobenkou</SelectItem>
                    <SelectItem value="pistaciovy-loupak" data-api-unique-id='pastryshowcasetable-rd2fdadeaf525a4df-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>Pistáciový máslový loupák</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div data-api-unique-id='pastryshowcasetable-rb836846faa06629f-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                <label className="block font-medium text-foreground mb-1" data-api-unique-id='pastryshowcasetable-r158e6a5c83011a51-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                  Štítek čerstvosti
                </label>
                <input type="text" value={newFreshness} onChange={e => setNewFreshness(e.target.value)} placeholder="Ranní várka 06:30" className="h-8 w-full rounded-md border border-border bg-background px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='pastryshowcasetable-r5f1f0192a112e26c-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' />
              </div>
            </div>

            <div data-api-unique-id='pastryshowcasetable-r02f00da109b8dc7d-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
              <label className="block font-medium text-foreground mb-1" data-api-unique-id='pastryshowcasetable-rc56b185196371b11-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                Krátký popis pro návštěvníky
              </label>
              <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} rows={2} className="w-full rounded-md border border-border bg-background p-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='pastryshowcasetable-r8c4051216d7f86df-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' />
            </div>

            <div className="flex items-center gap-2 pt-1" data-api-unique-id='pastryshowcasetable-r915c9facfe3e165b-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
              <input type="checkbox" id="isSpecialCheck" checked={newIsSpecial} onChange={e => setNewIsSpecial(e.target.checked)} className="h-4 w-4 rounded border-border text-primary focus:ring-ring" data-api-unique-id='pastryshowcasetable-rf73892d15ebc9189-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable' />
              <label htmlFor="isSpecialCheck" className="text-xs font-medium text-foreground cursor-pointer" data-api-unique-id='pastryshowcasetable-rdc7ad78d9a8ef702-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                Ihned označit jako „Dnešní specialita“ (zvýrazněno na úvodní stránce)
              </label>
            </div>

            <DialogFooter className="pt-2" data-api-unique-id='pastryshowcasetable-rd169e30959a5b3b9-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
              <button type="button" onClick={() => setIsAddDialogOpen(false)} className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-card-foreground hover:bg-muted" data-api-unique-id='pastryshowcasetable-r96c1fd66a5b5b41c-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                Zrušit
              </button>
              <button type="submit" className="rounded-md bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90" data-api-unique-id='pastryshowcasetable-r6d54cb0e58fed327-s1872176683' data-api-unique-page-name='src/backend/components/AdminHome/PastryShowcaseTable'>
                Uložit do vitríny
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>;
}