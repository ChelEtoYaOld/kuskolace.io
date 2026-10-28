export type OpeningDayKey = "PO" | "UT" | "ST" | "CT" | "PA" | "SO" | "NE";
export type DayKey = OpeningDayKey;

export interface BusinessFactsRecord {
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

export interface OpeningHourRecord {
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

export type BusinessFacts = BusinessFactsRecord;
export type OpeningHour = OpeningHourRecord;

export interface AdminBusinessFactsOutput {
  facts: BusinessFactsRecord | null;
  openingHours: OpeningHourRecord[];
}

export interface UpdateBusinessFactsInput {
  name: string;
  streetAddress: string;
  cityZip: string;
  phone: string;
  email: string;
  priceRangeCzk: string;
  ratingScore: number;
  reviewsCount: number;
  takeawayAvailable: boolean;
  deliveryAvailable: boolean;
}

export interface UpdateOpeningHourItem {
  id?: string;
  dayKey: OpeningDayKey;
  dayName: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  note: string | null;
  sortOrder: number;
}

export interface UpdateOpeningHoursInput {
  hours: UpdateOpeningHourItem[];
}

export interface SaveAllBusinessFactsInput {
  facts: UpdateBusinessFactsInput;
  openingHours: UpdateOpeningHourItem[];
}