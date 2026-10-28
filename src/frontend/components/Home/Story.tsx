"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { generatedImagesByFilename } from "@/lib/generated-images/frontend-home";
import { Heart, Award, ShieldCheck } from "lucide-react";
import type { CmsConfigDTO } from "@/frontend/types/Home";
interface StoryProps {
  cmsConfig?: CmsConfigDTO | null;
}
export default function Story({
  cmsConfig
}: StoryProps = {}) {
  if (cmsConfig && !cmsConfig.isStoryVisible) {
    return null;
  }
  const title = cmsConfig?.storyTitle || "Příběh pekárny Kus Koláče";
  const body = cmsConfig?.storyBody || "Věříme v sílu jednoduchých a kvalitních surovin. Začali jsme s touhou vrátit na Vinohrady vůni pravého českého kynutého koláče s pořádnou porcí drobenky.";
  const craftPoints = [{
    icon: Award,
    title: "Vinohradská tradice",
    description: "Na Korunní 90 navazujeme na zlatou éru pražských řemeslných pekáren. Těsto kyne pomalu přirozenou fermentací, bez umělých kypřidel a stabilizátorů."
  }, {
    icon: Heart,
    title: "84% pravé české máslo",
    description: "Nevěříme na rostlinné náhražky. V každém soustu našich buchet i křupavé drobenky ucítíte poctivé máslo od prověřených tuzemských farmářů."
  }, {
    icon: ShieldCheck,
    title: "Žádné polotovary",
    description: "Povidla vaříme ze zralých švestek, tvarohovou náplň šleháme z plnotučného mléka s vanilkovým luskem a ovoce odebíráme podle aktuální sezóny."
  }];
  return <section id="pribeh" data-controller-name="Příběh a filozofie pekárny Kus Koláče" className="w-full bg-muted/40 py-16 sm:py-24 border-t border-border" data-api-unique-id='story-r91dc5b67a5ea7d92-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='story-rc1274beee3127d18-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story'>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center" data-api-unique-id='story-ra382e2460e96e2b6-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story'>
          {/* Left Visual: Baker Hands Crafting Dough */}
          <div className="lg:col-span-5 relative" data-api-unique-id='story-rb56bee336260d141-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story'>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm" data-api-unique-id='story-r6707aa6334a7a827-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story'>
              <EditableImg propKey="baker-craft-dough-story" src={generatedImagesByFilename["baker-craft-dough"]} alt="Pekařské ruce hnětou čerstvé kynuté těsto" className="h-full w-full object-cover" data-api-unique-id='story-r8b9aec9b258191fb-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story' />
            </div>
          </div>

          {/* Right Narrative: 3 Unboxed Craft Principles */}
          <div className="lg:col-span-7 space-y-8" data-api-unique-id='story-r8cb9439a6e18b122-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story'>
            <div className="space-y-3" data-api-unique-id='story-ra1a8c2383414058c-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story'>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground" data-api-unique-id='story-rb215e5edb835e7a0-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story'>
                {title}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-line" data-api-unique-id='story-r291346cc32a8f533-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story'>
                {body}
              </p>
            </div>

            <div className="space-y-6 pt-2" data-api-unique-id='story-re1d5774340717be6-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story'>
              {craftPoints.map((point, index) => {
              const IconComponent = point.icon;
              return <div key={index} className="flex gap-4 items-start" data-api-unique-id='story-r9d041cb8341e4b44-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story' data-api-in-loop='1'>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-card border border-border text-primary shadow-xs" data-api-unique-id='story-ra24be521334f4126-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story' data-api-in-loop='1'>
                      <IconComponent className="h-5 w-5" data-api-bind-info={`craftPoints-${index}-icon`} data-api-map-var-name='point' data-api-unique-id='story-r961c1bf15db20186-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story' data-api-in-loop='1' />
                    </div>
                    <div className="space-y-1" data-api-unique-id='story-rbee7594aaaea94bf-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story' data-api-in-loop='1'>
                      <h3 className="font-display text-xl font-bold text-foreground" data-api-unique-id='story-r9a5b7aa000da60af-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story' data-api-in-loop='1' data-api-bind-info={`craftPoints-${index}-title`} data-api-map-var-name='point'>
                        {point.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed" data-api-unique-id='story-rf2f53b24aa62d0b7-s3380208488' data-api-unique-page-name='src/frontend/components/Home/Story' data-api-in-loop='1' data-api-bind-info={`craftPoints-${index}-description`} data-api-map-var-name='point'>
                        {point.description}
                      </p>
                    </div>
                  </div>;
            })}
            </div>
          </div>
        </div>
      </div>
    </section>;
}