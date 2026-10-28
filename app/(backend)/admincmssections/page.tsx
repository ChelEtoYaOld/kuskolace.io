"use client";

import React, { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import HeaderStrip from "@/backend/components/AdminCmsSections/HeaderStrip";
import SectionsControlPanel from "@/backend/components/AdminCmsSections/SectionsControlPanel";
import TextsEditorPanel from "@/backend/components/AdminCmsSections/TextsEditorPanel";
import ActionDock from "@/backend/components/AdminCmsSections/ActionDock";
import { getCmsConfig, updateCmsConfig } from "@/backend/actions/AdminCmsSections";
import type { SectionKey, TextKey, CmsConfigDto, UpdateCmsConfigInput } from "@/backend/types/AdminCmsSections";
import { useAdminSession } from "@/tools/BackendSession";
type UIConfig = React.ComponentProps<typeof SectionsControlPanel>["config"];
function mapDtoToUi(dto: CmsConfigDto): UIConfig {
  return {
    id: dto.id,
    welcomeHeading: dto.welcomeHeading,
    welcomePreamble: dto.welcomePreamble,
    storyTitle: dto.storyTitle,
    storyBody: dto.storyBody,
    isStoryVisible: dto.isStoryVisible,
    isShowcaseVisible: dto.isShowcaseVisible,
    isInstagramVisible: dto.isInstagramVisible,
    isContactVisible: dto.isContactVisible,
    isWebPublished: dto.isWebPublished,
    createdAt: dto.createdAt instanceof Date ? dto.createdAt : new Date(dto.createdAt),
    updatedAt: dto.updatedAt instanceof Date ? dto.updatedAt : new Date(dto.updatedAt)
  };
}
function mapUiToInput(config: UIConfig): UpdateCmsConfigInput {
  return {
    welcomeHeading: config.welcomeHeading,
    welcomePreamble: config.welcomePreamble,
    storyTitle: config.storyTitle,
    storyBody: config.storyBody,
    isStoryVisible: config.isStoryVisible,
    isShowcaseVisible: config.isShowcaseVisible,
    isInstagramVisible: config.isInstagramVisible,
    isContactVisible: config.isContactVisible,
    isWebPublished: config.isWebPublished
  };
}
const BAKERY_SEAL_URL = "https://www.autocoder.cc/background/zaki_prod/user_upload/96b1b7d4fc52419e90cd29f93a746f38.jpg";
export default function AdminCmsSectionsPage() {
  useAdminSession();
  const [savedConfig, setSavedConfig] = useState<UIConfig | null>(null);
  const [currentConfig, setCurrentConfig] = useState<UIConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    let isMounted = true;
    async function loadConfig() {
      setIsLoading(true);
      try {
        const dto = await getCmsConfig();
        if (isMounted && dto) {
          const uiConfig = mapDtoToUi(dto);
          setSavedConfig(uiConfig);
          setCurrentConfig(uiConfig);
        }
      } catch {
        if (isMounted) {
          toast.error("Nepodařilo se načíst konfiguraci webu.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadConfig();
    return () => {
      isMounted = false;
    };
  }, []);
  const hasUnsavedChanges = useMemo(() => {
    if (!currentConfig || !savedConfig) return false;
    return currentConfig.welcomeHeading !== savedConfig.welcomeHeading || currentConfig.welcomePreamble !== savedConfig.welcomePreamble || currentConfig.storyTitle !== savedConfig.storyTitle || currentConfig.storyBody !== savedConfig.storyBody || currentConfig.isWebPublished !== savedConfig.isWebPublished || currentConfig.isShowcaseVisible !== savedConfig.isShowcaseVisible || currentConfig.isStoryVisible !== savedConfig.isStoryVisible || currentConfig.isInstagramVisible !== savedConfig.isInstagramVisible || currentConfig.isContactVisible !== savedConfig.isContactVisible;
  }, [currentConfig, savedConfig]);
  const handleToggle = (key: SectionKey, value: boolean) => {
    setCurrentConfig(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [key]: value
      };
    });
  };
  const handleTextChange = (key: TextKey, value: string) => {
    setCurrentConfig(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [key]: value
      };
    });
  };
  const handleSave = async () => {
    if (!currentConfig || isSaving) return;
    setIsSaving(true);
    try {
      const input = mapUiToInput(currentConfig);
      const updatedDto = await updateCmsConfig(input);
      const mapped = mapDtoToUi(updatedDto);
      setSavedConfig(mapped);
      setCurrentConfig(mapped);
      toast.success("Konfigurace webu a texty byly úspěšně uloženy!", {
        description: "Změny se okamžitě projevily na veřejném webu Kus Koláče."
      });
    } catch {
      toast.error("Nepodařilo se uložit konfiguraci webu.");
    } finally {
      setIsSaving(false);
    }
  };
  const handleReset = () => {
    if (!savedConfig) return;
    setCurrentConfig(savedConfig);
    toast.info("Formulář byl obnoven do naposledy uloženého stavu.");
  };
  const formattedUpdated = useMemo(() => {
    if (!savedConfig?.updatedAt) return "—";
    try {
      const date = new Date(savedConfig.updatedAt);
      if (isNaN(date.getTime())) return "Právě teď";
      return date.toLocaleTimeString("cs-CZ", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    } catch {
      return "Právě teď";
    }
  }, [savedConfig?.updatedAt]);
  if (isLoading) {
    return <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center py-24 text-muted-foreground">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm font-medium">Načítání konfigurace webu...</p>
        </div>
      </div>;
  }
  if (!currentConfig || !savedConfig) {
    return <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center py-24 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Nepodařilo se načíst konfiguraci webu.
          </p>
        </div>
      </div>;
  }
  return <div className="w-full max-w-full min-w-0 overflow-x-hidden p-4 lg:p-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <HeaderStrip isWebPublished={currentConfig.isWebPublished} hasUnsavedChanges={hasUnsavedChanges} lastUpdatedText={formattedUpdated} />

        <div className="grid min-w-0 grid-cols-1 items-start gap-6 xl:grid-cols-12">
          <div className="min-w-0 xl:col-span-5">
            <SectionsControlPanel config={currentConfig} onToggle={handleToggle} bakerySealUrl={BAKERY_SEAL_URL} />
          </div>

          <div className="min-w-0 xl:col-span-7">
            <TextsEditorPanel config={currentConfig} onChange={handleTextChange} />
          </div>
        </div>

        <ActionDock hasUnsavedChanges={hasUnsavedChanges} isSaving={isSaving} lastSavedAt={formattedUpdated} onSave={handleSave} onReset={handleReset} />
      </div>
    </div>;
}
