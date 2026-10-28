"use client";

import React, { useEffect, useState } from "react";
import PastryShowcaseTable from "@/backend/components/AdminHome/PastryShowcaseTable";
import InstagramIntegrationManager from "@/backend/components/AdminHome/InstagramIntegrationManager";
import CmsSectionManager from "@/backend/components/AdminHome/CmsSectionManager";
import BusinessInfoManager from "@/backend/components/AdminHome/BusinessInfoManager";
import EditableImg from "@/@base/EditableImg";
import { toast } from "sonner";
import { getAdminHomeDashboard, togglePastrySpecial, togglePastrySoldOut, createPastryItem, updatePastryItem, deletePastryItem, reorderPastryItems, toggleInstagramFeedMode, toggleInstagramAutoSync, manualSyncInstagram, createInstagramPost, deleteInstagramPost, toggleCmsSection, updateCmsTexts, updateBusinessFacts, toggleOpeningDayOpen, updateOpeningHourTimes } from "@/backend/actions/AdminHome";
import type { PastryItemDto, InstagramConfigDto, InstagramPostDto, CmsConfigDto, BusinessFactsDto, OpeningHourDto, InstagramFeedMode, OpeningDayKey, PastryCategory } from "@/backend/types/AdminHome";
export default function AdminHomePage() {
  const [pastryItems, setPastryItems] = useState<PastryItemDto[]>([]);
  const [instagramConfig, setInstagramConfig] = useState<InstagramConfigDto | null>(null);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPostDto[]>([]);
  const [cmsConfig, setCmsConfig] = useState<CmsConfigDto | null>(null);
  const [businessFacts, setBusinessFacts] = useState<BusinessFactsDto | null>(null);
  const [openingHours, setOpeningHours] = useState<OpeningHourDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Inicializační načtení dashboardu
  useEffect(() => {
    let isMounted = true;
    async function loadDashboard() {
      try {
        setIsLoading(true);
        const data = await getAdminHomeDashboard();
        if (!isMounted) return;
        if (data) {
          setPastryItems(data.pastryItems ?? []);
          setInstagramConfig(data.instagramConfig ?? null);
          setInstagramPosts(data.instagramPosts ?? []);
          setCmsConfig(data.cmsConfig ?? null);
          setBusinessFacts(data.businessFacts ?? null);
          setOpeningHours(data.openingHours ?? []);
        }
      } catch {
        if (isMounted) {
          toast.error("Nepodařilo se načíst diagnostická data dashboardu");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadDashboard();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handlery pro pečivo (PastryShowcaseTable)
  const handleToggleSpecial = async (id: string) => {
    try {
      const updated = await togglePastrySpecial(id);
      setPastryItems(prev => prev.map((item, index) => item.id === id ? updated : item));
      toast.success("Označení speciality dne bylo aktualizováno");
    } catch {
      toast.error("Nepodařilo se aktualizovat označení speciality dne");
    }
  };
  const handleToggleSoldOut = async (id: string) => {
    try {
      const updated = await togglePastrySoldOut(id);
      setPastryItems(prev => prev.map((item, index) => item.id === id ? updated : item));
      toast.success("Dostupnost položky ve vitríně byla změněna");
    } catch {
      toast.error("Nepodařilo se změnit stav dostupnosti položky");
    }
  };
  const handleAddPastryItem = async (newItemData: {
    name: string;
    category: PastryCategory;
    priceCzk: number;
    shortDescription?: string;
    photoKey?: string;
    freshnessLabel?: string;
    isTodaySpecial?: boolean;
  }) => {
    try {
      const created = await createPastryItem({
        name: newItemData.name,
        category: newItemData.category,
        priceCzk: Number(newItemData.priceCzk) || 0,
        shortDescription: newItemData.shortDescription || "",
        photoKey: newItemData.photoKey || "kolac-novy",
        freshnessLabel: newItemData.freshnessLabel || "Dnes upečeno",
        isTodaySpecial: Boolean(newItemData.isTodaySpecial)
      });
      setPastryItems(prev => [...prev, created]);
      toast.success("Nová položka byla přidána do vitríny");
    } catch {
      toast.error("Nepodařilo se vytvořit novou položku pečiva");
    }
  };
  const handleUpdatePastryItem = async (id: string, updates: {
    name?: string;
    priceCzk?: number;
    shortDescription?: string;
    category?: PastryCategory;
    isTodaySpecial?: boolean;
    isSoldOut?: boolean;
    freshnessLabel?: string;
  }) => {
    try {
      const updated = await updatePastryItem(id, {
        name: updates.name,
        priceCzk: updates.priceCzk !== undefined ? Number(updates.priceCzk) : undefined,
        shortDescription: updates.shortDescription,
        category: updates.category,
        isTodaySpecial: updates.isTodaySpecial,
        isSoldOut: updates.isSoldOut,
        freshnessLabel: updates.freshnessLabel
      });
      setPastryItems(prev => prev.map((item, index) => item.id === id ? updated : item));
      toast.success("Položka byla úspěšně aktualizována");
    } catch {
      toast.error("Nepodařilo se upravit položku pečiva");
    }
  };
  const handleDeletePastryItem = async (id: string) => {
    try {
      await deletePastryItem(id);
      setPastryItems(prev => prev.filter(item => item.id !== id));
      toast.success("Položka byla odstraněna z nabídky");
    } catch {
      toast.error("Nepodařilo se smazat položku z vitríny");
    }
  };
  const handleReorderPastry = async (sourceIndex: number, destinationIndex: number) => {
    if (destinationIndex < 0 || destinationIndex >= pastryItems.length || sourceIndex === destinationIndex) {
      return;
    }
    const sourceItem = pastryItems[sourceIndex];
    const targetItem = pastryItems[destinationIndex];
    if (!sourceItem || !targetItem) return;
    try {
      await reorderPastryItems(sourceItem.id, targetItem.id);
      const updated = [...pastryItems];
      const [moved] = updated.splice(sourceIndex, 1);
      updated.splice(destinationIndex, 0, moved);
      const reordered = updated.map((item, index) => ({
        ...item,
        displayOrder: index + 1
      }));
      setPastryItems(reordered);
      toast.success("Pořadí položek ve vitríně bylo změněno");
    } catch {
      toast.error("Nepodařilo se změnit pořadí položek");
    }
  };

  // Handlery pro Instagram (InstagramIntegrationManager)
  const handleToggleIgFeedMode = async (mode: InstagramFeedMode) => {
    try {
      const updated = await toggleInstagramFeedMode(mode);
      setInstagramConfig(updated);
      toast.success(`Aktivní režim Instagram feedu byl přepnut na: ${mode === "API" ? "Automatické API" : "Záložní feed"}`);
    } catch {
      toast.error("Nepodařilo se přepnout režim feedu");
    }
  };
  const handleToggleAutoSync = async () => {
    try {
      const updated = await toggleInstagramAutoSync();
      setInstagramConfig(updated);
      toast.success(updated.autoSync ? "Automatická synchronizace zapnuta" : "Automatická synchronizace pozastavena");
    } catch {
      toast.error("Nepodařilo se změnit stav automatické synchronizace");
    }
  };
  const handleManualSync = async () => {
    try {
      const updated = await manualSyncInstagram();
      setInstagramConfig(updated);
      toast.success("Instagram synchronizace proběhla úspěšně");
    } catch {
      toast.error("Manuální synchronizace se nezdařila");
    }
  };
  const handleAddIgPost = async (newPostData: {
    caption: string;
    photoKey?: string;
    photoUrl?: string;
    postUrl?: string;
    publishedLabel?: string;
    likesCount?: number;
  }) => {
    try {
      const created = await createInstagramPost({
        caption: newPostData.caption,
        photoKey: newPostData.photoKey || newPostData.photoUrl || "ig-default",
        postUrl: newPostData.postUrl || "https://instagram.com/kuskolace",
        publishedLabel: newPostData.publishedLabel || "Právě teď",
        likesCount: newPostData.likesCount !== undefined ? Number(newPostData.likesCount) : 0
      });
      setInstagramPosts(prev => [created, ...prev]);
      toast.success("Příspěvek byl přidán do záložního feedu");
    } catch {
      toast.error("Nepodařilo se vytvořit příspěvek do feedu");
    }
  };
  const handleDeleteIgPost = async (id: string) => {
    try {
      await deleteInstagramPost(id);
      setInstagramPosts(prev => prev.filter(p => p.id !== id));
      toast.success("Příspěvek byl odebrán ze záložního feedu");
    } catch {
      toast.error("Nepodařilo se odstranit příspěvek");
    }
  };

  // Handlery pro CMS sekce (CmsSectionManager)
  const handleToggleSectionVisibility = async (key: "isStoryVisible" | "isShowcaseVisible" | "isInstagramVisible" | "isContactVisible" | "isWebPublished") => {
    try {
      const updated = await toggleCmsSection(key);
      setCmsConfig(updated);
      toast.success(`Viditelnost sekce byla změněna na: ${updated[key] ? "Viditelné" : "Skryté"}`);
    } catch {
      toast.error("Nepodařilo se aktualizovat viditelnost sekce");
    }
  };
  const handleUpdateCmsTexts = async (updatedTexts: {
    welcomeHeading: string;
    welcomePreamble: string;
    storyTitle: string;
    storyBody: string;
  }) => {
    try {
      const updated = await updateCmsTexts({
        welcomeHeading: updatedTexts.welcomeHeading,
        welcomePreamble: updatedTexts.welcomePreamble,
        storyTitle: updatedTexts.storyTitle,
        storyBody: updatedTexts.storyBody
      });
      setCmsConfig(updated);
      toast.success("Texty sekcí webu byly úspěšně uloženy");
    } catch {
      toast.error("Nepodařilo se uložit CMS texty");
    }
  };

  // Handlery pro provozní informace a otevírací dobu (BusinessInfoManager)
  const handleSaveBusinessFacts = async (updatedFacts: BusinessFactsDto) => {
    try {
      const factsResult = await updateBusinessFacts({
        name: updatedFacts.name,
        streetAddress: updatedFacts.streetAddress,
        cityZip: updatedFacts.cityZip,
        phone: updatedFacts.phone,
        priceRangeCzk: updatedFacts.priceRangeCzk
      });
      setBusinessFacts(factsResult);
      toast.success("Provozní informace byly uloženy");
    } catch {
      toast.error("Nepodařilo se uložit provozní údaje");
    }
  };
  const handleToggleDayOpen = async (dayKey: OpeningDayKey) => {
    try {
      const updated = await toggleOpeningDayOpen(dayKey);
      setOpeningHours(prev => prev.map((h, index) => h.dayKey === dayKey ? updated : h));
    } catch {
      toast.error("Nepodařilo se přepnout stav dne");
    }
  };
  const handleSaveDayTimes = async (dayKey: OpeningDayKey, times: {
    openTime: string;
    closeTime: string;
  }) => {
    try {
      const updated = await updateOpeningHourTimes(dayKey, times);
      setOpeningHours(prev => prev.map((h, index) => h.dayKey === dayKey ? updated : h));
    } catch {
      toast.error("Nepodařilo se uložit otevírací dobu");
    }
  };

  // Adaptéry pro data předávaná podřízeným komponentám
  const pastryTableItems = pastryItems.map((item, index) => ({
    ...item,
    photoUrl: item.photoKey
  }));
  const igConfigForComponent = instagramConfig ? {
    id: instagramConfig.id,
    accountHandle: instagramConfig.accountHandle,
    syncStatus: instagramConfig.syncStatus,
    autoSync: instagramConfig.autoSync,
    feedMode: instagramConfig.feedMode,
    lastSyncAt: instagramConfig.lastSyncAt || "Dnes 08:05"
  } : {
    id: "ig-cfg-default",
    accountHandle: "@kuskolace",
    syncStatus: "AUTORIZOVANO" as const,
    autoSync: true,
    feedMode: "API" as const,
    lastSyncAt: "Dnes 08:05"
  };
  const igPostsForComponent = instagramPosts.map((post, index) => ({
    id: post.id,
    caption: post.caption,
    photoKey: post.photoKey,
    photoUrl: post.photoKey,
    postUrl: post.postUrl,
    publishedLabel: post.publishedLabel,
    likesCount: post.likesCount,
    isFeatured: post.isFeatured,
    isFromApi: post.isFromApi
  }));
  const sectionVisibility = cmsConfig ? {
    isStoryVisible: cmsConfig.isStoryVisible,
    isShowcaseVisible: cmsConfig.isShowcaseVisible,
    isInstagramVisible: cmsConfig.isInstagramVisible,
    isContactVisible: cmsConfig.isContactVisible,
    isWebPublished: cmsConfig.isWebPublished
  } : {
    isStoryVisible: true,
    isShowcaseVisible: true,
    isInstagramVisible: true,
    isContactVisible: true,
    isWebPublished: true
  };
  const cmsTexts = cmsConfig ? {
    welcomeHeading: cmsConfig.welcomeHeading,
    welcomePreamble: cmsConfig.welcomePreamble,
    storyTitle: cmsConfig.storyTitle,
    storyBody: cmsConfig.storyBody
  } : {
    welcomeHeading: "Poctivé vinohradské koláče s čerstvým ovocem a máslem",
    welcomePreamble: "Řemeslná pekárna Kus Koláče na Korunní 90. Pečeme každé ráno od 08:00.",
    storyTitle: "Příběh poctivého kynutého těsta na Vinohradech",
    storyBody: "Vše začíná u poctivého farmářského másla, žloutků z volného chovu a kynutého těsta, které necháváme v klidu vyzrát. Pečeme podle osvědčených receptur, s hromadou čerstvého lesního ovoce a křupavou drobenkou."
  };
  const businessFactsForComponent: BusinessFactsDto = businessFacts ?? {
    id: "bf-1",
    name: "Kus Koláče",
    streetAddress: "Korunní 90",
    cityZip: "101 00 Vinohrady, Praha 2",
    phone: "608 903 828",
    email: "info@kuskolace.cz",
    priceRangeCzk: "100–200 Kč",
    ratingScore: 4.8,
    reviewsCount: 342,
    takeawayAvailable: true,
    deliveryAvailable: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  if (isLoading) {
    return <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6 bg-background text-foreground">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm">Načítání přehledu a diagnostiky systému...</p>
          </div>
        </div>
      </div>;
  }
  return <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6 bg-background text-foreground">
      <div className="flex min-w-0 flex-col gap-5">
        {/* Horní hlavička stránky - Administrace pekárny Kus Koláče */}
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
              <EditableImg propKey="admin-brand-icon" src="https://www.autocoder.cc/background/zaki_prod/user_upload/deb916a30e5741c4816b07b2f15292b7.jpg" alt="Kus Koláče Brand" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <h1 className="font-header text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Přehled a diagnostika systému
              </h1>
              <p className="text-xs text-muted-foreground sm:text-sm truncate">
                Pracovní pult pekařského mistra na Korunní 90, Praha 2 – Vinohrady
              </p>
            </div>
          </div>
        </div>

        {/* Dvouřádková / dvousloupcová hlavní plocha (Vlevo vitrína & IG, Vpravo CMS & Provoz) */}
        <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-12 items-start">
          {/* Levý hlavní sloupec (xl:col-span-8) */}
          <section className="flex min-w-0 flex-col gap-5 xl:col-span-8">
            {/* 1. Denní vitrína pečiva */}
            <PastryShowcaseTable items={pastryTableItems} onToggleSpecial={handleToggleSpecial} onToggleSoldOut={handleToggleSoldOut} onAddItem={handleAddPastryItem} onUpdateItem={handleUpdatePastryItem} onDeleteItem={handleDeletePastryItem} onReorder={handleReorderPastry} />

            {/* 2. Instagram integrace & feed */}
            <InstagramIntegrationManager config={igConfigForComponent} posts={igPostsForComponent} onToggleFeedMode={handleToggleIgFeedMode} onToggleAutoSync={handleToggleAutoSync} onManualSync={handleManualSync} onAddPost={handleAddIgPost} onDeletePost={handleDeleteIgPost} />
          </section>

          {/* Pravý vedlejší sloupec (xl:col-span-4) */}
          <aside className="flex min-w-0 flex-col gap-5 xl:col-span-4">
            {/* 3. Viditelnost sekcí webu & CMS texty */}
            <CmsSectionManager visibility={sectionVisibility} texts={cmsTexts} onToggleSection={handleToggleSectionVisibility} onUpdateTexts={handleUpdateCmsTexts} />

            {/* 4. Provozní fakta & otevírací doba */}
            <BusinessInfoManager initialFacts={businessFactsForComponent} openingHours={openingHours} onSaveFacts={handleSaveBusinessFacts} onToggleDayOpen={handleToggleDayOpen} onSaveDayTimes={handleSaveDayTimes} />
          </aside>
        </div>
      </div>
    </div>;
}
