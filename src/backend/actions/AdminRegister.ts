'use server';

import prisma from '@/tools/prisma';
import { hashPassword, withResult } from '@/backend/action_utils';
import type { RegisterAdminInput, RegisterAdminOutput, AccountUserRole } from '@/backend/types/AdminRegister';

/**
 * Registrace nového administrátora pekárny (role ADMIN).
 * 
 * 领域业务规则:
 * 1. E-mail musí být v rámci systému unikátní.
 * 2. Nově registrovaný správce získává výhradně a přímo roli ADMIN. Role není volitelná klientem.
 * 3. Heslo je zabezpečeno pomocí hashPassword() před uložením do account_user.passwordHash.
 * 4. Úspěšná registrace vrací záznam nového správce pro následné přihlášení v administraci.
 */
export async function registerAdmin(input: RegisterAdminInput): Promise<RegisterAdminOutput> {
  return withResult(async () => {
    const trimmedEmail = input.email.trim().toLowerCase();
    const trimmedName = input.fullName.trim();

    if (!trimmedEmail) {
      throw new Error("E-mailová adresa je povinná.");
    }

    if (!trimmedName || trimmedName.length < 3) {
      throw new Error("Celé jméno a příjmení musí mít alespoň 3 znaky.");
    }

    if (!input.password || input.password.length < 8) {
      throw new Error("Heslo musí mít alespoň 8 znaků.");
    }

    // Ověření unikátnosti e-mailu
    const existing = await prisma.accountUser.findUnique({
      where: { email: trimmedEmail },
      select: { id: true },
    });

    if (existing) {
      throw new Error("Účet se zadanou e-mailovou adresou již existuje.");
    }

    // Bezpečný hash hesla
    const passwordHash = hashPassword(input.password);

    // Vytvoření nového administrátora
    const createdUser = await prisma.accountUser.create({
      data: {
        email: trimmedEmail,
        fullName: trimmedName,
        passwordHash: passwordHash,
        role: "ADMIN",
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
      },
    });

    return {
      id: createdUser.id,
      email: createdUser.email,
      fullName: createdUser.fullName,
      role: createdUser.role as AccountUserRole,
      createdAt: createdUser.createdAt,
    };
  })();
}