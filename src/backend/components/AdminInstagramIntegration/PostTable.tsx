"use client";

import React from "react";
import { InstagramPost, PostOriginFilter, PostFeaturedFilter } from "@/backend/types/AdminInstagramIntegration";
import { Filter, Star, Heart, ExternalLink, Trash2, Edit3, CloudDownload, PenTool, Calendar, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface PostTableProps {
  posts: InstagramPost[];
  originFilter: PostOriginFilter;
  onOriginFilterChange: (val: PostOriginFilter) => void;
  featuredFilter: PostFeaturedFilter;
  onFeaturedFilterChange: (val: PostFeaturedFilter) => void;
  onToggleFeatured: (postId: string) => void;
  onDeletePost: (postId: string) => void;
  onEditPost: (post: InstagramPost) => void;
  currentlyEditingId?: string | null;
}
export default function PostTable({
  posts = [],
  originFilter,
  onOriginFilterChange,
  featuredFilter,
  onFeaturedFilterChange,
  onToggleFeatured,
  onDeletePost,
  onEditPost,
  currentlyEditingId
}: PostTableProps) {
  // Filtrování příspěvků
  const filteredPosts = (posts || []).filter(post => {
    if (originFilter === "API" && !post.isFromApi) return false;
    if (originFilter === "MANUAL" && post.isFromApi) return false;
    if (featuredFilter === "FEATURED" && !post.isFeatured) return false;
    if (featuredFilter === "STANDARD" && post.isFeatured) return false;
    return true;
  });
  return <div className="bg-card text-card-foreground rounded-lg border border-border flex flex-col shadow-sm overflow-hidden" data-controller-name="Tabulka a správa příspěvků Instagramu" data-api-unique-id='posttable-ra0c0007b1b09a585-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
      {/* Hlavička a filtrační nástrojová lišta */}
      <div className="p-4 border-b border-border flex flex-col gap-3" data-api-unique-id='posttable-r052fd547fbdcfb41-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2" data-api-unique-id='posttable-rbbfcd4d9c8afd15a-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
          <div data-api-unique-id='posttable-r375684be8a7d6e4b-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2" data-api-unique-id='posttable-r2479bff505012155-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
              <span data-api-unique-id='posttable-r8626444ed26326cf-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Příspěvky výkladního Instagram feedu</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-muted text-muted-foreground font-mono" data-api-unique-id='posttable-rebea822602a54311-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
                {filteredPosts.length} z {posts.length}
              </span>
            </h3>
            <p className="text-xs text-muted-foreground" data-api-unique-id='posttable-r71f94b44de98e223-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
              Přehled ranních výpeků, fotografií, zapojení návštěvníků a hlavních poutačů
            </p>
          </div>

          <div className="flex items-center gap-2" data-api-unique-id='posttable-r77e5f7f2c9c8ab86-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
            <span className="text-[11px] text-muted-foreground hidden sm:inline" data-api-unique-id='posttable-rd742eeb2766e0e6d-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
              Řazení: Nejnovější výpeky
            </span>
          </div>
        </div>

        {/* Filtrační prvky s shadcn Select */}
        <div className="flex flex-wrap items-center gap-2 pt-1" data-api-unique-id='posttable-r24db88c914a4216b-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0" data-api-unique-id='posttable-r1cc6152d06e72317-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
            <Filter className="w-3.5 h-3.5" data-api-unique-id='posttable-r46764ee1be429e6a-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' />
            <span data-api-unique-id='posttable-r61d9a80307de38bb-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Filtrovat:</span>
          </div>

          {/* Filtr původu */}
          <div className="w-[170px]" data-api-unique-id='posttable-rcbe7c75bbfcb4dc7-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
            <Select value={originFilter} onValueChange={(val: PostOriginFilter) => onOriginFilterChange(val)} data-api-unique-id='posttable-rcf1571ec716b6500-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
              <SelectTrigger size="sm" className="w-full h-8 text-xs bg-background" data-api-unique-id='posttable-r34d6cf1461aa434e-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
                <SelectValue placeholder="Původ příspěvku" data-api-unique-id='posttable-r445bbdab62825858-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' />
              </SelectTrigger>
              <SelectContent data-api-unique-id='posttable-r4dfe026f40d66d60-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
                <SelectItem value="ALL" data-api-unique-id='posttable-rfaefefaf76cd8f56-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Všechny původy</SelectItem>
                <SelectItem value="API" data-api-unique-id='posttable-rfe8a53e6082c23cd-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Pouze z Meta API</SelectItem>
                <SelectItem value="MANUAL" data-api-unique-id='posttable-r7c68fa1644bea8a1-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Pouze ručně vložené</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtr zvýraznění */}
          <div className="w-[170px]" data-api-unique-id='posttable-r9a9cf4d25535fa70-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
            <Select value={featuredFilter} onValueChange={(val: PostFeaturedFilter) => onFeaturedFilterChange(val)} data-api-unique-id='posttable-r593f0ccf83b72e33-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
              <SelectTrigger size="sm" className="w-full h-8 text-xs bg-background" data-api-unique-id='posttable-r8e0dbcd3b3ff0e79-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
                <SelectValue placeholder="Zvýraznění feedu" data-api-unique-id='posttable-r6b22048e29a4a63a-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' />
              </SelectTrigger>
              <SelectContent data-api-unique-id='posttable-rf620324d9d0a0b93-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
                <SelectItem value="ALL" data-api-unique-id='posttable-r2426d3fd3e33637e-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Všechny stavy</SelectItem>
                <SelectItem value="FEATURED" data-api-unique-id='posttable-r7061cd287ea2ace3-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Pouze zvýrazněné (★)</SelectItem>
                <SelectItem value="STANDARD" data-api-unique-id='posttable-r32aa5bec055f8f01-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Běžné položky</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(originFilter !== "ALL" || featuredFilter !== "ALL") && <button type="button" onClick={() => {
          onOriginFilterChange("ALL");
          onFeaturedFilterChange("ALL");
        }} className="text-xs text-primary hover:underline px-2 py-1" data-api-unique-id='posttable-r560277d5599b4687-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
              Resetovat filtry
            </button>}
        </div>
      </div>

      {/* Samotná tabulka s pevnou ochranou proti zúžení a bočním posuvem */}
      <div className="w-full max-w-full min-w-0 overflow-x-auto" data-api-unique-id='posttable-r25e86a71e783268d-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
        <table className="w-full min-w-[840px] text-left text-xs border-collapse" data-api-unique-id='posttable-r72f93899f28a1039-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
          <thead data-api-unique-id='posttable-r075fb43ed6aff594-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
            <tr className="border-b border-border bg-muted/60 text-muted-foreground font-medium" data-api-unique-id='posttable-r7b36c1336940235f-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
              <th className="py-2.5 px-3 w-[70px] whitespace-nowrap" data-api-unique-id='posttable-r1ff493d8978e1f9c-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Náhled</th>
              <th className="py-2.5 px-3 min-w-[240px]" data-api-unique-id='posttable-r35e06c563e92714e-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Popisek ranního výpeku</th>
              <th className="py-2.5 px-3 w-[140px] whitespace-nowrap" data-api-unique-id='posttable-r18ad3ca38ef86457-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Čas publikace</th>
              <th className="py-2.5 px-3 w-[110px] whitespace-nowrap" data-api-unique-id='posttable-r5c0f6e5bb4705279-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Líbí se mi</th>
              <th className="py-2.5 px-3 w-[130px] whitespace-nowrap" data-api-unique-id='posttable-r341bbe225cc77905-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Původ (API / Ručně)</th>
              <th className="py-2.5 px-3 w-[110px] whitespace-nowrap text-center" data-api-unique-id='posttable-r420b1c3ce7480378-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Zvýrazněno</th>
              <th className="py-2.5 px-3 w-[100px] whitespace-nowrap text-right" data-api-unique-id='posttable-r31c3fedf6a506ed8-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Akce</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border" data-api-unique-id='posttable-r6eb93760fab0f4c7-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
            {filteredPosts.length === 0 ? <tr data-api-unique-id='posttable-r32fc1ea667ac1c3b-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
                <td colSpan={7} className="py-8 text-center text-muted-foreground" data-api-unique-id='posttable-raae32f82aa50b0ff-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
                  <div className="flex flex-col items-center justify-center gap-1.5" data-api-unique-id='posttable-r64c6f07f84e6a514-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
                    <AlertCircle className="w-5 h-5 text-muted-foreground opacity-60" data-api-unique-id='posttable-rbb06282a201b5294-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' />
                    <p className="text-sm font-medium text-foreground" data-api-unique-id='posttable-r0d1cad19392a3e62-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Žádné příspěvky neodpovídají filtrům</p>
                    <p className="text-xs text-muted-foreground" data-api-unique-id='posttable-r3dce0f5bcab06178-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Zkuste upravit výběr původu nebo stavu zvýraznění.</p>
                  </div>
                </td>
              </tr> : filteredPosts.map((post, index) => {
            const isSelectedForEdit = currentlyEditingId === post.id;
            return <tr key={post.id} className={`transition-colors hover:bg-muted/40 ${isSelectedForEdit ? "bg-primary/10" : ""}`} data-api-unique-id='posttable-r6ae2a40ecc9353a1-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                    {/* Náhled fotografie */}
                    <td className="py-2.5 px-3 align-middle" data-api-unique-id='posttable-rc4f10c6119de493f-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                      <div className="relative w-11 h-11 rounded-md overflow-hidden border border-border bg-muted shrink-0 group" data-api-unique-id='posttable-r4f2a2f3f204808ce-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                        <img src={post.photoKey} alt={post.caption.slice(0, 20)} className="w-full h-full object-cover transition-transform group-hover:scale-105" data-api-unique-id='posttable-re683e294b3e03194-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1' />
                        {post.isFeatured && <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-warning text-warning-foreground rounded-full flex items-center justify-center p-0.5 shadow-sm" data-api-unique-id='posttable-r9d374a709ecb5b7f-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                            <Star className="w-2 h-2 fill-current" data-api-unique-id='posttable-r21c5319826977a13-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1' />
                          </span>}
                      </div>
                    </td>

                    {/* Popisek & Odkaz */}
                    <td className="py-2.5 px-3 align-middle" data-api-unique-id='posttable-r9545a92d9db70ade-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                      <div className="flex flex-col gap-1 min-w-0 pr-2" data-api-unique-id='posttable-rc4eb26c375633b13-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                        <p className="text-xs text-foreground font-medium line-clamp-2 leading-relaxed" data-api-unique-id='posttable-r0c5d34f1b0f77955-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1' data-api-bind-info={`filteredPosts-${index}-caption`} data-api-map-var-name='post'>
                          {post.caption}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground" data-api-unique-id='posttable-r51ba5d12142a37eb-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                          <a href={post.postUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline hover:text-primary-hover font-mono" data-api-unique-id='posttable-r94fe7fb410ee2226-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                            <span data-api-unique-id='posttable-r00b825459f594b61-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>Otevřít na Instagramu</span>
                            <ExternalLink className="w-3 h-3" data-api-unique-id='posttable-rd7c9bf700f1a738e-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1' />
                          </a>
                        </div>
                      </div>
                    </td>

                    {/* Čas zveřejnění */}
                    <td className="py-2.5 px-3 align-middle whitespace-nowrap text-muted-foreground font-mono" data-api-unique-id='posttable-r2efcb747a8f4587f-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                      <div className="flex items-center gap-1.5" data-api-unique-id='posttable-rab525c7e08f1dab0-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground opacity-70 shrink-0" data-api-unique-id='posttable-r4df84ad345f8362b-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1' />
                        <span data-api-unique-id='posttable-r85643c08ddf72162-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1' data-api-bind-info={`filteredPosts-${index}-publishedLabel`} data-api-map-var-name='post'>{post.publishedLabel}</span>
                      </div>
                    </td>

                    {/* Počet Líbí se mi */}
                    <td className="py-2.5 px-3 align-middle whitespace-nowrap font-mono" data-api-unique-id='posttable-r25600bbcd1ae5aef-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-muted text-foreground" data-api-unique-id='posttable-r7765826d30b94fa6-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                        <Heart className="w-3 h-3 text-destructive fill-destructive" data-api-unique-id='posttable-rf4a43387ccda96bb-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1' />
                        <span data-api-unique-id='posttable-rcc32a674154c9f49-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>{post.likesCount.toLocaleString("cs-CZ")}</span>
                      </div>
                    </td>

                    {/* Původ příspěvku */}
                    <td className="py-2.5 px-3 align-middle whitespace-nowrap" data-api-unique-id='posttable-r7d398df93af35618-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                      {post.isFromApi ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-secondary text-secondary-foreground font-medium" data-api-unique-id='posttable-rb53445c8ba5e7c3a-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                          <CloudDownload className="w-3 h-3 text-primary" data-api-unique-id='posttable-rfcb5b94c8b8abdce-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1' />
                          <span data-api-unique-id='posttable-r58f85f5fb10dbe20-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>Meta API</span>
                        </span> : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-muted text-muted-foreground font-medium" data-api-unique-id='posttable-r13973928f194685c-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                          <PenTool className="w-3 h-3 text-foreground" data-api-unique-id='posttable-rc675dccfb7beed6d-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1' />
                          <span data-api-unique-id='posttable-r0637c7d61b964beb-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>Ručně vložen</span>
                        </span>}
                    </td>

                    {/* Přepínač zvýraznění (isFeatured) */}
                    <td className="py-2.5 px-3 align-middle text-center whitespace-nowrap" data-api-unique-id='posttable-r2e5dfbdac3f429f5-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                      <button type="button" onClick={() => onToggleFeatured(post.id)} title={post.isFeatured ? "Zrušit zvýraznění" : "Nastavit jako hlavní výpek"} className={`inline-flex items-center justify-center p-1.5 rounded-md transition-colors ${post.isFeatured ? "bg-warning/20 text-warning hover:bg-warning/30" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`} data-api-unique-id='posttable-ree2ca63e555ae0b3-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                        <Star className={`w-4 h-4 ${post.isFeatured ? "fill-warning text-warning" : ""}`} data-api-unique-id='posttable-r1464125f33cbb599-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1' />
                      </button>
                    </td>

                    {/* Akce úpravy a smazání */}
                    <td className="py-2.5 px-3 align-middle text-right whitespace-nowrap" data-api-unique-id='posttable-r0010e081ce21f06c-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                      <div className="inline-flex items-center gap-1 justify-end" data-api-unique-id='posttable-r8a5ac34680fff9e3-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                        <button type="button" onClick={() => onEditPost(post)} title="Upravit příspěvek" className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" data-api-unique-id='posttable-r3058bffaf5096bc5-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                          <Edit3 className="w-3.5 h-3.5" data-api-unique-id='posttable-r8111b377fbe3c73d-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1' />
                        </button>
                        <button type="button" onClick={() => onDeletePost(post.id)} title="Smazat příspěvek z feedu" className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors" data-api-unique-id='posttable-r74294f4ad745478e-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1'>
                          <Trash2 className="w-3.5 h-3.5" data-api-unique-id='posttable-r011182f416991590-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' data-api-in-loop='1' />
                        </button>
                      </div>
                    </td>
                  </tr>;
          })}
          </tbody>
        </table>
      </div>

      {/* Patička tabulky s legendou */}
      <div className="p-3 bg-muted/40 border-t border-border flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground" data-api-unique-id='posttable-r07f9cdb43d54fb39-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
        <div className="flex items-center gap-4" data-api-unique-id='posttable-r68f713fd8b0ac3e8-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
          <span className="flex items-center gap-1.5" data-api-unique-id='posttable-r7a986f0bab8c9aec-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
            <span className="w-2 h-2 rounded-full bg-warning inline-block" data-api-unique-id='posttable-r6734f89634cfd2d5-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' />
            Zvýrazněný příspěvek (hlavní vizuální poutač na domovské stránce pekárny)
          </span>
          <span className="flex items-center gap-1.5" data-api-unique-id='posttable-r8cb823b1fd40818d-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>
            <span className="w-2 h-2 rounded-full bg-primary inline-block" data-api-unique-id='posttable-rbb98c8166824dbe2-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable' />
            Automatická synchronizace z Meta Graph API
          </span>
        </div>
        <span data-api-unique-id='posttable-rd9750d670f54cd96-s434323245' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/PostTable'>Celkem ve feedu: {posts.length} záznamů</span>
      </div>
    </div>;
}