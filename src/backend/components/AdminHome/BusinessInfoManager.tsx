"use client";

import React, { useState, useEffect } from "react";
import type { BusinessFactsDto, OpeningHourDto, OpeningDayKey, UpdateOpeningHourTimeInput } from "@/backend/types/AdminHome";
import { Save, Edit3, Check, Star, ShoppingBag, Truck } from "lucide-react";
import { toast } from "sonner";
export interface BusinessInfoManagerProps {
  facts?: BusinessFactsDto;
  initialFacts?: BusinessFactsDto;
  openingHours?: OpeningHourDto[];
  onSaveFacts?: (updated: BusinessFactsDto) => void | Promise<void>;
  onToggleDayOpen?: (dayKey: OpeningDayKey) => void | Promise<void>;
  onSaveDayTimes?: (dayKey: OpeningDayKey, times: UpdateOpeningHourTimeInput) => void | Promise<void>;
}
export default function BusinessInfoManager({
  facts,
  initialFacts,
  openingHours = [],
  onSaveFacts,
  onToggleDayOpen,
  onSaveDayTimes
}: BusinessInfoManagerProps) {
  const activeFacts = facts ?? initialFacts;
  const defaultFacts: BusinessFactsDto = {
    id: "",
    name: "",
    streetAddress: "",
    cityZip: "",
    phone: "",
    email: "",
    priceRangeCzk: "",
    ratingScore: 0,
    reviewsCount: 0,
    takeawayAvailable: false,
    deliveryAvailable: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  const currentFacts = activeFacts ?? defaultFacts;
  const [formState, setFormState] = useState({
    name: currentFacts.name || "",
    streetAddress: currentFacts.streetAddress || "",
    cityZip: currentFacts.cityZip || "",
    phone: currentFacts.phone || "",
    priceRangeCzk: currentFacts.priceRangeCzk || ""
  });
  const [editingDayKey, setEditingDayKey] = useState<OpeningDayKey | null>(null);
  const [dayOpenTime, setDayOpenTime] = useState("");
  const [dayCloseTime, setDayCloseTime] = useState("");
  useEffect(() => {
    if (activeFacts) {
      setFormState({
        name: activeFacts.name || "",
        streetAddress: activeFacts.streetAddress || "",
        cityZip: activeFacts.cityZip || "",
        phone: activeFacts.phone || "",
        priceRangeCzk: activeFacts.priceRangeCzk || ""
      });
    }
  }, [activeFacts?.name, activeFacts?.streetAddress, activeFacts?.cityZip, activeFacts?.phone, activeFacts?.priceRangeCzk]);
  const handleStartEditDay = (day: OpeningHourDto) => {
    setEditingDayKey(day.dayKey);
    setDayOpenTime(day.openTime);
    setDayCloseTime(day.closeTime);
  };
  const handleSaveDay = (dayKey: OpeningDayKey) => {
    onSaveDayTimes?.(dayKey, {
      openTime: dayOpenTime,
      closeTime: dayCloseTime
    });
    setEditingDayKey(null);
    toast.success("Otevírací doba byla upravena");
  };
  const handleToggleDayOpen = (dayKey: OpeningDayKey) => {
    onToggleDayOpen?.(dayKey);
    toast.success("Stav dne byl přepnut");
  };
  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) {
      toast.error("Vyplňte povinný název a telefon");
      return;
    }
    const updated: BusinessFactsDto = {
      ...currentFacts,
      name: formState.name.trim(),
      streetAddress: formState.streetAddress.trim(),
      cityZip: formState.cityZip.trim(),
      phone: formState.phone.trim(),
      priceRangeCzk: formState.priceRangeCzk.trim()
    };
    onSaveFacts?.(updated);
    toast.success("Provozní údaje pekárny byly uloženy");
  };
  return <div data-controller-name="Správa provozních informací" className="flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='businessinfomanager-r24182f80acb68f71-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
      {/* Hlavička modulu */}
      <div className="flex min-w-0 items-center justify-between" data-api-unique-id='businessinfomanager-r4fab88e521d2cd4b-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
        <div data-api-unique-id='businessinfomanager-r8b84be9d49b38627-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
          <h2 className="font-header text-base font-semibold tracking-tight text-foreground" data-api-unique-id='businessinfomanager-r570a5b7a907bf864-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
            Provozní údaje & Otevírací doba
          </h2>
          <p className="text-xs text-muted-foreground" data-api-unique-id='businessinfomanager-re132ec41ebf92d7c-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
            Ověřená fakta podniku a týdenní harmonogram pečení od 08:00
          </p>
        </div>
      </div>

      {/* Rychlý formulář kontaktních údajů */}
      <form onSubmit={handleGeneralSubmit} className="flex min-w-0 flex-col gap-2.5" data-api-unique-id='businessinfomanager-rf07e85ece1a9e9ba-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
        <div className="rounded-md border border-border bg-background p-3 text-xs space-y-2.5" data-api-unique-id='businessinfomanager-r4280dcc4f30c4eb7-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
          <div data-api-unique-id='businessinfomanager-re3fa3aa8420f934e-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
            <label className="block font-medium text-foreground mb-1" data-api-unique-id='businessinfomanager-r3083c5c23c8e6185-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
              Název pekárny
            </label>
            <input type="text" value={formState.name} onChange={e => setFormState(prev => ({
            ...prev,
            name: e.target.value
          }))} className="h-8 w-full rounded border border-border bg-card px-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" data-api-unique-id='businessinfomanager-rd0d7274d792de674-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" data-api-unique-id='businessinfomanager-rc683800716b45338-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
            <div data-api-unique-id='businessinfomanager-r39aef780800ec768-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
              <label className="block font-medium text-foreground mb-1" data-api-unique-id='businessinfomanager-r9ee08eeb72241a73-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
                Adresa provozovny
              </label>
              <input type="text" value={formState.streetAddress} onChange={e => setFormState(prev => ({
              ...prev,
              streetAddress: e.target.value
            }))} className="h-8 w-full rounded border border-border bg-card px-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" data-api-unique-id='businessinfomanager-r5d386548416cb8cb-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' />
            </div>
            <div data-api-unique-id='businessinfomanager-r9c759aa4b0a6c245-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
              <label className="block font-medium text-foreground mb-1" data-api-unique-id='businessinfomanager-rad1adbebf22f126d-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
                Město & PSČ
              </label>
              <input type="text" value={formState.cityZip} onChange={e => setFormState(prev => ({
              ...prev,
              cityZip: e.target.value
            }))} className="h-8 w-full rounded border border-border bg-card px-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" data-api-unique-id='businessinfomanager-r65e37a6b81a35a63-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" data-api-unique-id='businessinfomanager-r7e3fb34c27038440-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
            <div data-api-unique-id='businessinfomanager-r75ee0636e34a9f7a-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
              <label className="block font-medium text-foreground mb-1" data-api-unique-id='businessinfomanager-r8a128a716f64bac7-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
                Telefonní kontakt
              </label>
              <input type="text" value={formState.phone} onChange={e => setFormState(prev => ({
              ...prev,
              phone: e.target.value
            }))} className="h-8 w-full rounded border border-border bg-card px-2.5 font-mono text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" data-api-unique-id='businessinfomanager-rc5f38bd81b56bf53-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' />
            </div>
            <div data-api-unique-id='businessinfomanager-r0bbff21ce4a58e6e-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
              <label className="block font-medium text-foreground mb-1" data-api-unique-id='businessinfomanager-r4155bb2e0502beef-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
                Cenová hladina
              </label>
              <input type="text" value={formState.priceRangeCzk} onChange={e => setFormState(prev => ({
              ...prev,
              priceRangeCzk: e.target.value
            }))} className="h-8 w-full rounded border border-border bg-card px-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" data-api-unique-id='businessinfomanager-rdb22fae7647dd75f-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' />
            </div>
          </div>

          {/* Odběr a hodnocení indikátory */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2 text-[11px] text-muted-foreground" data-api-unique-id='businessinfomanager-r08ba7ab8e063bd18-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
            <div className="flex items-center gap-2" data-api-unique-id='businessinfomanager-r0efbed2363d3b036-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
              <span className="inline-flex items-center gap-1 font-semibold text-foreground" data-api-unique-id='businessinfomanager-r32946b4f3161700f-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
                <Star className="h-3.5 w-3.5 text-accent fill-accent" data-api-unique-id='businessinfomanager-r3c5685fbdc22a794-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' />
                <span data-api-unique-id='businessinfomanager-r178fbe44057cfeb3-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
                  {typeof currentFacts.ratingScore === "number" ? currentFacts.ratingScore.toFixed(1) : "0.0"}
                </span>
                <span className="text-muted-foreground font-normal" data-api-unique-id='businessinfomanager-re56154d92e0785e8-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
                  ({currentFacts.reviewsCount} recenzí)
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2" data-api-unique-id='businessinfomanager-re04b695472bea18d-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
              <span className="inline-flex items-center gap-1" data-api-unique-id='businessinfomanager-rba7ff007d0e29399-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
                <ShoppingBag className="h-3 w-3 text-muted-foreground" data-api-unique-id='businessinfomanager-rcd65c912ac36ab41-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' />
                <span data-api-unique-id='businessinfomanager-rf993423934487e7c-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
                  Osobní odběr: {currentFacts.takeawayAvailable ? "Ano" : "Ne"}
                </span>
              </span>
              <span data-api-unique-id='businessinfomanager-r6f9cdaed0e4cfb92-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>•</span>
              <span className="inline-flex items-center gap-1" data-api-unique-id='businessinfomanager-rcaa821b114975fec-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
                <Truck className="h-3 w-3 text-muted-foreground" data-api-unique-id='businessinfomanager-r8edf05e5551a9d28-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' />
                <span data-api-unique-id='businessinfomanager-rf6869cce739af0c8-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
                  Rozvoz: {currentFacts.deliveryAvailable ? "Ano" : "Ne"}
                </span>
              </span>
            </div>
          </div>

          <div className="flex justify-end pt-1" data-api-unique-id='businessinfomanager-ra9385adf63d61492-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
            <button type="submit" className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='businessinfomanager-r84b6b01c47080a44-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
              <Save className="h-3.5 w-3.5" data-api-unique-id='businessinfomanager-r55d8734fd2a1ea47-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' />
              <span data-api-unique-id='businessinfomanager-r9d4afe06665e8549-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>Uložit kontaktní fakta</span>
            </button>
          </div>
        </div>
      </form>

      {/* Tabulka otevírací doby (Po - Ne) s in-line editací */}
      <div className="flex min-w-0 flex-col gap-2" data-api-unique-id='businessinfomanager-r11cdb5352c045fc9-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
        <div className="flex items-center justify-between text-xs text-muted-foreground" data-api-unique-id='businessinfomanager-r8b068ac15b4bfdba-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
          <span className="font-medium text-foreground" data-api-unique-id='businessinfomanager-r2313e4d70db9cef1-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
            Týdenní rozpis otevírací doby
          </span>
          <span data-api-unique-id='businessinfomanager-r92b29ccadd80b424-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>Pečení od 06:00, pult od 08:00</span>
        </div>

        <div className="w-full max-w-full min-w-0 overflow-x-auto rounded-md border border-border bg-background" data-api-unique-id='businessinfomanager-rdae42e7f6fcb2084-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
          <table className="w-full min-w-[340px] text-left text-xs" data-api-unique-id='businessinfomanager-r1634e38d3794228e-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
            <thead className="border-b border-border bg-muted text-muted-foreground" data-api-unique-id='businessinfomanager-raa7583304596a2b7-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
              <tr data-api-unique-id='businessinfomanager-r64b2a4099ea2579b-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
                <th className="py-2 pl-3 pr-2 font-medium w-[70px]" data-api-unique-id='businessinfomanager-rde477923783973d4-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>Den</th>
                <th className="py-2 px-2 font-medium w-[80px] text-center" data-api-unique-id='businessinfomanager-r92af85c6a6cd060e-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>Stav</th>
                <th className="py-2 px-2 font-medium" data-api-unique-id='businessinfomanager-rdf1d108138c691ad-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>Čas (Od - Do)</th>
                <th className="py-2 pr-3 pl-2 font-medium text-right w-[60px]" data-api-unique-id='businessinfomanager-r1ad9f5bb98617a2f-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
                  Úprava
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border" data-api-unique-id='businessinfomanager-r446936a599aeaa8c-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager'>
              {openingHours.map((d, index) => {
              const isEditingThis = editingDayKey === d.dayKey;
              return <tr key={d.dayKey} className="hover:bg-muted/40 transition-colors" data-api-unique-id='businessinfomanager-r5c31affdbb7d32d3-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1'>
                    {/* Název dne */}
                    <td className="py-2 pl-3 pr-2 font-medium text-foreground whitespace-nowrap" data-api-unique-id='businessinfomanager-rcab793aa2d3b825b-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1' data-api-bind-info={`openingHours-${index}-dayName`} data-api-map-var-name='d'>
                      {d.dayName}
                    </td>

                    {/* Stav Otevřeno / Zavřeno */}
                    <td className="py-2 px-2 text-center whitespace-nowrap" data-api-unique-id='businessinfomanager-r0c1e222855ed7580-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1'>
                      <button type="button" onClick={() => handleToggleDayOpen(d.dayKey)} className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-semibold transition-colors ${d.isOpen ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"}`} title="Kliknutím přepnete stav dne" data-api-unique-id='businessinfomanager-rda34827d21360134-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1'>
                        {d.isOpen ? "Otevřeno" : "Zavřeno"}
                      </button>
                    </td>

                    {/* Čas */}
                    <td className="py-2 px-2 whitespace-nowrap font-mono text-[11px]" data-api-unique-id='businessinfomanager-r491f761e5be926b5-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1'>
                      {isEditingThis ? <div className="inline-flex items-center gap-1" data-api-unique-id='businessinfomanager-r91366934ea9ada84-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1'>
                          <input type="text" value={dayOpenTime} onChange={e => setDayOpenTime(e.target.value)} className="h-6 w-14 rounded border border-border bg-card px-1 text-center font-mono text-xs text-foreground" data-api-unique-id='businessinfomanager-r1e2268265e59daec-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1' />
                          <span data-api-unique-id='businessinfomanager-r9f8ae586b2c860f8-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1'>–</span>
                          <input type="text" value={dayCloseTime} onChange={e => setDayCloseTime(e.target.value)} className="h-6 w-14 rounded border border-border bg-card px-1 text-center font-mono text-xs text-foreground" data-api-unique-id='businessinfomanager-rfd6523c9b30bbb06-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1' />
                        </div> : d.isOpen ? <span className="text-foreground" data-api-unique-id='businessinfomanager-r20ac5dcebf2c046a-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1' data-api-bind-info={`openingHours-${index}-openTime`} data-api-map-var-name='d'>
                          {d.openTime} – {d.closeTime}
                        </span> : <span className="text-muted-foreground italic" data-api-unique-id='businessinfomanager-r7d9c12b0027019e9-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1'>
                          Zavřeno pro přípravu
                        </span>}
                    </td>

                    {/* Akce */}
                    <td className="py-2 pr-3 pl-2 text-right whitespace-nowrap" data-api-unique-id='businessinfomanager-r2489c865c36461ea-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1'>
                      {isEditingThis ? <button type="button" onClick={() => handleSaveDay(d.dayKey)} className="rounded p-1 text-success hover:bg-muted" title="Potvrdit čas" data-api-unique-id='businessinfomanager-r80bb7bc296fbb248-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1'>
                          <Check className="h-3.5 w-3.5" data-api-unique-id='businessinfomanager-rbe985eb801afe203-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1' />
                        </button> : <button type="button" onClick={() => handleStartEditDay(d)} className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground" title="Upravit otevírací dobu" data-api-unique-id='businessinfomanager-r66f17093e9b37e76-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1'>
                          <Edit3 className="h-3.5 w-3.5" data-api-unique-id='businessinfomanager-re96f0a9d9b770917-s4284478306' data-api-unique-page-name='src/backend/components/AdminHome/BusinessInfoManager' data-api-in-loop='1' />
                        </button>}
                    </td>
                  </tr>;
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}