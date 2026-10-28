import type { InstagramPost } from "@/frontend/types/Home";
const photos = [
  {
    "id": "curated-DeACbO9jjgM",
    "caption": "Pečivo s fíky a krémem",
    "photoKey": "/images/instagram/fig-pastries.jpg",
    "postUrl": "https://www.instagram.com/kuskolace/p/DeACbO9jjgM/",
    "publishedLabel": "2026-10-02",
    "likesCount": 0,
    "isFeatured": true,
    "isFromApi": false,
    "createdAt": "2026-10-02",
    "updatedAt": "2026-10-02"
  },
  {
    "id": "curated-DdioRapDi0s",
    "caption": "Sladké pečivo s jemnou polevou",
    "photoKey": "/images/instagram/glazed-buns.jpg",
    "postUrl": "https://www.instagram.com/kuskolace/p/DdioRapDi0s/",
    "publishedLabel": "2026-09-21",
    "likesCount": 0,
    "isFeatured": false,
    "isFromApi": false,
    "createdAt": "2026-09-21",
    "updatedAt": "2026-09-21"
  },
  {
    "id": "curated-Ddara39iDih",
    "caption": "Buchty s cukrovým popraškem",
    "photoKey": "/images/instagram/sugar-buchty.jpg",
    "postUrl": "https://www.instagram.com/kuskolace/p/Ddara39iDih/",
    "publishedLabel": "2026-09-17",
    "likesCount": 0,
    "isFeatured": false,
    "isFromApi": false,
    "createdAt": "2026-09-17",
    "updatedAt": "2026-09-17"
  }
];
export const curatedInstagramPosts: InstagramPost[] = photos.map(photo => ({...photo, createdAt:new Date(photo.createdAt), updatedAt:new Date(photo.updatedAt)}));
