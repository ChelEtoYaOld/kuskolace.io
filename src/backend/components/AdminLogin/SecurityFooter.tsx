"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { KeyRound, UserPlus } from "lucide-react";
import { AdminRegister } from "@/backend/route-params";
export default function SecurityFooter() {
  const router = useRouter();
  return <div className="mt-6 pt-5 border-t border-border flex flex-col items-center gap-3 text-center" data-api-unique-id='securityfooter-rc4058bc94c0bf34b-s1724868389' data-api-unique-page-name='src/backend/components/AdminLogin/SecurityFooter'>
      {/* Registration Navigation Link to B02 */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground" data-api-unique-id='securityfooter-rd1cd93baf2bb87a9-s1724868389' data-api-unique-page-name='src/backend/components/AdminLogin/SecurityFooter'>
        <span data-api-unique-id='securityfooter-r44a2f19275fc9f46-s1724868389' data-api-unique-page-name='src/backend/components/AdminLogin/SecurityFooter'>Nový správce pekárny?</span>
        <button type="button" onClick={() => AdminRegister.navigateTo(router)} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1" data-api-unique-id='securityfooter-r144cc480ae41696c-s1724868389' data-api-unique-page-name='src/backend/components/AdminLogin/SecurityFooter'>
          <UserPlus className="w-3.5 h-3.5" data-api-unique-id='securityfooter-r5b430108f0ed087a-s1724868389' data-api-unique-page-name='src/backend/components/AdminLogin/SecurityFooter' />
          <span data-api-unique-id='securityfooter-r390c9d629e2983ff-s1724868389' data-api-unique-page-name='src/backend/components/AdminLogin/SecurityFooter'>Vytvořit účet</span>
        </button>
      </div>

      {/* Security Protocol Notice */}
      <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground font-mono" data-api-unique-id='securityfooter-rbcce4cc0296e31cc-s1724868389' data-api-unique-page-name='src/backend/components/AdminLogin/SecurityFooter'>
        <KeyRound className="w-3 h-3 text-muted-foreground" data-api-unique-id='securityfooter-raf4f3665fb813b7e-s1724868389' data-api-unique-page-name='src/backend/components/AdminLogin/SecurityFooter' />
        <span data-api-unique-id='securityfooter-rb4488b7305af0c67-s1724868389' data-api-unique-page-name='src/backend/components/AdminLogin/SecurityFooter'>JWT bezstavová relace · Vstup vyhrazen pro provoz pekárny</span>
      </div>
    </div>;
}