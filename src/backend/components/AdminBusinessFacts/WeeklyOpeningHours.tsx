"use client";

import React from "react";
import { OpeningHour } from "@/backend/types/AdminBusinessFacts";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Clock, Info, Check, Sparkles } from "lucide-react";
interface WeeklyOpeningHoursProps {
  hours: OpeningHour[];
  onChange: (updatedHours: OpeningHour[]) => void;
}
const PRESET_NOTES = ["nebo do vyprodání", "čerstvé z pece", "pouze výdejní okénko", "dopolední várka koláčů"];
export default function WeeklyOpeningHours({
  hours,
  onChange
}: WeeklyOpeningHoursProps) {
  const safeHours = hours || [];
  const handleToggleOpen = (index: number, isOpen: boolean) => {
    const next = [...safeHours];
    next[index] = {
      ...next[index],
      isOpen
    };
    onChange(next);
  };
  const handleTimeChange = (index: number, field: "openTime" | "closeTime", value: string) => {
    const next = [...safeHours];
    next[index] = {
      ...next[index],
      [field]: value
    };
    onChange(next);
  };
  const handleNoteChange = (index: number, note: string) => {
    const next = [...safeHours];
    next[index] = {
      ...next[index],
      note: note.trim() === "" ? null : note
    };
    onChange(next);
  };
  const applyPresetNote = (index: number, preset: string) => {
    const next = [...safeHours];
    const currentNote = next[index]?.note;
    next[index] = {
      ...next[index],
      note: currentNote === preset ? null : preset
    };
    onChange(next);
  };
  return <section data-controller-name="Správa otevírací doby pekárny" className="flex min-w-0 flex-col rounded-xl border border-border bg-card p-4 sm:p-6 text-card-foreground shadow-sm" data-api-unique-id='weeklyopeninghours-rb1482b1efaf851ce-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours'>
      <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-4" data-api-unique-id='weeklyopeninghours-r543e6bc499aee2b0-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours'>
        <div data-api-unique-id='weeklyopeninghours-r896a9657a8281ec9-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours'>
          <div className="flex items-center gap-2" data-api-unique-id='weeklyopeninghours-r5af4c04a29263417-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours'>
            <Clock className="h-5 w-5 text-primary" data-api-unique-id='weeklyopeninghours-rce3d25a48f896228-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' />
            <h2 className="text-lg font-bold tracking-tight text-card-foreground" data-api-unique-id='weeklyopeninghours-r2ea643f1537e9075-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours'>
              Týdenní rozpis otevírací doby
            </h2>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground" data-api-unique-id='weeklyopeninghours-rd7821b3cd9c72f85-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours'>
            Nastavení provozních časů pro dny PO–NE. Změny se promítnou do vitríny i zápatí webu.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-lg border border-border/50 self-start sm:self-auto mt-2 sm:mt-0" data-api-unique-id='weeklyopeninghours-rb4b579f6e5c3e4e8-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours'>
          <Info className="h-3.5 w-3.5 shrink-0 text-primary" data-api-unique-id='weeklyopeninghours-r482e67eceaae2374-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' />
          <span data-api-unique-id='weeklyopeninghours-r7d4083f351b4616b-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours'>Formát času 24h (HH:MM)</span>
        </div>
      </div>

      {/* Seznam dnů */}
      <div className="mt-4 flex flex-col divide-y divide-border/60" data-api-unique-id='weeklyopeninghours-r0c4d2e09d8e9c096-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours'>
        {safeHours.map((day, index) => {
        const isOpen = day.isOpen;
        return <div key={day.dayKey} className={`flex flex-col gap-3 py-3.5 transition-colors sm:py-4 ${!isOpen ? "opacity-75 bg-muted/20 -mx-2 px-2 rounded-lg" : ""}`} data-api-unique-id='weeklyopeninghours-r66c2717c0415af36-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between" data-api-unique-id='weeklyopeninghours-r9936e1f5eb23c567-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
                {/* Den a přepínač */}
                <div className="flex items-center gap-3 min-w-[160px]" data-api-unique-id='weeklyopeninghours-ra6f72f587d3b844b-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
                  <div className={`flex h-9 w-10 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold ${isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`} data-api-unique-id='weeklyopeninghours-rff78e47ed30ac438-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1' data-api-bind-info={`safeHours-${index}-dayKey`} data-api-map-var-name='day'>
                    {day.dayKey}
                  </div>
                  <div className="min-w-0" data-api-unique-id='weeklyopeninghours-r0be02290b5224ad4-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
                    <span className="block font-semibold text-sm text-card-foreground" data-api-unique-id='weeklyopeninghours-r427098886e016325-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1' data-api-bind-info={`safeHours-${index}-dayName`} data-api-map-var-name='day'>
                      {day.dayName}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5" data-api-unique-id='weeklyopeninghours-r9de5630ca7ac37c8-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
                      <Switch id={`switch-${day.dayKey}`} checked={isOpen} onCheckedChange={checked => handleToggleOpen(index, checked)} data-api-unique-id='weeklyopeninghours-rdb27b8136c2dc0b8-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1' />
                      <label htmlFor={`switch-${day.dayKey}`} className={`text-xs font-medium cursor-pointer select-none ${isOpen ? "text-success" : "text-muted-foreground"}`} data-api-unique-id='weeklyopeninghours-r7c8a0a8ca9306f4f-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
                        {isOpen ? "Otevřeno" : "Zavřeno"}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Časy otevřeno / zavřeno */}
                <div className="flex items-center gap-2 sm:gap-3" data-api-unique-id='weeklyopeninghours-r3d0413f579758396-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
                  <div className="flex items-center gap-1.5" data-api-unique-id='weeklyopeninghours-rf014e4696068e7c3-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
                    <label htmlFor={`open-${day.dayKey}`} className="text-xs text-muted-foreground shrink-0" data-api-unique-id='weeklyopeninghours-r0600a3364d688bab-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
                      Od:
                    </label>
                    <Input id={`open-${day.dayKey}`} type="text" pattern="[0-2][0-9]:[0-5][0-9]" placeholder="08:00" maxLength={5} value={day.openTime} disabled={!isOpen} onChange={e => handleTimeChange(index, "openTime", e.target.value)} className="h-8 w-20 text-center font-mono text-xs sm:w-24 sm:text-sm disabled:cursor-not-allowed disabled:bg-muted/80 disabled:text-muted-foreground" data-api-unique-id='weeklyopeninghours-r6f2c2035c8e96c12-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1' />
                  </div>
                  <span className="text-muted-foreground text-xs" data-api-unique-id='weeklyopeninghours-r6fd862961e61a012-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>–</span>
                  <div className="flex items-center gap-1.5" data-api-unique-id='weeklyopeninghours-rff6474c286a461ac-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
                    <label htmlFor={`close-${day.dayKey}`} className="text-xs text-muted-foreground shrink-0" data-api-unique-id='weeklyopeninghours-r392d704a78b99ccf-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
                      Do:
                    </label>
                    <Input id={`close-${day.dayKey}`} type="text" pattern="[0-2][0-9]:[0-5][0-9]" placeholder="18:00" maxLength={5} value={day.closeTime} disabled={!isOpen} onChange={e => handleTimeChange(index, "closeTime", e.target.value)} className="h-8 w-20 text-center font-mono text-xs sm:w-24 sm:text-sm disabled:cursor-not-allowed disabled:bg-muted/80 disabled:text-muted-foreground" data-api-unique-id='weeklyopeninghours-r0e1648287fdaa40f-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1' />
                  </div>
                </div>

                {/* Poznámka a rychlé tagy */}
                <div className="flex flex-1 flex-col gap-1.5 min-w-[200px] lg:max-w-md" data-api-unique-id='weeklyopeninghours-rb907b2728ca6688d-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
                  <div className="flex items-center gap-1.5" data-api-unique-id='weeklyopeninghours-r493aec807b8d6df3-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
                    <Input type="text" placeholder="Poznámka pro zákazníky (např. nebo do vyprodání)..." maxLength={255} value={day.note || ""} disabled={!isOpen} onChange={e => handleNoteChange(index, e.target.value)} className="h-8 text-xs sm:text-sm disabled:cursor-not-allowed disabled:bg-muted/80 disabled:text-muted-foreground" data-api-unique-id='weeklyopeninghours-r779f8eb5df32d0dd-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1' />
                  </div>
                </div>
              </div>

              {/* Rychlé předvolby poznámek (Pekařská poznámka) */}
              {isOpen && <div className="flex flex-wrap items-center gap-1.5 pl-0 sm:pl-[52px] text-xs" data-api-unique-id='weeklyopeninghours-r693a8816c7f20369-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1 shrink-0 mr-1" data-api-unique-id='weeklyopeninghours-r1b43b27186e78e00-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
                    <Sparkles className="h-3 w-3 text-primary" data-api-unique-id='weeklyopeninghours-r86dc8d8b78dbce35-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1' />
                    Rychlá poznámka:
                  </span>
                  {PRESET_NOTES.map((preset, index1) => {
              const isSelected = day.note === preset;
              return <button key={preset} type="button" onClick={() => applyPresetNote(index, preset)} className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] transition-colors border ${isSelected ? "bg-primary text-primary-foreground border-primary" : "bg-muted/60 text-muted-foreground border-border hover:bg-muted hover:text-foreground"}`} data-api-unique-id='weeklyopeninghours-r7e5b13cb32e7d83d-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1'>
                        {isSelected && <Check className="h-3 w-3 shrink-0" data-api-unique-id='weeklyopeninghours-rb799d0c0ae74d6f6-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1' />}
                        <span data-api-unique-id='weeklyopeninghours-ra5870417b730e3ca-s2904262433' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/WeeklyOpeningHours' data-api-in-loop='1' data-api-bind-info={`safeHours-${index}-PRESET_NOTES-${index1}-$item`} data-api-map-var-name='preset'>{preset}</span>
                      </button>;
            })}
                </div>}
            </div>;
      })}
      </div>
    </section>;
}