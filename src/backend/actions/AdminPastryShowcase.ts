'use server';

import prisma from '@/tools/prisma';
import { withResult } from '@/backend/action_utils';
import {
  PastryItemDTO,
  PastryCategory,
  CreatePastryItemInput,
  UpdatePastryItemInput,
  MovePastryOrderInput,
  DeletePastryItemResult,
} from '@/backend/types/AdminPastryShowcase';

/**
 * Získat všechny položky pečiva z denní vitríny řazené vzestupně dle displayOrder.
 * Doménová pravidla:
 * - Cena v CZK je kladné celé číslo.
 * - Suroviny a alergeny jsou uloženy jako celistvá JSON pole stringů.
 */
export async function getPastryItems(): Promise<PastryItemDTO[]> {
  return withResult(async () => {
    const items = await prisma.pastryItem.findMany({
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'asc' },
      ],
    });

    return items.map((item) => ({
      id: item.id, // data-from: PastryItem-id
      itemCode: item.itemCode, // data-from: PastryItem-itemCode
      name: item.name, // data-from: PastryItem-name
      category: item.category as PastryCategory, // data-from: PastryItem-category
      priceCzk: item.priceCzk, // data-from: PastryItem-priceCzk
      shortDescription: item.shortDescription, // data-from: PastryItem-shortDescription
      fullDescription: item.fullDescription, // data-from: PastryItem-fullDescription
      ingredients: (Array.isArray(item.ingredients) ? item.ingredients : []) as string[], // data-from: PastryItem-ingredients
      allergens: (Array.isArray(item.allergens) ? item.allergens : []) as string[], // data-from: PastryItem-allergens
      photoKey: item.photoKey, // data-from: PastryItem-photoKey data-role: image_url
      isTodaySpecial: item.isTodaySpecial, // data-from: PastryItem-isTodaySpecial
      isSoldOut: item.isSoldOut, // data-from: PastryItem-isSoldOut
      freshnessLabel: item.freshnessLabel, // data-from: PastryItem-freshnessLabel
      displayOrder: item.displayOrder, // data-from: PastryItem-displayOrder
      createdAt: item.createdAt, // data-from: PastryItem-createdAt
      updatedAt: item.updatedAt, // data-from: PastryItem-updatedAt
    }));
  })();
}

/**
 * Vytvořit novou položku pečiva ve vitríně.
 * Doménové pravidlo:
 * - Cena v CZK musí být kladné celé číslo (min 1).
 * - Suroviny a alergeny se ukládají jako kompletní pole řetězců.
 */
