/**
 * Generates a Supabase Storage URL for a plant image based on its general name.
 */

const SUPABASE_BUCKET_URL =
  "https://xizxqqndzdncdnuwuuhs.supabase.co/storage/v1/object/public/Plants/";

export const PLANT_FALLBACK_IMAGE = "/plant-fallback.svg";

export function getPlantImageUrl(nameGeneral: string, ext: "webp" | "jpg" = "webp"): string {
  const slug = nameGeneral
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s/\\_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `${SUPABASE_BUCKET_URL}${slug}.${ext}`;
}
