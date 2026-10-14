export const letterPhoto = (n: 1 | 2 | 3 | 4): string | undefined => {
  return `${import.meta.env.BASE_URL}assets/photos/letter-0${n}.png`;
};
