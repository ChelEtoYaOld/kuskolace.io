"use client";

import React, { useState, useRef, useEffect } from "react";
import { PlusCircle, Upload, Image as ImageIcon, Star, Check, X, Heart, AlertCircle } from "lucide-react";
import { InstagramPost, PostFormData } from "@/backend/types/AdminInstagramIntegration";
import { upload_image_file } from "@/tools/tools";
interface PostEditorFormProps {
  editingPost: InstagramPost | null;
  onSave: (data: PostFormData) => void;
  onCancel: () => void;
  defaultBakeryPhotoUrl: string;
}
export default function PostEditorForm({
  editingPost,
  onSave,
  onCancel,
  defaultBakeryPhotoUrl
}: PostEditorFormProps) {
  const [caption, setCaption] = useState(editingPost?.caption || "");
  const [photoKey, setPhotoKey] = useState(editingPost?.photoKey || defaultBakeryPhotoUrl);
  const [postUrl, setPostUrl] = useState(editingPost?.postUrl || "https://www.instagram.com/p/C-example-kuskolace/");
  const [publishedLabel, setPublishedLabel] = useState(editingPost?.publishedLabel || "Dnes ráno, 06:45");
  const [likesCount, setLikesCount] = useState<number>(editingPost?.likesCount ?? 142);
  const [isFeatured, setIsFeatured] = useState<boolean>(editingPost?.isFeatured ?? false);
  const [isFromApi, setIsFromApi] = useState<boolean>(editingPost?.isFromApi ?? false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (editingPost) {
      setCaption(editingPost.caption || "");
      setPhotoKey(editingPost.photoKey || defaultBakeryPhotoUrl);
      setPostUrl(editingPost.postUrl || "https://www.instagram.com/p/C-example-kuskolace/");
      setPublishedLabel(editingPost.publishedLabel || "Dnes ráno, 06:45");
      setLikesCount(editingPost.likesCount ?? 0);
      setIsFeatured(editingPost.isFeatured ?? false);
      setIsFromApi(editingPost.isFromApi ?? false);
    } else {
      setCaption("");
      setPhotoKey(defaultBakeryPhotoUrl);
      setPostUrl("https://www.instagram.com/p/C-example-kuskolace/");
      setPublishedLabel("Dnes ráno, 06:45");
      setLikesCount(142);
      setIsFeatured(false);
      setIsFromApi(false);
    }
    setUploadError(null);
  }, [editingPost, defaultBakeryPhotoUrl]);
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      setUploadError(null);
      const uploadedUrl = await upload_image_file(file);
      if (uploadedUrl) {
        setPhotoKey(uploadedUrl);
      }
    } catch {
      setUploadError("Nahrávání fotografie se nezdařilo. Zkuste to prosím znovu.");
    } finally {
      setIsUploading(false);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) {
      alert("Vyplňte prosím popisek příspěvku.");
      return;
    }
    onSave({
      id: editingPost?.id,
      caption: caption.trim(),
      photoKey: photoKey.trim() || defaultBakeryPhotoUrl,
      postUrl: postUrl.trim() || "https://www.instagram.com/kuskolace",
      publishedLabel: publishedLabel.trim() || "Právě teď",
      likesCount: Math.max(0, Number(likesCount) || 0),
      isFeatured,
      isFromApi
    });
  };
  return <div className="bg-card text-card-foreground rounded-lg border border-border p-4 lg:p-5 flex flex-col gap-4 shadow-sm" data-controller-name="Editor Instagram příspěvku" data-api-unique-id='posteditorform-r5a91f909d96a73a5-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
      <div className="flex items-center justify-between border-b border-border pb-3" data-api-unique-id='posteditorform-r867312a6080c53b1-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
        <div className="flex items-center gap-2" data-api-unique-id='posteditorform-rc3cb2670941c1506-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
          <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0" data-api-unique-id='posteditorform-ra32efb041316c35e-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
            <PlusCircle className="w-4 h-4" data-api-unique-id='posteditorform-r491824367bef5bde-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
          </div>
          <div data-api-unique-id='posteditorform-r976b12c3f83d545e-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
            <h3 className="text-sm font-semibold text-foreground" data-api-unique-id='posteditorform-rd6dc10822db77ead-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
              {editingPost ? "Upravit příspěvek feedu" : "Nový ruční příspěvek (záloha)"}
            </h3>
            <p className="text-[11px] text-muted-foreground" data-api-unique-id='posteditorform-r272c9737f41d9e73-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
              {editingPost ? `Editace záznamu ID: ${editingPost.id.slice(0, 12)}...` : "Vloží nový ranní výpek do záložního i kombinovaného feedu"}
            </p>
          </div>
        </div>

        {editingPost && <button type="button" onClick={onCancel} className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground" title="Zrušit úpravy" data-api-unique-id='posteditorform-ra5bd627380a61308-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
            <X className="w-4 h-4" data-api-unique-id='posteditorform-r6f055b6d1ba0220f-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
          </button>}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" data-api-unique-id='posteditorform-red2a9290555a788d-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
        {/* Popisek příspěvku (caption) */}
        <div className="flex flex-col gap-1.5" data-api-unique-id='posteditorform-rb1ab8dc347fae1eb-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
          <label className="text-xs font-semibold text-card-foreground" data-api-unique-id='posteditorform-r8f8107dafebfd05a-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
            Popisek výpeku / Instagram status (caption) *
          </label>
          <textarea value={caption} onChange={e => setCaption(e.target.value)} rows={3} placeholder="Dnes ráno: Švestkové koláče s mákem a drobenkou čerstvě vytažené z pece..." className="w-full rounded-md border border-input bg-background p-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required data-api-unique-id='posteditorform-re232f94b9bc374b9-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
        </div>

        {/* Fotografie výpeku - nahrání nebo URL */}
        <div className="flex flex-col gap-1.5" data-api-unique-id='posteditorform-rd558d10bb1a244fd-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
          <label className="text-xs font-semibold text-card-foreground" data-api-unique-id='posteditorform-r1c052ae42fae5f81-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
            Fotografie ranního výpeku (photoKey)
          </label>

          <div className="flex items-start gap-3" data-api-unique-id='posteditorform-rc90094a1dcc4bf2a-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
            <div className="w-16 h-16 rounded-md border border-border bg-muted overflow-hidden shrink-0 relative" data-api-unique-id='posteditorform-rf7685e480064af8a-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
              {photoKey ? <img src={photoKey} alt="Náhled" className="w-full h-full object-cover" data-api-unique-id='posteditorform-r72cc42daf324356c-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground" data-api-unique-id='posteditorform-rb2dd52676dfa9d19-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
                  <ImageIcon className="w-6 h-6 opacity-40" data-api-unique-id='posteditorform-r2feb598b1ad82c66-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
                </div>}
              {isUploading && <div className="absolute inset-0 bg-background/80 flex items-center justify-center text-[10px] font-semibold text-foreground" data-api-unique-id='posteditorform-rabd6c806fe6a3e55-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
                  Nahrávám...
                </div>}
            </div>

            <div className="flex-1 flex flex-col gap-2 min-w-0" data-api-unique-id='posteditorform-rcc910edaa0d57603-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
              <div className="flex items-center gap-2" data-api-unique-id='posteditorform-re65dad4799b4a62f-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-background hover:bg-muted text-foreground transition-colors disabled:opacity-50" data-api-unique-id='posteditorform-r7790d042fb98410e-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
                  <Upload className="w-3.5 h-3.5" data-api-unique-id='posteditorform-rff2da2b6fc0fcbb6-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
                  <span data-api-unique-id='posteditorform-r53d6f2512ff7361c-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>Vybrat z počítače</span>
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" data-api-unique-id='posteditorform-r313acf9671153647-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
                <button type="button" onClick={() => setPhotoKey(defaultBakeryPhotoUrl)} className="px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground border border-transparent hover:border-border rounded-md" data-api-unique-id='posteditorform-rba4710cefbece992-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
                  Obnovit výchozí
                </button>
              </div>

              <input type="text" value={photoKey} onChange={e => setPhotoKey(e.target.value)} placeholder="https://... nebo cesta k fotografii" className="w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-mono" data-api-unique-id='posteditorform-r069e470b44fe483e-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
            </div>
          </div>
          {uploadError && <p className="text-[11px] text-destructive flex items-center gap-1" data-api-unique-id='posteditorform-r4cd33523734b4769-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
              <AlertCircle className="w-3.5 h-3.5" data-api-unique-id='posteditorform-r757950878f56da78-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
              {uploadError}
            </p>}
        </div>

        {/* Odkaz na Instagram & Čas zveřejnění */}
        <div className="flex flex-col gap-3" data-api-unique-id='posteditorform-rc3961ab99cb3aa6f-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
          <div className="flex flex-col gap-1.5 min-w-0" data-api-unique-id='posteditorform-r651100ef836fd345-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
            <label className="text-xs font-semibold text-card-foreground" data-api-unique-id='posteditorform-recd9ba26020bac07-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
              Odkaz na původní post (postUrl)
            </label>
            <input type="url" value={postUrl} onChange={e => setPostUrl(e.target.value)} placeholder="https://www.instagram.com/p/..." className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='posteditorform-r5df23b34f968b243-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
          </div>

          <div className="flex flex-col gap-1.5 min-w-0" data-api-unique-id='posteditorform-rb668adda3a9f12e5-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
            <label className="text-xs font-semibold text-card-foreground" data-api-unique-id='posteditorform-r1d3986144be5f99f-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
              Čas zveřejnění (publishedLabel)
            </label>
            <input type="text" value={publishedLabel} onChange={e => setPublishedLabel(e.target.value)} placeholder="např. Před 2 hodinami" className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='posteditorform-r37042f857a9e7e47-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
          </div>
        </div>

        {/* Počet označení To se mi líbí & Přepínače */}
        <div className="flex flex-col gap-3 pt-1 border-t border-border" data-api-unique-id='posteditorform-r2f734dbd0da078c3-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
          <div className="flex flex-col gap-1.5" data-api-unique-id='posteditorform-r1ac301ba284ae7ae-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
            <label className="text-xs font-semibold text-card-foreground flex items-center gap-1.5" data-api-unique-id='posteditorform-r76f3c1f0ba4aa614-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
              <Heart className="w-3.5 h-3.5 text-destructive" data-api-unique-id='posteditorform-re4aa1919899f1864-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
              <span data-api-unique-id='posteditorform-r86e708d07c97fab8-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>Počet To se mi líbí (likesCount)</span>
            </label>
            <input type="number" min="0" value={likesCount} onChange={e => setLikesCount(Number(e.target.value))} className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='posteditorform-r53041f04a9bc7872-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
          </div>

          <div className="flex flex-col gap-2" data-api-unique-id='posteditorform-rc6cb53167cdd6cb1-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
            {/* Příznak zvýrazněného příspěvku (isFeatured) */}
            <label className="flex items-center gap-2 cursor-pointer p-2 rounded-md bg-muted/60 border border-border hover:bg-muted" data-api-unique-id='posteditorform-r9cf1d116adc20a41-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
              <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="w-4 h-4 rounded text-primary focus:ring-primary border-input bg-background" data-api-unique-id='posteditorform-r10831c9759bd6fda-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground" data-api-unique-id='posteditorform-re82bdc00223167ae-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
                <Star className={`w-3.5 h-3.5 ${isFeatured ? "text-warning fill-warning" : "text-muted-foreground"}`} data-api-unique-id='posteditorform-r78e3815df15d2468-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
                <span data-api-unique-id='posteditorform-rf4b840f1c22bc4b7-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>Hlavní zvýrazněný post (is_featured)</span>
              </div>
            </label>

            {/* Příznak původu z API */}
            <label className="flex items-center gap-2 cursor-pointer p-2 rounded-md bg-muted/60 border border-border hover:bg-muted" data-api-unique-id='posteditorform-r337dac601befe587-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
              <input type="checkbox" checked={isFromApi} onChange={e => setIsFromApi(e.target.checked)} className="w-4 h-4 rounded text-primary focus:ring-primary border-input bg-background" data-api-unique-id='posteditorform-r40793187167ff9b1-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
              <span className="text-xs font-medium text-foreground" data-api-unique-id='posteditorform-rf1b0f9ce8d5bc171-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
                Označit jako staženo přes API (is_from_api)
              </span>
            </label>
          </div>
        </div>

        {/* Akční tlačítka */}
        <div className="flex items-center gap-2 pt-2" data-api-unique-id='posteditorform-r913679c40e6dd444-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
          <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='posteditorform-rc2daea367c50919c-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
            <Check className="w-3.5 h-3.5" data-api-unique-id='posteditorform-r0e759c93c44c7fab-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm' />
            {editingPost ? "Uložit změny v příspěvku" : "Vložit příspěvek do feedu"}
          </button>

          {editingPost && <button type="button" onClick={onCancel} className="px-3 py-2 text-xs font-semibold rounded-md border border-border bg-background text-foreground hover:bg-muted transition-colors" data-api-unique-id='posteditorform-r1e9468a1ce5fadfa-s1045076774' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostEditorForm'>
              Zrušit
            </button>}
        </div>
      </form>
    </div>;
}