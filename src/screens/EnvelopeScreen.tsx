import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import ScreenHeader from '../components/ScreenHeader';
import { BearIcon } from '../components/icons';
import { RECIPIENT_NAME } from '../config';

type Props = { onRead: () => void };
type Phase = 'sealed' | 'opening' | 'open';

/** Must cover the longest CSS transition delay + duration in the .env rules. */
const OPEN_MS = 1800;

function EnvelopeBody() {
  return (
    <svg className="env__body" viewBox="0 0 252 148" aria-hidden="true">
      <rect x=".5" y=".5" width="251" height="147" fill="#eea294" stroke="#eba496" />
      <polygon points="0,148 126,54 252,148" fill="#ffd2c4" />
    </svg>
  );
}

function EnvelopeFlap() {
  return (
    <div className="env__flap" aria-hidden="true">
      <svg viewBox="0 0 252 102" className="env__flap-front">
        <polygon points="0,0 252,0 126,102" fill="#ffe9e1" />
        <path d="M0 .5H252" stroke="#e9a698" />
      </svg>
      <svg viewBox="0 0 252 102" className="env__flap-back">
        <polygon points="0,0 252,0 126,102" fill="#ffd2c4" />
      </svg>
    </div>
  );
}

export default function EnvelopeScreen({ onRead }: Props) {
  const [phase, setPhase] = useState<Phase>('sealed');
  const [cardH, setCardH] = useState(245);
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const opened = phase !== 'sealed';

  // The stage grows to the card's real height (it can wrap taller on narrow phones).
  useLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const measure = () => setCardH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function onButton() {
    if (phase === 'opening') return; // ignore repeated clicks mid-transition
    if (phase === 'open') {
      onRead();
      return;
    }
    setPhase('opening');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timer.current = window.setTimeout(() => {
      setPhase('open');
      btnRef.current?.focus({ preventScroll: true });
    }, reduce ? 0 : OPEN_MS);
  }

  return (
    <main className="screen screen--envelope" data-phase={phase} data-opened={opened}>
      <div className="screen__main env">
        <ScreenHeader step="03 / 03" name="Letter" />

        <div className="env__intro" aria-live="polite">
          <div className="env__intro-a" aria-hidden={opened}>
            <h1 className="env__title">A letter, unlocked</h1>
            <p className="env__sub">Open the envelope when you’re ready.</p>
          </div>
          <div className="env__intro-b" aria-hidden={!opened}>
            <h1 className="env__title">The envelope is open</h1>
            <p className="env__sub">Your letter is ready to read.</p>
          </div>
        </div>

        <div className="env__stage" style={{ '--card-h': `${cardH}px` } as CSSProperties}>
          <div className="env__art" aria-hidden="true">
            <EnvelopeBody />
            <EnvelopeFlap />
            <div className="env__seal">
              <BearIcon size={30} surprised />
            </div>
          </div>

          <div className="env__card" ref={cardRef} aria-hidden={!opened}>
            <p className="env__card-for">For {RECIPIENT_NAME}</p>
            <h2 className="env__card-title">Happy Birthday, my love</h2>
            <p className="env__card-body">
              Today is a celebration of you — your kindness, your strength, and all the little things that make you, you.
            </p>
            <p className="env__card-script">There’s more I want to tell you…</p>
          </div>
        </div>

        <div className="env__for">
          <p className="env__for-label">For</p>
          <p className="env__for-name">{RECIPIENT_NAME}</p>
        </div>

        <button
          ref={btnRef}
          type="button"
          className="btn env__btn"
          aria-busy={phase === 'opening'}
          aria-disabled={phase === 'opening'}
          onClick={onButton}
        >
          <span className="env__btn-a" aria-hidden={opened}>Open the envelope</span>
          <span className="env__btn-b" aria-hidden={!opened}>Read the letter</span>
        </button>
      </div>

      <footer className="footer">Private, from start to finish.</footer>
    </main>
  );
}
