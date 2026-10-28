export type AccountUserRole = 'CUSTOMER' | 'ADMIN';

export type OpeningDayKey = 'PO' | 'UT' | 'ST' | 'CT' | 'PA' | 'SO' | 'NE';

export type InstagramSyncStatus = 'AUTORIZOVANO' | 'NEPROPOJENO' | 'NAHLEDOVY_REZIM';

export type InstagramFeedMode = 'API' | 'FALLBACK';

export type PastryCategory = 'OVOCNE_KOLACE' | 'KYNUTE_BUCHTY_A_LOUPAKY' | 'SLANE_PECIVO';

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'READY' | 'COMPLETED' | 'CANCELLED';

export type AccountUser_uniqueKey = {
  id: string; // Unique Key
};

export type AccountUser_without_PKs = {
  email: string;
  passwordHash: string;
  fullName: string;
  phone?: string | null;
  role: AccountUserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type AccountUser = AccountUser_uniqueKey & AccountUser_without_PKs;



export type BusinessFacts_uniqueKey = {
  id: string; // Unique Key
};

export type BusinessFacts_without_PKs = {
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
  createdAt: Date;
  updatedAt: Date;
};

export type BusinessFacts = BusinessFacts_uniqueKey & BusinessFacts_without_PKs;



export type OpeningHour_uniqueKey = {
  id: string; // Unique Key
};

export type OpeningHour_without_PKs = {
  dayKey: OpeningDayKey;
  dayName: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  note?: string | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type OpeningHour = OpeningHour_uniqueKey & OpeningHour_without_PKs;



export type CmsConfig_uniqueKey = {
  id: string; // Unique Key
};

export type CmsConfig_without_PKs = {
  welcomeHeading: string;
  welcomePreamble: string;
  storyTitle: string;
  storyBody: string;
  isStoryVisible: boolean;
  isShowcaseVisible: boolean;
  isInstagramVisible: boolean;
  isContactVisible: boolean;
  isWebPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CmsConfig = CmsConfig_uniqueKey & CmsConfig_without_PKs;



export type InstagramConfig_uniqueKey = {
  id: string; // Unique Key
};

export type InstagramConfig_without_PKs = {
  accountHandle: string;
  syncStatus: InstagramSyncStatus;
  autoSync: boolean;
  feedMode: InstagramFeedMode;
  lastSyncAt?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type InstagramConfig = InstagramConfig_uniqueKey & InstagramConfig_without_PKs;



export type PastryItem_uniqueKey = {
  id: string; // Unique Key
};

export type PastryItem_without_PKs = {
  itemCode?: string | null;
  name: string;
  category: PastryCategory;
  priceCzk: number;
  shortDescription: string;
  fullDescription?: string | null;
  ingredients: any; /// Seznam použitých surovin /// ![Array<string>]
  allergens: any; /// Seznam alergenů s číselnými kódy /// ![Array<string>]
  photoKey: string;
  isTodaySpecial: boolean;
  isSoldOut: boolean;
  freshnessLabel: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PastryItem = PastryItem_uniqueKey & PastryItem_without_PKs;



export type InstagramPost_uniqueKey = {
  id: string; // Unique Key
};

export type InstagramPost_without_PKs = {
  caption: string;
  photoKey: string;
  postUrl: string;
  publishedLabel: string;
  likesCount: number;
  isFeatured: boolean;
  isFromApi: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type InstagramPost = InstagramPost_uniqueKey & InstagramPost_without_PKs;




export type StringFilter = {
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  equals?: string;
  in?: string[];
  notIn?: string[];
  not?: string | StringFilter;
};

export type NumberFilter = {
  equals?: number;
  in?: number[];
  notIn?: number[];
  not?: number | NumberFilter;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
};

export type DateFilter = {
  equals?: Date;
  in?: Date[];
  notIn?: Date[];
  not?: Date | DateFilter;
  lt?: Date;
  lte?: Date;
  gt?: Date;
  gte?: Date;
};

export type AccountUserRoleFilter = {
  equals?: AccountUserRole;
  in?: AccountUserRole[];
  notIn?: AccountUserRole[];
  not?: AccountUserRole | AccountUserRoleFilter;
};

export type OpeningDayKeyFilter = {
  equals?: OpeningDayKey;
  in?: OpeningDayKey[];
  notIn?: OpeningDayKey[];
  not?: OpeningDayKey | OpeningDayKeyFilter;
};

export type InstagramSyncStatusFilter = {
  equals?: InstagramSyncStatus;
  in?: InstagramSyncStatus[];
  notIn?: InstagramSyncStatus[];
  not?: InstagramSyncStatus | InstagramSyncStatusFilter;
};

export type InstagramFeedModeFilter = {
  equals?: InstagramFeedMode;
  in?: InstagramFeedMode[];
  notIn?: InstagramFeedMode[];
  not?: InstagramFeedMode | InstagramFeedModeFilter;
};

export type PastryCategoryFilter = {
  equals?: PastryCategory;
  in?: PastryCategory[];
  notIn?: PastryCategory[];
  not?: PastryCategory | PastryCategoryFilter;
};

export type ReservationStatusFilter = {
  equals?: ReservationStatus;
  in?: ReservationStatus[];
  notIn?: ReservationStatus[];
  not?: ReservationStatus | ReservationStatusFilter;
};

export type filtered_AccountUser = {
  id?: string | StringFilter | null;
  email?: string | StringFilter | null;
  passwordHash?: string | StringFilter | null;
  fullName?: string | StringFilter | null;
  phone?: string | StringFilter | null;
  role?: AccountUserRole | AccountUserRoleFilter | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_BusinessFacts = {
  id?: string | StringFilter | null;
  name?: string | StringFilter | null;
  streetAddress?: string | StringFilter | null;
  cityZip?: string | StringFilter | null;
  phone?: string | StringFilter | null;
  email?: string | StringFilter | null;
  priceRangeCzk?: string | StringFilter | null;
  ratingScore?: number | NumberFilter | null;
  reviewsCount?: number | NumberFilter | null;
  takeawayAvailable?: boolean | null;
  deliveryAvailable?: boolean | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_OpeningHour = {
  id?: string | StringFilter | null;
  dayKey?: OpeningDayKey | OpeningDayKeyFilter | null;
  dayName?: string | StringFilter | null;
  isOpen?: boolean | null;
  openTime?: string | StringFilter | null;
  closeTime?: string | StringFilter | null;
  note?: string | StringFilter | null;
  sortOrder?: number | NumberFilter | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_CmsConfig = {
  id?: string | StringFilter | null;
  welcomeHeading?: string | StringFilter | null;
  welcomePreamble?: string | StringFilter | null;
  storyTitle?: string | StringFilter | null;
  storyBody?: string | StringFilter | null;
  isStoryVisible?: boolean | null;
  isShowcaseVisible?: boolean | null;
  isInstagramVisible?: boolean | null;
  isContactVisible?: boolean | null;
  isWebPublished?: boolean | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_InstagramConfig = {
  id?: string | StringFilter | null;
  accountHandle?: string | StringFilter | null;
  syncStatus?: InstagramSyncStatus | InstagramSyncStatusFilter | null;
  autoSync?: boolean | null;
  feedMode?: InstagramFeedMode | InstagramFeedModeFilter | null;
  lastSyncAt?: string | StringFilter | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_PastryItem = {
  id?: string | StringFilter | null;
  itemCode?: string | StringFilter | null;
  name?: string | StringFilter | null;
  category?: PastryCategory | PastryCategoryFilter | null;
  priceCzk?: number | NumberFilter | null;
  shortDescription?: string | StringFilter | null;
  fullDescription?: string | StringFilter | null;
  ingredients?: any | null; /// Seznam použitých surovin /// ![Array<string>]
  allergens?: any | null; /// Seznam alergenů s číselnými kódy /// ![Array<string>]
  photoKey?: string | StringFilter | null;
  isTodaySpecial?: boolean | null;
  isSoldOut?: boolean | null;
  freshnessLabel?: string | StringFilter | null;
  displayOrder?: number | NumberFilter | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_InstagramPost = {
  id?: string | StringFilter | null;
  caption?: string | StringFilter | null;
  photoKey?: string | StringFilter | null;
  postUrl?: string | StringFilter | null;
  publishedLabel?: string | StringFilter | null;
  likesCount?: number | NumberFilter | null;
  isFeatured?: boolean | null;
  isFromApi?: boolean | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type Entities = {
  accountuser: {
    Create(data: AccountUser): Promise<AccountUser | null>;
    Get(args: AccountUser_uniqueKey): Promise<AccountUser | null>;
    GetAll(args?: filtered_AccountUser): Promise<AccountUser[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_AccountUser): Promise<AccountUser[]>;
    Count(args?: filtered_AccountUser): Promise<number>;
    Update(args: { where: AccountUser_uniqueKey; data: AccountUser_without_PKs }): Promise<AccountUser | null>;
    Delete(args: AccountUser_uniqueKey): Promise<AccountUser | null>;
  };
  businessfacts: {
    Create(data: BusinessFacts): Promise<BusinessFacts | null>;
    Get(args: BusinessFacts_uniqueKey): Promise<BusinessFacts | null>;
    GetAll(args?: filtered_BusinessFacts): Promise<BusinessFacts[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_BusinessFacts): Promise<BusinessFacts[]>;
    Count(args?: filtered_BusinessFacts): Promise<number>;
    Update(args: { where: BusinessFacts_uniqueKey; data: BusinessFacts_without_PKs }): Promise<BusinessFacts | null>;
    Delete(args: BusinessFacts_uniqueKey): Promise<BusinessFacts | null>;
  };
  openinghour: {
    Create(data: OpeningHour): Promise<OpeningHour | null>;
    Get(args: OpeningHour_uniqueKey): Promise<OpeningHour | null>;
    GetAll(args?: filtered_OpeningHour): Promise<OpeningHour[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_OpeningHour): Promise<OpeningHour[]>;
    Count(args?: filtered_OpeningHour): Promise<number>;
    Update(args: { where: OpeningHour_uniqueKey; data: OpeningHour_without_PKs }): Promise<OpeningHour | null>;
    Delete(args: OpeningHour_uniqueKey): Promise<OpeningHour | null>;
  };
  cmsconfig: {
    Create(data: CmsConfig): Promise<CmsConfig | null>;
    Get(args: CmsConfig_uniqueKey): Promise<CmsConfig | null>;
    GetAll(args?: filtered_CmsConfig): Promise<CmsConfig[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_CmsConfig): Promise<CmsConfig[]>;
    Count(args?: filtered_CmsConfig): Promise<number>;
    Update(args: { where: CmsConfig_uniqueKey; data: CmsConfig_without_PKs }): Promise<CmsConfig | null>;
    Delete(args: CmsConfig_uniqueKey): Promise<CmsConfig | null>;
  };
  instagramconfig: {
    Create(data: InstagramConfig): Promise<InstagramConfig | null>;
    Get(args: InstagramConfig_uniqueKey): Promise<InstagramConfig | null>;
    GetAll(args?: filtered_InstagramConfig): Promise<InstagramConfig[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_InstagramConfig): Promise<InstagramConfig[]>;
    Count(args?: filtered_InstagramConfig): Promise<number>;
    Update(args: { where: InstagramConfig_uniqueKey; data: InstagramConfig_without_PKs }): Promise<InstagramConfig | null>;
    Delete(args: InstagramConfig_uniqueKey): Promise<InstagramConfig | null>;
  };
  pastryitem: {
    Create(data: PastryItem): Promise<PastryItem | null>;
    Get(args: PastryItem_uniqueKey): Promise<PastryItem | null>;
    GetAll(args?: filtered_PastryItem): Promise<PastryItem[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_PastryItem): Promise<PastryItem[]>;
    Count(args?: filtered_PastryItem): Promise<number>;
    Update(args: { where: PastryItem_uniqueKey; data: PastryItem_without_PKs }): Promise<PastryItem | null>;
    Delete(args: PastryItem_uniqueKey): Promise<PastryItem | null>;
  };
  instagrampost: {
    Create(data: InstagramPost): Promise<InstagramPost | null>;
    Get(args: InstagramPost_uniqueKey): Promise<InstagramPost | null>;
    GetAll(args?: filtered_InstagramPost): Promise<InstagramPost[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_InstagramPost): Promise<InstagramPost[]>;
    Count(args?: filtered_InstagramPost): Promise<number>;
    Update(args: { where: InstagramPost_uniqueKey; data: InstagramPost_without_PKs }): Promise<InstagramPost | null>;
    Delete(args: InstagramPost_uniqueKey): Promise<InstagramPost | null>;
  };
};

