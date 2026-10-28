'use server';

import prisma from '@/tools/prisma';
import { withResult } from '@/backend/action_utils';
import type {
  AdminHomeDashboardData,
  PastryItemDto,
  InstagramConfigDto,
  InstagramPostDto,
  CmsConfigDto,
  BusinessFactsDto,
  OpeningHourDto,
  CreatePastryItemInput,
  UpdatePastryItemInput,
  CreateInstagramPostInput,
  UpdateCmsTextsInput,
  UpdateBusinessFactsInput,
  UpdateOpeningHourTimeInput,
  InstagramFeedMode,
  InstagramSyncStatus,
  PastryCategory,
  OpeningDayKey
} from '@/backend/types/AdminHome';

/**
 * Získá kompletní diagnostická a provozní data pro dashboard Administrace Kus Koláče (B03)
 */
export async function getAdminHomeDashboard(): Promise<AdminHomeDashboardData> {
  return withResult(async () => {
    // 1. Vitrína pečiva seřazená podle displayOrder
    const pastryItemsRaw = await prisma.pastryItem.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    const pastryItems: PastryItemDto[] = pastryItemsRaw.map((item) => ({
      id: item.id, // data-from: PastryItem-id
      itemCode: item.itemCode, // data-from: PastryItem-itemCode
      name: item.name, // data-from: PastryItem-name
      category: item.category as PastryCategory, // data-from: PastryItem-category
      priceCzk: item.priceCzk, // data-from: PastryItem-priceCzk
      shortDescription: item.shortDescription, // data-from: PastryItem-shortDescription
      fullDescription: item.fullDescription, // data-from: PastryItem-fullDescription
      ingredients: (item.ingredients as string[]) || [], // data-from: PastryItem-ingredients
      allergens: (item.allergens as string[]) || [], // data-from: PastryItem-allergens
      photoKey: item.photoKey, // data-from: PastryItem-photoKey data-role: image_url
      isTodaySpecial: item.isTodaySpecial, // data-from: PastryItem-isTodaySpecial
      isSoldOut: item.isSoldOut, // data-from: PastryItem-isSoldOut
      freshnessLabel: item.freshnessLabel, // data-from: PastryItem-freshnessLabel
      displayOrder: item.displayOrder, // data-from: PastryItem-displayOrder
      createdAt: item.createdAt, // data-from: PastryItem-createdAt
      updatedAt: item.updatedAt, // data-from: PastryItem-updatedAt
    }));

    // 2. Instagram konfigurace (singleton)
    let igConfigRaw = await prisma.instagramConfig.findFirst();
    if (!igConfigRaw) {
      igConfigRaw = await prisma.instagramConfig.create({
        data: {
          accountHandle: '@kuskolace',
          syncStatus: "NEPROPOJENO",
          autoSync: false,
          feedMode: 'API',
          lastSyncAt: null,
        },
      });
    }

    const instagramConfig: InstagramConfigDto = {
      id: igConfigRaw.id, // data-from: InstagramConfig-id
      accountHandle: igConfigRaw.accountHandle, // data-from: InstagramConfig-accountHandle
      syncStatus: "NEPROPOJENO" as InstagramSyncStatus, // data-from: InstagramConfig-syncStatus
      autoSync: false, // data-from: InstagramConfig-autoSync
      feedMode: "FALLBACK" as InstagramFeedMode, // data-from: InstagramConfig-feedMode
      lastSyncAt: null, // data-from: InstagramConfig-lastSyncAt
      createdAt: igConfigRaw.createdAt, // data-from: InstagramConfig-createdAt
      updatedAt: igConfigRaw.updatedAt, // data-from: InstagramConfig-updatedAt
    };

    // 3. Instagram příspěvky feedu
    const igPostsRaw = await prisma.instagramPost.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const instagramPosts: InstagramPostDto[] = igPostsRaw.map((post) => ({
      id: post.id, // data-from: InstagramPost-id
      caption: post.caption, // data-from: InstagramPost-caption
      photoKey: post.photoKey, // data-from: InstagramPost-photoKey data-role: image_url
      postUrl: post.postUrl, // data-from: InstagramPost-postUrl
      publishedLabel: post.publishedLabel, // data-from: InstagramPost-publishedLabel
      likesCount: post.likesCount, // data-from: InstagramPost-likesCount
      isFeatured: post.isFeatured, // data-from: InstagramPost-isFeatured
      isFromApi: post.isFromApi, // data-from: InstagramPost-isFromApi
      createdAt: post.createdAt, // data-from: InstagramPost-createdAt
      updatedAt: post.updatedAt, // data-from: InstagramPost-updatedAt
    }));

    // 4. CMS konfigurace (singleton)
    let cmsConfigRaw = await prisma.cmsConfig.findFirst();
    if (!cmsConfigRaw) {
      cmsConfigRaw = await prisma.cmsConfig.create({
        data: {
          welcomeHeading: 'Poctivé vinohradské koláče s čerstvým ovocem a máslem',
          welcomePreamble: 'Řemeslná pekárna Kus Koláče na Korunní 90. Pečeme každé ráno od 08:00.',
          storyTitle: 'Příběh poctivého kynutého těsta na Vinohradech',
          storyBody:
            'Vše začíná u poctivého farmářského másla, žloutků z volného chovu a kynutého těsta, které necháváme v klidu vyzrát. Pečeme podle osvědčených receptur, s hromadou čerstvého lesního ovoce a křupavou drobenkou.',
          isStoryVisible: true,
          isShowcaseVisible: true,
          isInstagramVisible: true,
          isContactVisible: true,
          isWebPublished: true,
        },
      });
    }

    const cmsConfig: CmsConfigDto = {
      id: cmsConfigRaw.id, // data-from: CmsConfig-id
      welcomeHeading: cmsConfigRaw.welcomeHeading, // data-from: CmsConfig-welcomeHeading
      welcomePreamble: cmsConfigRaw.welcomePreamble, // data-from: CmsConfig-welcomePreamble
      storyTitle: cmsConfigRaw.storyTitle, // data-from: CmsConfig-storyTitle
      storyBody: cmsConfigRaw.storyBody, // data-from: CmsConfig-storyBody
      isStoryVisible: cmsConfigRaw.isStoryVisible, // data-from: CmsConfig-isStoryVisible
      isShowcaseVisible: cmsConfigRaw.isShowcaseVisible, // data-from: CmsConfig-isShowcaseVisible
      isInstagramVisible: cmsConfigRaw.isInstagramVisible, // data-from: CmsConfig-isInstagramVisible
      isContactVisible: cmsConfigRaw.isContactVisible, // data-from: CmsConfig-isContactVisible
      isWebPublished: cmsConfigRaw.isWebPublished, // data-from: CmsConfig-isWebPublished
      createdAt: cmsConfigRaw.createdAt, // data-from: CmsConfig-createdAt
      updatedAt: cmsConfigRaw.updatedAt, // data-from: CmsConfig-updatedAt
    };

    // 5. Provozní fakta (singleton)
    let factsRaw = await prisma.businessFacts.findFirst();
    if (!factsRaw) {
      factsRaw = await prisma.businessFacts.create({
        data: {
          name: 'Kus Koláče',
          streetAddress: 'Korunní 90',
          cityZip: '101 00 Vinohrady, Praha 2',
          phone: '608 903 828',
          email: 'info@kuskolace.cz',
          priceRangeCzk: '100–200 Kč',
          ratingScore: 4.8,
          reviewsCount: 342,
          takeawayAvailable: true,
          deliveryAvailable: false,
        },
      });
    }

    const businessFacts: BusinessFactsDto = {
      id: factsRaw.id, // data-from: BusinessFacts-id
      name: factsRaw.name, // data-from: BusinessFacts-name
      streetAddress: factsRaw.streetAddress, // data-from: BusinessFacts-streetAddress
      cityZip: factsRaw.cityZip, // data-from: BusinessFacts-cityZip
      phone: factsRaw.phone, // data-from: BusinessFacts-phone
      email: factsRaw.email, // data-from: BusinessFacts-email
      priceRangeCzk: factsRaw.priceRangeCzk, // data-from: BusinessFacts-priceRangeCzk
      ratingScore: Number(factsRaw.ratingScore), // data-from: BusinessFacts-ratingScore
      reviewsCount: factsRaw.reviewsCount, // data-from: BusinessFacts-reviewsCount
      takeawayAvailable: factsRaw.takeawayAvailable, // data-from: BusinessFacts-takeawayAvailable
      deliveryAvailable: factsRaw.deliveryAvailable, // data-from: BusinessFacts-deliveryAvailable
      createdAt: factsRaw.createdAt, // data-from: BusinessFacts-createdAt
      updatedAt: factsRaw.updatedAt, // data-from: BusinessFacts-updatedAt
    };

    // 6. Otevírací hodiny
    let openingHoursRaw = await prisma.openingHour.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    if (openingHoursRaw.length === 0) {
      const defaultDays: Array<{
        dayKey: OpeningDayKey;
        dayName: string;
        isOpen: boolean;
        openTime: string;
        closeTime: string;
        note: string;
        sortOrder: number;
      }> = [
        { dayKey: 'PO', dayName: 'Pondělí', isOpen: true, openTime: '08:00', closeTime: '18:00', note: 'Ranní pečení od 06:00', sortOrder: 1 },
        { dayKey: 'UT', dayName: 'Úterý', isOpen: true, openTime: '08:00', closeTime: '18:00', note: 'Plná vitrína', sortOrder: 2 },
        { dayKey: 'ST', dayName: 'Středa', isOpen: true, openTime: '08:00', closeTime: '18:00', note: 'Sezónní ovocné koláče', sortOrder: 3 },
        { dayKey: 'CT', dayName: 'Čtvrtek', isOpen: true, openTime: '08:00', closeTime: '18:00', note: 'Čerstvé loupáky a šneci', sortOrder: 4 },
        { dayKey: 'PA', dayName: 'Pátek', isOpen: true, openTime: '08:00', closeTime: '18:30', note: 'Víkendový předvýběr', sortOrder: 5 },
        { dayKey: 'SO', dayName: 'Sobota', isOpen: true, openTime: '08:00', closeTime: '15:00', note: 'Ranní fronta na koláče', sortOrder: 6 },
        { dayKey: 'NE', dayName: 'Neděle', isOpen: false, openTime: '08:00', closeTime: '14:00', note: 'Zavřeno pro přípravu těsta', sortOrder: 7 },
      ];

      for (const d of defaultDays) {
        await prisma.openingHour.create({ data: d });
      }

      openingHoursRaw = await prisma.openingHour.findMany({
        orderBy: { sortOrder: 'asc' },
      });
    }

    const openingHours: OpeningHourDto[] = openingHoursRaw.map((oh) => ({
      id: oh.id, // data-from: OpeningHour-id
      dayKey: oh.dayKey as OpeningDayKey, // data-from: OpeningHour-dayKey
      dayName: oh.dayName, // data-from: OpeningHour-dayName
      isOpen: oh.isOpen, // data-from: OpeningHour-isOpen
      openTime: oh.openTime, // data-from: OpeningHour-openTime
      closeTime: oh.closeTime, // data-from: OpeningHour-closeTime
      note: oh.note, // data-from: OpeningHour-note
      sortOrder: oh.sortOrder, // data-from: OpeningHour-sortOrder
      createdAt: oh.createdAt, // data-from: OpeningHour-createdAt
      updatedAt: oh.updatedAt, // data-from: OpeningHour-updatedAt
    }));

    return {
      pastryItems,
      instagramConfig,
      instagramPosts,
      cmsConfig,
      businessFacts,
      openingHours,
    };
  })();
}

