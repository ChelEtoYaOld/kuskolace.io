"use client";

import React, { useEffect, useState } from "react";
import RevealOnScroll from "@/frontend/components/Home/RevealOnScroll";
import Hero from "@/frontend/components/Home/Hero";
import PastryShowcase from "@/frontend/components/Home/PastryShowcase";
import Story from "@/frontend/components/Home/Story";
import InstagramFeed from "@/frontend/components/Home/InstagramFeed";
import ContactMap from "@/frontend/components/Home/ContactMap";
import { getHomePageData } from "@/frontend/actions/Home";
import type { PastryCategoryFilter, PastryItem, InstagramPost, OpeningHour, BusinessFacts, CmsConfig, InstagramConfig } from "@/frontend/types/Home";
export default function HomePage() {
  const [businessFacts, setBusinessFacts] = useState<BusinessFacts | null>(null);
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
  const [cmsConfig, setCmsConfig] = useState<CmsConfig | null>(null);
  const [instagramConfig, setInstagramConfig] = useState<InstagramConfig | null>(null);
  const [pastryItems, setPastryItems] = useState<PastryItem[]>([]);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PastryCategoryFilter>("ALL");
  const [activePastryModal, setActivePastryModal] = useState<PastryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getHomePageData().then(data => {
      if (!isMounted) return;
      if (data) {
        setBusinessFacts(data.businessFacts ?? null);
        setOpeningHours(data.openingHours ?? []);
        setCmsConfig(data.cmsConfig ?? null);
        setInstagramConfig(data.instagramConfig ?? null);
        setPastryItems(data.pastryItems ?? []);
        setInstagramPosts(data.instagramPosts ?? []);
      }
    }).catch(err => {
      console.error("Chyba při načítání dat domovské stránky pekárny:", err);
      if (isMounted) {
        setBusinessFacts(null);
        setOpeningHours([]);
        setCmsConfig(null);
        setInstagramConfig(null);
        setPastryItems([]);
        setInstagramPosts([]);
      }
    }).finally(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
  const handleScrollToShowcase = () => {
    const el = document.getElementById("vitrina");
    if (el) {
      el.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    }
  };
  const handleScrollToContact = () => {
    const el = document.getElementById("kontakt");
    if (el) {
      el.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    }
  };
  if (isLoading) {
    return <div className="w-full flex flex-col min-h-screen bg-background text-foreground items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-amber-800 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-sm text-muted-foreground font-serif">Načítání pekárny Kus Koláče...</p>
      </div>;
  }
  if (!businessFacts && pastryItems.length === 0 && instagramPosts.length === 0 && openingHours.length === 0) {
    return <div className="w-full flex flex-col min-h-screen bg-background text-foreground items-center justify-center p-8 text-center">
        <div className="max-w-md space-y-3">
          <h1 className="text-2xl font-serif font-bold text-foreground">Kus Koláče</h1>
          <p className="text-muted-foreground text-sm">
            Informace o pekárně momentálně nejsou k dispozici. Zkuste to prosím později.
          </p>
        </div>
      </div>;
  }
  return <main id="main-content" className="w-full flex flex-col min-h-screen bg-background text-foreground"><RevealOnScroll>
      {/* 1. Hero Section */}
      <Hero onScrollToShowcase={handleScrollToShowcase} onScrollToContact={handleScrollToContact} kolacStampUrl="https://www.autocoder.cc/background/zaki_prod/user_upload/509d2769238b4984be5a456152d86f91.jpg" businessFacts={businessFacts} cmsConfig={cmsConfig} />

      {/* 2. Pastry Showcase Section */}
      {(!cmsConfig || cmsConfig.isShowcaseVisible) && <PastryShowcase items={pastryItems} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} activePastryModal={activePastryModal} onOpenModal={item => setActivePastryModal(item)} onCloseModal={() => setActivePastryModal(null)} cmsConfig={cmsConfig} />}

      {/* 3. Story & Craft Philosophy Section */}
      {(!cmsConfig || cmsConfig.isStoryVisible) && <Story cmsConfig={cmsConfig} />}

      {/* 4. Instagram Feed Section */}
      {(!cmsConfig || cmsConfig.isInstagramVisible) && <InstagramFeed posts={instagramPosts} />}

      {/* 5. Verified Contacts, Operations & Map Section */}
      {(!cmsConfig || cmsConfig.isContactVisible) && businessFacts && <ContactMap businessFacts={businessFacts} schedule={openingHours} />}
    </RevealOnScroll></main>;
}
