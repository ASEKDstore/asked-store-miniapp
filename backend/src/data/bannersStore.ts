import { randomUUID } from "crypto";

export interface Banner {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  buttonText: string;
  buttonColor?: string;
  description?: string;
  dateEnd?: string;
  isActive: boolean;
  createdAt: string;
}

let banners: Banner[] = [];

export function getActiveBanners(): Banner[] {
  return banners.filter((b) => b.isActive);
}

export function getAllBanners(): Banner[] {
  return banners;
}

export function getBannerBySlug(slug: string): Banner | undefined {
  return banners.find((b) => b.slug === slug);
}

export function createBanner(
  payload: Omit<Banner, "id" | "createdAt">
): Banner {
  const now = new Date().toISOString();
  const banner: Banner = {
    id: randomUUID(),
    createdAt: now,
    ...payload,
  };
  banners.push(banner);
  return banner;
}

export function updateBanner(
  id: string,
  patch: Partial<Banner>
): Banner | undefined {
  const idx = banners.findIndex((b) => b.id === id);
  if (idx === -1) return undefined;
  banners[idx] = { ...banners[idx], ...patch };
  return banners[idx];
}

export function deleteBanner(id: string): boolean {
  const idx = banners.findIndex((b) => b.id === id);
  if (idx === -1) return false;
  banners.splice(idx, 1);
  return true;
}

