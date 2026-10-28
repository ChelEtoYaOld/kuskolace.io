"use client";

import React, { useState } from "react";
import type { OpeningHour, BusinessFacts } from "@/frontend/types/Home";
import { MapPin, Phone, Clock, ShoppingBag, Truck, Navigation, Copy, Check, Share2 } from "lucide-react";
import { toast } from "sonner";
interface ContactMapProps {
  businessFacts: BusinessFacts;
  schedule: OpeningHour[];
}
export default function ContactMap({
  businessFacts,
  schedule
}: ContactMapProps) {
  const [copiedPhone, setCopiedPhone] = useState(false);
  if (!businessFacts) {
    return null;
  }
  const handleCopyPhone = () => {
    if (!businessFacts.phone) return;
    navigator.clipboard?.writeText(businessFacts.phone);
    setCopiedPhone(true);
    toast.success(`Telefonní číslo ${businessFacts.phone} zkopírováno do schránky`);
    setTimeout(() => {
      setCopiedPhone(false);
    }, 2500);
  };
  const handleShare = async () => {
    if (typeof window === "undefined") return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Kus Koláče — Vinohrady",
          text: `Řemeslná pekárna a bistro na ${businessFacts.streetAddress}, ${businessFacts.cityZip}`,
          url: window.location.href
        });
      } catch {
        // user cancelled share
      }
    } else {
      navigator.clipboard?.writeText(window.location.href);
      toast.success("Odkaz na pekárnu byl zkopírován do schránky");
    }
  };
  const dayMap: Record<number, string> = {
    0: "NE",
    1: "PO",
    2: "UT",
    3: "ST",
    4: "CT",
    5: "PA",
    6: "SO"
  };
  const currentDayKey = dayMap[new Date().getDay()] || "UT";
  const sortedSchedule = Array.isArray(schedule) ? [...schedule].sort((a, b) => a.sortOrder - b.sortOrder) : [];
  const todaySchedule = sortedSchedule.find(day => day.dayKey === currentDayKey);
  const cleanPhone = (businessFacts.phone || "").replace(/\s+/g, "");
  return <section id="kontakt" data-controller-name="Ověřené kontakty a mapa pekárny" className="w-full bg-background py-16 sm:py-24 border-t border-border scroll-mt-16 relative" data-api-unique-id='contactmap-r6e939c024da8c50d-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
      <div id="kontakty" className="absolute -top-24 pointer-events-none" aria-hidden="true" data-api-unique-id='contactmap-r2a10fbf0d710db31-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-10" data-api-unique-id='contactmap-rf8323cecc4bd9bff-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
        <div className="max-w-2xl space-y-3" data-api-unique-id='contactmap-r29e6da08c20b7f0e-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground" data-api-unique-id='contactmap-r6ca514ae93cc41c1-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
            Ověřené kontakty a kudy k nám
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground" data-api-unique-id='contactmap-r5a5a6a1ef1db5163-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
            Zastavte se osobně na {businessFacts.streetAddress} v srdci Vinohrad. Vůně pečení vás navede přímo ze zastávky tramvaje.
          </p>
        </div>

        {/* Dual Panel Grid: Left structured facts & schedule, Right stylized neighborhood micro-map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" data-api-unique-id='contactmap-ref6055e758b274d9-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
          {/* Left Operations Panel */}
          <div className="lg:col-span-5 space-y-6" data-api-unique-id='contactmap-r8062876907367c9f-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-sm space-y-6" data-api-unique-id='contactmap-r55ebc2292a78c98d-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
              {/* Quick Actions Bar */}
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-border" data-api-unique-id='contactmap-rdab5b62dcbde381a-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                <a href="https://maps.google.com/?q=Korunn%C3%AD+90,+101+00+Praha+2" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 p-2 rounded-xl text-center hover:bg-muted transition-colors flex-1" data-api-unique-id='contactmap-rb4705f36daa7fb65-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                  <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center" data-api-unique-id='contactmap-r864a732f98476233-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    <Navigation className="h-4 w-4" data-api-unique-id='contactmap-r4c452f5013bbe5ca-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                  </div>
                  <span className="text-[11px] font-semibold text-card-foreground" data-api-unique-id='contactmap-r49fcc4c364d6f776-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>Trasa</span>
                </a>

                <button type="button" onClick={handleCopyPhone} className="flex flex-col items-center gap-1.5 p-2 rounded-xl text-center hover:bg-muted transition-colors flex-1" data-api-unique-id='contactmap-r765493fc92ad6307-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                  <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center" data-api-unique-id='contactmap-r60e00567438195d5-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    {copiedPhone ? <Check className="h-4 w-4 text-primary" data-api-unique-id='contactmap-r6016a47f8f79476e-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' /> : <Phone className="h-4 w-4" data-api-unique-id='contactmap-rc06478b5e7c1526f-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />}
                  </div>
                  <span className="text-[11px] font-semibold text-card-foreground" data-api-unique-id='contactmap-r1b4ebb8c697a8693-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>Zavolat</span>
                </button>

                <button type="button" onClick={handleShare} className="flex flex-col items-center gap-1.5 p-2 rounded-xl text-center hover:bg-muted transition-colors flex-1" data-api-unique-id='contactmap-r01a8a913e8d72fa4-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                  <div className="h-9 w-9 rounded-full bg-muted text-muted-foreground flex items-center justify-center" data-api-unique-id='contactmap-rb97f5b702ca1e32c-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    <Share2 className="h-4 w-4" data-api-unique-id='contactmap-r93140bc13faa8dc5-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                  </div>
                  <span className="text-[11px] font-semibold text-card-foreground" data-api-unique-id='contactmap-ra49ad925475eeec3-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>Sdílet</span>
                </button>
              </div>

              {/* Core verified business facts */}
              <div className="space-y-4" data-api-unique-id='contactmap-r6cc9257c9107a64f-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                {/* Status Indicator */}
                <div className="flex items-center justify-between pb-2 border-b border-border" data-api-unique-id='contactmap-r3af4caea7036bdc2-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                  <div className="flex items-center gap-2" data-api-unique-id='contactmap-r9be888b8305b1cb1-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    <span className={`flex h-3 w-3 rounded-full relative ${todaySchedule?.isOpen ? "bg-accent" : "bg-muted-foreground/40"}`} data-api-unique-id='contactmap-rd901270c0939ccba-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                      {todaySchedule?.isOpen && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" data-api-unique-id='contactmap-r3cbcb74553a6d5e9-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />}
                    </span>
                    <span className="text-sm font-bold text-foreground" data-api-unique-id='contactmap-r33bea9eb48867651-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                      {todaySchedule?.isOpen ? `Otevřeno od ${todaySchedule.openTime}` : "Dnes zavřeno (přípravy)"}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground" data-api-unique-id='contactmap-rb8d7b3fc5e6cb252-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    Vinohrady, Praha 2
                  </span>
                </div>

                {/* Address block */}
                <div className="flex items-start gap-3.5" data-api-unique-id='contactmap-r97a654b5ff6a9f4d-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary" data-api-unique-id='contactmap-r8b25901c908a082a-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    <MapPin className="h-5 w-5" data-api-unique-id='contactmap-rb758c5330222270d-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                  </div>
                  <div className="space-y-0.5" data-api-unique-id='contactmap-r717eee67e16742ab-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    <p className="text-xs text-muted-foreground uppercase font-semibold" data-api-unique-id='contactmap-r9a4651c5725d3b81-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>Adresa pekárny</p>
                    <p className="text-base font-bold text-card-foreground" data-api-unique-id='contactmap-re1dccc2115a7a819-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>{businessFacts.streetAddress}</p>
                    <p className="text-sm text-muted-foreground" data-api-unique-id='contactmap-rb4df7f2a6c0f0ee0-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>{businessFacts.cityZip}</p>
                  </div>
                </div>

                {/* Telephone row with quick dial / copy */}
                <div className="flex items-start justify-between gap-3 pt-2" data-api-unique-id='contactmap-rf058349e27db29d7-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                  <div className="flex items-start gap-3.5" data-api-unique-id='contactmap-r550d4dac23bf44e2-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary" data-api-unique-id='contactmap-rb93d9aa2d4ae069f-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                      <Phone className="h-5 w-5" data-api-unique-id='contactmap-r5b849a55557290db-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                    </div>
                    <div className="space-y-0.5" data-api-unique-id='contactmap-r2ef1ef01c385baae-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                      <p className="text-xs text-muted-foreground uppercase font-semibold" data-api-unique-id='contactmap-r5cb255298ee34457-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>Telefon na pult</p>
                      <a href={cleanPhone ? `tel:${cleanPhone}` : undefined} className="text-base font-bold text-primary hover:underline block" data-api-unique-id='contactmap-r6a6de48d81d2125a-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                        {businessFacts.phone}
                      </a>
                      <p className="text-xs text-muted-foreground" data-api-unique-id='contactmap-r7ca2a5e68b25e389-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>Vhodné pro dotazy na aktuální ranní stav vitríny</p>
                    </div>
                  </div>

                  <button type="button" onClick={handleCopyPhone} className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" title="Zkopírovat číslo" aria-label="Zkopírovat číslo" data-api-unique-id='contactmap-r48c4597941af0ae4-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    {copiedPhone ? <Check className="h-4 w-4 text-primary" data-api-unique-id='contactmap-r89267ceacfba5338-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' /> : <Copy className="h-4 w-4" data-api-unique-id='contactmap-rf4f73a5ab94cccca-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />}
                  </button>
                </div>

                {/* Price range fact */}
                <div className="flex items-start gap-3.5 pt-2" data-api-unique-id='contactmap-r8c9dc6311be070c9-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary font-bold text-sm" data-api-unique-id='contactmap-r97416603f0c0dbf4-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    Kč
                  </div>
                  <div className="space-y-0.5" data-api-unique-id='contactmap-r264d281a7a8e26d8-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    <p className="text-xs text-muted-foreground uppercase font-semibold" data-api-unique-id='contactmap-r3a9b8c07d3f122a5-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>Cenové rozpětí</p>
                    <p className="text-base font-bold text-card-foreground" data-api-unique-id='contactmap-r58e8c4fede015684-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>{businessFacts.priceRangeCzk} za osobu</p>
                    <p className="text-xs text-muted-foreground" data-api-unique-id='contactmap-r4a16fec023bff2af-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>Hodnocení {businessFacts.ratingScore} ★ ({businessFacts.reviewsCount} recenzí)</p>
                  </div>
                </div>

                {/* Takeaway / Delivery explicit fact */}
                <div className="rounded-xl bg-muted p-4 space-y-2 border border-border" data-api-unique-id='contactmap-ra1f52a5d1b9184d8-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground" data-api-unique-id='contactmap-r952da7d17e1bc2ad-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    Způsob nákupu (Ověřeno)
                  </p>
                  <div className="flex items-center justify-between text-sm" data-api-unique-id='contactmap-r0ebf0b9dd65f743b-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    <div className="flex items-center gap-2 text-foreground font-medium" data-api-unique-id='contactmap-r938b68b90c4b114b-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                      <ShoppingBag className="h-4 w-4 text-accent" data-api-unique-id='contactmap-re59026bd6b3741a5-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                      <span data-api-unique-id='contactmap-r1df04ec5f971bff2-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>S sebou: <strong data-api-unique-id='contactmap-r5687e5c09026946f-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>{businessFacts.takeawayAvailable ? "Ano" : "Ne"}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground" data-api-unique-id='contactmap-r3ad30651f0546460-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                      <Truck className="h-4 w-4 text-muted-foreground" data-api-unique-id='contactmap-re730e97d8a735189-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                      <span data-api-unique-id='contactmap-r58225a81dc083b82-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>Rozvoz: <strong data-api-unique-id='contactmap-r7e720f6e9172af0f-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>{businessFacts.deliveryAvailable ? "Ano" : "Ne"}</strong></span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground pt-1" data-api-unique-id='contactmap-rab00eb9650c89cf9-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    Prodej probíhá výhradně čerstvě z pece přímo u nás na pultu (walk-in only).
                  </p>
                </div>
              </div>

              {/* Weekly Schedule Table */}
              <div className="space-y-3 pt-2 border-t border-border" data-api-unique-id='contactmap-r76fb2ad686145fee-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                <div className="flex items-center gap-2" data-api-unique-id='contactmap-rf11f1bf042a69f7c-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                  <Clock className="h-4 w-4 text-primary" data-api-unique-id='contactmap-r15807ae3a6152842-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                  <h3 className="text-sm font-bold text-card-foreground" data-api-unique-id='contactmap-r9e11913d77c7906e-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    Rozpis prodejních dnů
                  </h3>
                </div>

                <div className="divide-y divide-border rounded-lg border border-border overflow-hidden bg-background" data-api-unique-id='contactmap-r78136ae6f372e4b9-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                  {sortedSchedule.map((day, index) => {
                  const isToday = day.dayKey === currentDayKey;
                  const hoursText = day.isOpen ? `${day.openTime} – ${day.closeTime} ${day.note ? `(${day.note})` : ""}` : "Zavřeno (pečeme přípravy)";
                  return <div key={day.id} className={`flex items-center justify-between px-3.5 py-2.5 text-xs ${isToday ? "bg-primary/10 font-semibold" : ""}`} data-api-unique-id='contactmap-raa16d578102e82d4-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' data-api-in-loop='1'>
                        <span className="flex items-center gap-2" data-api-unique-id='contactmap-r220af012e5d21ee8-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' data-api-in-loop='1'>
                          <span className={isToday ? "text-primary font-bold" : "text-foreground"} data-api-unique-id='contactmap-r3abcde7dbd66276f-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' data-api-in-loop='1' data-api-bind-info={`sortedSchedule-${index}-dayName`} data-api-map-var-name='day'>
                            {day.dayName}
                          </span>
                          {isToday && <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary" data-api-unique-id='contactmap-r98f263f6e6ecbb07-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' data-api-in-loop='1'>
                              Dnes
                            </span>}
                        </span>
                        <span className={day.isOpen ? "text-card-foreground font-mono" : "text-muted-foreground"} data-api-unique-id='contactmap-r54a1d869f5e05bd5-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' data-api-in-loop='1'>
                          {hoursText}
                        </span>
                      </div>;
                })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Neighborhood Visual Micro-Map & Transit Guide */}
          <div className="lg:col-span-7 space-y-6" data-api-unique-id='contactmap-r9ecbe98457388df2-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-sm space-y-6" data-api-unique-id='contactmap-r1139ea6157fe6292-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3" data-api-unique-id='contactmap-rba891f18e172fcce-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                <div data-api-unique-id='contactmap-r5db0e90da4fd9478-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                  <h3 className="font-display text-xl font-bold text-card-foreground" data-api-unique-id='contactmap-rbe067dff1344935d-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    Lokalita a zastávky Vinohrady
                  </h3>
                  <p className="text-xs text-muted-foreground" data-api-unique-id='contactmap-r14625e034da661ea-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    Tramvajové linky 10 a 16 přímo před pekárnou
                  </p>
                </div>

                <a href="https://maps.google.com/?q=Korunn%C3%AD+90,+101+00+Praha+2" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='contactmap-r3e84258ec16b9f55-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                  <Navigation className="h-3.5 w-3.5" data-api-unique-id='contactmap-r3d884b62c66a4e95-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                  <span data-api-unique-id='contactmap-r688bc24f33b9d88b-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>Navigovat v Google Maps</span>
                </a>
              </div>

              {/* Stylized Interactive SVG Vector Map of Korunní Street */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-[#ece5d8] p-4 text-foreground flex flex-col justify-between shadow-inner" data-api-unique-id='contactmap-r92cd095703891f00-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                {/* SVG Map Layout: Korunní axis with tram lines, crossroads and bakery marker */}
                <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" preserveAspectRatio="xMidYMid meet" data-api-unique-id='contactmap-r79829309f63a842d-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                  {/* Surrounding City Blocks */}
                  <rect x="30" y="30" width="160" height="90" rx="8" fill="#dfd5c6" opacity="0.6" data-api-unique-id='contactmap-r6008b8a0bc75aeac-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                  <rect x="220" y="30" width="160" height="90" rx="8" fill="#dfd5c6" opacity="0.6" data-api-unique-id='contactmap-rbdd7e5721b081758-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                  <rect x="410" y="30" width="160" height="90" rx="8" fill="#dfd5c6" opacity="0.6" data-api-unique-id='contactmap-r64e8575c188c839b-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />

                  <rect x="30" y="240" width="160" height="90" rx="8" fill="#dfd5c6" opacity="0.6" data-api-unique-id='contactmap-r4a5d3e38efc962e4-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                  <rect x="220" y="240" width="160" height="90" rx="8" fill="#dfd5c6" opacity="0.6" data-api-unique-id='contactmap-raadaf89405e8cfbd-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                  <rect x="410" y="240" width="160" height="90" rx="8" fill="#dfd5c6" opacity="0.6" data-api-unique-id='contactmap-r20cd2957c014d5aa-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />

                  {/* Cross Streets */}
                  <line x1="200" y1="10" x2="200" y2="350" stroke="#fdfbf7" strokeWidth="22" strokeLinecap="round" data-api-unique-id='contactmap-r64013a097bf0a2cd-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                  <line x1="390" y1="10" x2="390" y2="350" stroke="#fdfbf7" strokeWidth="22" strokeLinecap="round" data-api-unique-id='contactmap-r04b345a34ae746db-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />

                  {/* Main Korunní Avenue */}
                  <line x1="10" y1="180" x2="590" y2="180" stroke="#fdfbf7" strokeWidth="48" strokeLinecap="round" data-api-unique-id='contactmap-rc68bebdec6a13917-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                  {/* Tram Tracks */}
                  <line x1="10" y1="174" x2="590" y2="174" stroke="#8b3a1a" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" data-api-unique-id='contactmap-rf3dfd75a2a13c39c-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                  <line x1="10" y1="186" x2="590" y2="186" stroke="#8b3a1a" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" data-api-unique-id='contactmap-r0326fdfd1bdd581c-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />

                  {/* Street Labels */}
                  <text x="50" y="184" fill="#5c4f45" fontSize="13" fontWeight="bold" fontFamily="sans-serif" data-api-unique-id='contactmap-rc0e9dad945f3fe0d-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    Korunní třída
                  </text>
                  <text x="212" y="70" fill="#5c4f45" fontSize="10" fontFamily="sans-serif" data-api-unique-id='contactmap-ra73b3bd086aa9f41-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    ul. Šumavská
                  </text>
                  <text x="402" y="70" fill="#5c4f45" fontSize="10" fontFamily="sans-serif" data-api-unique-id='contactmap-r3c44965187f10a66-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    ul. Chodská
                  </text>

                  {/* Tram Stop Marker */}
                  <circle cx="160" cy="180" r="10" fill="#234235" data-api-unique-id='contactmap-r88eb128bda5ad0ee-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                  <text x="145" y="210" fill="#234235" fontSize="11" fontWeight="bold" data-api-unique-id='contactmap-r068b80f647d560cb-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    Tram Vinohradská vodárna
                  </text>

                  {/* Bakery Pin Marker at Korunní 90 */}
                  <g transform="translate(300, 130)" data-api-unique-id='contactmap-ra3ce4db9dab519b0-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    <circle cx="0" cy="0" r="16" fill="#8b3a1a" data-api-unique-id='contactmap-r5ad5a18f077e7955-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                    <circle cx="0" cy="0" r="24" fill="#8b3a1a" opacity="0.25" data-api-unique-id='contactmap-rbb2d5acc17dd0853-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                    <path d="M-6 -4 L0 -10 L6 -4 L4 6 L-4 6 Z" fill="#fffdfa" data-api-unique-id='contactmap-r7538aae977327db8-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap' />
                  </g>
                </svg>

                {/* Overlaid Marker Card */}
              </div>

              {/* Transit & Access Tips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs" data-api-unique-id='contactmap-rf570e6729438bb01-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>

                <div className="rounded-xl border border-border bg-muted p-3.5 space-y-1" data-api-unique-id='contactmap-rfe24d23e99189f03-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                  <p className="font-bold text-foreground" data-api-unique-id='contactmap-r031bdd9fe01aafaa-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>Metrem</p>
                  <p className="text-muted-foreground" data-api-unique-id='contactmap-re7bc22a1222f952d-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>
                    Trasa A, stanice <strong data-api-unique-id='contactmap-r6b97c5cfb1f81c00-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>Náměstí Míru</strong> nebo <strong data-api-unique-id='contactmap-r322502f236f04954-s4059463290' data-api-unique-page-name='src/frontend/components/Home/ContactMap'>Jiřího z Poděbrad</strong> (cca 6–8 minut příjemné chůze).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}