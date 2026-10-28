'use server';

import prisma from '@/tools/prisma';
import { withResult } from '@/backend/action_utils';
import { 
  InstagramConfigDTO, 
  InstagramPostDTO, 
  InstagramIntegrationPageData,
  UpdateInstagramConfigInput,
  UpsertInstagramPostInput,
  InstagramSyncStatus,
  InstagramFeedMode
} from '@/backend/types/AdminInstagramIntegration';

// Výchozí asset URL pro záložní feed pekařství
const DEFAULT_BAKERY_PHOTO = "https://www.autocoder.cc/background/zaki_prod/user_upload/0f449e57ada54f46b56f71df18d0ab10.jpg";

/**
 * Zajištění existence jediného konfiguračního záznamu instagram_config
 * Pravidlo domény: V systému existuje právě jeden konfigurační záznam integrace.
 */
async function getOrCreateConfig() {
  let config = await prisma.instagramConfig.findFirst();
  if (!config) {
    config = await prisma.instagramConfig.create({
      data: {
        accountHandle: "@kuskolace",
        syncStatus: "NEPROPOJENO",
        autoSync: false,
        feedMode: "FALLBACK",
        lastSyncAt: null,
      },
    });
  }
  return config;
}

/**
 * Načtení kompletních dat pro administrační obrazovku Instagram integrace
 */
export async function getInstagramIntegrationData(): Promise<InstagramIntegrationPageData> {
  return withResult(async () => {
    const configRaw = await getOrCreateConfig();
    const postsRaw = await prisma.instagramPost.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const config: InstagramConfigDTO = {
      id: configRaw.id, // data-from: InstagramConfig-id
      accountHandle: configRaw.accountHandle, // data-from: InstagramConfig-accountHandle
      syncStatus: "NEPROPOJENO" as InstagramSyncStatus, // data-from: InstagramConfig-syncStatus
      autoSync: false, // data-from: InstagramConfig-autoSync
      feedMode: "FALLBACK" as InstagramFeedMode, // data-from: InstagramConfig-feedMode
      lastSyncAt: null, // data-from: InstagramConfig-lastSyncAt
      createdAt: configRaw.createdAt, // data-from: InstagramConfig-createdAt
      updatedAt: configRaw.updatedAt, // data-from: InstagramConfig-updatedAt
    };

    const posts: InstagramPostDTO[] = postsRaw.map((p) => ({
      id: p.id, // data-from: InstagramPost-id
      caption: p.caption, // data-from: InstagramPost-caption
      photoKey: p.photoKey, // data-from: InstagramPost-photoKey data-role: image_url
      postUrl: p.postUrl, // data-from: InstagramPost-postUrl
      publishedLabel: p.publishedLabel, // data-from: InstagramPost-publishedLabel
      likesCount: p.likesCount, // data-from: InstagramPost-likesCount
      isFeatured: p.isFeatured, // data-from: InstagramPost-isFeatured
      isFromApi: p.isFromApi, // data-from: InstagramPost-isFromApi
      createdAt: p.createdAt, // data-from: InstagramPost-createdAt
      updatedAt: p.updatedAt, // data-from: InstagramPost-updatedAt
    }));

    return {
      config,
      posts,
    };
  })();
}

/**
 * Aktualizace konfigurace Instagram integrace a volba režimu (API vs. FALLBACK)
 * Doménové pravidlo: Při přepnutí do FALLBACK systém jasně indikuje ruční feed na webu
 */
export async function updateInstagramConfig(input: UpdateInstagramConfigInput): Promise<InstagramConfigDTO> {
  return withResult(async () => {
    if (input.feedMode !== "FALLBACK" || input.autoSync || input.syncStatus === "AUTORIZOVANO") throw new Error("Instagram API není v tomto projektu připojeno. Automatická synchronizace není implementována; použijte ruční výběr fotografií.");
    const existing = await getOrCreateConfig();

    const updated = await prisma.instagramConfig.update({
      where: {
        id: existing.id,
      },
      data: {
        accountHandle: input.accountHandle.trim() || "@kuskolace",
        syncStatus: "NEPROPOJENO",
        autoSync: false,
        feedMode: "FALLBACK",
      },
    });

    return {
      id: updated.id, // data-from: InstagramConfig-id
      accountHandle: updated.accountHandle, // data-from: InstagramConfig-accountHandle
      syncStatus: "NEPROPOJENO" as InstagramSyncStatus, // data-from: InstagramConfig-syncStatus
      autoSync: false, // data-from: InstagramConfig-autoSync
      feedMode: "FALLBACK" as InstagramFeedMode, // data-from: InstagramConfig-feedMode
      lastSyncAt: null, // data-from: InstagramConfig-lastSyncAt
      createdAt: updated.createdAt, // data-from: InstagramConfig-createdAt
      updatedAt: updated.updatedAt, // data-from: InstagramConfig-updatedAt
    };
  })();
}

