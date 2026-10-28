"use client";

import React from "react";
import { BusinessFacts } from "@/backend/types/AdminBusinessFacts";
import { Input } from "@/components/ui/input";
import { Building2, MapPin, Phone, Mail } from "lucide-react";
interface ContactFactsCardProps {
  facts: BusinessFacts;
  onChange: (updatedFacts: BusinessFacts) => void;
}
export default function ContactFactsCard({
  facts,
  onChange
}: ContactFactsCardProps) {
  const handleChange = (field: keyof BusinessFacts, value: string) => {
    onChange({
      ...facts,
      [field]: value
    });
  };
  return <section data-controller-name="Základní kontaktní a identifikační údaje" className="flex min-w-0 flex-col rounded-xl border border-border bg-card p-4 sm:p-6 text-card-foreground shadow-sm" data-api-unique-id='contactfactscard-rd966bca99414de07-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
      <div className="flex items-center gap-2 border-b border-border/80 pb-3" data-api-unique-id='contactfactscard-r7e10a3dae0b2a507-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
        <Building2 className="h-5 w-5 text-primary" data-api-unique-id='contactfactscard-r4e4d19951c627bb7-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard' />
        <div data-api-unique-id='contactfactscard-r268a13108e901fc4-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-card-foreground" data-api-unique-id='contactfactscard-ra73e6327927b3e37-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
            Základní údaje provozovny
          </h2>
          <p className="text-xs text-muted-foreground" data-api-unique-id='contactfactscard-r92d20ced60cbc757-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
            Název, oficiální adresa pekařství a kontakty pro zákaznické dotazy
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2" data-api-unique-id='contactfactscard-r1aa526e32828b27b-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
        {/* Název pekárny */}
        <div className="sm:col-span-2" data-api-unique-id='contactfactscard-re9553799ebee5aee-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
          <label htmlFor="fact-name" className="block text-xs font-semibold text-card-foreground mb-1.5" data-api-unique-id='contactfactscard-r334105a698cb0ff1-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
            Název pekárny / provozovny
          </label>
          <div className="relative" data-api-unique-id='contactfactscard-r0854ccf988bdb1f8-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
            <Input id="fact-name" type="text" maxLength={255} value={facts.name ?? ""} onChange={e => handleChange("name", e.target.value)} placeholder="Např. Kus Koláče" className="h-9 text-sm pl-3 font-medium" data-api-unique-id='contactfactscard-r25d2ba6db727e23f-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard' />
          </div>
        </div>

        {/* Ulice a číslo */}
        <div data-api-unique-id='contactfactscard-re270262dfa8cd791-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
          <label htmlFor="fact-street" className="block text-xs font-semibold text-card-foreground mb-1.5" data-api-unique-id='contactfactscard-rf45616f3a5b4efc1-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
            Ulice a číslo popisné
          </label>
          <div className="relative flex items-center" data-api-unique-id='contactfactscard-r2c5dca13d74e90a2-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
            <MapPin className="absolute left-2.5 h-4 w-4 text-muted-foreground pointer-events-none" data-api-unique-id='contactfactscard-r1966f2284eb5b65b-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard' />
            <Input id="fact-street" type="text" maxLength={255} value={facts.streetAddress ?? ""} onChange={e => handleChange("streetAddress", e.target.value)} placeholder="Např. Korunní 90" className="h-9 text-sm pl-9" data-api-unique-id='contactfactscard-r3f00fde072d89e54-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard' />
          </div>
        </div>

        {/* Město a PSČ */}
        <div data-api-unique-id='contactfactscard-r6fc97b6fa4e8054a-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
          <label htmlFor="fact-city" className="block text-xs font-semibold text-card-foreground mb-1.5" data-api-unique-id='contactfactscard-rd8b7e35f6a31381e-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
            Město a PSČ
          </label>
          <div className="relative flex items-center" data-api-unique-id='contactfactscard-r0e84578e9f8ea22a-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
            <MapPin className="absolute left-2.5 h-4 w-4 text-muted-foreground pointer-events-none" data-api-unique-id='contactfactscard-rfb1a49f20a079d42-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard' />
            <Input id="fact-city" type="text" maxLength={255} value={facts.cityZip ?? ""} onChange={e => handleChange("cityZip", e.target.value)} placeholder="Např. 101 00 Vinohrady, Praha 2" className="h-9 text-sm pl-9" data-api-unique-id='contactfactscard-r793b8556526118c7-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard' />
          </div>
        </div>

        {/* Telefonní kontakt */}
        <div data-api-unique-id='contactfactscard-r23a90de52d4ff057-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
          <label htmlFor="fact-phone" className="block text-xs font-semibold text-card-foreground mb-1.5" data-api-unique-id='contactfactscard-r7e2058773284aa6b-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
            Telefon pro objednávky a dotazy
          </label>
          <div className="relative flex items-center" data-api-unique-id='contactfactscard-r4f14e6c4ef1d08bd-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
            <Phone className="absolute left-2.5 h-4 w-4 text-muted-foreground pointer-events-none" data-api-unique-id='contactfactscard-rf7939fcba495858b-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard' />
            <Input id="fact-phone" type="tel" maxLength={50} value={facts.phone ?? ""} onChange={e => handleChange("phone", e.target.value)} placeholder="Např. 608 903 828" className="h-9 text-sm pl-9 font-mono" data-api-unique-id='contactfactscard-rd011b29afff87a7a-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard' />
          </div>
        </div>

        {/* Kontaktní e-mail */}
        <div data-api-unique-id='contactfactscard-rbcb41a50e66909b2-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
          <label htmlFor="fact-email" className="block text-xs font-semibold text-card-foreground mb-1.5" data-api-unique-id='contactfactscard-r759f39b075d8a1d1-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
            Kontaktní e-mail
          </label>
          <div className="relative flex items-center" data-api-unique-id='contactfactscard-ra0a2e719d560103a-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard'>
            <Mail className="absolute left-2.5 h-4 w-4 text-muted-foreground pointer-events-none" data-api-unique-id='contactfactscard-r009c60749070f254-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard' />
            <Input id="fact-email" type="email" maxLength={255} value={facts.email ?? ""} onChange={e => handleChange("email", e.target.value)} placeholder="Např. info@kuskolace.cz" className="h-9 text-sm pl-9" data-api-unique-id='contactfactscard-r2b419ada34f6586f-s3572901023' data-api-unique-page-name='src/backend/components/AdminBusinessFacts/ContactFactsCard' />
          </div>
        </div>
      </div>
    </section>;
}