/**
 * Přepne označení Dnešní specialita (isTodaySpecial) u položky pečiva
 */
export async function togglePastrySpecial(id: string): Promise<PastryItemDto> {
  return withResult(async () => {
    const item = await prisma.pastryItem.findUnique({ where: { id } });
    if (!item) throw new Error('Položka pečiva nebyla nalezena');

    const updated = await prisma.pastryItem.update({
      where: { id },
      data: { isTodaySpecial: !item.isTodaySpecial },
    });

    return {
      id: updated.id, // data-from: PastryItem-id
      itemCode: updated.itemCode, // data-from: PastryItem-itemCode
      name: updated.name, // data-from: PastryItem-name
      category: updated.category as PastryCategory, // data-from: PastryItem-category
      priceCzk: updated.priceCzk, // data-from: PastryItem-priceCzk
      shortDescription: updated.shortDescription, // data-from: PastryItem-shortDescription
      fullDescription: updated.fullDescription, // data-from: PastryItem-fullDescription
      ingredients: (updated.ingredients as string[]) || [], // data-from: PastryItem-ingredients
      allergens: (updated.allergens as string[]) || [], // data-from: PastryItem-allergens
      photoKey: updated.photoKey, // data-from: PastryItem-photoKey data-role: image_url
      isTodaySpecial: updated.isTodaySpecial, // data-from: PastryItem-isTodaySpecial
      isSoldOut: updated.isSoldOut, // data-from: PastryItem-isSoldOut
      freshnessLabel: updated.freshnessLabel, // data-from: PastryItem-freshnessLabel
      displayOrder: updated.displayOrder, // data-from: PastryItem-displayOrder
      createdAt: updated.createdAt, // data-from: PastryItem-createdAt
      updatedAt: updated.updatedAt, // data-from: PastryItem-updatedAt
    };
  })();
}

