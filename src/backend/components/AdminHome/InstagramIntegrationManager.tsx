"use client";

import React, { useState } from "react";
import EditableImg from "@/@base/EditableImg";
import { generatedImagesByFilename, type GeneratedImageFilename } from "@/lib/generated-images/backend-admin_home";
import type { InstagramFeedMode, InstagramSyncStatus } from "@/backend/types/AdminHome";
import { Instagram, RefreshCw, ExternalLink, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
export interface InstagramConfig {
  id: string;
  accountHandle: string;
  syncStatus: InstagramSyncStatus;
  autoSync: boolean;
  feedMode: InstagramFeedMode;
  lastSyncAt: string;
}
export interface InstagramPost {
  id: string;
  caption: string;
  photoKey: GeneratedImageFilename | string;
  photoUrl?: string;
  postUrl: string;
  publishedLabel: string;
  likesCount: number;
  isFeatured: boolean;
  isFromApi: boolean;
}
export interface InstagramIntegrationManagerProps {
  config: InstagramConfig;
  posts: InstagramPost[];
  onToggleFeedMode: (mode: InstagramFeedMode) => void;
  onToggleAutoSync: () => void;
  onManualSync: () => void;
  onAddPost: (post: Omit<InstagramPost, "id" | "isFromApi">) => void;
  onDeletePost: (id: string) => void;
}
export default function InstagramIntegrationManager({
  config,
  posts,
  onToggleFeedMode,
  onToggleAutoSync,
  onManualSync,
  onAddPost,
  onDeletePost
}: InstagramIntegrationManagerProps) {
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Formulář pro nový ruční příspěvek
  const [caption, setCaption] = useState("");
  const [postUrl, setPostUrl] = useState("https://instagram.com/p/C-kuskolace");
  const [photoKey, setPhotoKey] = useState<GeneratedImageFilename>("ig-ranni-vune");
  const [publishedLabel, setPublishedLabel] = useState("Před 1 hodinou");
  const handleManualSyncClick = async () => {
    setIsSyncing(true);
    try {
      await Promise.resolve(onManualSync());
    } finally {
      setTimeout(() => {
        setIsSyncing(false);
      }, 500);
    }
  };
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) {
      toast.error("Vyplňte popisek příspěvku");
      return;
    }
    onAddPost({
      caption: caption.trim(),
      photoKey,
      postUrl: postUrl.trim() || "https://instagram.com/kuskolace",
      publishedLabel: publishedLabel.trim() || "Dnes ráno",
      likesCount: Math.floor(Math.random() * 200) + 250,
      isFeatured: false
    });
    setIsAddPostOpen(false);
    setCaption("");
    toast.success("Příspěvek byl přidán do záložního feedu");
  };
  const displayPosts = posts || [];
  return <div data-controller-name="Správa Instagram integrace" className="flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm" data-api-unique-id='instagramintegrationmanager-r3952c78cb6c25217-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
      <p role="status" className="rounded-md border border-warning/40 bg-warning/10 p-3 text-sm">Instagram API není připojeno. Web zobrazuje ručně vybrané fotografie. Automatické aktualizace nejsou aktivní.</p>
      {/* Hlavička modulu */}
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between" data-api-unique-id='instagramintegrationmanager-r71039d15756d9045-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
        <div className="min-w-0" data-api-unique-id='instagramintegrationmanager-re1c54c69c29ef929-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
          <div className="flex items-center gap-2" data-api-unique-id='instagramintegrationmanager-ree7720ce5b392bd5-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
            <Instagram className="h-5 w-5 text-foreground shrink-0" data-api-unique-id='instagramintegrationmanager-r747007d3ab456efe-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' />
            <h2 className="font-header text-base font-semibold tracking-tight text-foreground sm:text-lg" data-api-unique-id='instagramintegrationmanager-rc1eff7a2cd171488-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
              Instagram feed {config.accountHandle}
            </h2>
            <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${config.syncStatus === "AUTORIZOVANO" ? "bg-success text-success-foreground" : config.syncStatus === "NAHLEDOVY_REZIM" ? "bg-info text-info-foreground" : "bg-warning text-warning-foreground"}`} data-api-unique-id='instagramintegrationmanager-r0c513a3ad92fbedd-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
              {config.syncStatus === "AUTORIZOVANO" ? "Aktivní Graph API" : config.syncStatus === "NAHLEDOVY_REZIM" ? "Náhledový režim" : "Nepropojeno"}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm" data-api-unique-id='instagramintegrationmanager-r62baf536b86e2d3c-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
            Diagnostika Meta Graph API a přepínání mezi automatickým odběrem a záložní galerií
          </p>
        </div>

        {/* Přepínač API vs Ruční záloha */}
        <div className="inline-flex shrink-0 items-center rounded-md border border-border bg-background p-1 text-xs" data-api-unique-id='instagramintegrationmanager-rdc9852be9dcbefd1-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
          <button type="button" onClick={() => onToggleFeedMode("API")} className={`rounded px-2.5 py-1 font-medium transition-colors ${config.feedMode === "API" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`} data-api-unique-id='instagramintegrationmanager-rb4f75a6bd30f7eee-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
            Automatické API
          </button>
          <button type="button" onClick={() => onToggleFeedMode("FALLBACK")} className={`rounded px-2.5 py-1 font-medium transition-colors ${config.feedMode === "FALLBACK" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`} data-api-unique-id='instagramintegrationmanager-r76e787b33a2af9bc-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
            Záložní feed ({displayPosts.length})
          </button>
        </div>
      </div>

      {/* Stavový pás a ovládací akce API */}
      <div className="rounded-md border border-border bg-background p-3" data-api-unique-id='instagramintegrationmanager-rd83e4a5257451dfe-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
        <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between" data-api-unique-id='instagramintegrationmanager-rce82af4c5eb7642e-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
          <div className="min-w-0 flex-1" data-api-unique-id='instagramintegrationmanager-r640926441a4c5180-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
            <div className="flex flex-wrap items-center gap-2 text-xs" data-api-unique-id='instagramintegrationmanager-raace69527498c970-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
              <span className="font-semibold text-foreground" data-api-unique-id='instagramintegrationmanager-r1c928b0453e441b0-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                Účet: {config.accountHandle}
              </span>
              <span className="text-muted-foreground" data-api-unique-id='instagramintegrationmanager-r9892d01b4cf9d2c4-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>•</span>
              <span className="text-muted-foreground" data-api-unique-id='instagramintegrationmanager-r7a30bda0bb9f0164-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                Poslední synchronizace: {config.lastSyncAt || "Zatím neproběhla"}
              </span>
              <span className="text-muted-foreground" data-api-unique-id='instagramintegrationmanager-r6f88285599dfed3c-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>•</span>
              <span className="inline-flex items-center gap-1" data-api-unique-id='instagramintegrationmanager-r9068d46a19d3d15d-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                <span className="text-muted-foreground" data-api-unique-id='instagramintegrationmanager-rc1fbbd5e6b86ec8a-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>Auto-sync:</span>
                <button type="button" onClick={onToggleAutoSync} className={`inline-flex items-center rounded px-1.5 py-0.5 font-medium text-[11px] ${config.autoSync ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`} data-api-unique-id='instagramintegrationmanager-r0f1726e02cb114c8-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                  {config.autoSync ? "Zapnuto (každých 60 min)" : "Vypnuto"}
                </button>
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground" data-api-unique-id='instagramintegrationmanager-r7a7370f0b4910aea-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
              {config.feedMode === "API" ? "Veřejný web zobrazuje čerstvé ranní fotografie přímo ze sociální sítě @kuskolace." : "Aktivní záložní režim: Návštěvníkům se zobrazují garantované fotografie pečení z místní databáze."}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2" data-api-unique-id='instagramintegrationmanager-r9b6a643d4272d8fe-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
            <button type="button" onClick={handleManualSyncClick} disabled={isSyncing} className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground shadow-xs hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50" data-api-unique-id='instagramintegrationmanager-r729f76df7875faf6-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} data-api-unique-id='instagramintegrationmanager-r4a1cf028ed364918-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' />
              <span data-api-unique-id='instagramintegrationmanager-r62863b0313e53a15-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>{isSyncing ? "Synchronizuji..." : "Ruční synchronizace"}</span>
            </button>

            <button type="button" onClick={() => setIsAddPostOpen(true)} className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-card-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" data-api-unique-id='instagramintegrationmanager-ra3d7044d356912e5-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
              <Plus className="h-3.5 w-3.5" data-api-unique-id='instagramintegrationmanager-rb94cecbb000c517c-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' />
              <span data-api-unique-id='instagramintegrationmanager-rea472846e0e048a8-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>Přidat post do feedu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Přehled příspěvků záložního/aktuálního feedu */}
      <div className="flex min-w-0 flex-col gap-2" data-api-unique-id='instagramintegrationmanager-r1989e540c62d537b-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
        <div className="flex items-center justify-between text-xs text-muted-foreground" data-api-unique-id='instagramintegrationmanager-rf88b2c80394c6559-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
          <span data-api-unique-id='instagramintegrationmanager-rc011b9c39c87946a-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>Obsah feedu pro veřejný web ({displayPosts.length} příspěvků)</span>
          <span data-api-unique-id='instagramintegrationmanager-re30d104c45b43514-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>Kliknutím na odkaz otevřete autentický post na Instagramu</span>
        </div>

        {displayPosts.length === 0 ? <div className="rounded-md border border-dashed border-border p-6 text-center text-xs text-muted-foreground" data-api-unique-id='instagramintegrationmanager-r7624840e0a1923da-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
            V záložním feedu zatím nejsou žádné příspěvky.
          </div> : <div className="grid min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3" data-api-unique-id='instagramintegrationmanager-r4f8c0efc93a5b8d4-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
            {displayPosts.map((post, index) => {
          const imageSrc = post.photoUrl || (generatedImagesByFilename as Record<string, string>)[post.photoKey] || post.photoKey || generatedImagesByFilename["ig-ranni-vune"];
          return <div key={post.id} className="flex min-w-0 flex-col justify-between rounded-md border border-border bg-background p-2.5 text-xs shadow-xs" data-api-unique-id='instagramintegrationmanager-re6fbb7de15f148c5-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' data-api-in-loop='1'>
                  <div className="flex gap-2.5" data-api-unique-id='instagramintegrationmanager-r1ff7c97e7074fcae-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' data-api-in-loop='1'>
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-muted" data-api-unique-id='instagramintegrationmanager-r614a0f1245a5db54-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' data-api-in-loop='1'>
                      <EditableImg propKey={`ig-post-img-${post.id}`} src={imageSrc} alt={post.caption} className="h-full w-full object-cover" data-api-unique-id='instagramintegrationmanager-re365a7e77a618b6b-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' data-api-in-loop='1' />
                    </div>
                    <div className="min-w-0 flex-1" data-api-unique-id='instagramintegrationmanager-rbb3f1fb6e13001d4-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' data-api-in-loop='1'>
                      <p className="line-clamp-2 text-xs font-medium text-foreground" data-api-unique-id='instagramintegrationmanager-r553398d0171774ca-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' data-api-in-loop='1' data-api-bind-info={`displayPosts-${index}-caption`} data-api-map-var-name='post'>
                        {post.caption}
                      </p>
                      <p className="mt-1 text-[11px] text-muted-foreground" data-api-unique-id='instagramintegrationmanager-r5a412eb313fe2877-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' data-api-in-loop='1' data-api-bind-info={`displayPosts-${index}-publishedLabel`} data-api-map-var-name='post'>
                        {post.publishedLabel} • {post.likesCount} to se líbí
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between border-t border-border/60 pt-2 text-[11px]" data-api-unique-id='instagramintegrationmanager-rfce6e30c52ee0367-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' data-api-in-loop='1'>
                    <a href={post.postUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline font-medium" data-api-unique-id='instagramintegrationmanager-ra19aace7842ca740-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' data-api-in-loop='1'>
                      <span data-api-unique-id='instagramintegrationmanager-rb57a03bb8a2690f5-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' data-api-in-loop='1'>Zobrazit na IG</span>
                      <ExternalLink className="h-3 w-3" data-api-unique-id='instagramintegrationmanager-rc19c34a5d5564ab5-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' data-api-in-loop='1' />
                    </a>

                    <button type="button" onClick={() => onDeletePost(post.id)} className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none" title="Odebrat příspěvek z feedu" data-api-unique-id='instagramintegrationmanager-r54f25e94a4628eb9-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' data-api-in-loop='1'>
                      <Trash2 className="h-3.5 w-3.5" data-api-unique-id='instagramintegrationmanager-r2821225fa8fa89d9-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' data-api-in-loop='1' />
                    </button>
                  </div>
                </div>;
        })}
          </div>}
      </div>

      {/* Dialog pro přidání příspěvku do feedu */}
      <Dialog open={isAddPostOpen} onOpenChange={setIsAddPostOpen} data-api-unique-id='instagramintegrationmanager-r9d14b6a592b53eca-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
        <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-md" data-api-unique-id='instagramintegrationmanager-rae7b0ec5991516cc-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
          <DialogHeader data-api-unique-id='instagramintegrationmanager-r9f7d7506de12c69f-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
            <DialogTitle className="font-header text-base text-foreground" data-api-unique-id='instagramintegrationmanager-r887919d0f503cf64-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
              Přidat příspěvek do záložního feedu
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground" data-api-unique-id='instagramintegrationmanager-rf7d71772e23a64be-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
              Vložte fotografii a popisek z Instagramu pekárny @kuskolace.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreatePost} className="space-y-3.5 py-2 text-xs" data-api-unique-id='instagramintegrationmanager-rfc4d805b713799d6-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
            <div data-api-unique-id='instagramintegrationmanager-r6bba6ebc61fe1d8d-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
              <label className="block font-medium text-foreground mb-1" data-api-unique-id='instagramintegrationmanager-rb1653c8de3b694d8-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                Popisek příspěvku *
              </label>
              <textarea value={caption} onChange={e => setCaption(e.target.value)} rows={2} placeholder="Ranní borůvkový plech právě vytažený z pece na Korunní 90..." className="w-full rounded-md border border-border bg-background p-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required data-api-unique-id='instagramintegrationmanager-r4b155359e67103d6-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' />
            </div>

            <div className="grid grid-cols-2 gap-3" data-api-unique-id='instagramintegrationmanager-r2b627718feaf5e06-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
              <div data-api-unique-id='instagramintegrationmanager-rdb27bc7c265ac39e-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                <label className="block font-medium text-foreground mb-1" data-api-unique-id='instagramintegrationmanager-r14e987e57e1f7319-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                  Pekařská fotografie *
                </label>
                <Select value={photoKey} onValueChange={val => setPhotoKey(val as GeneratedImageFilename)} data-api-unique-id='instagramintegrationmanager-re5906d8ca66a159e-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                  <SelectTrigger className="h-8 w-full" data-api-unique-id='instagramintegrationmanager-rfb8fa44463c60726-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                    <SelectValue placeholder="Vyberte snímek" data-api-unique-id='instagramintegrationmanager-rc3317e2b2a2bf506-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                      {photoKey === "ig-ranni-vune" ? "Ranní vůně křídla pekárny" : photoKey === "ig-cerstvy-plech" ? "Čerstvý plech s koláči" : photoKey === "ig-korunni-vyloha" ? "Vinohradská výloha" : photoKey === "kolac-boruvkovy" ? "Detail borůvek" : "Vyberte snímek"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent data-api-unique-id='instagramintegrationmanager-rc3bded60a0e62a72-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                    <SelectItem value="ig-ranni-vune" data-api-unique-id='instagramintegrationmanager-r1a0a94582e8ae5d1-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>Ranní vůně křídla pekárny</SelectItem>
                    <SelectItem value="ig-cerstvy-plech" data-api-unique-id='instagramintegrationmanager-r9759786783de9244-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>Čerstvý plech s koláči</SelectItem>
                    <SelectItem value="ig-korunni-vyloha" data-api-unique-id='instagramintegrationmanager-rf7f21e99ae819e84-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>Vinohradská výloha</SelectItem>
                    <SelectItem value="kolac-boruvkovy" data-api-unique-id='instagramintegrationmanager-rb9fc72fb4a29cbd0-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>Detail borůvek</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div data-api-unique-id='instagramintegrationmanager-r29318ac845808e1e-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                <label className="block font-medium text-foreground mb-1" data-api-unique-id='instagramintegrationmanager-rbf9d6d631f86ccb2-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                  Čas zveřejnění
                </label>
                <input type="text" value={publishedLabel} onChange={e => setPublishedLabel(e.target.value)} placeholder="Před 2 hodinami" className="h-8 w-full rounded-md border border-border bg-background px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='instagramintegrationmanager-r645b3fa843fc86e7-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' />
              </div>
            </div>

            <div data-api-unique-id='instagramintegrationmanager-r358245502f1eaddb-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
              <label className="block font-medium text-foreground mb-1" data-api-unique-id='instagramintegrationmanager-r4e30a1d3522a310c-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                Odkaz na původní post na Instagramu
              </label>
              <input type="url" value={postUrl} onChange={e => setPostUrl(e.target.value)} placeholder="https://instagram.com/p/..." className="h-8 w-full rounded-md border border-border bg-background px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='instagramintegrationmanager-rc70d9a83f8aeb875-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager' />
            </div>

            <DialogFooter className="pt-2" data-api-unique-id='instagramintegrationmanager-r988e182ff1a893fe-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
              <button type="button" onClick={() => setIsAddPostOpen(false)} className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-card-foreground hover:bg-muted" data-api-unique-id='instagramintegrationmanager-r95db60ee0a310e1d-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                Zrušit
              </button>
              <button type="submit" className="rounded-md bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90" data-api-unique-id='instagramintegrationmanager-r4c98216768ddc729-s1353999358' data-api-unique-page-name='src/backend/components/AdminHome/InstagramIntegrationManager'>
                Vložit do feedu
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>;
}