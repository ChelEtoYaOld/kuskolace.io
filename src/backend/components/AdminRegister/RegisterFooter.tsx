"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AdminLogin } from "@/backend/route-params";
export default function RegisterFooter() {
  const router = useRouter();
  return <div className="mt-6 flex flex-col items-center gap-3 border-t border-border pt-4 text-center" data-api-unique-id='registerfooter-r81e77a198c2f8615-s384093003' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterFooter'>
      <div className="text-xs text-muted-foreground" data-api-unique-id='registerfooter-rbf469ac3aaf1e8b0-s384093003' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterFooter'>
        <span data-api-unique-id='registerfooter-r4e88ad8ce697b352-s384093003' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterFooter'>Již máte vytvořený účet správce? </span>
        <button type="button" onClick={() => AdminLogin.navigateTo(router)} className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm cursor-pointer" data-api-unique-id='registerfooter-r780c846b42aef7b1-s384093003' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterFooter'>
          Přihlásit se do systému
        </button>
      </div>

      <div className="text-[11px] text-muted-foreground" data-api-unique-id='registerfooter-r258df7e1e896d537-s384093003' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterFooter'>
        © Kus Koláče · Vinohradská řemeslná pekárna · Korunní 90, Praha 2
      </div>
    </div>;
}