'use server';

import prisma from '@/tools/prisma';
import { withResult } from '@/frontend/action_utils';
import type {
  HomePageData,
  BusinessFactsDTO,
  OpeningHourDTO,
  CmsConfigDTO,
  InstagramConfigDTO,
  PastryItemDTO,
  InstagramPostDTO,
  OpeningDayKey,
  PastryCategory,
  InstagramSyncStatus,
  InstagramFeedMode,
  PastryItemIngredients,
  PastryItemAllergens
} from '@/frontend/types/Home';

/**
 * Získá veškerá veřejná data pro domovskou stránku pekárny Kus Koláče:
 * - businessFacts: oficiální POI informace, hodnocení, kontakty, walk-in status
 * - openingHours: otevírací doba seřazená podle sortOrder
 * - cmsConfig: texty vítačky, příběh a přepínače viditelnosti jednotlivých sekcí
 * - instagramConfig: konfigurace feedu @kuskolace
 * - pastryItems: aktuální denní vitrína čerstvého pečiva seřazená podle displayOrder
 * - instagramPosts: příspěvky ze sociálních sítí
 */
export async function getHomePageData(): Promise<HomePageData> {
  return withResult(async () => {
    // 1. Business facts - předpokládá se 1 aktivní profil pekárny
    const rawBusinessFacts = await prisma.businessFacts.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    const businessFacts: BusinessFactsDTO | null = rawBusinessFacts
      ? {
          id: rawBusinessFacts.id, // data-from: BusinessFacts-id
          name: rawBusinessFacts.name, // data-from: BusinessFacts-name
          streetAddress: rawBusinessFacts.streetAddress, // data-from: BusinessFacts-streetAddress
          cityZip: rawBusinessFacts.cityZip, // data-from: BusinessFacts-cityZip
          phone: rawBusinessFacts.phone, // data-from: BusinessFacts-phone
          email: rawBusinessFacts.email, // data-from: BusinessFacts-email
          priceRangeCzk: rawBusinessFacts.priceRangeCzk, // data-from: BusinessFacts-priceRangeCzk
          ratingScore: rawBusinessFacts.ratingScore.toNumber(), // data-from: BusinessFacts-ratingScore
          reviewsCount: rawBusinessFacts.reviewsCount, // data-from: BusinessFacts-reviewsCount
          takeawayAvailable: rawBusinessFacts.takeawayAvailable, // data-from: BusinessFacts-takeawayAvailable
          deliveryAvailable: rawBusinessFacts.deliveryAvailable, // data-from: BusinessFacts-deliveryAvailable
          createdAt: rawBusinessFacts.createdAt, // data-from: BusinessFacts-createdAt
          updatedAt: rawBusinessFacts.updatedAt, // data-from: BusinessFacts-updatedAt
        }
      : null;

    // 2. Opening Hours - seřazené podle sortOrder
    const rawOpeningHours = await prisma.openingHour.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    const openingHours: OpeningHourDTO[] = rawOpeningHours.map((oh) => ({
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

    // 3. CMS Config - texty a viditelnost sekcí
    const rawCmsConfig = await prisma.cmsConfig.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    const cmsConfig: CmsConfigDTO | null = rawCmsConfig
      ? {
          id: rawCmsConfig.id, // data-from: CmsConfig-id
          welcomeHeading: rawCmsConfig.welcomeHeading, // data-from: CmsConfig-welcomeHeading
          welcomePreamble: rawCmsConfig.welcomePreamble, // data-from: CmsConfig-welcomePreamble
          storyTitle: rawCmsConfig.storyTitle, // data-from: CmsConfig-storyTitle
          storyBody: rawCmsConfig.storyBody, // data-from: CmsConfig-storyBody
          isStoryVisible: rawCmsConfig.isStoryVisible, // data-from: CmsConfig-isStoryVisible
          isShowcaseVisible: rawCmsConfig.isShowcaseVisible, // data-from: CmsConfig-isShowcaseVisible
          isInstagramVisible: rawCmsConfig.isInstagramVisible, // data-from: CmsConfig-isInstagramVisible
          isContactVisible: rawCmsConfig.isContactVisible, // data-from: CmsConfig-isContactVisible
          isWebPublished: rawCmsConfig.isWebPublished, // data-from: CmsConfig-isWebPublished
          createdAt: rawCmsConfig.createdAt, // data-from: CmsConfig-createdAt
          updatedAt: rawCmsConfig.updatedAt, // data-from: CmsConfig-updatedAt
        }
      : null;

    // 4. Instagram Config
    const rawInstagramConfig = await prisma.instagramConfig.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    const instagramConfig: InstagramConfigDTO | null = rawInstagramConfig
      ? {
          id: rawInstagramConfig.id, // data-from: InstagramConfig-id
          accountHandle: rawInstagramConfig.accountHandle, // data-from: InstagramConfig-accountHandle
          syncStatus: rawInstagramConfig.syncStatus as InstagramSyncStatus, // data-from: InstagramConfig-syncStatus
          autoSync: rawInstagramConfig.autoSync, // data-from: InstagramConfig-autoSync
          feedMode: rawInstagramConfig.feedMode as InstagramFeedMode, // data-from: InstagramConfig-feedMode
          lastSyncAt: rawInstagramConfig.lastSyncAt, // data-from: InstagramConfig-lastSyncAt
          createdAt: rawInstagramConfig.createdAt, // data-from: InstagramConfig-createdAt
          updatedAt: rawInstagramConfig.updatedAt, // data-from: InstagramConfig-updatedAt
        }
      : null;

    // 5. Pastry Items - položky denní vitríny
    const rawPastryItems = await prisma.pastryItem.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    const pastryItems: PastryItemDTO[] = rawPastryItems.map((pi) => {
      const ingredients = Array.isArray(pi.ingredients)
        ? (pi.ingredients as unknown as PastryItemIngredients)
        : [];
      const allergens = Array.isArray(pi.allergens)
        ? (pi.allergens as unknown as PastryItemAllergens)
        : [];

      return {
        id: pi.id, // data-from: PastryItem-id
        itemCode: pi.itemCode, // data-from: PastryItem-itemCode
        name: pi.name, // data-from: PastryItem-name
        category: pi.category as PastryCategory, // data-from: PastryItem-category
        priceCzk: pi.priceCzk, // data-from: PastryItem-priceCzk
        shortDescription: pi.shortDescription, // data-from: PastryItem-shortDescription
        fullDescription: pi.fullDescription, // data-from: PastryItem-fullDescription
        ingredients, // data-from: PastryItem-ingredients
        allergens, // data-from: PastryItem-allergens
        photoKey: pi.photoKey, // data-from: PastryItem-photoKey data-role: image_url
        isTodaySpecial: pi.isTodaySpecial, // data-from: PastryItem-isTodaySpecial
        isSoldOut: pi.isSoldOut, // data-from: PastryItem-isSoldOut
        freshnessLabel: pi.freshnessLabel, // data-from: PastryItem-freshnessLabel
        displayOrder: pi.displayOrder, // data-from: PastryItem-displayOrder
        createdAt: pi.createdAt, // data-from: PastryItem-createdAt
        updatedAt: pi.updatedAt, // data-from: PastryItem-updatedAt
      };
    });

    // 6. Instagram Posts
    const rawInstagramPosts = await prisma.instagramPost.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const instagramPosts: InstagramPostDTO[] = rawInstagramPosts.map((post) => ({
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

    return {
      businessFacts,
      openingHours,
      cmsConfig,
      instagramConfig,
      pastryItems,
      instagramPosts,
    };
  })();
}