/**
 * Přepne indikátor vyprodání (isSoldOut) u položky pečiva
 */
export async function togglePastrySoldOut(id: string): Promise<PastryItemDto> {
  return withResult(async () => {
    const item = await prisma.pastryItem.findUnique({ where: { id } });
    if (!item) throw new Error('Položka pečiva nebyla nalezena');

    const updated = await prisma.pastryItem.update({
      where: { id },
      data: { isSoldOut: !item.isSoldOut },
    });

    return {
      id: updated.id, // data-from: PastryItem-id
      itemCode: updated.itemCode, // data-from: PastryItem-itemCode
      name: updated.name, // data-from: PastryItem-name
      category: updated.category as PastryCategory, // data-from: PastryItem-category
      priceCzk: updated.priceCzk, // data-from: PastryItem-priceCzk
      shortDescription: updated.shortDescription, // data-from: PastryItem-shortDescription
      fullDescription: updated.fullDescription, // data-from: PastryItem-fullDescription
      ingredients: (updated.ingredients as string[]) || [], // data-from: PastryItem-ingredients
      allergens: (updated.allergens as string[]) || [], // data-from: PastryItem-allergens
      photoKey: updated.photoKey, // data-from: PastryItem-photoKey data-role: image_url
      isTodaySpecial: updated.isTodaySpecial, // data-from: PastryItem-isTodaySpecial
      isSoldOut: updated.isSoldOut, // data-from: PastryItem-isSoldOut
      freshnessLabel: updated.freshnessLabel, // data-from: PastryItem-freshnessLabel
      displayOrder: updated.displayOrder, // data-from: PastryItem-displayOrder
      createdAt: updated.createdAt, // data-from: PastryItem-createdAt
      updatedAt: updated.updatedAt, // data-from: PastryItem-updatedAt
    };
  })();
}

