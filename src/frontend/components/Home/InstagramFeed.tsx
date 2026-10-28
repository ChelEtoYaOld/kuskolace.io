"use client";
import React from "react";
import type { InstagramPost } from "@/frontend/types/Home";
import { Camera, ArrowUpRight } from "lucide-react";
import { curatedInstagramPosts } from "@/frontend/data/curated-instagram";

// Original seeded demo records must not masquerade as imported Instagram posts.
const demoIds = new Set(["c2adc14a-1bf7-4310-a691-ab5424c5d0ac","f7262ced-dda7-460b-a63a-e95466bb6bf1","f4d29172-cb94-4fa0-a356-3904af06d4fa","7869f464-8da7-4b31-ae42-57f5bf53f2b2","4e1d9d17-1546-4615-ac8a-99b08395d578","1764d7fa-5171-460a-a6e5-780947145468"]);
export default function InstagramFeed({ posts = [] }: { posts: InstagramPost[] }) {
  const manualPosts = posts.filter(post => !demoIds.has(post.id) && !post.isFromApi && /^https:\/\/(www\.)?instagram\.com\//.test(post.postUrl));
  const seen = new Set<string>();
  const photos = [...manualPosts.filter(p => p.isFeatured), ...curatedInstagramPosts, ...manualPosts].filter(post => { if (seen.has(post.postUrl)) return false; seen.add(post.postUrl); return true; }).slice(0,6);
  return <section id="instagram" className="bakery-instagram bg-accent text-accent-foreground">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bakery-instagram-heading"><div><p className="bakery-eyebrow">Z NAŠEHO INSTAGRAMU</p><h2>Sladké chvíle,<br/><em>kousek po kousku.</em></h2></div><a href="https://www.instagram.com/kuskolace/" target="_blank" rel="noopener noreferrer" className="bakery-button bakery-ig-follow"><Camera size={18}/> @kuskolace <ArrowUpRight size={18}/></a></div>
      <div className="bakery-instagram-grid">{photos.map(post => <a key={post.id} href={post.postUrl} target="_blank" rel="noopener noreferrer" className="bakery-instagram-card"><div className="bakery-instagram-image"><img src={post.photoKey} alt={post.caption} loading="lazy" decoding="async" width={480} height={640}/><span aria-hidden="true"><ArrowUpRight size={22}/></span></div><div className="bakery-instagram-caption"><span>{post.caption}</span><ArrowUpRight size={16}/></div></a>)}</div>
      <p className="bakery-instagram-note">Výběr fotografií z @kuskolace. Aktuální novinky najdete na Instagramu.</p>
    </div>
  </section>;
}
