"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import type { PastryItem, PastryFilterState, PastryFormData } from "@/backend/types/AdminPastryShowcase";
import { getPastryItems, createPastryItem, updatePastryItem, togglePastrySoldOut, togglePastryTodaySpecial, movePastryOrder, deletePastryItem } from "@/backend/actions/AdminPastryShowcase";
import MetricsBanner from "@/backend/components/AdminPastryShowcase/MetricsBanner";
import FilterBar from "@/backend/components/AdminPastryShowcase/FilterBar";
import PastryTable from "@/backend/components/AdminPastryShowcase/PastryTable";
import PastryFormDrawer from "@/backend/components/AdminPastryShowcase/PastryFormDrawer";
import DeleteConfirmDialog from "@/backend/components/AdminPastryShowcase/DeleteConfirmDialog";
import { toast } from "sonner";
import { Sparkles, RefreshCw } from "lucide-react";
export default function AdminPastryShowcasePage() {
  const [items, setItems] = useState<PastryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<PastryFilterState>({
    category: "ALL",
    availability: "ALL",
    searchQuery: ""
  });

  // Modal / Drawer stavy
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PastryItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<PastryItem | null>(null);
  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getPastryItems();
      setItems(data ?? []);
    } catch {
      toast.error("Nepodařilo se načíst položky vitríny");
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Filtrace položek
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Filtr kategorie
      if (filter.category !== "ALL" && item.category !== filter.category) {
        return false;
      }

      // Filtr dostupnosti
      if (filter.availability === "AVAILABLE" && item.isSoldOut) {
        return false;
      }
      if (filter.availability === "SOLD_OUT" && !item.isSoldOut) {
        return false;
      }

      // Fulltextové vyhledávání podle názvu a ingrediencí
      if (filter.searchQuery.trim()) {
        const query = filter.searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchCode = item.itemCode?.toLowerCase().includes(query);
        const matchIngredients = Array.isArray(item.ingredients) ? item.ingredients.some(ing => ing.toLowerCase().includes(query)) : false;
        if (!matchName && !matchCode && !matchIngredients) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => a.displayOrder - b.displayOrder);
  }, [items, filter]);
  const maxDisplayOrder = useMemo(() => {
    return items.reduce((max, it) => Math.max(max, it.displayOrder), 0);
  }, [items]);

  // Rychlé přepnutí stavu vyprodání (is_sold_out) přímo v tabulce
  const handleToggleSoldOut = async (id: string) => {
    try {
      const updated = await togglePastrySoldOut(id);
      setItems(prev => prev.map((item, index) => item.id === id ? updated : item));
      toast.success(updated.isSoldOut ? `Položka „${updated.name}“ označena jako vyprodaná` : `Položka „${updated.name}“ vrácena do nabídky na pult`);
    } catch {
      toast.error("Nepodařilo se změnit stav vyprodání");
    }
  };

  // Rychlé přepnutí dnešní speciality (is_today_special)
  const handleToggleTodaySpecial = async (id: string) => {
    try {
      const updated = await togglePastryTodaySpecial(id);
      setItems(prev => prev.map((item, index) => item.id === id ? updated : item));
      toast.success(updated.isTodaySpecial ? `„${updated.name}“ nastavena jako dnešní specialita` : `Odebrán příznak dnešní speciality z „${updated.name}“`);
    } catch {
      toast.error("Nepodařilo se změnit příznak speciality");
    }
  };

  // Posun pořadí (display_order)
  const handleMoveOrder = async (id: string, direction: "up" | "down") => {
    try {
      const reordered = await movePastryOrder({
        id,
        direction
      });
      setItems(reordered);
      toast.success("Pořadí zobrazení pečiva aktualizováno");
    } catch {
      toast.error("Nepodařilo se upravit pořadí položek");
    }
  };

  // Uložení formuláře (vytvoření / editace)
  const handleFormSubmit = async (formData: PastryFormData) => {
    try {
      if (formData.id) {
        // Úprava stávající položky
        const updated = await updatePastryItem({
          id: formData.id,
          name: formData.name,
          category: formData.category,
          priceCzk: formData.priceCzk,
          shortDescription: formData.shortDescription,
          fullDescription: formData.fullDescription || null,
          ingredients: formData.ingredients,
          allergens: formData.allergens,
          photoKey: formData.photoKey,
          isTodaySpecial: formData.isTodaySpecial,
          isSoldOut: formData.isSoldOut,
          freshnessLabel: formData.freshnessLabel,
          displayOrder: formData.displayOrder,
          itemCode: formData.itemCode || null
        });
        setItems(prev => prev.map((item, index) => item.id === updated.id ? updated : item));
        toast.success(`Položka „${updated.name}“ byla úspěšně aktualizována`);
      } else {
        // Vytvoření nové položky
        const created = await createPastryItem({
          name: formData.name,
          category: formData.category,
          priceCzk: formData.priceCzk,
          shortDescription: formData.shortDescription,
          fullDescription: formData.fullDescription || null,
          ingredients: formData.ingredients,
          allergens: formData.allergens,
          photoKey: formData.photoKey,
          isTodaySpecial: formData.isTodaySpecial,
          isSoldOut: formData.isSoldOut,
          freshnessLabel: formData.freshnessLabel,
          displayOrder: formData.displayOrder,
          itemCode: formData.itemCode || null
        });
        setItems(prev => [...prev, created]);
        toast.success(`Nové pečivo „${created.name}“ bylo přidáno do vitríny`);
      }
      setIsDrawerOpen(false);
      setEditingItem(null);
    } catch {
      toast.error("Uložení položky pečiva se nezdařilo");
    }
  };

  // Smazání položky z vitríny
  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    const targetItem = deletingItem;
    try {
      await deletePastryItem(targetItem.id);
      setItems(prev => prev.filter(it => it.id !== targetItem.id));
      toast.success(`Položka „${targetItem.name}“ byla odstraněna z vitríny`);
      setDeletingItem(null);
    } catch {
      toast.error("Smazání položky z vitríny selhalo");
    }
  };
  return <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6 space-y-5">
      {/* Hlavička stránky */}
      <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground font-display">
              Správa vitríny pečiva
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3 w-3" />
              <span>Denní pult</span>
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Přehled sortimentu, kontrola čerstvosti, okamžité přepínání vyprodání a správa receptur.
          </p>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button type="button" disabled={isLoading} onClick={fetchItems} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shadow-sm disabled:opacity-50">
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Aktualizovat data</span>
          </button>
        </div>
      </div>

      {/* 1. Souhrnné metriky denní nabídky */}
      <MetricsBanner items={items} />

      {/* 2. Ovládací a filtrační panel vitríny */}
      <FilterBar filter={filter} onFilterChange={setFilter} onOpenCreate={() => {
      setEditingItem(null);
      setIsDrawerOpen(true);
    }} totalFiltered={filteredItems.length} />

      {/* 3. Administrátorská tabulka a přehled sortimentu vitríny */}
      {isLoading && items.length === 0 ? <div className="w-full rounded-xl border border-border bg-card p-12 text-center text-sm text-muted-foreground flex flex-col items-center justify-center gap-3">
          <RefreshCw className="h-6 w-6 animate-spin text-primary" />
          <span>Načítání položek vitríny...</span>
        </div> : <PastryTable items={filteredItems} onToggleSoldOut={handleToggleSoldOut} onToggleTodaySpecial={handleToggleTodaySpecial} onMoveOrder={handleMoveOrder} onEdit={item => {
      setEditingItem(item);
      setIsDrawerOpen(true);
    }} onDelete={item => setDeletingItem(item)} />}

      {/* 4. Editační a zakládací postranní panel (Drawer) */}
      <PastryFormDrawer isOpen={isDrawerOpen} onClose={() => {
      setIsDrawerOpen(false);
      setEditingItem(null);
    }} onSubmit={handleFormSubmit} initialData={editingItem} maxDisplayOrder={maxDisplayOrder} />

      {/* 5. Potvrzovací dialog pro smazání položky */}
      <DeleteConfirmDialog isOpen={!!deletingItem} item={deletingItem} onClose={() => setDeletingItem(null)} onConfirm={handleConfirmDelete} />
    </div>;
}
