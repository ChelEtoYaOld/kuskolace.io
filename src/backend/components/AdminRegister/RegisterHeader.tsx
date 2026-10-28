"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { ShieldCheck, Sparkles } from "lucide-react";
interface RegisterHeaderProps {
  logoUrl: string;
}
export default function RegisterHeader({
  logoUrl
}: RegisterHeaderProps) {
  return <div className="flex flex-col items-center text-center" data-api-unique-id='registerheader-r5942a581b9f20ce9-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader'>
      {/* 品牌圆形徽标 */}
      <div className="relative mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-secondary shadow-sm" data-api-unique-id='registerheader-r974adba1dffb88dc-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader'>
        <EditableImg propKey="admin-register-logo" src={logoUrl} alt="Kus Koláče Logo" className="h-full w-full object-cover" data-api-unique-id='registerheader-r63a5c6191ad2393d-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader' />
        <div className="pointer-events-none absolute inset-0 rounded-full border border-black/5" data-api-unique-id='registerheader-rc0bd4591b9b18c07-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader' />
      </div>

      {/* 工坊标识与标题 */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground" data-api-unique-id='registerheader-rbea1f9896b454c6b-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader'>
        <Sparkles className="h-3.5 w-3.5 text-primary" data-api-unique-id='registerheader-rd56561967bcf4c66-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader' />
        <span data-api-unique-id='registerheader-r0883f84c1d7556f9-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader'>Kus Koláče · Vinohrady, Praha 2</span>
      </div>

      <h1 className="mt-3 font-serif text-2xl font-bold tracking-tight text-card-foreground sm:text-3xl" data-api-unique-id='registerheader-rd2690eefa4c39d55-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader'>
        Registrace správce pekárny
      </h1>

      <p className="mt-2 text-sm text-muted-foreground" data-api-unique-id='registerheader-r495e0f0ab73794de-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader'>
        Založení nového administrátorského účtu pro ranní provoz a denní vitrínu.
      </p>

      {/* 固定 ADMIN 角色印章徽标 */}
      <div className="mt-4 flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-secondary/80 px-3.5 py-2.5 text-left" data-api-unique-id='registerheader-re9c6562c0962872e-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader'>
        <div className="flex items-center gap-2.5 min-w-0" data-api-unique-id='registerheader-rc26b7280689d4f26-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader'>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground" data-api-unique-id='registerheader-rf435c2cf752c33bb-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader'>
            <ShieldCheck className="h-4 w-4" data-api-unique-id='registerheader-r4ed96600b71bf7b5-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader' />
          </div>
          <div className="min-w-0 flex-1" data-api-unique-id='registerheader-r0c05f07f486b8eb3-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader'>
            <div className="text-xs font-semibold text-secondary-foreground" data-api-unique-id='registerheader-r7e63ccd7d3cec77c-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader'>
              Výhradní oprávnění systému
            </div>
            <div className="text-xs text-muted-foreground truncate" data-api-unique-id='registerheader-r65aec4c705db908d-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader'>
              Správce provozu (role: ADMIN)
            </div>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-accent-foreground" data-api-unique-id='registerheader-r3ffadb8d64cf8ecd-s3365759234' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterHeader'>
          PŘEDEM PŘIŘAZENO
        </span>
      </div>
    </div>;
}