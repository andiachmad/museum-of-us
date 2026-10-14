import { LockIcon } from './icons';

type Props = { step: string; name: string };

export default function ScreenHeader({ step, name }: Props) {
  return (
    <header className="topbar">
      <p className="topbar__label">
        <LockIcon className="topbar__lock" />
        <span>A private letter</span>
      </p>
      <p className="steps">
        <span>{step}</span>
        <span className="steps__line" aria-hidden="true" />
        <strong>{name}</strong>
      </p>
    </header>
  );
}
