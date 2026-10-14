import { FormEvent, useId, useRef, useState } from 'react';
import { PASSWORD } from '../config';
import ScreenHeader from '../components/ScreenHeader';

type Props = { onUnlock: () => void };

const normalize = (v: string) => v.trim().replace(/[\s/.]+/g, '-');

function ErrorIcon() {
  return (
    <svg className="error__icon" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="currentColor" />
      <ellipse cx="9" cy="9" rx="4.6" ry="6.4" fill="var(--error-bg)" />
      <rect x="7.7" y="4.7" width="2.6" height="8.6" rx="1.3" fill="currentColor" />
    </svg>
  );
}

export default function LoginScreen({ onUnlock }: Props) {
  const [value, setValue] = useState('');
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const errorId = useId();
  const hintId = useId();

  function submit(e: FormEvent) {
    e.preventDefault();
    if (normalize(value) === PASSWORD) {
      setFailed(false);
      onUnlock();
      return;
    }
    setFailed(true);
    inputRef.current?.focus();
  }

  return (
    <main className="screen screen--login">
      <div className="screen__main">
        <ScreenHeader step="01 / 03" name="Password" />

        <h1 className="title">This Kid Turning 21st Today !</h1>

        <img
          className="hero"
          src="/assets/login-hero.png"
          width={258}
          height={215}
          alt="A childhood photo in a bee costume, with two Loopy characters beside it"
        />

        <form className="form" onSubmit={submit} noValidate data-state={failed ? 'error' : 'idle'}>
          <label className="form__label" htmlFor={inputId}>Password</label>
          <input
            ref={inputRef}
            id={inputId}
            className="form__input"
            type="password"
            placeholder="DD-MM-YYYY"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            value={value}
            aria-invalid={failed}
            aria-describedby={failed ? errorId : hintId}
            onChange={(e) => {
              setValue(e.target.value);
              if (failed) setFailed(false);
            }}
          />

          {failed ? (
            <div className="error" id={errorId} role="alert">
              <ErrorIcon />
              <span>That password didn’t match. Try again.</span>
            </div>
          ) : (
            <p className="hint" id={hintId}>Hint - First Day Confess Andi</p>
          )}

          <button className="form__button" type="submit">
            {failed ? 'Try again' : 'Continue'}
          </button>
        </form>
      </div>

      <footer className="footer">Private, from start to finish.</footer>
    </main>
  );
}
