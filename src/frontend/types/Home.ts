export type OpeningDayKey = "PO" | "UT" | "ST" | "CT" | "PA" | "SO" | "NE";

export type InstagramSyncStatus = "AUTORIZOVANO" | "NEPROPOJENO" | "NAHLEDOVY_REZIM";

export type InstagramFeedMode = "API" | "FALLBACK";

export type PastryCategory = "OVOCNE_KOLACE" | "KYNUTE_BUCHTY_A_LOUPAKY" | "SLANE_PECIVO";

export type PastryCategoryFilter = "ALL" | PastryCategory;

// Canonical types for Prisma Json fields
export type PastryItemIngredients = string[];
export type PastryItemAllergens = string[];

export interface BusinessFactsDTO {
  id: string; // data-from: BusinessFacts-id
  name: string; // data-from: BusinessFacts-name
  streetAddress: string; // data-from: BusinessFacts-streetAddress
  cityZip: string; // data-from: BusinessFacts-cityZip
  phone: string; // data-from: BusinessFacts-phone
  email: string; // data-from: BusinessFacts-email
  priceRangeCzk: string; // data-from: BusinessFacts-priceRangeCzk
  ratingScore: number; // data-from: BusinessFacts-ratingScore
  reviewsCount: number; // data-from: BusinessFacts-reviewsCount
  takeawayAvailable: boolean; // data-from: BusinessFacts-takeawayAvailable
  deliveryAvailable: boolean; // data-from: BusinessFacts-deliveryAvailable
  createdAt: Date; // data-from: BusinessFacts-createdAt
  updatedAt: Date; // data-from: BusinessFacts-updatedAt
}
export type BusinessFacts = BusinessFactsDTO;

export interface OpeningHourDTO {
  id: string; // data-from: OpeningHour-id
  dayKey: OpeningDayKey; // data-from: OpeningHour-dayKey
  dayName: string; // data-from: OpeningHour-dayName
  isOpen: boolean; // data-from: OpeningHour-isOpen
  openTime: string; // data-from: OpeningHour-openTime
  closeTime: string; // data-from: OpeningHour-closeTime
  note: string | null; // data-from: OpeningHour-note
  sortOrder: number; // data-from: OpeningHour-sortOrder
  createdAt: Date; // data-from: OpeningHour-createdAt
  updatedAt: Date; // data-from: OpeningHour-updatedAt
}
export type OpeningHour = OpeningHourDTO;

export interface CmsConfigDTO {
  id: string; // data-from: CmsConfig-id
  welcomeHeading: string; // data-from: CmsConfig-welcomeHeading
  welcomePreamble: string; // data-from: CmsConfig-welcomePreamble
  storyTitle: string; // data-from: CmsConfig-storyTitle
  storyBody: string; // data-from: CmsConfig-storyBody
  isStoryVisible: boolean; // data-from: CmsConfig-isStoryVisible
  isShowcaseVisible: boolean; // data-from: CmsConfig-isShowcaseVisible
  isInstagramVisible: boolean; // data-from: CmsConfig-isInstagramVisible
  isContactVisible: boolean; // data-from: CmsConfig-isContactVisible
  isWebPublished: boolean; // data-from: CmsConfig-isWebPublished
  createdAt: Date; // data-from: CmsConfig-createdAt
  updatedAt: Date; // data-from: CmsConfig-updatedAt
}
export type CmsConfig = CmsConfigDTO;

export interface InstagramConfigDTO {
  id: string; // data-from: InstagramConfig-id
  accountHandle: string; // data-from: InstagramConfig-accountHandle
  syncStatus: InstagramSyncStatus; // data-from: InstagramConfig-syncStatus
  autoSync: boolean; // data-from: InstagramConfig-autoSync
  feedMode: InstagramFeedMode; // data-from: InstagramConfig-feedMode
  lastSyncAt: string | null; // data-from: InstagramConfig-lastSyncAt
  createdAt: Date; // data-from: InstagramConfig-createdAt
  updatedAt: Date; // data-from: InstagramConfig-updatedAt
}
export type InstagramConfig = InstagramConfigDTO;

export interface PastryItemDTO {
  id: string; // data-from: PastryItem-id
  itemCode: string | null; // data-from: PastryItem-itemCode
  name: string; // data-from: PastryItem-name
  category: PastryCategory; // data-from: PastryItem-category
  priceCzk: number; // data-from: PastryItem-priceCzk
  shortDescription: string; // data-from: PastryItem-shortDescription
  fullDescription: string | null; // data-from: PastryItem-fullDescription
  ingredients: string[]; // data-from: PastryItem-ingredients
  allergens: string[]; // data-from: PastryItem-allergens
  photoKey: string; // data-from: PastryItem-photoKey data-role: image_url
  isTodaySpecial: boolean; // data-from: PastryItem-isTodaySpecial
  isSoldOut: boolean; // data-from: PastryItem-isSoldOut
  freshnessLabel: string; // data-from: PastryItem-freshnessLabel
  displayOrder: number; // data-from: PastryItem-displayOrder
  createdAt: Date; // data-from: PastryItem-createdAt
  updatedAt: Date; // data-from: PastryItem-updatedAt
}
export type PastryItem = PastryItemDTO;

export interface InstagramPostDTO {
  id: string; // data-from: InstagramPost-id
  caption: string; // data-from: InstagramPost-caption
  photoKey: string; // data-from: InstagramPost-photoKey data-role: image_url
  postUrl: string; // data-from: InstagramPost-postUrl
  publishedLabel: string; // data-from: InstagramPost-publishedLabel
  likesCount: number; // data-from: InstagramPost-likesCount
  isFeatured: boolean; // data-from: InstagramPost-isFeatured
  isFromApi: boolean; // data-from: InstagramPost-isFromApi
  createdAt: Date; // data-from: InstagramPost-createdAt
  updatedAt: Date; // data-from: InstagramPost-updatedAt
}
export type InstagramPost = InstagramPostDTO;

export interface HomePageData {
  businessFacts: BusinessFactsDTO | null;
  openingHours: OpeningHourDTO[];
  cmsConfig: CmsConfigDTO | null;
  instagramConfig: InstagramConfigDTO | null;
  pastryItems: PastryItemDTO[];
  instagramPosts: InstagramPostDTO[];
}