/**
 * Instagram synchronization is unavailable until a real provider is configured.
 * Rejects the former simulation without modifying posts or success timestamps.
 */
export async function triggerInstagramSync(): Promise<InstagramIntegrationPageData> {
  return withResult(async () => { throw new Error("Instagram API není v tomto projektu připojeno. Automatická synchronizace není implementována; použijte ruční výběr fotografií."); })();
}

/**
 * Vytvoření nového nebo úprava stávajícího příspěvku (instagram_post)
 * Doménové pravidlo: likesCount nesmí být záporné číslo
 */
export async function upsertInstagramPost(input: UpsertInstagramPostInput): Promise<InstagramPostDTO> {
  return withResult(async () => {
    const likesSafe = Math.max(0, input.likesCount || 0);

    // Pokud nastavujeme isFeatured = true, ostatním můžeme zachovat nebo omezit dle preference
    if (input.isFeatured) {
      await prisma.instagramPost.updateMany({
        data: {
          isFeatured: false,
        },
      });
    }

    let saved;
    if (input.id) {
      saved = await prisma.instagramPost.update({
        where: {
          id: input.id,
        },
        data: {
          caption: input.caption,
          photoKey: input.photoKey || DEFAULT_BAKERY_PHOTO,
          postUrl: input.postUrl || "https://www.instagram.com/kuskolace",
          publishedLabel: input.publishedLabel || "Právě teď",
          likesCount: likesSafe,
          isFeatured: input.isFeatured,
          isFromApi: false,
        },
      });
    } else {
      saved = await prisma.instagramPost.create({
        data: {
          caption: input.caption,
          photoKey: input.photoKey || DEFAULT_BAKERY_PHOTO,
          postUrl: input.postUrl || "https://www.instagram.com/kuskolace",
          publishedLabel: input.publishedLabel || "Právě teď",
          likesCount: likesSafe,
          isFeatured: input.isFeatured,
          isFromApi: false,
        },
      });
    }

    return {
      id: saved.id, // data-from: InstagramPost-id
      caption: saved.caption, // data-from: InstagramPost-caption
      photoKey: saved.photoKey, // data-from: InstagramPost-photoKey data-role: image_url
      postUrl: saved.postUrl, // data-from: InstagramPost-postUrl
      publishedLabel: saved.publishedLabel, // data-from: InstagramPost-publishedLabel
      likesCount: saved.likesCount, // data-from: InstagramPost-likesCount
      isFeatured: saved.isFeatured, // data-from: InstagramPost-isFeatured
      isFromApi: saved.isFromApi, // data-from: InstagramPost-isFromApi
      createdAt: saved.createdAt, // data-from: InstagramPost-createdAt
      updatedAt: saved.updatedAt, // data-from: InstagramPost-updatedAt
    };
  })();
}

/**
 * Přepnutí příznaku hlavního zvýrazněného příspěvku (is_featured)
 */
export async function toggleFeaturedPost(postId: string): Promise<InstagramPostDTO[]> {
  return withResult(async () => {
    const target = await prisma.instagramPost.findUnique({
      where: { id: postId },
    });

    if (!target) {
      throw new Error(`Příspěvek s ID ${postId} nebyl nalezen.`);
    }

    const nextFeatured = !target.isFeatured;

    // Pokud nastavujeme na true, ostatní zrušíme
    if (nextFeatured) {
      await prisma.instagramPost.updateMany({
        data: {
          isFeatured: false,
        },
      });
    }

    await prisma.instagramPost.update({
      where: { id: postId },
      data: {
        isFeatured: nextFeatured,
      },
    });

    const all = await prisma.instagramPost.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return all.map((p) => ({
      id: p.id, // data-from: InstagramPost-id
      caption: p.caption, // data-from: InstagramPost-caption
      photoKey: p.photoKey, // data-from: InstagramPost-photoKey data-role: image_url
      postUrl: p.postUrl, // data-from: InstagramPost-postUrl
      publishedLabel: p.publishedLabel, // data-from: InstagramPost-publishedLabel
      likesCount: p.likesCount, // data-from: InstagramPost-likesCount
      isFeatured: p.isFeatured, // data-from: InstagramPost-isFeatured
      isFromApi: p.isFromApi, // data-from: InstagramPost-isFromApi
      createdAt: p.createdAt, // data-from: InstagramPost-createdAt
      updatedAt: p.updatedAt, // data-from: InstagramPost-updatedAt
    }));
  })();
}

/**
 * Smazání vybraného příspěvku z Instagram feedu
 */
export async function deleteInstagramPost(postId: string): Promise<boolean> {
  return withResult(async () => {
    await prisma.instagramPost.delete({
      where: {
        id: postId,
      },
    });
    return true;
  })();
}