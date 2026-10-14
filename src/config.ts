/**
 * Frontend-only gate. This is NOT secure authentication: the value ships in
 * the JS bundle and anyone can read it. It only keeps a casual visitor out.
 *
 * DEMO PASSWORD — replace before sharing. Set VITE_BIRTHDAY_PASSWORD in a
 * local .env file (see .env.example) to override without editing code.
 * Format expected by the screen: DD-MM-YYYY.
 */
export const PASSWORD: string =
  import.meta.env.VITE_BIRTHDAY_PASSWORD ?? '20-06-2026';

/**
 * Card order used by the design reference (pair numbers). Only for visual
 * checks: build with VITE_FIXED_ORDER=1. Normal builds shuffle every game.
 */
export const FIXED_ORDER: number[] | null =
  import.meta.env.VITE_FIXED_ORDER === '1' ? [1, 2, 5, 3, 1, 4, 6, 3, 2, 4, 5, 6] : null;

/**
 * Name shown on the envelope screens. Left as the design's placeholder until
 * the real name is decided. Override with VITE_RECIPIENT_NAME in .env.
 */
export const RECIPIENT_NAME: string = import.meta.env.VITE_RECIPIENT_NAME ?? '[GIRLFRIEND_NAME]';
