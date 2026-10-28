"use client";

import React, { useEffect, useState } from "react";
import Header from "@/backend/components/AdminBusinessFacts/Header";
import WeeklyOpeningHours from "@/backend/components/AdminBusinessFacts/WeeklyOpeningHours";
import ContactFactsCard from "@/backend/components/AdminBusinessFacts/ContactFactsCard";
import ReputationServicesCard from "@/backend/components/AdminBusinessFacts/ReputationServicesCard";
import StickyActionBar from "@/backend/components/AdminBusinessFacts/StickyActionBar";
import { BusinessFacts, OpeningHour, SaveAllBusinessFactsInput } from "@/backend/types/AdminBusinessFacts";
import { getAdminBusinessFacts, saveBusinessFactsAndHours } from "@/backend/actions/AdminBusinessFacts";
import { toast } from "sonner";
const DEFAULT_INITIAL_FACTS: BusinessFacts = {
  id: "",
  name: "Kus Koláče",
  streetAddress: "Korunní 90",
  cityZip: "101 00 Vinohrady, Praha 2",
  phone: "608 903 828",
  email: "info@kuskolace.cz",
  priceRangeCzk: "100–200 Kč",
  ratingScore: 4.8,
  reviewsCount: 642,
  takeawayAvailable: true,
  deliveryAvailable: false,
  createdAt: new Date(),
  updatedAt: new Date()
};
const DEFAULT_INITIAL_HOURS: OpeningHour[] = [{
  id: "1",
  dayKey: "PO",
  dayName: "Pondělí",
  isOpen: true,
  openTime: "08:00",
  closeTime: "17:00",
  note: "nebo do vyprodání",
  sortOrder: 1,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: "2",
  dayKey: "UT",
  dayName: "Úterý",
  isOpen: true,
  openTime: "08:00",
  closeTime: "17:00",
  note: "nebo do vyprodání",
  sortOrder: 2,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: "3",
  dayKey: "ST",
  dayName: "Středa",
  isOpen: true,
  openTime: "08:00",
  closeTime: "17:00",
  note: "nebo do vyprodání",
  sortOrder: 3,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: "4",
  dayKey: "CT",
  dayName: "Čtvrtek",
  isOpen: true,
  openTime: "08:00",
  closeTime: "17:00",
  note: "nebo do vyprodání",
  sortOrder: 4,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: "5",
  dayKey: "PA",
  dayName: "Pátek",
  isOpen: true,
  openTime: "08:00",
  closeTime: "17:00",
  note: "dopolední várka koláčů",
  sortOrder: 5,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: "6",
  dayKey: "SO",
  dayName: "Sobota",
  isOpen: true,
  openTime: "08:30",
  closeTime: "14:00",
  note: "čerstvé z pece",
  sortOrder: 6,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: "7",
  dayKey: "NE",
  dayName: "Neděle",
  isOpen: false,
  openTime: "08:00",
  closeTime: "14:00",
  note: null,
  sortOrder: 7,
  createdAt: new Date(),
  updatedAt: new Date()
}];
export default function AdminBusinessFactsPage() {
  const [facts, setFacts] = useState<BusinessFacts | null>(null);
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
  const [originalFacts, setOriginalFacts] = useState<BusinessFacts | null>(null);
  const [originalHours, setOriginalHours] = useState<OpeningHour[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getAdminBusinessFacts();
        if (!isMounted) return;
        if (data) {
          const currentFacts = data.facts ?? DEFAULT_INITIAL_FACTS;
          const currentHours = data.openingHours && data.openingHours.length > 0 ? data.openingHours : DEFAULT_INITIAL_HOURS;
          setFacts(currentFacts);
          setOriginalFacts(currentFacts);
          setOpeningHours(currentHours);
          setOriginalHours(currentHours);
          if (currentFacts.updatedAt) {
            const d = currentFacts.updatedAt instanceof Date ? currentFacts.updatedAt : new Date(currentFacts.updatedAt);
            if (!isNaN(d.getTime())) {
              const timeStr = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
              setLastSavedAt(timeStr);
            }
          }
        }
      } catch {
        if (!isMounted) return;
        toast.error("Nepodařilo se načíst provozní údaje.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);
  const handleFactsChange = (updated: BusinessFacts) => {
    setFacts(updated);
    setIsDirty(true);
  };
  const handleHoursChange = (updated: OpeningHour[]) => {
    setOpeningHours(updated);
    setIsDirty(true);
  };
  const handleReset = () => {
    if (originalFacts) {
      setFacts(originalFacts);
    }
    setOpeningHours(originalHours);
    setIsDirty(false);
    toast.info("Změny byly vráceny do původního stavu.");
  };
  const handleSave = async () => {
    if (!facts) return;
    setIsSaving(true);
    try {
      const input: SaveAllBusinessFactsInput = {
        facts: {
          name: facts.name,
          streetAddress: facts.streetAddress,
          cityZip: facts.cityZip,
          phone: facts.phone,
          email: facts.email,
          priceRangeCzk: facts.priceRangeCzk,
          ratingScore: facts.ratingScore,
          reviewsCount: facts.reviewsCount,
          takeawayAvailable: facts.takeawayAvailable,
          deliveryAvailable: facts.deliveryAvailable
        },
        openingHours: openingHours.map((h, index) => ({
          id: h.id,
          dayKey: h.dayKey,
          dayName: h.dayName,
          isOpen: h.isOpen,
          openTime: h.openTime,
          closeTime: h.closeTime,
          note: h.note,
          sortOrder: h.sortOrder
        }))
      };
      const res = await saveBusinessFactsAndHours(input);
      if (res && res.facts) {
        setFacts(res.facts);
        setOriginalFacts(res.facts);
        setOpeningHours(res.openingHours || []);
        setOriginalHours(res.openingHours || []);
        setIsDirty(false);
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        setLastSavedAt(timeStr);
        toast.success("Provozní údaje a otevírací doba byly úspěšně uloženy!");
      }
    } catch {
      toast.error("Nepodařilo se uložit změny.");
    } finally {
      setIsSaving(false);
    }
  };
  if (isLoading) {
    return <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6">
        <div className="flex min-w-0 flex-col items-center justify-center py-24 text-neutral-500">
          <p className="text-sm">Načítání provozních údajů...</p>
        </div>
      </div>;
  }
  if (!facts) {
    return <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6">
        <div className="flex min-w-0 flex-col items-center justify-center py-24 text-neutral-500">
          <p className="text-sm">Provozní údaje nebyly nalezeny.</p>
        </div>
      </div>;
  }
  return <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6">
      <div className="flex min-w-0 flex-col gap-6">
        {/* Horní hlavička s avatarem pekárny, stavem a hlavními akcemi */}
        <Header isDirty={isDirty} lastSavedAt={lastSavedAt} onSave={handleSave} onReset={handleReset} isSaving={isSaving} />

        {/* Hlavní pracovní plocha: Dvě sekce (vlevo 60% týdenní rozvrh, vpravo 40% kontakty & reputace) */}
        <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-12 items-start">
          {/* Levý hlavní sloupec: Otevírací doba PO-NE */}
          <div className="min-w-0 xl:col-span-7">
            <WeeklyOpeningHours hours={openingHours} onChange={handleHoursChange} />
          </div>

          {/* Pravý sloupec: Základní údaje a reputace/služby */}
          <div className="flex min-w-0 flex-col gap-6 xl:col-span-5">
            <ContactFactsCard facts={facts} onChange={handleFactsChange} />
            <ReputationServicesCard facts={facts} onChange={handleFactsChange} />
          </div>
        </div>

        {/* Spodní fixní/plovoucí lišta pro rychlé uložení v případě neuložených změn */}
        <StickyActionBar isDirty={isDirty} isSaving={isSaving} onSave={handleSave} onReset={handleReset} />
      </div>
    </div>;
}
