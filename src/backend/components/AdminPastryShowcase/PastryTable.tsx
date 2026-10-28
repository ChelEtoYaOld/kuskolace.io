"use client";

import React from "react";
import { PastryItem, PastryCategory } from "@/backend/types/AdminPastryShowcase";
import { ArrowUp, ArrowDown, Sparkles, Edit2, Trash2, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import EditableImg from "@/@base/EditableImg";
interface PastryTableProps {
  items: PastryItem[];
  onToggleSoldOut: (id: string) => void;
  onToggleTodaySpecial: (id: string) => void;
  onMoveOrder: (id: string, direction: "up" | "down") => void;
  onEdit: (item: PastryItem) => void;
  onDelete: (item: PastryItem) => void;
}
const CATEGORY_NAMES: Record<PastryCategory, string> = {
  OVOCNE_KOLACE: "Ovocné koláče",
  KYNUTE_BUCHTY_A_LOUPAKY: "Kynuté buchty a loupáky",
  SLANE_PECIVO: "Slané pečivo"
};
export default function PastryTable({
  items,
  onToggleSoldOut,
  onToggleTodaySpecial,
  onMoveOrder,
  onEdit,
  onDelete
}: PastryTableProps) {
  if (items.length === 0) {
    return <div data-controller-name="Přehled sortimentu vitríny" className="w-full flex min-w-0 flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center text-card-foreground shadow-sm" data-api-unique-id='pastrytable-rb607dfa921035f26-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-3" data-api-unique-id='pastrytable-r298bd57059a01e91-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>
          <Info className="h-6 w-6" data-api-unique-id='pastrytable-r6497836bfc43862c-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' />
        </div>
        <h3 className="text-base font-semibold text-foreground" data-api-unique-id='pastrytable-r160eeec266f5dcfd-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>Žádné pečivo neodpovídá zadání</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-sm" data-api-unique-id='pastrytable-rf1138124af26158b-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>
          Zkuste upravit nebo zrušit nastavené filtry, případně přidejte nový kousek do denní vitríny.
        </p>
      </div>;
  }
  return <div data-controller-name="Přehled sortimentu vitríny" className="w-full min-w-0 rounded-lg border border-border bg-card text-card-foreground shadow-sm flex flex-col" data-api-unique-id='pastrytable-rc3db0538b7b694ef-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>
      {/* Horizontální scrollovací obal s minimální garantovanou šířkou tabulky */}
      <div className="w-full max-w-full min-w-0 overflow-x-auto" data-api-unique-id='pastrytable-r08f06bfffbbd79ab-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>
        <table className="w-full min-w-[1100px] border-collapse text-left text-sm" data-api-unique-id='pastrytable-rd5e3eaae419d9cd2-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>
          <thead data-api-unique-id='pastrytable-r3d9f597c66dc7545-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>
            <tr className="border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='pastrytable-r66967ee0cbe67d25-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>
              <th className="py-3 px-3 w-[72px] text-center whitespace-nowrap" data-api-unique-id='pastrytable-r93ededf728b94eea-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>Pořadí</th>
              <th className="py-3 px-3 w-[84px] whitespace-nowrap" data-api-unique-id='pastrytable-rbda0733031cc5f44-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>Foto</th>
              <th className="py-3 px-4 min-w-[240px]" data-api-unique-id='pastrytable-rc9f6eed7d511fed3-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>Název & kód</th>
              <th className="py-3 px-3 min-w-[160px] whitespace-nowrap" data-api-unique-id='pastrytable-rf8830343c02598c7-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>Kategorie</th>
              <th className="py-3 px-3 min-w-[110px] text-right whitespace-nowrap" data-api-unique-id='pastrytable-rfd2d9f4e2a6a3b39-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>Cena</th>
              <th className="py-3 px-3 min-w-[150px] whitespace-nowrap" data-api-unique-id='pastrytable-rad75988154f19e90-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>Čerstvost</th>
              <th className="py-3 px-3 min-w-[140px] text-center whitespace-nowrap" data-api-unique-id='pastrytable-re2a98ce6045920d2-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>Dnes speciál</th>
              <th className="py-3 px-3 min-w-[150px] text-center whitespace-nowrap" data-api-unique-id='pastrytable-raa6518f1e20024d0-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>Stav vitríny</th>
              <th className="py-3 px-4 w-[120px] text-right whitespace-nowrap" data-api-unique-id='pastrytable-rcddd0b749a8e8b44-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>Akce</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60" data-api-unique-id='pastrytable-re0d3eab2d899ff03-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable'>
            {items.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;
            const itemIngredients = Array.isArray(item.ingredients) ? item.ingredients : [];
            return <tr key={item.id} className={`group transition-colors hover:bg-muted/30 ${item.isSoldOut ? "bg-muted/10 opacity-80" : ""} ${item.isTodaySpecial ? "bg-warning/5" : ""}`} data-api-unique-id='pastrytable-r6a485624c964e177-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                  {/* Pořadí + šipky */}
                  <td className="py-3 px-3 text-center align-middle whitespace-nowrap" data-api-unique-id='pastrytable-ra59ea8e6bbe3a88d-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                    <div className="flex flex-col items-center justify-center gap-0.5" data-api-unique-id='pastrytable-r1641f4c5c41f0d7c-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                      <span className="font-mono text-xs font-bold text-muted-foreground bg-muted rounded px-1.5 py-0.5" data-api-unique-id='pastrytable-rfcf805b6681825d2-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1' data-api-bind-info={`items-${index}-displayOrder`} data-api-map-var-name='item'>
                        #{item.displayOrder}
                      </span>
                      <div className="flex items-center gap-1 mt-1" data-api-unique-id='pastrytable-rb97286d053612279-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                        <button type="button" onClick={() => onMoveOrder(item.id, "up")} disabled={isFirst} title="Posunout nahoru" className="rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-20 disabled:pointer-events-none transition-colors" data-api-unique-id='pastrytable-rf39674e710d2dc58-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                          <ArrowUp className="h-3.5 w-3.5" data-api-unique-id='pastrytable-rec18c3b6e86b209b-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1' />
                        </button>
                        <button type="button" onClick={() => onMoveOrder(item.id, "down")} disabled={isLast} title="Posunout dolů" className="rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-20 disabled:pointer-events-none transition-colors" data-api-unique-id='pastrytable-r603b217db6cfe3b8-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                          <ArrowDown className="h-3.5 w-3.5" data-api-unique-id='pastrytable-rfdaf883849daa262-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1' />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Foto náhled */}
                  <td className="py-3 px-3 align-middle whitespace-nowrap" data-api-unique-id='pastrytable-r144069beacfb16c2-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                    <div className="relative h-14 w-14 overflow-hidden rounded-md border border-border bg-muted shrink-0" data-api-unique-id='pastrytable-rf298e69681afc461-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                      <EditableImg propKey={`pastry-thumb-${item.id}`} src={item.photoKey} alt={item.name} className="h-full w-full object-cover" data-api-unique-id='pastrytable-r4b7edf81c9e7a511-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1' />
                      {item.isTodaySpecial && <span className="absolute top-0.5 right-0.5 rounded-full bg-warning p-0.5 text-warning-foreground shadow-sm" data-api-unique-id='pastrytable-r914594817eec1478-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                          <Sparkles className="h-2.5 w-2.5" data-api-unique-id='pastrytable-rced6d74e2f0c35c2-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1' />
                        </span>}
                    </div>
                  </td>

                  {/* Název & Kód & krátký popis */}
                  <td className="py-3 px-4 align-middle" data-api-unique-id='pastrytable-r7c0a1b5a33fd3249-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                    <div className="flex flex-col min-w-0" data-api-unique-id='pastrytable-r3b908366ffcd7e00-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                      <div className="flex items-center gap-2 min-w-0" data-api-unique-id='pastrytable-r8fcd1e2e514640af-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                        <span className="font-semibold text-foreground text-sm leading-tight break-words" data-api-unique-id='pastrytable-r0da0daa7f978f6c4-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1' data-api-bind-info={`items-${index}-name`} data-api-map-var-name='item'>
                          {item.name}
                        </span>
                      </div>
                      {item.itemCode && <span className="font-mono text-[11px] text-muted-foreground mt-0.5" data-api-unique-id='pastrytable-re960bc576f42ccb3-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1' data-api-bind-info={`items-${index}-itemCode`} data-api-map-var-name='item'>
                          {item.itemCode}
                        </span>}
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5" data-api-unique-id='pastrytable-r68976c43a232e96a-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1' data-api-bind-info={`items-${index}-shortDescription`} data-api-map-var-name='item'>
                        {item.shortDescription}
                      </p>
                      {/* Suroviny a alergeny tagy */}
                      {itemIngredients.length > 0 && <div className="flex flex-wrap items-center gap-1 mt-1 text-[11px] text-muted-foreground" data-api-unique-id='pastrytable-rbcad00e6a15c3c1e-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                          <span className="truncate max-w-[260px]" data-api-unique-id='pastrytable-rfabb86e3863c80d5-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                            <strong data-api-unique-id='pastrytable-r0b48baa6a7242de7-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>Suroviny:</strong> {itemIngredients.slice(0, 3).join(", ")}
                            {itemIngredients.length > 3 ? ` (+${itemIngredients.length - 3})` : ""}
                          </span>
                        </div>}
                    </div>
                  </td>

                  {/* Kategorie */}
                  <td className="py-3 px-3 align-middle whitespace-nowrap" data-api-unique-id='pastrytable-r22ae2a3646a6be17-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                    <span className="inline-flex items-center rounded-md border border-border bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground" data-api-unique-id='pastrytable-r2fc20774370158e4-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                      {CATEGORY_NAMES[item.category] || item.category}
                    </span>
                  </td>

                  {/* Cena */}
                  <td className="py-3 px-3 text-right align-middle whitespace-nowrap" data-api-unique-id='pastrytable-rc70a27297beb6246-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                    <span className="font-mono text-base font-bold text-foreground" data-api-unique-id='pastrytable-rd3d80fda017facab-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1' data-api-bind-info={`items-${index}-priceCzk`} data-api-map-var-name='item'>
                      {item.priceCzk}
                    </span>{" "}
                    <span className="text-xs text-muted-foreground font-medium" data-api-unique-id='pastrytable-r2beba64feade5203-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>CZK</span>
                  </td>

                  {/* Štítek čerstvosti */}
                  <td className="py-3 px-3 align-middle whitespace-nowrap" data-api-unique-id='pastrytable-r2ac5545b0d34fb73-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                    <div className="inline-flex items-center gap-1.5 text-xs text-foreground" data-api-unique-id='pastrytable-rcb8829d46c9297c5-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                      <span className="h-1.5 w-1.5 rounded-full bg-success" data-api-unique-id='pastrytable-r1c673b692076e991-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'></span>
                      <span className="truncate max-w-[140px]" title={item.freshnessLabel} data-api-unique-id='pastrytable-r050e6b4ce554922b-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1' data-api-bind-info={`items-${index}-freshnessLabel`} data-api-map-var-name='item'>
                        {item.freshnessLabel}
                      </span>
                    </div>
                  </td>

                  {/* Rychlý přepínač: Dnešní specialita */}
                  <td className="py-3 px-3 text-center align-middle whitespace-nowrap" data-api-unique-id='pastrytable-r8ef43cbc772c5ca5-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                    <button type="button" onClick={() => onToggleTodaySpecial(item.id)} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all ${item.isTodaySpecial ? "bg-warning text-warning-foreground shadow-sm hover:bg-warning/90" : "border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"}`} title="Kliknutím přepnete dnešní specialitu" data-api-unique-id='pastrytable-r331a1bb01e842773-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                      <Sparkles className="h-3.5 w-3.5" data-api-unique-id='pastrytable-rd1266e63adc1d824-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1' />
                      <span data-api-unique-id='pastrytable-ra19c9ba29085da4b-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>{item.isTodaySpecial ? "Specialita" : "Běžné"}</span>
                    </button>
                  </td>

                  {/* Rychlý přepínač: Vyprodáno / Na pultu */}
                  <td className="py-3 px-3 text-center align-middle whitespace-nowrap" data-api-unique-id='pastrytable-r9b7679e99a6a05ba-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                    <button type="button" onClick={() => onToggleSoldOut(item.id)} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${item.isSoldOut ? "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90" : "bg-success text-success-foreground shadow-sm hover:bg-success/90"}`} title="Kliknutím okamžitě změníte dostupnost" data-api-unique-id='pastrytable-r6190249858231c38-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                      {item.isSoldOut ? <>
                          <AlertTriangle className="h-3.5 w-3.5" data-api-unique-id='pastrytable-r793b80a2a7f31794-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1' />
                          <span data-api-unique-id='pastrytable-r319b0b1403924b7a-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>Vyprodáno</span>
                        </> : <>
                          <CheckCircle2 className="h-3.5 w-3.5" data-api-unique-id='pastrytable-r9a4da98b768b7671-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1' />
                          <span data-api-unique-id='pastrytable-r929e9eade6df3ede-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>Na pultu</span>
                        </>}
                    </button>
                  </td>

                  {/* Akce: Editovat a smazat */}
                  <td className="py-3 px-4 text-right align-middle whitespace-nowrap" data-api-unique-id='pastrytable-r9e5da4c4d23e6ff9-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                    <div className="flex items-center justify-end gap-1" data-api-unique-id='pastrytable-rd571ecc702c4a8f9-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                      <button type="button" onClick={() => onEdit(item)} className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Upravit položku" data-api-unique-id='pastrytable-r58054472ba65c308-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                        <Edit2 className="h-4 w-4" data-api-unique-id='pastrytable-r2e5d44cb035bd4ef-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1' />
                      </button>
                      <button type="button" onClick={() => onDelete(item)} className="rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors" title="Smazat z vitríny" data-api-unique-id='pastrytable-r99793774529f4abf-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1'>
                        <Trash2 className="h-4 w-4" data-api-unique-id='pastrytable-r1e47f11d19425c90-s1881051349' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryTable' data-api-in-loop='1' />
                      </button>
                    </div>
                  </td>
                </tr>;
          })}
          </tbody>
        </table>
      </div>
    </div>;
}