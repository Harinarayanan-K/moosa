import { useCallback, useEffect, useState } from 'react';
import App from './App';
import WelcomeIntro from './components/WelcomeIntro';
import { site, welcomeStorageKey } from './config/site';
import { asset } from './content';
import { heroSlides } from './hero-slides';

function shouldShowIntro() {
  if (!site.welcomeAnimation || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (location.hash && location.hash !== '#home') return false;
  try { return sessionStorage.getItem(welcomeStorageKey) !== '1'; } catch { return true; }
}

export default function SiteEntry() {
  const [intro, setIntro] = useState(shouldShowIntro);
  const complete = useCallback(() => {
    try { sessionStorage.setItem(welcomeStorageKey, '1'); } catch { /* The intro also works without storage. */ }
    setIntro(false);
  }, []);
  const replay = useCallback(() => { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; window.scrollTo({ top: 0, behavior: 'instant' }); setIntro(true); }, []);
  useEffect(() => {
    if (!intro) return;
    const image = new Image();
    image.src = asset(window.matchMedia('(max-width: 600px)').matches ? heroSlides[0].mobileImage : heroSlides[0].image);
  }, [intro]);
  return intro ? <WelcomeIntro onComplete={complete} /> : <App onReplayWelcome={site.welcomeAnimation ? replay : undefined} />;
}
