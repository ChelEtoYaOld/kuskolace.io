"use client";

import React from "react";
import RegisterHeader from "@/backend/components/AdminRegister/RegisterHeader";
import RegisterForm from "@/backend/components/AdminRegister/RegisterForm";
import RegisterFooter from "@/backend/components/AdminRegister/RegisterFooter";
export default function AdminRegisterPage() {
  // 经 upload_image 转存的官方 Koláč 素材图片 URL
  const kolacLogoUrl = "https://www.autocoder.cc/background/zaki_prod/user_upload/1a87865806e44793bd70d2b40025cc98.jpg";
  return <main className="relative flex min-h-screen w-full items-center justify-center bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      {/* 背景细微暖色手作肌理装点 */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-muted/50 via-background to-background" />

      {/* 核心工作台注册登记面板（460px 宽度卡片） */}
      <div data-controller-name="Registrace správce" className="w-full max-w-[460px] rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8 text-card-foreground">
        <RegisterHeader logoUrl={kolacLogoUrl} />
        <RegisterForm />
        <RegisterFooter />
      </div>
    </main>;
}
