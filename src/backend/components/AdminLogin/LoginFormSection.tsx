"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAdmin } from "@/backend/actions/AdminLogin";
import type { AdminLoginFormValues, AdminLoginValidationErrors } from "@/backend/types/AdminLogin";
import { useAdminSession } from "@/tools/BackendSession";
import { AdminHome } from "@/backend/route-params";
interface LoginFormSectionProps {
  onSubmit?: (values: AdminLoginFormValues) => Promise<boolean>;
  isLoading?: boolean;
  errorMessage?: string | null;
}
export default function LoginFormSection({
  onSubmit,
  isLoading: propsLoading = false,
  errorMessage: propsErrorMessage
}: LoginFormSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    set: setAdminSession
  } = useAdminSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [errors, setErrors] = useState<AdminLoginValidationErrors>({});
  const isLoading = propsLoading || localLoading;
  const activeErrorMessage = localError || propsErrorMessage || errors.general;
  const validate = (): boolean => {
    const newErrors: AdminLoginValidationErrors = {};
    if (!email.trim()) {
      newErrors.email = "Zadejte e-mail správce pekárny";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Zadejte platný formát e-mailové adresy";
    }
    if (!password) {
      newErrors.password = "Zadejte přístupové heslo";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (onSubmit) {
      await onSubmit({
        email: email.trim(),
        password
      });
      return;
    }
    setLocalLoading(true);
    setLocalError(null);
    try {
      const response = await loginAdmin({
        email: email.trim(),
        password
      });
      setAdminSession({
        token: response.token,
        user_id: response.userId,
        email: response.email,
        full_name: response.fullName,
        role: "ADMIN"
      });
      const redirect = searchParams.get("redirect");
      if (redirect && /^\/(?![\/\\])/.test(redirect)) {
        router.replace(redirect);
      } else {
        AdminHome.navigateTo(router);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Přihlášení se nezdařilo. Zkontrolujte prosím zadané údaje.";
      setLocalError(message);
    } finally {
      setLocalLoading(false);
    }
  };
  return <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" data-api-unique-id='loginformsection-rc606bc09e62d5f5a-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>
      {/* Error notification banner */}
      {activeErrorMessage && <div role="alert" className="flex items-start gap-2.5 p-3 rounded-lg border border-destructive/20 bg-destructive/10 text-destructive text-xs" data-api-unique-id='loginformsection-r7bdd88c8a857f2f2-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" data-api-unique-id='loginformsection-r7181e015038d3ece-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection' />
          <span className="flex-1 font-medium" data-api-unique-id='loginformsection-r6eea5897489d363b-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>{activeErrorMessage}</span>
        </div>}

      {/* Account Input */}
      <div className="flex flex-col gap-1.5" data-api-unique-id='loginformsection-r085a7f58fbafdc9c-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>
        <label htmlFor="admin-email" className="text-xs font-semibold text-card-foreground flex items-center justify-between" data-api-unique-id='loginformsection-r88dd712b0e30d290-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>
          <span data-api-unique-id='loginformsection-r04fb057fdcdf74aa-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>E-mail správce</span>
          <span className="text-[11px] font-normal text-muted-foreground" data-api-unique-id='loginformsection-ra4c2d50e4c731969-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>Povinné</span>
        </label>
        <div className="relative" data-api-unique-id='loginformsection-r66745e5aa02e90ca-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" data-api-unique-id='loginformsection-r20b987562394a2da-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>
            <Mail className="w-4 h-4" data-api-unique-id='loginformsection-r9853395f662e92cf-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection' />
          </div>
          <Input id="admin-email" type="email" autoComplete="username" data-auto="account" placeholder="Zadejte přihlašovací e-mail" value={email} onChange={e => {
          setEmail(e.target.value);
          if (errors.email) {
            setErrors(prev => ({
              ...prev,
              email: undefined
            }));
          }
          if (localError) {
            setLocalError(null);
          }
        }} disabled={isLoading} className={`pl-9 h-10 bg-background text-foreground border-input focus-visible:ring-ring ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`} data-api-unique-id='loginformsection-r74617572dab0b4ba-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection' />
        </div>
        {errors.email && <p className="text-[11px] text-destructive font-medium" data-api-unique-id='loginformsection-ra2f4a41972219563-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>{errors.email}</p>}
      </div>

      {/* Password Input */}
      <div className="flex flex-col gap-1.5" data-api-unique-id='loginformsection-rcb290542f0187ed5-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>
        <label htmlFor="admin-password" className="text-xs font-semibold text-card-foreground flex items-center justify-between" data-api-unique-id='loginformsection-r6daaf8cae68c6407-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>
          <span data-api-unique-id='loginformsection-r2d0cc24b44d00ebc-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>Heslo správce</span>
          <span className="text-[11px] font-normal text-muted-foreground" data-api-unique-id='loginformsection-r2c3ccb42dba54c6c-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>Povinné</span>
        </label>
        <div className="relative" data-api-unique-id='loginformsection-rec56c32f85794ae6-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" data-api-unique-id='loginformsection-r2c0dd75e2f75a7aa-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>
            <Lock className="w-4 h-4" data-api-unique-id='loginformsection-rd643dc8de3e462e7-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection' />
          </div>
          <Input id="admin-password" type={showPassword ? "text" : "password"} autoComplete="current-password" data-auto="password" placeholder="Zadejte heslo k účtu" value={password} onChange={e => {
          setPassword(e.target.value);
          if (errors.password) {
            setErrors(prev => ({
              ...prev,
              password: undefined
            }));
          }
          if (localError) {
            setLocalError(null);
          }
        }} disabled={isLoading} className={`pl-9 pr-10 h-10 bg-background text-foreground border-input focus-visible:ring-ring ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`} data-api-unique-id='loginformsection-r13146a45cdfd8771-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection' />
          <button type="button" onClick={() => setShowPassword(!showPassword)} tabIndex={-1} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-card-foreground rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={showPassword ? "Skrýt heslo" : "Zobrazit heslo"} data-api-unique-id='loginformsection-rdf817017692c836f-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>
            {showPassword ? <EyeOff className="w-4 h-4" data-api-unique-id='loginformsection-r6401401218c72365-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection' /> : <Eye className="w-4 h-4" data-api-unique-id='loginformsection-r3aa20e8220c3c4fd-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection' />}
          </button>
        </div>
        {errors.password && <p className="text-[11px] text-destructive font-medium" data-api-unique-id='loginformsection-r1e2a9c86982e2df1-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>{errors.password}</p>}
      </div>

      {/* Submit Button */}
      <Button type="submit" data-auto="submit" disabled={isLoading} className="w-full mt-2 h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wide shadow-sm" data-api-unique-id='loginformsection-r65ef30ef0577fde9-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>
        {isLoading ? <span className="inline-flex items-center gap-2" data-api-unique-id='loginformsection-r03d906d54f5da602-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>
            <Loader2 className="w-4 h-4 animate-spin" data-api-unique-id='loginformsection-r810f28e0c2882183-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection' />
            <span data-api-unique-id='loginformsection-r3a0cac199df9fe9e-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>Ověřování přihlášení...</span>
          </span> : <span data-api-unique-id='loginformsection-r0ed47bad5dfa38aa-s761135242' data-api-unique-page-name='src/backend/components/AdminLogin/LoginFormSection'>Vstoupit do provozu</span>}
      </Button>
    </form>;
}