/**
 * Vytvoří novou položku pečiva pro vitrínu
 */
export async function createPastryItem(input: CreatePastryItemInput): Promise<PastryItemDto> {
  return withResult(async () => {
    const count = await prisma.pastryItem.count();
    const created = await prisma.pastryItem.create({
      data: {
        name: input.name,
        category: input.category,
        priceCzk: input.priceCzk,
        shortDescription: input.shortDescription,
        photoKey: input.photoKey,
        freshnessLabel: input.freshnessLabel || 'Dnes upečeno',
        isTodaySpecial: input.isTodaySpecial ?? false,
        isSoldOut: false,
        displayOrder: count + 1,
        ingredients: ['pšeničná mouka', 'máslo', 'vejce'],
        allergens: ['1 (lepek)', '7 (mléko)'],
      },
    });

    return {
      id: created.id, // data-from: PastryItem-id
      itemCode: created.itemCode, // data-from: PastryItem-itemCode
      name: created.name, // data-from: PastryItem-name
      category: created.category as PastryCategory, // data-from: PastryItem-category
      priceCzk: created.priceCzk, // data-from: PastryItem-priceCzk
      shortDescription: created.shortDescription, // data-from: PastryItem-shortDescription
      fullDescription: created.fullDescription, // data-from: PastryItem-fullDescription
      ingredients: (created.ingredients as string[]) || [], // data-from: PastryItem-ingredients
      allergens: (created.allergens as string[]) || [], // data-from: PastryItem-allergens
      photoKey: created.photoKey, // data-from: PastryItem-photoKey data-role: image_url
      isTodaySpecial: created.isTodaySpecial, // data-from: PastryItem-isTodaySpecial
      isSoldOut: created.isSoldOut, // data-from: PastryItem-isSoldOut
      freshnessLabel: created.freshnessLabel, // data-from: PastryItem-freshnessLabel
      displayOrder: created.displayOrder, // data-from: PastryItem-displayOrder
      createdAt: created.createdAt, // data-from: PastryItem-createdAt
      updatedAt: created.updatedAt, // data-from: PastryItem-updatedAt
    };
  })();
}

