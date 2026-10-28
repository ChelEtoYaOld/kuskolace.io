"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BrandCardHeader from "@/backend/components/AdminLogin/BrandCardHeader";
import LoginFormSection from "@/backend/components/AdminLogin/LoginFormSection";
import SecurityFooter from "@/backend/components/AdminLogin/SecurityFooter";
import { loginAdmin } from "@/backend/actions/AdminLogin";
import { AdminHome } from "@/backend/route-params";
import type { AdminLoginFormValues } from "@/backend/types/AdminLogin";
import { useAdminSession } from "@/tools/BackendSession";
export default function AdminLoginPage() {
  const router = useRouter();
  const {
    set: setAdminSession
  } = useAdminSession();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Uploaded bakery seal asset for Kus Koláče
  const kolacLogoUrl = "https://www.autocoder.cc/background/zaki_prod/user_upload/0b2aab21cc97469a9a7b483df12b1ec5.jpg";
  const handleLoginSubmit = async (values: AdminLoginFormValues): Promise<boolean> => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const result = await loginAdmin({
        email: values.email.trim(),
        password: values.password
      });
      if (result && result.token) {
        setAdminSession({
          token: result.token,
          user_id: result.userId,
          email: result.email,
          full_name: result.fullName,
          role: "ADMIN"
        });
        toast.success("Ověření úspěšné. Přesměrování do administrace...");
        AdminHome.navigateTo(router);
        return true;
      }
      setErrorMessage("Neplatné přihlašovací údaje. Zkontrolujte e-mail a heslo správce.");
      return false;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Nastala neočekávaná chyba při ověřování. Zkuste to prosím znovu.";
      setErrorMessage(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="w-full max-w-full min-w-0 min-h-screen overflow-x-hidden p-4 lg:p-6 bg-background text-foreground flex flex-col justify-center items-center">
      {/* Background subtle bakery glow / parchment frame */}
      <div className="w-full max-w-[440px] flex flex-col">
        {/* Central Authentication Card */}
        <div data-controller-name="Přihlášení do administrace pekárny" className="w-full rounded-xl border border-border bg-card text-card-foreground p-6 sm:p-8 shadow-sm">
          <BrandCardHeader logoUrl={kolacLogoUrl} />
          <LoginFormSection onSubmit={handleLoginSubmit} isLoading={isLoading} errorMessage={errorMessage} />
          <SecurityFooter />
        </div>

        {/* Minimal Confidentiality & Location Tag below card */}
        <div className="mt-4 text-center">
          <p className="text-[11px] text-muted-foreground font-mono">
            Kus Koláče © Vinohrady · Provozní systém pekárny
          </p>
        </div>
      </div>
    </div>;
}