export async function createPastryItem(
  input: CreatePastryItemInput
): Promise<PastryItemDTO> {
  return withResult(async () => {
    const sanitizedPrice = Math.max(1, Math.round(input.priceCzk));

    // Pokud není zadáno displayOrder, spočítáme další v pořadí
    let nextOrder = input.displayOrder;
    if (nextOrder === undefined || nextOrder === null) {
      const maxItem = await prisma.pastryItem.findFirst({
        orderBy: { displayOrder: 'desc' },
        select: { displayOrder: true },
      });
      nextOrder = (maxItem?.displayOrder ?? 0) + 1;
    }

    const created = await prisma.pastryItem.create({
      data: {
        itemCode: input.itemCode || null,
        name: input.name.trim(),
        category: input.category,
        priceCzk: sanitizedPrice,
        shortDescription: input.shortDescription.trim(),
        fullDescription: input.fullDescription ? input.fullDescription.trim() : null,
        ingredients: input.ingredients,
        allergens: input.allergens,
        photoKey: input.photoKey,
        isTodaySpecial: Boolean(input.isTodaySpecial),
        isSoldOut: Boolean(input.isSoldOut),
        freshnessLabel: input.freshnessLabel.trim(),
        displayOrder: nextOrder,
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
      ingredients: (Array.isArray(created.ingredients) ? created.ingredients : []) as string[], // data-from: PastryItem-ingredients
      allergens: (Array.isArray(created.allergens) ? created.allergens : []) as string[], // data-from: PastryItem-allergens
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
 * Úprava stávající položky pečiva správcem.
 * Aktualizuje veškeré atributy včetně kompletní náhrady polí surovin a alergenů.
 */
export async function updatePastryItem(
  input: UpdatePastryItemInput
): Promise<PastryItemDTO> {
  return withResult(async () => {
    const sanitizedPrice = Math.max(1, Math.round(input.priceCzk));

    const updated = await prisma.pastryItem.update({
      where: { id: input.id },
      data: {
        itemCode: input.itemCode || null,
        name: input.name.trim(),
        category: input.category,
        priceCzk: sanitizedPrice,
        shortDescription: input.shortDescription.trim(),
        fullDescription: input.fullDescription ? input.fullDescription.trim() : null,
        ingredients: input.ingredients,
        allergens: input.allergens,
        photoKey: input.photoKey,
        isTodaySpecial: Boolean(input.isTodaySpecial),
        isSoldOut: Boolean(input.isSoldOut),
        freshnessLabel: input.freshnessLabel.trim(),
        ...(input.displayOrder !== undefined ? { displayOrder: input.displayOrder } : {}),
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
      ingredients: (Array.isArray(updated.ingredients) ? updated.ingredients : []) as string[], // data-from: PastryItem-ingredients
      allergens: (Array.isArray(updated.allergens) ? updated.allergens : []) as string[], // data-from: PastryItem-allergens
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
 * Rychlé přepnutí stavu vyprodání (is_sold_out) přímo v řádku tabulky.
 */
export async function togglePastrySoldOut(id: string): Promise<PastryItemDTO> {
  return withResult(async () => {
    const current = await prisma.pastryItem.findUniqueOrThrow({
      where: { id },
      select: { isSoldOut: true },
    });

    const nextState = !current.isSoldOut;
    const nowTimeStr = new Date().toLocaleTimeString('cs-CZ', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const updated = await prisma.pastryItem.update({
      where: { id },
      data: {
        isSoldOut: nextState,
        freshnessLabel: nextState ? `Vyprodáno v ${nowTimeStr}` : 'Dostupné na pultu',
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
      ingredients: (Array.isArray(updated.ingredients) ? updated.ingredients : []) as string[], // data-from: PastryItem-ingredients
      allergens: (Array.isArray(updated.allergens) ? updated.allergens : []) as string[], // data-from: PastryItem-allergens
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
 * Rychlé přepnutí příznaku dnešní specialita (is_today_special) přímo v řádku.
 */
export async function togglePastryTodaySpecial(id: string): Promise<PastryItemDTO> {
  return withResult(async () => {
    const current = await prisma.pastryItem.findUniqueOrThrow({
      where: { id },
      select: { isTodaySpecial: true },
    });

    const updated = await prisma.pastryItem.update({
      where: { id },
      data: {
        isTodaySpecial: !current.isTodaySpecial,
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
      ingredients: (Array.isArray(updated.ingredients) ? updated.ingredients : []) as string[], // data-from: PastryItem-ingredients
      allergens: (Array.isArray(updated.allergens) ? updated.allergens : []) as string[], // data-from: PastryItem-allergens
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
 * Úprava pořadí zobrazení položky ve vitríně (posun nahoru/dolů se záměnou s nejbližším sousedem).
 */
export async function movePastryOrder(
  input: MovePastryOrderInput
): Promise<PastryItemDTO[]> {
  return withResult(async () => {
    const allItems = await prisma.pastryItem.findMany({
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'asc' },
      ],
    });

    const currentIndex = allItems.findIndex((it) => it.id === input.id);
    if (currentIndex === -1) return getPastryItems();

    const targetIndex =
      input.direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex >= 0 && targetIndex < allItems.length) {
      const current = allItems[currentIndex];
      const target = allItems[targetIndex];

      // Prohození displayOrder
      const tempOrder = current.displayOrder;
      const targetOrder = target.displayOrder === tempOrder ? tempOrder + (input.direction === 'up' ? -1 : 1) : target.displayOrder;

      await prisma.$transaction([
        prisma.pastryItem.update({
          where: { id: current.id },
          data: { displayOrder: targetOrder },
        }),
        prisma.pastryItem.update({
          where: { id: target.id },
          data: { displayOrder: tempOrder },
        }),
      ]);
    }

    return getPastryItems();
  })();
}

/**
 * Odstranění položky pečiva z denní vitríny.
 */
export async function deletePastryItem(id: string): Promise<DeletePastryItemResult> {
  return withResult(async () => {
    await prisma.pastryItem.delete({
      where: { id },
    });
    return {
      success: true,
      deletedId: id,
    };
  })();
}