/**
 * Upraví existující položku pečiva (název, cena apod.)
 */
export async function updatePastryItem(id: string, input: UpdatePastryItemInput): Promise<PastryItemDto> {
  return withResult(async () => {
    const updated = await prisma.pastryItem.update({
      where: { id },
      data: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.priceCzk !== undefined && { priceCzk: input.priceCzk }),
        ...(input.shortDescription !== undefined && { shortDescription: input.shortDescription }),
        ...(input.category !== undefined && { category: input.category }),
        ...(input.isTodaySpecial !== undefined && { isTodaySpecial: input.isTodaySpecial }),
        ...(input.isSoldOut !== undefined && { isSoldOut: input.isSoldOut }),
        ...(input.freshnessLabel !== undefined && { freshnessLabel: input.freshnessLabel }),
      },
    });

    return {
      id: updated.id, // data-from: PastryItem-id
      itemCode: updated.itemCode, // data-from: PastryItem-itemCode
      name: updated.name, // data-from: PastryItem-name
      category: updated.category as PastryCategory, // data-from: PastryItem-category
      priceCzk: updated.priceCzk, // data-from: PastryItem-priceCzk
      shortDescription: updated.shortDescription, // data-from: PastryItem-shortDescription
      fullDescription: updated.fullDescription, // data-from: PastryItem-fullDescription
      ingredients: (updated.ingredients as string[]) || [], // data-from: PastryItem-ingredients
      allergens: (updated.allergens as string[]) || [], // data-from: PastryItem-allergens
      photoKey: updated.photoKey, // data-from: PastryItem-photoKey data-role: image_url
      isTodaySpecial: updated.isTodaySpecial, // data-from: PastryItem-isTodaySpecial
      isSoldOut: updated.isSoldOut, // data-from: PastryItem-isSoldOut
      freshnessLabel: updated.freshnessLabel, // data-from: PastryItem-freshnessLabel
      displayOrder: updated.displayOrder, // data-from: PastryItem-displayOrder
      createdAt: updated.createdAt, // data-from: PastryItem-createdAt
      updatedAt: updated.updatedAt, // data-from: PastryItem-updatedAt
    };
  })();
}

/**
 * Odstraní položku pečiva z vitríny
 */
export async function deletePastryItem(id: string): Promise<{ success: boolean }> {
  return withResult(async () => {
    await prisma.pastryItem.delete({ where: { id } });
    return { success: true };
  })();
}

/**
 * Přeuspořádá pořadí dvou položek pečiva
 */
export async function reorderPastryItems(sourceId: string, targetId: string): Promise<{ success: boolean }> {
  return withResult(async () => {
    const itemA = await prisma.pastryItem.findUnique({ where: { id: sourceId } });
    const itemB = await prisma.pastryItem.findUnique({ where: { id: targetId } });
    if (!itemA || !itemB) throw new Error('Položky pro přeřazení nebyly nalezeny');

    await prisma.$transaction([
      prisma.pastryItem.update({
        where: { id: sourceId },
        data: { displayOrder: itemB.displayOrder },
      }),
      prisma.pastryItem.update({
        where: { id: targetId },
        data: { displayOrder: itemA.displayOrder },
      }),
    ]);

    return { success: true };
  })();
}

/**
 * Přepne provozní režim Instagram feedu (API vs FALLBACK)
 */
