"use client";

import React, { useState, useEffect } from "react";
import { InstagramConfig, InstagramPost, PostFormData, PostOriginFilter, PostFeaturedFilter } from "@/backend/types/AdminInstagramIntegration";
import { getInstagramIntegrationData, updateInstagramConfig, triggerInstagramSync, toggleFeaturedPost, deleteInstagramPost, upsertInstagramPost } from "@/backend/actions/AdminInstagramIntegration";
import ConfigPanel from "@/backend/components/AdminInstagramIntegration/ConfigPanel";
import PostTable from "@/backend/components/AdminInstagramIntegration/PostTable";
import PostEditorForm from "@/backend/components/AdminInstagramIntegration/PostEditorForm";
import StatsAndMetrics from "@/backend/components/AdminInstagramIntegration/StatsAndMetrics";
import FallbackBanner from "@/backend/components/AdminInstagramIntegration/FallbackBanner";
const BAKERY_ASSET_URL = "https://www.autocoder.cc/background/zaki_prod/user_upload/0f449e57ada54f46b56f71df18d0ab10.jpg";
export default function AdminInstagramIntegrationPage() {
  const [config, setConfig] = useState<InstagramConfig | null>(null);
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [originFilter, setOriginFilter] = useState<PostOriginFilter>("ALL");
  const [featuredFilter, setFeaturedFilter] = useState<PostFeaturedFilter>("ALL");
  const [editingPost, setEditingPost] = useState<InstagramPost | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getInstagramIntegrationData().then(data => {
      if (isMounted && data) {
        setConfig(data.config);
        setPosts(data.posts || []);
      }
    }).catch(err => {
      console.error("Chyba při načítání integrace Instagramu:", err);
    }).finally(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
  const handleSaveConfig = async (updated: InstagramConfig) => {
    try {
      const saved = await updateInstagramConfig({
        accountHandle: updated.accountHandle,
        syncStatus: updated.syncStatus,
        autoSync: updated.autoSync,
        feedMode: updated.feedMode
      });
      setConfig(saved);
    } catch (err) {
      console.error("Chyba při ukládání konfigurace Instagramu:", err);
    }
  };
  const handleTriggerSync = async () => {
    setIsSyncing(true);
    try {
      const refreshed = await triggerInstagramSync();
      if (refreshed) {
        setConfig(refreshed.config);
        setPosts(refreshed.posts || []);
      }
    } catch (err) {
      console.error("Chyba při synchronizaci Instagramu:", err);
    } finally {
      setIsSyncing(false);
    }
  };
  const handleToggleFeatured = async (postId: string) => {
    try {
      const updatedPosts = await toggleFeaturedPost(postId);
      setPosts(updatedPosts);
    } catch (err) {
      console.error("Chyba při změně zvýrazněného příspěvku:", err);
    }
  };
  const handleDeletePost = async (postId: string) => {
    if (confirm("Opravdu si přejete odebrat tento příspěvek z Instagram feedu?")) {
      try {
        await deleteInstagramPost(postId);
        setPosts(prev => prev.filter(p => p.id !== postId));
        if (editingPost?.id === postId) {
          setEditingPost(null);
        }
      } catch (err) {
        console.error("Chyba při odstraňování příspěvku:", err);
      }
    }
  };
  const handleSavePost = async (data: PostFormData) => {
    try {
      const saved = await upsertInstagramPost({
        id: data.id,
        caption: data.caption,
        photoKey: data.photoKey,
        postUrl: data.postUrl,
        publishedLabel: data.publishedLabel,
        likesCount: data.likesCount,
        isFeatured: data.isFeatured,
        isFromApi: data.isFromApi
      });
      setPosts(prev => {
        if (data.id) {
          return prev.map((p, index) => p.id === data.id ? saved : p);
        }
        return [saved, ...prev];
      });
      setEditingPost(null);
    } catch (err) {
      console.error("Chyba při ukládání příspěvku:", err);
    }
  };
  if (isLoading && !config) {
    return <div className="w-full min-h-[60vh] flex items-center justify-center p-6 text-stone-500">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Načítání konfigurace Instagramu...</p>
        </div>
      </div>;
  }
  if (!config) {
    return <div className="w-full min-h-[60vh] flex items-center justify-center p-6 text-stone-500">
        <div className="text-center">
          <p className="text-base font-medium text-stone-700">Integrace Instagramu nebyla nalezena</p>
          <p className="text-sm text-stone-500 mt-1">Zkuste prosím obnovit stránku nebo zkontrolovat připojení k databázi.</p>
        </div>
      </div>;
  }
  return <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6 flex flex-col gap-5">
      {/* 1. Horní metrický a stavový blok */}
      <StatsAndMetrics config={config} posts={posts} onTriggerSync={handleTriggerSync} isSyncing={isSyncing} />

      {/* 2. Informační pruh pro FALLBACK vs. API režim */}
      <FallbackBanner feedMode={config.feedMode} accountHandle={config.accountHandle} />

      {/* 3. Hlavní pracovní plocha: Rozdělení na hlavní tabulku (68%) a boční integrované centrum (32%) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Levé hlavní křídlo: Tabulka a správa příspěvků */}
        <section className="min-w-0 xl:col-span-8 flex flex-col gap-4">
          <PostTable posts={posts} originFilter={originFilter} onOriginFilterChange={setOriginFilter} featuredFilter={featuredFilter} onFeaturedFilterChange={setFeaturedFilter} onToggleFeatured={handleToggleFeatured} onDeletePost={handleDeletePost} onEditPost={p => setEditingPost(p)} currentlyEditingId={editingPost?.id} />
        </section>

        {/* Pravé křídlo: Konfigurace Instagramu + Integrovaný editor příspěvku */}
        <aside className="min-w-0 xl:col-span-4 flex flex-col gap-5">
          {/* Konfigurace integrace */}
          <ConfigPanel config={config} onSaveConfig={handleSaveConfig} onTriggerSync={handleTriggerSync} isSyncing={isSyncing} officialAvatarUrl={BAKERY_ASSET_URL} />

          {/* Editor příspěvků (vytvoření / úprava) */}
          <PostEditorForm editingPost={editingPost} onSave={handleSavePost} onCancel={() => setEditingPost(null)} defaultBakeryPhotoUrl={BAKERY_ASSET_URL} />
        </aside>
      </div>
    </div>;
}
