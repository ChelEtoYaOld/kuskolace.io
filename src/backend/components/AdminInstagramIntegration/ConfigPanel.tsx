"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw, CheckCircle2, ShieldCheck, Radio, Save } from "lucide-react";
import { InstagramConfig, SyncStatus, FeedMode } from "@/backend/types/AdminInstagramIntegration";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface ConfigPanelProps {
  config: InstagramConfig;
  onSaveConfig: (updated: InstagramConfig) => void;
  onTriggerSync: () => void;
  isSyncing: boolean;
  officialAvatarUrl: string;
}
const SYNC_STATUS_LABELS: Record<SyncStatus, {
  label: string;
  badgeClass: string;
  dotClass: string;
  selectLabel: string;
}> = {
  AUTORIZOVANO: {
    label: "Autorizováno",
    badgeClass: "bg-success text-success-foreground",
    dotClass: "bg-success animate-pulse",
    selectLabel: "AUTORIZOVÁNO (Ostré propojení)"
  },
  NEPROPOJENO: {
    label: "Nepropojeno",
    badgeClass: "bg-destructive text-destructive-foreground",
    dotClass: "bg-destructive",
    selectLabel: "NEPROPOJENO (Odpojeno / Chyba tokenu)"
  },
  NAHLEDOVY_REZIM: {
    label: "Náhledový režim",
    badgeClass: "bg-warning text-warning-foreground",
    dotClass: "bg-warning",
    selectLabel: "NÁHLEDOVÝ REŽIM (Testovací sandbox)"
  }
};
export default function ConfigPanel({
  config,
  onSaveConfig,
  onTriggerSync,
  isSyncing,
  officialAvatarUrl
}: ConfigPanelProps) {
  const [handle, setHandle] = useState(config.accountHandle);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(config.syncStatus);
  const [autoSync, setAutoSync] = useState(config.autoSync);
  const [feedMode, setFeedMode] = useState<FeedMode>(config.feedMode);
  const [isSavedRecently, setIsSavedRecently] = useState(false);
  useEffect(() => {
    setHandle(config.accountHandle);
    setSyncStatus(config.syncStatus);
    setAutoSync(config.autoSync);
    setFeedMode(config.feedMode);
  }, [config.accountHandle, config.syncStatus, config.autoSync, config.feedMode]);
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      ...config,
      accountHandle: handle.trim() || "@kuskolace",
      syncStatus,
      autoSync,
      feedMode,
      updatedAt: new Date()
    });
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 2500);
  };
  const statusMeta = SYNC_STATUS_LABELS[syncStatus] || SYNC_STATUS_LABELS.NEPROPOJENO;
  return <div className="bg-card text-card-foreground rounded-lg border border-border p-4 lg:p-5 flex flex-col gap-4 shadow-sm" data-controller-name="Konfigurace Instagram integrace" data-api-unique-id='configpanel-r438bf9f2ced31be3-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
      <p role="status" className="rounded-md border border-warning/40 bg-warning/10 p-3 text-sm">Instagram API není připojeno. Web zobrazuje ručně vybrané fotografie. Automatické aktualizace nejsou aktivní.</p>
      {/* Profil a stav spojení */}
      <div className="flex items-start justify-between gap-3 border-b border-border pb-4" data-api-unique-id='configpanel-r5833eb08060ed2da-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
        <div className="flex items-center gap-3 min-w-0" data-api-unique-id='configpanel-ra7f5c68e1ef852ba-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border shrink-0 bg-muted" data-api-unique-id='configpanel-re3076ae64978c7f4-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
            <img src={officialAvatarUrl} alt="Kus Koláče profil" className="w-full h-full object-cover" data-api-unique-id='configpanel-r7ae4a81717a42b14-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel' />
            <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-card ${statusMeta.dotClass}`} data-api-unique-id='configpanel-r43aae15d010e0148-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel' />
          </div>
          <div className="min-w-0" data-api-unique-id='configpanel-r9340b59a0230360a-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
            <div className="flex items-center gap-1.5" data-api-unique-id='configpanel-r8ede5664455c478b-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
              <span className="font-semibold text-sm truncate" data-api-unique-id='configpanel-rc6b52d17cadb7d82-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>Kus Koláče Vinohrady</span>
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" data-api-unique-id='configpanel-rdce6da88141d54ce-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel' />
            </div>
            <p className="text-xs text-muted-foreground truncate font-mono" data-api-unique-id='configpanel-r385feba2051a1c7f-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>{config.accountHandle}</p>
            {config.lastSyncAt && <p className="text-[11px] text-muted-foreground truncate" data-api-unique-id='configpanel-r6e01e039c93b9945-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
                Poslední sync: {config.lastSyncAt}
              </p>}
          </div>
        </div>

        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 whitespace-nowrap ${statusMeta.badgeClass}`} data-api-unique-id='configpanel-rfb8d89d39c143a64-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
          {statusMeta.label}
        </span>
      </div>

      {/* Formulář konfigurace */}
      <form onSubmit={handleSave} className="flex flex-col gap-4" data-api-unique-id='configpanel-r7414f1f334479ac3-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
        {/* Účet Instagram */}
        <div className="flex flex-col gap-1.5" data-api-unique-id='configpanel-r2f5b04ba540fe16d-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
          <label className="text-xs font-semibold text-card-foreground" data-api-unique-id='configpanel-r000766f11275dc3d-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
            Uživatelské jméno profilu (handle)
          </label>
          <div className="relative" data-api-unique-id='configpanel-r5b319b62329a145b-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
            <input type="text" value={handle} onChange={e => setHandle(e.target.value)} placeholder="@kuskolace" maxLength={100} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='configpanel-rc0d981c832ceb42e-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel' />
          </div>
          <p className="text-[11px] text-muted-foreground" data-api-unique-id='configpanel-rad40a24156271df2-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
            Oficiální profil pekárny na Meta Graph API
          </p>
        </div>

        {/* Stav autorizace */}
        <div className="flex flex-col gap-1.5" data-api-unique-id='configpanel-rb5118dd3dfffab73-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
          <label className="text-xs font-semibold text-card-foreground" data-api-unique-id='configpanel-r78a5e01448962b01-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
            Stav synchronizace (sync_status)
          </label>
          <Select value={syncStatus} onValueChange={(val: SyncStatus) => setSyncStatus(val)} data-api-unique-id='configpanel-rfdc5e61c7dea7980-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
            <SelectTrigger className="w-full h-9 bg-background" data-api-unique-id='configpanel-rc87d369698c44ca5-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
              <SelectValue placeholder="Vyberte stav" data-api-unique-id='configpanel-rdc1b8e7f79d577cc-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
                {statusMeta.selectLabel}
              </SelectValue>
            </SelectTrigger>
            <SelectContent data-api-unique-id='configpanel-raddebc30b75895c7-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
              <SelectItem value="AUTORIZOVANO" data-api-unique-id='configpanel-ref91e8b3522c563e-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>AUTORIZOVÁNO (Ostré propojení)</SelectItem>
              <SelectItem value="NAHLEDOVY_REZIM" data-api-unique-id='configpanel-rba7e40c2850bc4be-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>NÁHLEDOVÝ REŽIM (Testovací sandbox)</SelectItem>
              <SelectItem value="NEPROPOJENO" data-api-unique-id='configpanel-rd1cd32022323cd64-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>NEPROPOJENO (Odpojeno / Chyba tokenu)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Volba aktivního režimu feedu */}
        <div className="flex flex-col gap-2 pt-1 border-t border-border" data-api-unique-id='configpanel-r63acf2c8cabadd99-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
          <label className="text-xs font-semibold text-card-foreground flex items-center justify-between" data-api-unique-id='configpanel-rca939122e07b6243-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
            <span data-api-unique-id='configpanel-r27653fae5f0acf84-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>Aktivní režim výstupu na webu (feed_mode)</span>
          </label>

          <div className="flex flex-col gap-2" data-api-unique-id='configpanel-raa937c364bee26de-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
            <button type="button" onClick={() => setFeedMode("API")} className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-colors ${feedMode === "API" ? "border-primary bg-primary/10 text-card-foreground font-medium" : "border-border bg-background text-muted-foreground hover:bg-muted"}`} data-api-unique-id='configpanel-r80eb9f82e17f3cbc-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
              <div className="flex items-center justify-between" data-api-unique-id='configpanel-r2ed36033585615bd-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
                <span className="text-xs font-semibold flex items-center gap-1.5 text-foreground" data-api-unique-id='configpanel-r33ea2b10b0f7de1c-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
                  <Radio className={`w-3.5 h-3.5 ${feedMode === "API" ? "text-primary" : "text-muted-foreground"}`} data-api-unique-id='configpanel-r53f92c325580e0b0-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel' />
                  Režim API
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground" data-api-unique-id='configpanel-r20d7974de457db73-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
                  Graph API
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug" data-api-unique-id='configpanel-r3e076aff57bee400-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
                Automatický feed přímo z Meta serverů pekárny
              </p>
            </button>

            <button type="button" onClick={() => setFeedMode("FALLBACK")} className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-colors ${feedMode === "FALLBACK" ? "border-warning bg-warning/10 text-card-foreground font-medium" : "border-border bg-background text-muted-foreground hover:bg-muted"}`} data-api-unique-id='configpanel-rfbab1f5c9d7de8d9-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
              <div className="flex items-center justify-between" data-api-unique-id='configpanel-r3328f15d9556f825-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
                <span className="text-xs font-semibold flex items-center gap-1.5 text-foreground" data-api-unique-id='configpanel-r8f0d71049ef57e27-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
                  <Radio className={`w-3.5 h-3.5 ${feedMode === "FALLBACK" ? "text-warning" : "text-muted-foreground"}`} data-api-unique-id='configpanel-rec640bd11c4161f6-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel' />
                  Režim FALLBACK
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-warning text-warning-foreground font-semibold" data-api-unique-id='configpanel-rc0e862d13fae0217-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
                  Ruční záloha
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug" data-api-unique-id='configpanel-r536ebc2b4d2a1a92-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
                Vitrína čerpá z ručně spravovaných položek níže
              </p>
            </button>
          </div>
        </div>

        {/* Přepínač automatického stahování */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border" data-api-unique-id='configpanel-r4993642b744431a7-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
          <div className="flex flex-col gap-0.5" data-api-unique-id='configpanel-ra967a0f34f947a02-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
            <span className="text-xs font-semibold text-foreground" data-api-unique-id='configpanel-r30624b903e33734a-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
              Automatické načítání (auto_sync)
            </span>
            <span className="text-[11px] text-muted-foreground" data-api-unique-id='configpanel-r4c1db2c4ef7ec198-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
              Periodické stahování ranních výpeků každých 15 minut
            </span>
          </div>
          <button type="button" role="switch" aria-checked={autoSync} onClick={() => setAutoSync(!autoSync)} className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${autoSync ? "bg-primary" : "bg-input"}`} data-api-unique-id='configpanel-r732e6b9d58ae28f6-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
            <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out ${autoSync ? "translate-x-5" : "translate-x-0"}`} data-api-unique-id='configpanel-r01d7e42c1721ca62-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel' />
          </button>
        </div>

        {/* Tlačítko uložení */}
        <div className="flex items-center gap-2 pt-2" data-api-unique-id='configpanel-rf13163155afe31d7-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
          <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='configpanel-r28cac29e97480d3c-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
            <Save className="w-3.5 h-3.5" data-api-unique-id='configpanel-redcc94b3214f43d4-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel' />
            Uložit konfiguraci integrace
          </button>

          <button type="button" onClick={onTriggerSync} disabled={isSyncing} title="Spustit okamžitou synchronizaci s Meta API" className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:pointer-events-none" data-api-unique-id='configpanel-ra5f2717bc3534dca-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-primary" : ""}`} data-api-unique-id='configpanel-rfaf22d7c29661dd7-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel' />
            <span className="hidden sm:inline" data-api-unique-id='configpanel-rfba61a10d3586cf2-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>Sync</span>
          </button>
        </div>

        {isSavedRecently && <div className="p-2 rounded bg-success text-success-foreground text-xs flex items-center gap-2" data-api-unique-id='configpanel-r191fcddbb97ec240-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>
            <CheckCircle2 className="w-4 h-4 shrink-0" data-api-unique-id='configpanel-rd1a77c229ad4250c-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel' />
            <span data-api-unique-id='configpanel-r6d20196511f57bc2-s3133521443' data-api-unique-page-name='src/backend/components/AdminInstagramIntegration/ConfigPanel'>Nastavení Instagramu bylo úspěšně uloženo a promítnuto.</span>
          </div>}
      </form>
    </div>;
}