export async function toggleInstagramFeedMode(feedMode: InstagramFeedMode): Promise<InstagramConfigDto> {
  return withResult(async () => {
    if (feedMode !== "FALLBACK") throw new Error("Instagram API není v tomto projektu připojeno. Automatická synchronizace není implementována; použijte ruční výběr fotografií.");
    let cfg = await prisma.instagramConfig.findFirst();
    if (!cfg) {
      cfg = await prisma.instagramConfig.create({
        data: {
          accountHandle: '@kuskolace',
          syncStatus: "NEPROPOJENO",
          autoSync: false,
          feedMode,
          lastSyncAt: null,
        },
      });
    } else {
      cfg = await prisma.instagramConfig.update({
        where: { id: cfg.id },
        data: { feedMode },
      });
    }

    return {
      id: cfg.id, // data-from: InstagramConfig-id
      accountHandle: cfg.accountHandle, // data-from: InstagramConfig-accountHandle
      syncStatus: "NEPROPOJENO" as InstagramSyncStatus, // data-from: InstagramConfig-syncStatus
      autoSync: false, // data-from: InstagramConfig-autoSync
      feedMode: "FALLBACK" as InstagramFeedMode, // data-from: InstagramConfig-feedMode
      lastSyncAt: null, // data-from: InstagramConfig-lastSyncAt
      createdAt: cfg.createdAt, // data-from: InstagramConfig-createdAt
      updatedAt: cfg.updatedAt, // data-from: InstagramConfig-updatedAt
    };
  })();
}

/**
 * Přepne stav automatické synchronizace Instagramu (autoSync)
 */
export async function toggleInstagramAutoSync(): Promise<InstagramConfigDto> {
  return withResult(async () => { throw new Error("Instagram API není v tomto projektu připojeno. Automatická synchronizace není implementována; použijte ruční výběr fotografií."); })();
}

/**
 * Reject unavailable Instagram sync without writing fake success data.
 */
export async function manualSyncInstagram(): Promise<InstagramConfigDto> {
  return withResult(async () => { throw new Error("Instagram API není v tomto projektu připojeno. Automatická synchronizace není implementována; použijte ruční výběr fotografií."); })();
}

/**
 * Vloží nový příspěvek do záložního feedu Instagramu
 */
export async function createInstagramPost(input: CreateInstagramPostInput): Promise<InstagramPostDto> {
  return withResult(async () => {
    const post = await prisma.instagramPost.create({
      data: {
        caption: input.caption,
        photoKey: input.photoKey,
        postUrl: input.postUrl,
        publishedLabel: input.publishedLabel,
        likesCount: input.likesCount ?? 350,
        isFeatured: false,
        isFromApi: false,
      },
    });

    return {
      id: post.id, // data-from: InstagramPost-id
      caption: post.caption, // data-from: InstagramPost-caption
      photoKey: post.photoKey, // data-from: InstagramPost-photoKey data-role: image_url
      postUrl: post.postUrl, // data-from: InstagramPost-postUrl
      publishedLabel: post.publishedLabel, // data-from: InstagramPost-publishedLabel
      likesCount: post.likesCount, // data-from: InstagramPost-likesCount
      isFeatured: post.isFeatured, // data-from: InstagramPost-isFeatured
      isFromApi: post.isFromApi, // data-from: InstagramPost-isFromApi
      createdAt: post.createdAt, // data-from: InstagramPost-createdAt
      updatedAt: post.updatedAt, // data-from: InstagramPost-updatedAt
    };
  })();
}

/**
 * Smaže příspěvek z Instagram feedu
 */
export async function deleteInstagramPost(id: string): Promise<{ success: boolean }> {
  return withResult(async () => {
    await prisma.instagramPost.delete({ where: { id } });
    return { success: true };
  })();
}

/**
 * Přepne viditelnost sekce webu v CMS (isStoryVisible, isShowcaseVisible, isInstagramVisible, isContactVisible, isWebPublished)
 */
