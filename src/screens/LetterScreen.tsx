import { useEffect, useState } from 'react';
import { LETTER } from '../data/letter';
import { letterPhoto } from '../data/letterPhotos';

type Slot = 1 | 2 | 3 | 4;

function Photo({ slot, caption }: { slot: Slot; caption: string }) {
  const src = letterPhoto(slot);
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <figure className={`lphoto lphoto--${slot}`}>
      {src && !imageFailed ? (
        <img
          className="lphoto__img"
          src={src}
          alt={caption}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="lphoto__box" role="img" aria-label={`Photo placeholder ${slot} of 4. ${caption}`}>
          <p className="lphoto__label">Photo placeholder</p>
          <p className="lphoto__hint">Replace this area with a real memory photo</p>
        </div>
      )}
      <figcaption className="lphoto__caption">{caption}</figcaption>
    </figure>
  );
}

function Sign({ lines }: { lines: readonly string[] }) {
  return (
    <p className="lsign">
      {lines.map((l) => (
        <span key={l}>{l}</span>
      ))}
    </p>
  );
}

export default function LetterScreen() {
  // The envelope screen may have been scrolled; the letter always starts at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { main, moments, know, closing, end } = LETTER;

  return (
    <main className="letter" data-testid="letter-page">
      <section className="lband lband--a">
        <header className="lhead">
          <p className="lhead__label">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <rect x=".6" y=".6" width="8.8" height="8.8" rx="1.6" stroke="currentColor" strokeWidth="1.2" />
              <rect x="3.9" y="3.9" width="2.2" height="2.2" rx=".5" fill="currentColor" />
            </svg>
            <span>A private letter</span>
          </p>
          <p className="lhead__step">
            <span>03 / 03</span>
            <span className="lhead__dash" aria-hidden="true">—</span>
            <span>Letter</span>
          </p>
        </header>

        <h1 className="lgreet">{LETTER.greeting}</h1>
        <p className="lintro">{LETTER.intro}</p>

        <Photo slot={1} caption={LETTER.caption1} />

        <article className="lblock lblock--main">
          <p className="leyebrow">{main.eyebrow}</p>
          <h2 className="ltitle ltitle--main"><span>Happy</span> Birthday, my love</h2>
          {main.paragraphs.map((t) => (
            <p className="lbody" key={t}>{t}</p>
          ))}
          <Sign lines={main.sign} />
        </article>

        <Photo slot={2} caption={LETTER.caption2} />

        <article className="lblock lblock--moments">
          <p className="leyebrow">{moments.eyebrow}</p>
          <h2 className="ltitle ltitle--moments">{moments.title}</h2>
          <p className="lbody">{moments.body}</p>
        </article>
      </section>

      <section className="lband lband--b">
        <article className="lblock">
          <p className="leyebrow">{know.eyebrow}</p>
          <h2 className="ltitle ltitle--know">{know.title}</h2>
          <p className="lbody">{know.body}</p>
        </article>
        <Photo slot={3} caption={LETTER.caption3} />
      </section>

      <section className="lband lband--c">
        <article className="lblock lblock--closing">
          <h2 className="ltitle ltitle--closing">{closing.title}</h2>
          <p className="lbody">{closing.body}</p>
          <Sign lines={closing.sign} />
        </article>
        <Photo slot={4} caption={LETTER.caption4} />
      </section>

      <footer className="lband lband--d lend">
        <svg className="lend__ornament" width="114" height="20" viewBox="0 0 114 20" fill="none" aria-hidden="true">
          <path d="M8 18.2C3.4 14 1 11 1 7.6 1 4.6 3.2 2.6 5.7 2.6c1.1 0 2.1.5 2.3 1.2.2-.7 1.2-1.2 2.3-1.2 2.5 0 4.7 2 4.7 5C15 11 12.6 14 8 18.2z" stroke="#ff7a6a" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M28 12.4h7M39 12.4h7M50 12.4h7M61 12.4h7M72 12.4h7" stroke="#ff7a6a" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M106 18.2c-4.6-4.2-7-7.2-7-10.6 0-3 2.2-5 4.7-5 1.1 0 2.1.5 2.3 1.2.2-.7 1.2-1.2 2.3-1.2 2.5 0 4.7 2 4.7 5 0 3.4-2.4 6.4-7 10.6z" stroke="#ff7a6a" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
        <p className="lend__title">{end.title}</p>
        <p className="lend__sub">{end.sub}</p>
      </footer>
    </main>
  );
}
