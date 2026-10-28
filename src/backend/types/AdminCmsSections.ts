export interface CmsConfigDto {
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

export interface UpdateCmsConfigInput {
  welcomeHeading: string;
  welcomePreamble: string;
  storyTitle: string;
  storyBody: string;
  isStoryVisible: boolean;
  isShowcaseVisible: boolean;
  isInstagramVisible: boolean;
  isContactVisible: boolean;
  isWebPublished: boolean;
}

export type SectionKey =
  | "isWebPublished"
  | "isShowcaseVisible"
  | "isStoryVisible"
  | "isInstagramVisible"
  | "isContactVisible";

export type TextKey =
  | "welcomeHeading"
  | "welcomePreamble"
  | "storyTitle"
  | "storyBody";