export async function toggleCmsSection(
  sectionKey: 'isStoryVisible' | 'isShowcaseVisible' | 'isInstagramVisible' | 'isContactVisible' | 'isWebPublished'
): Promise<CmsConfigDto> {
  return withResult(async () => {
    let cfg = await prisma.cmsConfig.findFirst();
    if (!cfg) {
      cfg = await prisma.cmsConfig.create({
        data: {
          welcomeHeading: 'Poctivé vinohradské koláče s čerstvým ovocem a máslem',
          welcomePreamble: 'Řemeslná pekárna Kus Koláče na Korunní 90. Pečeme každé ráno od 08:00.',
          storyTitle: 'Příběh poctivého kynutého těsta na Vinohradech',
          storyBody:
            'Vše začíná u poctivého farmářského másla, žloutků z volného chovu a kynutého těsta, které necháváme v klidu vyzrát.',
          isStoryVisible: true,
          isShowcaseVisible: true,
          isInstagramVisible: true,
          isContactVisible: true,
          isWebPublished: true,
          [sectionKey]: false,
        },
      });
    } else {
      cfg = await prisma.cmsConfig.update({
        where: { id: cfg.id },
        data: {
          [sectionKey]: !cfg[sectionKey],
        },
      });
    }

    return {
      id: cfg.id, // data-from: CmsConfig-id
      welcomeHeading: cfg.welcomeHeading, // data-from: CmsConfig-welcomeHeading
      welcomePreamble: cfg.welcomePreamble, // data-from: CmsConfig-welcomePreamble
      storyTitle: cfg.storyTitle, // data-from: CmsConfig-storyTitle
      storyBody: cfg.storyBody, // data-from: CmsConfig-storyBody
      isStoryVisible: cfg.isStoryVisible, // data-from: CmsConfig-isStoryVisible
      isShowcaseVisible: cfg.isShowcaseVisible, // data-from: CmsConfig-isShowcaseVisible
      isInstagramVisible: cfg.isInstagramVisible, // data-from: CmsConfig-isInstagramVisible
      isContactVisible: cfg.isContactVisible, // data-from: CmsConfig-isContactVisible
      isWebPublished: cfg.isWebPublished, // data-from: CmsConfig-isWebPublished
      createdAt: cfg.createdAt, // data-from: CmsConfig-createdAt
      updatedAt: cfg.updatedAt, // data-from: CmsConfig-updatedAt
    };
  })();
}

/**
 * Aktualizuje uvítací texty a příběh pekárny v CMS
 */
export async function updateCmsTexts(input: UpdateCmsTextsInput): Promise<CmsConfigDto> {
  return withResult(async () => {
    let cfg = await prisma.cmsConfig.findFirst();
    if (!cfg) {
      cfg = await prisma.cmsConfig.create({
        data: {
          welcomeHeading: input.welcomeHeading,
          welcomePreamble: input.welcomePreamble,
          storyTitle: input.storyTitle,
          storyBody: input.storyBody,
          isStoryVisible: true,
          isShowcaseVisible: true,
          isInstagramVisible: true,
          isContactVisible: true,
          isWebPublished: true,
        },
      });
    } else {
      cfg = await prisma.cmsConfig.update({
        where: { id: cfg.id },
        data: {
          welcomeHeading: input.welcomeHeading,
          welcomePreamble: input.welcomePreamble,
          storyTitle: input.storyTitle,
          storyBody: input.storyBody,
        },
      });
    }

    return {
      id: cfg.id, // data-from: CmsConfig-id
      welcomeHeading: cfg.welcomeHeading, // data-from: CmsConfig-welcomeHeading
      welcomePreamble: cfg.welcomePreamble, // data-from: CmsConfig-welcomePreamble
      storyTitle: cfg.storyTitle, // data-from: CmsConfig-storyTitle
      storyBody: cfg.storyBody, // data-from: CmsConfig-storyBody
      isStoryVisible: cfg.isStoryVisible, // data-from: CmsConfig-isStoryVisible
      isShowcaseVisible: cfg.isShowcaseVisible, // data-from: CmsConfig-isShowcaseVisible
      isInstagramVisible: cfg.isInstagramVisible, // data-from: CmsConfig-isInstagramVisible
      isContactVisible: cfg.isContactVisible, // data-from: CmsConfig-isContactVisible
      isWebPublished: cfg.isWebPublished, // data-from: CmsConfig-isWebPublished
      createdAt: cfg.createdAt, // data-from: CmsConfig-createdAt
      updatedAt: cfg.updatedAt, // data-from: CmsConfig-updatedAt
    };
  })();
}

/**
 * Uloží aktualizovaná fakta pekárny (název, adresa, telefon, cenové rozpětí)
 */
