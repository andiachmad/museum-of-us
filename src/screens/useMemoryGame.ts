import { useCallback, useEffect, useRef, useState } from 'react';
import { FIXED_ORDER } from '../config';

export const PAIRS = 6;
const MISMATCH_MS = 900;
const MATCH_MS = 450;

function makeDeck(): number[] {
  if (FIXED_ORDER) return [...FIXED_ORDER];
  const deck = Array.from({ length: PAIRS * 2 }, (_, i) => (i % PAIRS) + 1);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export type Note = 'start' | 'pick' | 'second' | 'miss';

export function useMemoryGame() {
  const [deck] = useState(makeDeck);
  const [up, setUp] = useState<number[]>([]); // indexes turned over, not yet matched
  const [matched, setMatched] = useState<number[]>([]); // matched pair numbers
  const [miss, setMiss] = useState(false);
  const [started, setStarted] = useState(false);
  const busy = useRef(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flip = useCallback(
    (i: number) => {
      if (busy.current || up.includes(i) || matched.includes(deck[i])) return;
      setStarted(true);
      const next = [...up, i];
      setUp(next);
      if (next.length < 2) return;

      busy.current = true;
      const [a, b] = next;
      if (deck[a] === deck[b]) {
        timer.current = window.setTimeout(() => {
          setMatched((m) => [...m, deck[a]]);
          setUp([]);
          busy.current = false;
        }, MATCH_MS);
      } else {
        setMiss(true);
        timer.current = window.setTimeout(() => {
          setUp([]);
          setMiss(false);
          busy.current = false;
        }, MISMATCH_MS);
      }
    },
    [up, matched, deck],
  );

  const note: Note = miss ? 'miss' : !started ? 'start' : up.length === 1 ? 'second' : 'pick';
  return { deck, up, matched, flip, note, complete: matched.length === PAIRS };
}
