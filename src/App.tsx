import { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import MatchScreen from './screens/MatchScreen';
import EnvelopeScreen from './screens/EnvelopeScreen';
import LetterScreen from './screens/LetterScreen';

type Stage = 'login' | 'match' | 'envelope' | 'letter';

export default function App() {
  const [stage, setStage] = useState<Stage>('login');

  if (stage === 'login') return <LoginScreen onUnlock={() => setStage('match')} />;
  if (stage === 'match') return <MatchScreen onContinue={() => setStage('envelope')} />;
  if (stage === 'envelope') return <EnvelopeScreen onRead={() => setStage('letter')} />;

  return <LetterScreen />;
}
