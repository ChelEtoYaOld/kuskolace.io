'use server';

import prisma from '@/tools/prisma';
import { withResult, requireRole, UserRole } from '@/backend/action_utils';
import type { CmsConfigDto, UpdateCmsConfigInput } from '@/backend/types/AdminCmsSections';

/**
 * Získání aktuální konfigurace CMS (sekce, přepínače a texty)
 * Doménové pravidlo: V systému existuje právě jedna konfigurace textů a viditelnosti sekcí,
 * kterou spravuje výhradně ADMIN. Pokud dosud v DB neexistuje, vytvoří se výchozí záznam pro Kus Koláče.
 */
export async function getCmsConfig(): Promise<CmsConfigDto> {
  return withResult(
    requireRole(UserRole.Admin)(async (): Promise<CmsConfigDto> => {
      let config = await prisma.cmsConfig.findFirst({
        orderBy: { createdAt: 'asc' },
      });

      if (!config) {
        config = await prisma.cmsConfig.create({
          data: {
            welcomeHeading: 'Kus Koláče – Řemeslné pečení s vůní poctivého másla',
            welcomePreamble:
              'Každé ráno zaděláváme kynutá těsta podle staročeských receptur. Pečeme tradiční kynuté koláče s tvarohem, povidly, mákem a sezónním ovocem od lokálních sadařů na pražských Vinohradech.',
            storyTitle: 'O našem těstě, ranním kynutí a poctivém řemesle',
            storyBody:
              'Příběh Kus Koláče začal touhou vrátit do Prahy vůni skutečného venkovského koláče, jaký pekly naše babičky. Nepoužíváme žádné směsi ani umělá kypřidla – pouze výběrovou mouku z rodinného mlýna, farmářské čerstvé máslo, poctivý plnotučný tvaroh a ovoce z českých sadů.\n\nTěsto kyne pomalu v chladu, aby získalo svou typickou jemnost a plnou chuť. Ráno v pět roztápíme pece a sypeme na plechy bohatou máslovou drobenku. Pečeme v malých várkách po celý den, aby byl každý koláč na pultu ještě vlahý.',
            isWebPublished: true,
            isShowcaseVisible: true,
            isStoryVisible: true,
            isInstagramVisible: true,
            isContactVisible: true,
          },
        });
      }

      return {
        id: config.id, // data-from: CmsConfig-id
        welcomeHeading: config.welcomeHeading, // data-from: CmsConfig-welcomeHeading
        welcomePreamble: config.welcomePreamble, // data-from: CmsConfig-welcomePreamble
        storyTitle: config.storyTitle, // data-from: CmsConfig-storyTitle
        storyBody: config.storyBody, // data-from: CmsConfig-storyBody
        isStoryVisible: config.isStoryVisible, // data-from: CmsConfig-isStoryVisible
        isShowcaseVisible: config.isShowcaseVisible, // data-from: CmsConfig-isShowcaseVisible
        isInstagramVisible: config.isInstagramVisible, // data-from: CmsConfig-isInstagramVisible
        isContactVisible: config.isContactVisible, // data-from: CmsConfig-isContactVisible
        isWebPublished: config.isWebPublished, // data-from: CmsConfig-isWebPublished
        createdAt: config.createdAt, // data-from: CmsConfig-createdAt
        updatedAt: config.updatedAt, // data-from: CmsConfig-updatedAt
      };
    })
  )();
}

/**
 * Uložení nastavení CMS (přepínače viditelnosti + texty Hero a příběhu)
 * Doménové pravidlo: Změny se okamžitě ukládají do jediného aktivního záznamu cms_config.
 */
export async function updateCmsConfig(input: UpdateCmsConfigInput): Promise<CmsConfigDto> {
  return withResult(
    requireRole(UserRole.Admin)(async (): Promise<CmsConfigDto> => {
      const existing = await prisma.cmsConfig.findFirst({
        orderBy: { createdAt: 'asc' },
      });

      let updated;
      if (existing) {
        updated = await prisma.cmsConfig.update({
          where: { id: existing.id },
          data: {
            welcomeHeading: input.welcomeHeading,
            welcomePreamble: input.welcomePreamble,
            storyTitle: input.storyTitle,
            storyBody: input.storyBody,
            isStoryVisible: input.isStoryVisible,
            isShowcaseVisible: input.isShowcaseVisible,
            isInstagramVisible: input.isInstagramVisible,
            isContactVisible: input.isContactVisible,
            isWebPublished: input.isWebPublished,
          },
        });
      } else {
        updated = await prisma.cmsConfig.create({
          data: {
            welcomeHeading: input.welcomeHeading,
            welcomePreamble: input.welcomePreamble,
            storyTitle: input.storyTitle,
            storyBody: input.storyBody,
            isStoryVisible: input.isStoryVisible,
            isShowcaseVisible: input.isShowcaseVisible,
            isInstagramVisible: input.isInstagramVisible,
            isContactVisible: input.isContactVisible,
            isWebPublished: input.isWebPublished,
          },
        });
      }

      return {
        id: updated.id, // data-from: CmsConfig-id
        welcomeHeading: updated.welcomeHeading, // data-from: CmsConfig-welcomeHeading
        welcomePreamble: updated.welcomePreamble, // data-from: CmsConfig-welcomePreamble
        storyTitle: updated.storyTitle, // data-from: CmsConfig-storyTitle
        storyBody: updated.storyBody, // data-from: CmsConfig-storyBody
        isStoryVisible: updated.isStoryVisible, // data-from: CmsConfig-isStoryVisible
        isShowcaseVisible: updated.isShowcaseVisible, // data-from: CmsConfig-isShowcaseVisible
        isInstagramVisible: updated.isInstagramVisible, // data-from: CmsConfig-isInstagramVisible
        isContactVisible: updated.isContactVisible, // data-from: CmsConfig-isContactVisible
        isWebPublished: updated.isWebPublished, // data-from: CmsConfig-isWebPublished
        createdAt: updated.createdAt, // data-from: CmsConfig-createdAt
        updatedAt: updated.updatedAt, // data-from: CmsConfig-updatedAt
      };
    })
  )();
}