/**
 * 枚举中心 — 从 prisma/schema.prisma 自动生成
 * 运行: npx tsx scripts/generate-schema-meta.ts
 * ⚠️ 请勿手动修改，schema 变更后重新生成
 */

export const AccountUserRole = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
} as const
export type AccountUserRoleType = typeof AccountUserRole[keyof typeof AccountUserRole]

export const OpeningDayKey = {
  PO: 'PO',
  UT: 'UT',
  ST: 'ST',
  CT: 'CT',
  PA: 'PA',
  SO: 'SO',
  NE: 'NE',
} as const
export type OpeningDayKeyType = typeof OpeningDayKey[keyof typeof OpeningDayKey]

export const InstagramSyncStatus = {
  AUTORIZOVANO: 'AUTORIZOVANO',
  NEPROPOJENO: 'NEPROPOJENO',
  NAHLEDOVY_REZIM: 'NAHLEDOVY_REZIM',
} as const
export type InstagramSyncStatusType = typeof InstagramSyncStatus[keyof typeof InstagramSyncStatus]

export const InstagramFeedMode = {
  API: 'API',
  FALLBACK: 'FALLBACK',
} as const
export type InstagramFeedModeType = typeof InstagramFeedMode[keyof typeof InstagramFeedMode]

export const PastryCategory = {
  OVOCNE_KOLACE: 'OVOCNE_KOLACE',
  KYNUTE_BUCHTY_A_LOUPAKY: 'KYNUTE_BUCHTY_A_LOUPAKY',
  SLANE_PECIVO: 'SLANE_PECIVO',
} as const
export type PastryCategoryType = typeof PastryCategory[keyof typeof PastryCategory]

export const ReservationStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  READY: 'READY',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const
export type ReservationStatusType = typeof ReservationStatus[keyof typeof ReservationStatus]

/** 所有枚举名称列表 */
export const ALL_ENUMS = ['AccountUserRole', 'OpeningDayKey', 'InstagramSyncStatus', 'InstagramFeedMode', 'PastryCategory', 'ReservationStatus'] as const
