'use server';

import prisma from '@/tools/prisma';
import {
  UnauthorizedError,
  hashPassword,
  signToken,
  withResult,
} from '@/backend/action_utils';
import type { AdminLoginInput, AdminLoginOutput, AccountUserRole } from '@/backend/types/AdminLogin';

/**
 * Přihlášení správce pekárny (role ADMIN)
 * 
 * Obchodní pravidla:
 * 1. E-mail musí být v rámci systému unikátní.
 * 2. Pouze uživatel s rolí ADMIN má přístup k administrátorským funkcím a správě vitríny a provozu.
 * 3. allowed_login_roles: ["ADMIN"]
 * 4. Ověření hashPassword(input.password) vůči poli passwordHash v tabulce account_users.
 * 5. Po ověření je vystaven bezstavový JWT token přes signToken(user.id, user.role).
 */
export async function loginAdmin(input: AdminLoginInput): Promise<AdminLoginOutput> {
  return withResult(async () => {
    const emailNormalized = input.email.trim().toLowerCase();

    // 1. Vyhledání uživatele podle e-mailu
    const user = await prisma.accountUser.findUnique({
      where: { email: emailNormalized },
    });

    if (!user) {
      throw new UnauthorizedError('Neplatný e-mail nebo heslo.');
    }

    // 2. Kontrola role: povolena je výhradně role ADMIN
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedError('Přístup odepřen. Vstup do administrace je vyhrazen pouze pro správce pekárny.');
    }

    // 3. Porovnání haše hesla
    const hashedInputPassword = hashPassword(input.password);
    if (user.passwordHash !== hashedInputPassword) {
      throw new UnauthorizedError('Neplatný e-mail nebo heslo.');
    }

    // 4. Vygenerování tokenu s identitou uživatele
    const token = await signToken(user.id, user.role);

    return {
      token,
      userId: user.id, // data-from: AccountUser-id
      email: user.email, // data-from: AccountUser-email
      fullName: user.fullName, // data-from: AccountUser-fullName
      role: user.role as AccountUserRole, // data-from: AccountUser-role
    };
  })();
}