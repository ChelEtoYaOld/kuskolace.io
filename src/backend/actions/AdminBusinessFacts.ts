'use server';

import prisma from '@/tools/prisma';
import {
  withResult,
  requireRole,
  UserRole,
} from '@/backend/action_utils';
import {
  AdminBusinessFactsOutput,
  BusinessFactsRecord,
  OpeningHourRecord,
  OpeningDayKey,
  SaveAllBusinessFactsInput,
} from '@/backend/types/AdminBusinessFacts';

/**
 * Získání aktuálních provozních údajů a týdenního rozpisu otevírací doby pekárny.
 * Vyžaduje roli ADMIN.
 */
export async function getAdminBusinessFacts(): Promise<AdminBusinessFactsOutput> {
  return withResult(
    requireRole(UserRole.Admin)(async () => {
      const facts = await prisma.businessFacts.findFirst();
      const hours = await prisma.openingHour.findMany({
        orderBy: { sortOrder: 'asc' },
      });

      const factsRecord: BusinessFactsRecord | null = facts
        ? {
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
          }
        : null;

      const openingHoursRecords: OpeningHourRecord[] = hours.map((h) => ({
        id: h.id, // data-from: OpeningHour-id
        dayKey: h.dayKey as OpeningDayKey, // data-from: OpeningHour-dayKey
        dayName: h.dayName, // data-from: OpeningHour-dayName
        isOpen: h.isOpen, // data-from: OpeningHour-isOpen
        openTime: h.openTime, // data-from: OpeningHour-openTime
        closeTime: h.closeTime, // data-from: OpeningHour-closeTime
        note: h.note, // data-from: OpeningHour-note
        sortOrder: h.sortOrder, // data-from: OpeningHour-sortOrder
        createdAt: h.createdAt, // data-from: OpeningHour-createdAt
        updatedAt: h.updatedAt, // data-from: OpeningHour-updatedAt
      }));

      return {
        facts: factsRecord,
        openingHours: openingHoursRecords,
      };
    })
  )();
}

/**
 * Uložení upravených provozních údajů a otevírací doby.
 * Vyžaduje roli ADMIN.
 */
export async function saveBusinessFactsAndHours(
  input: SaveAllBusinessFactsInput
): Promise<AdminBusinessFactsOutput> {
  return withResult(
    requireRole(UserRole.Admin)(async () => {
      // 1. Aktualizace nebo vytvoření profilu pekárny
      const existingFacts = await prisma.businessFacts.findFirst();
      if (existingFacts) {
        await prisma.businessFacts.update({
          where: { id: existingFacts.id },
          data: {
            name: input.facts.name,
            streetAddress: input.facts.streetAddress,
            cityZip: input.facts.cityZip,
            phone: input.facts.phone,
            email: input.facts.email,
            priceRangeCzk: input.facts.priceRangeCzk,
            ratingScore: input.facts.ratingScore,
            reviewsCount: input.facts.reviewsCount,
            takeawayAvailable: input.facts.takeawayAvailable,
            deliveryAvailable: input.facts.deliveryAvailable,
          },
        });
      } else {
        await prisma.businessFacts.create({
          data: {
            name: input.facts.name,
            streetAddress: input.facts.streetAddress,
            cityZip: input.facts.cityZip,
            phone: input.facts.phone,
            email: input.facts.email,
            priceRangeCzk: input.facts.priceRangeCzk,
            ratingScore: input.facts.ratingScore,
            reviewsCount: input.facts.reviewsCount,
            takeawayAvailable: input.facts.takeawayAvailable,
            deliveryAvailable: input.facts.deliveryAvailable,
          },
        });
      }

      // 2. Aktualizace záznamů otevírací doby pro jednotlivé dny
      for (const h of input.openingHours) {
        await prisma.openingHour.upsert({
          where: { dayKey: h.dayKey },
          update: {
            dayName: h.dayName,
            isOpen: h.isOpen,
            openTime: h.openTime,
            closeTime: h.closeTime,
            note: h.note,
            sortOrder: h.sortOrder,
          },
          create: {
            dayKey: h.dayKey,
            dayName: h.dayName,
            isOpen: h.isOpen,
            openTime: h.openTime,
            closeTime: h.closeTime,
            note: h.note,
            sortOrder: h.sortOrder,
          },
        });
      }

      // 3. Vrátit čerstvá data
      const updatedFacts = await prisma.businessFacts.findFirstOrThrow();
      const updatedHours = await prisma.openingHour.findMany({
        orderBy: { sortOrder: 'asc' },
      });

      return {
        facts: {
          id: updatedFacts.id,
          name: updatedFacts.name,
          streetAddress: updatedFacts.streetAddress,
          cityZip: updatedFacts.cityZip,
          phone: updatedFacts.phone,
          email: updatedFacts.email,
          priceRangeCzk: updatedFacts.priceRangeCzk,
          ratingScore: Number(updatedFacts.ratingScore),
          reviewsCount: updatedFacts.reviewsCount,
          takeawayAvailable: updatedFacts.takeawayAvailable,
          deliveryAvailable: updatedFacts.deliveryAvailable,
          createdAt: updatedFacts.createdAt,
          updatedAt: updatedFacts.updatedAt,
        },
        openingHours: updatedHours.map((h) => ({
          id: h.id,
          dayKey: h.dayKey as OpeningDayKey,
          dayName: h.dayName,
          isOpen: h.isOpen,
          openTime: h.openTime,
          closeTime: h.closeTime,
          note: h.note,
          sortOrder: h.sortOrder,
          createdAt: h.createdAt,
          updatedAt: h.updatedAt,
        })),
      };
    })
  )();
}