export type Photo = { pair: number; label: string; src?: string };

export const PHOTOS: Photo[] = Array.from({ length: 6 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return {
    pair: i + 1,
    label: `PHOTO_${n}`,
    src: `${import.meta.env.BASE_URL}assets/photos/photo-${n}.png`,
  };
});
