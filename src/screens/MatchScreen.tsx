import { useEffect, useRef, useState } from 'react';
import ScreenHeader from '../components/ScreenHeader';
import { BearIcon, ImageIcon, LockIcon, MatchedIcon } from '../components/icons';
import { PHOTOS } from '../data/photos';
import { PAIRS, useMemoryGame, type Note } from './useMemoryGame';

type Props = { onContinue: () => void };

const NOTES: Record<Note, string> = {
  start: 'Tap any card to begin. Take your time.',
  pick: 'Choose a card.',
  second: 'Choose one more card.',
  miss: 'Not a match. Try again.',
};

export default function MatchScreen({ onContinue }: Props) {
  const { deck, up, matched, flip, note, complete } = useMemoryGame();
  const revealRef = useRef<HTMLButtonElement>(null);
  const [failedPhotos, setFailedPhotos] = useState<number[]>([]);

  useEffect(() => {
    if (!complete) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    revealRef.current?.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
  }, [complete]);

  const done = matched.length;
  const pct = (done / PAIRS) * 100;

  return (
    <main className="screen screen--match">
      <div className="screen__main match">
        <ScreenHeader step="02 / 03" name="Match" />

        <div className="match__intro" aria-live="polite">
          <h1 className="match__title">{complete ? 'All pairs found' : 'Match the memories'}</h1>
          <p className={`match__sub${complete ? ' match__sub--done' : ''}`}>
            {complete ? 'The letter is now unlocked.' : 'Turn over two cards. Find all six pairs to unlock the letter.'}
          </p>
        </div>

        <div className="progress">
          <div className="progress__row">
            <strong>{done} / {PAIRS} pairs matched</strong>
            {complete ? (
              <span>Unlocked</span>
            ) : (
              <span className="progress__lock">
                <LockIcon className="progress__lockicon" size={16} />
                Letter locked
              </span>
            )}
          </div>
          <div
            className={`bar${complete ? ' bar--full' : ''}${done === 0 ? ' bar--empty' : ''}`}
            role="progressbar"
            aria-label="Pairs matched"
            aria-valuemin={0}
            aria-valuemax={PAIRS}
            aria-valuenow={done}
          >
            <span className="bar__fill" style={{ flexGrow: done }} />
            <span className="bar__rest" style={{ flexGrow: PAIRS - done }} />
          </div>
        </div>

        <ul className="grid">
          {deck.map((pair, i) => {
            const photo = PHOTOS[pair - 1];
            const isMatched = matched.includes(pair);
            const isUp = up.includes(i);
            const state = isMatched ? 'matched' : isUp ? 'up' : 'down';
            const label =
              state === 'down' ? `Card ${i + 1} of ${deck.length}, face down` : `${photo.label}, ${state === 'up' ? 'turned over' : 'matched'}`;
            return (
              <li key={i}>
                <button
                  type="button"
                  className={`card card--${state}`}
                  aria-label={label}
                  aria-disabled={isMatched}
                  onClick={() => flip(i)}
                >
                  <span className="card__flip">
                    <span className="card__face card__back">
                      <span className="card__backframe">
                        <BearIcon />
                      </span>
                    </span>
                    <span className="card__face card__front">
                      <span className="card__tile">
                        {photo.src && !failedPhotos.includes(pair) ? (
                          <img
                            src={photo.src}
                            alt=""
                            draggable={false}
                            onError={() => {
                              setFailedPhotos((failed) =>
                                failed.includes(pair) ? failed : [...failed, pair],
                              );
                            }}
                          />
                        ) : (
                          <>
                            <ImageIcon />
                            <span className="card__name">[{photo.label}]</span>
                          </>
                        )}
                      </span>
                      <span className="card__status">
                        {isMatched && <MatchedIcon />}
                        {isMatched ? 'Matched' : 'Turned over'}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {complete ? (
          <>
            <p className="match__done">All six pairs matched</p>
            <button ref={revealRef} type="button" className="btn" onClick={onContinue}>
              Reveal the letter
            </button>
          </>
        ) : (
          <p className="match__note" aria-live="polite">{NOTES[note]}</p>
        )}
      </div>

      <footer className="footer">Private, from start to finish.</footer>
    </main>
  );
}
