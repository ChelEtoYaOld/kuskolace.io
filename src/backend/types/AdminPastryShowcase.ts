export type PastryCategory = "OVOCNE_KOLACE" | "KYNUTE_BUCHTY_A_LOUPAKY" | "SLANE_PECIVO";

/// Seznam použitých surovin
/// ![Array<string>]
export type PastryIngredients = string[];

/// Seznam alergenů s číselnými kódy
/// ![Array<string>]
export type PastryAllergens = string[];

export interface PastryItemDTO {
  id: string; // data-from: PastryItem-id
  itemCode: string | null; // data-from: PastryItem-itemCode
  name: string; // data-from: PastryItem-name
  category: PastryCategory; // data-from: PastryItem-category
  priceCzk: number; // data-from: PastryItem-priceCzk
  shortDescription: string; // data-from: PastryItem-shortDescription
  fullDescription: string | null; // data-from: PastryItem-fullDescription
  ingredients: PastryIngredients; // data-from: PastryItem-ingredients
  allergens: PastryAllergens; // data-from: PastryItem-allergens
  photoKey: string; // data-from: PastryItem-photoKey data-role: image_url
  isTodaySpecial: boolean; // data-from: PastryItem-isTodaySpecial
  isSoldOut: boolean; // data-from: PastryItem-isSoldOut
  freshnessLabel: string; // data-from: PastryItem-freshnessLabel
  displayOrder: number; // data-from: PastryItem-displayOrder
  createdAt: Date; // data-from: PastryItem-createdAt
  updatedAt: Date; // data-from: PastryItem-updatedAt
}

// UI ViewModel compatibility alias
export type PastryItem = PastryItemDTO;

export interface CreatePastryItemInput {
  itemCode?: string | null;
  name: string;
  category: PastryCategory;
  priceCzk: number;
  shortDescription: string;
  fullDescription?: string | null;
  ingredients: PastryIngredients;
  allergens: PastryAllergens;
  photoKey: string;
  isTodaySpecial?: boolean;
  isSoldOut?: boolean;
  freshnessLabel: string;
  displayOrder?: number;
}

export interface UpdatePastryItemInput {
  id: string;
  itemCode?: string | null;
  name: string;
  category: PastryCategory;
  priceCzk: number;
  shortDescription: string;
  fullDescription?: string | null;
  ingredients: PastryIngredients;
  allergens: PastryAllergens;
  photoKey: string;
  isTodaySpecial?: boolean;
  isSoldOut?: boolean;
  freshnessLabel: string;
  displayOrder?: number;
}

export interface MovePastryOrderInput {
  id: string;
  direction: "up" | "down";
}

export interface DeletePastryItemResult {
  success: boolean;
  deletedId: string;
}

export type AvailabilityFilter = "ALL" | "AVAILABLE" | "SOLD_OUT";

export interface PastryFilterState {
  category: "ALL" | PastryCategory;
  availability: AvailabilityFilter;
  searchQuery: string;
}

export interface PastryFormData {
  id?: string;
  itemCode?: string;
  name: string;
  category: PastryCategory;
  priceCzk: number;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  allergens: string[];
  photoKey: string;
  isTodaySpecial: boolean;
  isSoldOut: boolean;
  freshnessLabel: string;
  displayOrder: number;
}