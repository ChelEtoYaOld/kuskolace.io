export type InstagramSyncStatus = "AUTORIZOVANO" | "NEPROPOJENO" | "NAHLEDOVY_REZIM";
export type InstagramFeedMode = "API" | "FALLBACK";

// Zpětně kompatibilní aliasy
export type SyncStatus = InstagramSyncStatus;
export type FeedMode = InstagramFeedMode;

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

export type InstagramConfig = InstagramConfigDTO;
export type InstagramPost = InstagramPostDTO;

export interface UpdateInstagramConfigInput {
  accountHandle: string;
  syncStatus: InstagramSyncStatus;
  autoSync: boolean;
  feedMode: InstagramFeedMode;
}

export interface UpsertInstagramPostInput {
  id?: string;
  caption: string;
  photoKey: string;
  postUrl: string;
  publishedLabel: string;
  likesCount: number;
  isFeatured: boolean;
  isFromApi: boolean;
}

export interface InstagramIntegrationPageData {
  config: InstagramConfigDTO;
  posts: InstagramPostDTO[];
}

export type PostOriginFilter = "ALL" | "API" | "MANUAL";
export type PostFeaturedFilter = "ALL" | "FEATURED" | "STANDARD";

export interface PostFormData {
  id?: string;
  caption: string;
  photoKey: string;
  postUrl: string;
  publishedLabel: string;
  likesCount: number;
  isFeatured: boolean;
  isFromApi: boolean;
}