export async function updateBusinessFacts(input: UpdateBusinessFactsInput): Promise<BusinessFactsDto> {
  return withResult(async () => {
    let facts = await prisma.businessFacts.findFirst();
    if (!facts) {
      facts = await prisma.businessFacts.create({
        data: {
          name: input.name,
          streetAddress: input.streetAddress,
          cityZip: input.cityZip,
          phone: input.phone,
          priceRangeCzk: input.priceRangeCzk,
          email: 'info@kuskolace.cz',
          ratingScore: 4.8,
          reviewsCount: 342,
          takeawayAvailable: true,
          deliveryAvailable: false,
        },
      });
    } else {
      facts = await prisma.businessFacts.update({
        where: { id: facts.id },
        data: {
          name: input.name,
          streetAddress: input.streetAddress,
          cityZip: input.cityZip,
          phone: input.phone,
          priceRangeCzk: input.priceRangeCzk,
        },
      });
    }

    return {
      id: facts.id, // data-from: BusinessFacts-id
      name: facts.name, // data-from: BusinessFacts-name
      streetAddress: facts.streetAddress, // data-from: BusinessFacts-streetAddress
      cityZip: facts.cityZip, // data-from: BusinessFacts-cityZip
      phone: facts.phone, // data-from: BusinessFacts-phone
      email: facts.email, // data-from: BusinessFacts-email
      priceRangeCzk: facts.priceRangeCzk, // data-from: BusinessFacts-priceRangeCzk
      ratingScore: Number(facts.ratingScore), // data-from: BusinessFacts-ratingScore
      reviewsCount: facts.reviewsCount, // data-from: BusinessFacts-reviewsCount
      takeawayAvailable: facts.takeawayAvailable, // data-from: BusinessFacts-takeawayAvailable
      deliveryAvailable: facts.deliveryAvailable, // data-from: BusinessFacts-deliveryAvailable
      createdAt: facts.createdAt, // data-from: BusinessFacts-createdAt
      updatedAt: facts.updatedAt, // data-from: BusinessFacts-updatedAt
    };
  })();
}

/**
 * Přepne otevřeno/zavřeno pro konkrétní den v týdnu
 */
export async function toggleOpeningDayOpen(dayKey: OpeningDayKey): Promise<OpeningHourDto> {
  return withResult(async () => {
    const day = await prisma.openingHour.findUnique({ where: { dayKey } });
    if (!day) throw new Error(`Záznam dne ${dayKey} nebyl nalezen`);

    const updated = await prisma.openingHour.update({
      where: { dayKey },
      data: { isOpen: !day.isOpen },
    });

    return {
      id: updated.id, // data-from: OpeningHour-id
      dayKey: updated.dayKey as OpeningDayKey, // data-from: OpeningHour-dayKey
      dayName: updated.dayName, // data-from: OpeningHour-dayName
      isOpen: updated.isOpen, // data-from: OpeningHour-isOpen
      openTime: updated.openTime, // data-from: OpeningHour-openTime
      closeTime: updated.closeTime, // data-from: OpeningHour-closeTime
      note: updated.note, // data-from: OpeningHour-note
      sortOrder: updated.sortOrder, // data-from: OpeningHour-sortOrder
      createdAt: updated.createdAt, // data-from: OpeningHour-createdAt
      updatedAt: updated.updatedAt, // data-from: OpeningHour-updatedAt
    };
  })();
}

/**
 * Upraví časy otevření a zavření pro konkrétní den v týdnu
 */
export async function updateOpeningHourTimes(
  dayKey: OpeningDayKey,
  input: UpdateOpeningHourTimeInput
): Promise<OpeningHourDto> {
  return withResult(async () => {
    const updated = await prisma.openingHour.update({
      where: { dayKey },
      data: {
        openTime: input.openTime,
        closeTime: input.closeTime,
      },
    });

    return {
      id: updated.id, // data-from: OpeningHour-id
      dayKey: updated.dayKey as OpeningDayKey, // data-from: OpeningHour-dayKey
      dayName: updated.dayName, // data-from: OpeningHour-dayName
      isOpen: updated.isOpen, // data-from: OpeningHour-isOpen
      openTime: updated.openTime, // data-from: OpeningHour-openTime
      closeTime: updated.closeTime, // data-from: OpeningHour-closeTime
      note: updated.note, // data-from: OpeningHour-note
      sortOrder: updated.sortOrder, // data-from: OpeningHour-sortOrder
      createdAt: updated.createdAt, // data-from: OpeningHour-createdAt
      updatedAt: updated.updatedAt, // data-from: OpeningHour-updatedAt
    };
  })();
}