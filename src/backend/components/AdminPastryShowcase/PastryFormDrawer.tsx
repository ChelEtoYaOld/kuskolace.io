"use client";

import React, { useState, useEffect, useRef } from "react";
import { PastryItem, PastryCategory, PastryFormData } from "@/backend/types/AdminPastryShowcase";
import { X, Upload, Plus, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { upload_image_file } from "@/tools/tools";
import { toast } from "sonner";
interface PastryFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PastryFormData) => void;
  initialData?: PastryItem | null;
  maxDisplayOrder: number;
}
const CATEGORY_MAP: Record<PastryCategory, string> = {
  OVOCNE_KOLACE: "Ovocné koláče",
  KYNUTE_BUCHTY_A_LOUPAKY: "Kynuté buchty a loupáky",
  SLANE_PECIVO: "Slané pečivo"
};
export default function PastryFormDrawer({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  maxDisplayOrder
}: PastryFormDrawerProps) {
  const [formData, setFormData] = useState<PastryFormData>({
    name: "",
    itemCode: "",
    category: "OVOCNE_KOLACE",
    priceCzk: 65,
    shortDescription: "",
    fullDescription: "",
    ingredients: [],
    allergens: [],
    photoKey: "",
    isTodaySpecial: false,
    isSoldOut: false,
    freshnessLabel: "Pečeno dnes ráno",
    displayOrder: maxDisplayOrder + 1
  });
  const [ingredientInput, setIngredientInput] = useState("");
  const [allergenInput, setAllergenInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name,
        itemCode: initialData.itemCode || "",
        category: initialData.category,
        priceCzk: initialData.priceCzk,
        shortDescription: initialData.shortDescription,
        fullDescription: initialData.fullDescription || "",
        ingredients: [...initialData.ingredients],
        allergens: [...initialData.allergens],
        photoKey: initialData.photoKey || "",
        isTodaySpecial: initialData.isTodaySpecial,
        isSoldOut: initialData.isSoldOut,
        freshnessLabel: initialData.freshnessLabel,
        displayOrder: initialData.displayOrder
      });
    } else {
      setFormData({
        name: "",
        itemCode: "",
        category: "OVOCNE_KOLACE",
        priceCzk: 65,
        shortDescription: "",
        fullDescription: "",
        ingredients: [],
        allergens: [],
        photoKey: "",
        isTodaySpecial: false,
        isSoldOut: false,
        freshnessLabel: "Pečeno dnes ráno",
        displayOrder: maxDisplayOrder + 1
      });
    }
    setIngredientInput("");
    setAllergenInput("");
  }, [initialData, isOpen, maxDisplayOrder]);
  if (!isOpen) return null;
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const uploadedUrl = await upload_image_file(file);
      setFormData(prev => ({
        ...prev,
        photoKey: uploadedUrl
      }));
      toast.success("Fotografie byla úspěšně nahrána");
    } catch {
      toast.error("Nahrání fotografie selhalo, zkuste to znovu");
    } finally {
      setIsUploading(false);
    }
  };
  const handleAddIngredient = () => {
    const trimmed = ingredientInput.trim();
    if (!trimmed) return;
    if (!formData.ingredients.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, trimmed]
      }));
    }
    setIngredientInput("");
  };
  const handleRemoveIngredient = (ing: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(i => i !== ing)
    }));
  };
  const handleAddAllergen = () => {
    const trimmed = allergenInput.trim();
    if (!trimmed) return;
    if (!formData.allergens.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        allergens: [...prev.allergens, trimmed]
      }));
    }
    setAllergenInput("");
  };
  const handleRemoveAllergen = (all: string) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.filter(a => a !== all)
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Vyplňte prosím název pečiva");
      return;
    }
    if (formData.priceCzk <= 0) {
      toast.error("Cena musí být kladné celé číslo");
      return;
    }
    onSubmit(formData);
  };
  return <div className="fixed inset-0 z-50 flex justify-end bg-background/80 backdrop-blur-sm transition-all" data-api-unique-id='pastryformdrawer-r7a0e0ded978c9573-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
      <div className="relative flex h-full w-full max-w-xl flex-col border-l border-border bg-card text-card-foreground shadow-2xl transition-transform" role="dialog" aria-modal="true" data-api-unique-id='pastryformdrawer-r216a6e5fa6bbf86c-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
        {/* Hlavička panelu */}
        <div className="flex shrink-0 items-center justify-between border-b border-border p-4 lg:px-6" data-api-unique-id='pastryformdrawer-r39094668d6dbb2b2-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
          <div className="min-w-0" data-api-unique-id='pastryformdrawer-r74464f894f8ddec4-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
            <h2 className="text-base font-bold text-foreground" data-api-unique-id='pastryformdrawer-r7241d8f17888edb8-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
              {initialData ? "Úprava pečiva ve vitríně" : "Nové pečivo do vitríny"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5" data-api-unique-id='pastryformdrawer-r1439f5041b24029c-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
              Správa cen, kategorií, alergenů a receptury na prodejním pultu.
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" aria-label="Zavřít" data-api-unique-id='pastryformdrawer-r3f05351b825ffb97-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
            <X className="h-5 w-5" data-api-unique-id='pastryformdrawer-r34d700945184bf40-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
          </button>
        </div>

        {/* Formulář - tělo */}
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col" data-api-unique-id='pastryformdrawer-ref49447be2d63873-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-5" data-api-unique-id='pastryformdrawer-r5e82890cf6c778a1-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
            {/* Název pečiva */}
            <div className="space-y-1.5" data-api-unique-id='pastryformdrawer-r56a6a4bd9bb0755e-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
              <label className="text-xs font-semibold text-foreground uppercase tracking-wide" data-api-unique-id='pastryformdrawer-ref2db8c552c35d87-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                Název pečiva <span className="text-destructive" data-api-unique-id='pastryformdrawer-rd0b285ef0029f13e-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>*</span>
              </label>
              <input type="text" required maxLength={255} value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} placeholder="např. Borůvkový koláč s tvarohem..." className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='pastryformdrawer-r55e70d89f5b3f20d-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
            </div>

            {/* Kód položky & Pořadí zobrazení */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-api-unique-id='pastryformdrawer-r6e7be2b32c99d867-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
              <div className="space-y-1.5" data-api-unique-id='pastryformdrawer-r1be14bc8d2f08d9a-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wide" data-api-unique-id='pastryformdrawer-r47e1a8710d728223-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  Interní kód položky
                </label>
                <input type="text" maxLength={50} value={formData.itemCode} onChange={e => setFormData({
                ...formData,
                itemCode: e.target.value
              })} placeholder="např. KOL-BOR-01" className="w-full font-mono rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='pastryformdrawer-rbf0f8e180495b9ee-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
              </div>

              <div className="space-y-1.5" data-api-unique-id='pastryformdrawer-r29acf58eebff5383-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wide" data-api-unique-id='pastryformdrawer-r8d1c0813357e4163-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  Pořadí ve vitríně (display_order)
                </label>
                <input type="number" min={1} value={formData.displayOrder} onChange={e => setFormData({
                ...formData,
                displayOrder: parseInt(e.target.value, 10) || 1
              })} className="w-full font-mono rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='pastryformdrawer-r6fd24a5a411c5556-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
              </div>
            </div>

            {/* Kategorie & Cena */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-api-unique-id='pastryformdrawer-r0974f25b1dd5965c-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
              <div className="space-y-1.5" data-api-unique-id='pastryformdrawer-rbeea7aaf32369dea-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wide" data-api-unique-id='pastryformdrawer-redb0965a8d50e3e6-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  Kategorie <span className="text-destructive" data-api-unique-id='pastryformdrawer-r0f6ac07f99fddaa8-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>*</span>
                </label>
                <Select key={formData.id || "new"} value={formData.category} onValueChange={val => setFormData({
                ...formData,
                category: val as PastryCategory
              })} data-api-unique-id='pastryformdrawer-r58062294e8ba3adc-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  <SelectTrigger className="w-full bg-background" data-api-unique-id='pastryformdrawer-r2bd108fbdacfabdc-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                    <SelectValue data-api-unique-id='pastryformdrawer-rb6ac686fddda5797-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>{CATEGORY_MAP[formData.category]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent data-api-unique-id='pastryformdrawer-r0c38f35dfd497fb9-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                    <SelectItem value="OVOCNE_KOLACE" data-api-unique-id='pastryformdrawer-rd62484a027c439fa-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>Ovocné koláče</SelectItem>
                    <SelectItem value="KYNUTE_BUCHTY_A_LOUPAKY" data-api-unique-id='pastryformdrawer-r680afa40344c6e5a-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                      Kynuté buchty a loupáky
                    </SelectItem>
                    <SelectItem value="SLANE_PECIVO" data-api-unique-id='pastryformdrawer-rde65381b3be07c54-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>Slané pečivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5" data-api-unique-id='pastryformdrawer-ra21550a78cb23535-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wide" data-api-unique-id='pastryformdrawer-rb4a9dbb3d9b7abd0-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  Cena v CZK (kladné celé číslo) <span className="text-destructive" data-api-unique-id='pastryformdrawer-r17313fb3308dd181-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>*</span>
                </label>
                <div className="relative" data-api-unique-id='pastryformdrawer-r1f7bb4b386b225be-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  <input type="number" min={1} required value={formData.priceCzk} onChange={e => setFormData({
                  ...formData,
                  priceCzk: Math.max(1, parseInt(e.target.value, 10) || 1)
                })} className="w-full font-mono rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground pr-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='pastryformdrawer-r2416744244492349-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground pointer-events-none" data-api-unique-id='pastryformdrawer-r3c0b2b11f25e84a9-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                    CZK
                  </span>
                </div>
              </div>
            </div>

            {/* Štítek čerstvosti */}
            <div className="space-y-1.5" data-api-unique-id='pastryformdrawer-r04973f763d82d198-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
              <label className="text-xs font-semibold text-foreground uppercase tracking-wide" data-api-unique-id='pastryformdrawer-rf2eb70c9659d10a1-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                Štítek čerstvosti (freshness_label)
              </label>
              <input type="text" maxLength={100} value={formData.freshnessLabel} onChange={e => setFormData({
              ...formData,
              freshnessLabel: e.target.value
            })} placeholder="např. Pečeno dnes ráno v 06:00" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='pastryformdrawer-r4d8490a1d1be1175-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
            </div>

            {/* Krátký popis */}
            <div className="space-y-1.5" data-api-unique-id='pastryformdrawer-r4fe404ae71f8ef5c-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
              <label className="text-xs font-semibold text-foreground uppercase tracking-wide" data-api-unique-id='pastryformdrawer-r23e3ab15b9e67c08-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                Krátký popis pro vitrínu (short_description)
              </label>
              <textarea rows={2} maxLength={500} value={formData.shortDescription} onChange={e => setFormData({
              ...formData,
              shortDescription: e.target.value
            })} placeholder="Stručný lákavý popis na jeden až dva řádky..." className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none" data-api-unique-id='pastryformdrawer-rbca1779c3e4e880d-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
            </div>

            {/* Detailní popis těsta a náplně */}
            <div className="space-y-1.5" data-api-unique-id='pastryformdrawer-rbd7e1446fa6ab072-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
              <label className="text-xs font-semibold text-foreground uppercase tracking-wide" data-api-unique-id='pastryformdrawer-r3fe30cf14a2d6436-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                Detailní popis těsta a náplně (full_description)
              </label>
              <textarea rows={3} value={formData.fullDescription} onChange={e => setFormData({
              ...formData,
              fullDescription: e.target.value
            })} placeholder="Rozepsaná receptura těsta, fermentace, náplně a posypu..." className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none" data-api-unique-id='pastryformdrawer-r3b37af432d18d118-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
            </div>

            {/* Fotografie & Upload */}
            <div className="space-y-2" data-api-unique-id='pastryformdrawer-r6beb0e73ee26317f-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
              <label className="text-xs font-semibold text-foreground uppercase tracking-wide" data-api-unique-id='pastryformdrawer-r822c280afd4e31f5-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                Fotografie pečiva (photo_key)
              </label>
              <div className="flex items-start gap-4" data-api-unique-id='pastryformdrawer-r8955fa746d60da4a-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-muted flex items-center justify-center" data-api-unique-id='pastryformdrawer-ra9ceb7866a45d4fd-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  {formData.photoKey ? <img src={formData.photoKey} alt="Náhled" className="h-full w-full object-cover" data-api-unique-id='pastryformdrawer-r5b0f6b2f03b02cc4-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' /> : <span className="text-[10px] text-muted-foreground text-center p-1" data-api-unique-id='pastryformdrawer-ra09e4d41ae653646-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                      Bez fota
                    </span>}
                </div>
                <div className="flex-1 space-y-2" data-api-unique-id='pastryformdrawer-r40f038475d21d7f4-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  <div onClick={() => fileInputRef.current?.click()} className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-border bg-muted/40 p-3 text-xs text-muted-foreground hover:bg-muted transition-colors" data-api-unique-id='pastryformdrawer-r69ecff1bd65a2637-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                    {isUploading ? <>
                        <Loader2 className="h-4 w-4 animate-spin text-primary" data-api-unique-id='pastryformdrawer-r7cde72845b034ad1-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
                        <span data-api-unique-id='pastryformdrawer-r522ce3719a769ded-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>Nahrávám fotografii...</span>
                      </> : <>
                        <Upload className="h-4 w-4 text-foreground" data-api-unique-id='pastryformdrawer-r9d4f217d5882efbf-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
                        <span data-api-unique-id='pastryformdrawer-rd3720904724884a0-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>Klikněte pro nahrání nové fotografie z disku</span>
                      </>}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} data-api-unique-id='pastryformdrawer-r85a40d5c577083da-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
                  <input type="text" value={formData.photoKey} onChange={e => setFormData({
                  ...formData,
                  photoKey: e.target.value
                })} placeholder="Nebo zadejte přímou URL adresu..." className="w-full font-mono text-xs rounded-md border border-input bg-background px-2.5 py-1.5 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='pastryformdrawer-r7cb0ef64cb783976-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
                </div>
              </div>
            </div>

            {/* Suroviny (skalární seznam) */}
            <div className="space-y-2" data-api-unique-id='pastryformdrawer-r29b7d3595938eca1-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
              <div className="flex items-center justify-between" data-api-unique-id='pastryformdrawer-r73581f96eb68303c-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wide" data-api-unique-id='pastryformdrawer-r7b4e8e99a4346bf8-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  Suroviny (nahrazení celého pole)
                </label>
                <span className="text-[11px] text-muted-foreground" data-api-unique-id='pastryformdrawer-rf8afdbb990275ee6-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  {formData.ingredients.length} položek
                </span>
              </div>
              <div className="flex gap-2" data-api-unique-id='pastryformdrawer-r91dcd3d61e730c45-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                <input type="text" value={ingredientInput} onChange={e => setIngredientInput(e.target.value)} onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddIngredient();
                }
              }} placeholder="Přidat surovinu (např. Lesní borůvky)" className="flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='pastryformdrawer-r658367f87d4d8390-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
                <button type="button" onClick={handleAddIngredient} className="inline-flex items-center gap-1 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-muted transition-colors" data-api-unique-id='pastryformdrawer-rda890d0981dd8a48-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  <Plus className="h-3.5 w-3.5" data-api-unique-id='pastryformdrawer-rf3dff6308c533816-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
                  <span data-api-unique-id='pastryformdrawer-r7246ebb652042f73-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>Přidat</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1" data-api-unique-id='pastryformdrawer-r44c209061c4eb017-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                {formData.ingredients.map((ing, index) => <span key={ing} className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs text-foreground" data-api-unique-id='pastryformdrawer-rac422f5ed0ffd236-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' data-api-in-loop='1'>
                    <span data-api-unique-id='pastryformdrawer-rf6782ea0731cea62-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' data-api-in-loop='1' data-api-bind-info={`formData.ingredients-${index}-$item`} data-api-map-var-name='ing'>{ing}</span>
                    <button type="button" onClick={() => handleRemoveIngredient(ing)} className="text-muted-foreground hover:text-destructive" aria-label={`Odebrat surovinu ${ing}`} data-api-unique-id='pastryformdrawer-r9737edaa726ad112-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' data-api-in-loop='1'>
                      <X className="h-3 w-3" data-api-unique-id='pastryformdrawer-r8555956377141814-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' data-api-in-loop='1' />
                    </button>
                  </span>)}
              </div>
            </div>

            {/* Alergeny (skalární seznam s kódy) */}
            <div className="space-y-2" data-api-unique-id='pastryformdrawer-r4093c15662c28886-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
              <div className="flex items-center justify-between" data-api-unique-id='pastryformdrawer-r38e7d57ddbedd001-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wide" data-api-unique-id='pastryformdrawer-rff9cd46fb7af26a3-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  Alergeny (s číselnými kódy)
                </label>
                <span className="text-[11px] text-muted-foreground" data-api-unique-id='pastryformdrawer-r1908b6808bab4398-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  {formData.allergens.length} alergenů
                </span>
              </div>
              <div className="flex gap-2" data-api-unique-id='pastryformdrawer-r455701c79ca4bf57-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                <input type="text" value={allergenInput} onChange={e => setAllergenInput(e.target.value)} onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddAllergen();
                }
              }} placeholder="např. 1 - Obiloviny obsahující lepek" className="flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='pastryformdrawer-r8768e6d59f94b6d9-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
                <button type="button" onClick={handleAddAllergen} className="inline-flex items-center gap-1 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-muted transition-colors" data-api-unique-id='pastryformdrawer-ra485e2a6e1be7f8f-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  <Plus className="h-3.5 w-3.5" data-api-unique-id='pastryformdrawer-rd1cb42db31524a78-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
                  <span data-api-unique-id='pastryformdrawer-r372d973de9773aa9-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>Přidat</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1" data-api-unique-id='pastryformdrawer-rd9c8fc1ac065afa6-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                {formData.allergens.map((all, index) => <span key={all} className="inline-flex items-center gap-1 rounded-md border border-border bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive" data-api-unique-id='pastryformdrawer-rd371d15bd3397ffe-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' data-api-in-loop='1'>
                    <span data-api-unique-id='pastryformdrawer-ra82e262d253b36f9-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' data-api-in-loop='1' data-api-bind-info={`formData.allergens-${index}-$item`} data-api-map-var-name='all'>{all}</span>
                    <button type="button" onClick={() => handleRemoveAllergen(all)} className="hover:text-foreground" aria-label={`Odebrat alergen ${all}`} data-api-unique-id='pastryformdrawer-r486ea3ce4589b9d2-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' data-api-in-loop='1'>
                      <X className="h-3 w-3" data-api-unique-id='pastryformdrawer-rf385b41e15bf747b-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' data-api-in-loop='1' />
                    </button>
                  </span>)}
              </div>
            </div>

            {/* Rychlé přepínače: Specialita & Vyprodáno */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg border border-border bg-muted/30 p-3" data-api-unique-id='pastryformdrawer-rb73d94d889e43296-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
              <label className="flex cursor-pointer items-center justify-between gap-2 p-1" data-api-unique-id='pastryformdrawer-r6c1f60144356edf5-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                <div data-api-unique-id='pastryformdrawer-rc28f16a2ba1fb4f4-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  <span className="text-xs font-semibold text-foreground" data-api-unique-id='pastryformdrawer-rd62ee8b7e88242e4-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>Dnešní specialita</span>
                  <p className="text-[11px] text-muted-foreground" data-api-unique-id='pastryformdrawer-ra638954bc2034e7b-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>Zvýrazní kousek dne</p>
                </div>
                <input type="checkbox" checked={formData.isTodaySpecial} onChange={e => setFormData({
                ...formData,
                isTodaySpecial: e.target.checked
              })} className="h-4 w-4 rounded border-input text-primary focus:ring-ring" data-api-unique-id='pastryformdrawer-rb9c8ef1a3e120d7a-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-2 p-1" data-api-unique-id='pastryformdrawer-r91afdc00052f2d64-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                <div data-api-unique-id='pastryformdrawer-r92af1ca4373d86f2-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
                  <span className="text-xs font-semibold text-foreground" data-api-unique-id='pastryformdrawer-r44df100d80d7495e-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>Stav: Vyprodáno</span>
                  <p className="text-[11px] text-muted-foreground" data-api-unique-id='pastryformdrawer-r861a2b638d315184-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>Označí kus jako rozebraný</p>
                </div>
                <input type="checkbox" checked={formData.isSoldOut} onChange={e => setFormData({
                ...formData,
                isSoldOut: e.target.checked
              })} className="h-4 w-4 rounded border-input text-destructive focus:ring-ring" data-api-unique-id='pastryformdrawer-rf86a0ba69390fd0d-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer' />
              </label>
            </div>
          </div>

          {/* Spodní akční lišta formuláře */}
          <div className="flex shrink-0 items-center justify-end gap-3 border-t border-border p-4 bg-card" data-api-unique-id='pastryformdrawer-r662a28ed482e1e11-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
            <button type="button" onClick={onClose} className="rounded-md border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" data-api-unique-id='pastryformdrawer-r7018bff1ad15913f-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
              Zrušit
            </button>
            <button type="submit" className="rounded-md bg-primary px-5 py-2 text-xs font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors" data-api-unique-id='pastryformdrawer-r77ebd331a3751e18-s159369154' data-api-unique-page-name='src/backend/components/AdminPastryShowcase/PastryFormDrawer'>
              {initialData ? "Uložit změny v pečivu" : "Přidat do vitríny"}
            </button>
          </div>
        </form>
      </div>
    </div>;
}