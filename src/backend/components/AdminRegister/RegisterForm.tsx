"use client";

import React, { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, Loader2, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { registerAdmin } from "@/backend/actions/AdminRegister";
import { AdminLogin } from "@/backend/route-params";
import type { AdminRegisterFormData, PasswordStrength } from "@/backend/types/AdminRegister";
export default function RegisterForm() {
  const router = useRouter();
  const fullNameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const [formData, setFormData] = useState<AdminRegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 计算密码强度
  const calculatePasswordStrength = (pwd: string): PasswordStrength => {
    if (!pwd) {
      return {
        score: 0,
        label: "Zadejte heslo",
        feedback: "Minimálně 8 znaků, kombinace písmen a čísel."
      };
    }
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score++;
    if (score === 1) {
      return {
        score: 1,
        label: "Slabé heslo",
        feedback: "Doporučujeme přidat velká písmena a číslice."
      };
    } else if (score === 2) {
      return {
        score: 2,
        label: "Střední síla",
        feedback: "Dobré, pro maximální bezpečí přidejte speciální znak."
      };
    } else if (score >= 3) {
      return {
        score: 3,
        label: "Silné heslo",
        feedback: "Výborné heslo pro zabezpečení administrace."
      };
    }
    return {
      score: 0,
      label: "Příliš krátké",
      feedback: "Heslo musí mít alespoň 8 znaků."
    };
  };
  const strength = calculatePasswordStrength(formData.password);

  // 验证规则
  const passwordsMatch = formData.password.length > 0 && formData.password === formData.confirmPassword;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isFullNameValid = formData.fullName.trim().length >= 3;
  const isPasswordValid = formData.password.length >= 8;
  const handleChange = (field: keyof AdminRegisterFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleBlur = (field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true
    });
    if (!isFullNameValid) {
      toast.error("Zadejte prosím celé jméno a příjmení (minimálně 3 znaky).");
      return;
    }
    if (!isEmailValid) {
      toast.error("Zadejte prosím platnou e-mailovou adresu správce.");
      return;
    }
    if (!isPasswordValid) {
      toast.error("Heslo musí mít minimálně 8 znaků.");
      return;
    }
    if (!passwordsMatch) {
      toast.error("Zadaná hesla se neshodují. Zkontrolujte prosím obě pole.");
      return;
    }
    setIsSubmitting(true);
    try {
      await registerAdmin({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      toast.success("Správce byl úspěšně zaregistrován s rolí ADMIN. Přesměrování na přihlášení...");
      setTimeout(() => {
        AdminLogin.navigateTo(router);
      }, 800);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Při registraci došlo k chybě. Zkuste to prosím znovu.");
      setIsSubmitting(false);
    }
  };
  return <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" data-api-unique-id='registerform-r3fae7a5a461c2119-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
      {/* Jméno a příjmení */}
      <div className="flex flex-col gap-1.5" data-api-unique-id='registerform-red19ade0e27cc858-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        <label htmlFor={fullNameId} className="text-xs font-semibold text-card-foreground" data-api-unique-id='registerform-r1bd8b7ee90b5ff10-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          Celé jméno a příjmení správce
        </label>
        <div className="relative" data-api-unique-id='registerform-ra44837f2a375f3b1-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground" data-api-unique-id='registerform-r4f08f78e2094493d-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <User className="h-4 w-4" data-api-unique-id='registerform-rb33da93ed11caec5-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          </div>
          <input id={fullNameId} type="text" required autoComplete="name" value={formData.fullName} onChange={e => handleChange("fullName", e.target.value)} onBlur={() => handleBlur("fullName")} placeholder="např. Václav Novák" className="w-full rounded-md border border-input bg-background pl-9 pr-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" data-api-unique-id='registerform-rdc4495d3483568ee-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
        </div>
        {touched.fullName && !isFullNameValid && <p className="text-xs text-destructive" data-api-unique-id='registerform-r0d238eb94e933624-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            Jméno musí mít alespoň 3 znaky.
          </p>}
      </div>

      {/* E-mail */}
      <div className="flex flex-col gap-1.5" data-api-unique-id='registerform-rc40420cd5aa03759-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        <label htmlFor={emailId} className="text-xs font-semibold text-card-foreground" data-api-unique-id='registerform-r813dd10406afbcb4-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          Přihlašovací e-mail
        </label>
        <div className="relative" data-api-unique-id='registerform-rb5c59cb7c86ebf08-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground" data-api-unique-id='registerform-r9356439cb906d91a-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <Mail className="h-4 w-4" data-api-unique-id='registerform-r15b9d6ee055c97a4-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          </div>
          <input id={emailId} type="email" required autoComplete="email" value={formData.email} onChange={e => handleChange("email", e.target.value)} onBlur={() => handleBlur("email")} placeholder="spravce@kuskolace.cz" className="w-full rounded-md border border-input bg-background pl-9 pr-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" data-api-unique-id='registerform-r0d131093db48d433-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
        </div>
        {touched.email && !isEmailValid && <p className="text-xs text-destructive" data-api-unique-id='registerform-r61ca021d6f01d44f-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            Zadejte platnou e-mailovou adresu.
          </p>}
      </div>

      {/* Heslo */}
      <div className="flex flex-col gap-1.5" data-api-unique-id='registerform-rd4656cab2e0fe2f5-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        <div className="flex items-center justify-between" data-api-unique-id='registerform-re567ea0e1767c6f0-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <label htmlFor={passwordId} className="text-xs font-semibold text-card-foreground" data-api-unique-id='registerform-r61a3fb6d54ccefc0-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            Heslo
          </label>
          <span className="text-[11px] text-muted-foreground" data-api-unique-id='registerform-r74737c6df9cc170a-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>Min. 8 znaků</span>
        </div>
        <div className="relative" data-api-unique-id='registerform-r74fe5ca936f40c65-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground" data-api-unique-id='registerform-r8d59eabe520180a9-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <Lock className="h-4 w-4" data-api-unique-id='registerform-r22523a3f36ac35b0-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          </div>
          <input id={passwordId} type={showPassword ? "text" : "password"} required autoComplete="new-password" value={formData.password} onChange={e => handleChange("password", e.target.value)} onBlur={() => handleBlur("password")} placeholder="Zadejte bezpečné heslo" className="w-full rounded-md border border-input bg-background pl-9 pr-10 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" data-api-unique-id='registerform-r4a1fc3c7f848d362-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          <button type="button" onClick={() => setShowPassword(prev => !prev)} aria-label={showPassword ? "Skrýt heslo" : "Zobrazit heslo"} className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-r-md" data-api-unique-id='registerform-r1ce070748d4ccebe-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            {showPassword ? <EyeOff className="h-4 w-4" data-api-unique-id='registerform-r89bb8024e3686bf4-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' /> : <Eye className="h-4 w-4" data-api-unique-id='registerform-rbadff42e3d028489-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />}
          </button>
        </div>

        {/* 密码强度条 */}
        {formData.password.length > 0 && <div className="mt-1 flex flex-col gap-1" data-api-unique-id='registerform-rd11cc8d39756ff29-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <div className="flex items-center gap-1.5" data-api-unique-id='registerform-r5129825abd4f65c1-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${strength.score >= 1 ? "bg-destructive" : "bg-muted"}`} data-api-unique-id='registerform-r0b62c4612dd655c4-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${strength.score >= 2 ? "bg-warning" : "bg-muted"}`} data-api-unique-id='registerform-r5be4c19bfb5813f1-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${strength.score >= 3 ? "bg-success" : "bg-muted"}`} data-api-unique-id='registerform-rf0177569529a2abe-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
            </div>
            <div className="flex items-center justify-between text-[11px]" data-api-unique-id='registerform-r372e420f74dc1be2-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
              <span className="text-muted-foreground" data-api-unique-id='registerform-r06d8aebd14470232-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>{strength.feedback}</span>
              <span className={`font-medium ${strength.score === 1 ? "text-destructive" : strength.score === 2 ? "text-warning" : "text-success"}`} data-api-unique-id='registerform-r30655800c061eb02-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
                {strength.label}
              </span>
            </div>
          </div>}
      </div>

      {/* Potvrzení hesla */}
      <div className="flex flex-col gap-1.5" data-api-unique-id='registerform-ra1399170117cff3c-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        <label htmlFor={confirmPasswordId} className="text-xs font-semibold text-card-foreground" data-api-unique-id='registerform-rbec5b85bb928f28f-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          Potvrzení hesla
        </label>
        <div className="relative" data-api-unique-id='registerform-r063e685ff29d7d69-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground" data-api-unique-id='registerform-r8e8ea1a48e3614f7-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            <KeyRound className="h-4 w-4" data-api-unique-id='registerform-r5bc4129ca1035e10-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          </div>
          <input id={confirmPasswordId} type={showConfirmPassword ? "text" : "password"} required autoComplete="new-password" value={formData.confirmPassword} onChange={e => handleChange("confirmPassword", e.target.value)} onBlur={() => handleBlur("confirmPassword")} placeholder="Zopakujte zadané heslo" className="w-full rounded-md border border-input bg-background pl-9 pr-10 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" data-api-unique-id='registerform-r0d6fad09f65490c3-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          <button type="button" onClick={() => setShowConfirmPassword(prev => !prev)} aria-label={showConfirmPassword ? "Skrýt potvrzení hesla" : "Zobrazit potvrzení hesla"} className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-r-md" data-api-unique-id='registerform-ra7252e7f79f25102-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            {showConfirmPassword ? <EyeOff className="h-4 w-4" data-api-unique-id='registerform-r94aef5bae1664fff-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' /> : <Eye className="h-4 w-4" data-api-unique-id='registerform-r458f0a541ec278dd-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />}
          </button>
        </div>

        {/* 密码匹配状态提示 */}
        {formData.confirmPassword.length > 0 && <div className="mt-0.5 flex items-center gap-1.5 text-xs" data-api-unique-id='registerform-r33ad719bce89f9d6-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
            {passwordsMatch ? <span className="inline-flex items-center gap-1 text-success font-medium" data-api-unique-id='registerform-rc99fcb51ef61ca28-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
                <CheckCircle2 className="h-3.5 w-3.5" data-api-unique-id='registerform-rd2431f439aa85915-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' /> Hesla se shodují
              </span> : <span className="inline-flex items-center gap-1 text-destructive font-medium" data-api-unique-id='registerform-r66601160223aafb0-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
                <AlertCircle className="h-3.5 w-3.5" data-api-unique-id='registerform-r90e79c9ea1d4ae9b-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' /> Hesla se neshodují
              </span>}
          </div>}
      </div>

      {/* 提交按钮 */}
      <button type="submit" disabled={isSubmitting} className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-2.5 px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none" data-api-unique-id='registerform-ra72541aac05e5520-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>
        {isSubmitting ? <>
            <Loader2 className="h-4 w-4 animate-spin" data-api-unique-id='registerform-rfe6293a295f4a085-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
            <span data-api-unique-id='registerform-r7ff978d6cab2d5b4-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>Vytváření účtu správce...</span>
          </> : <>
            <span data-api-unique-id='registerform-rfb852503cca0570d-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm'>Zaregistrovat správce</span>
            <ArrowRight className="h-4 w-4" data-api-unique-id='registerform-r2e0a543030e068e8-s225997887' data-api-unique-page-name='src/backend/components/AdminRegister/RegisterForm' />
          </>}
      </button>
    </form>;
}