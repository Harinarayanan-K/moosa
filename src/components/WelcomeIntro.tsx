import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { site } from '../config/site';
import './welcome-intro.css';

function ArrivalScene() {
  return <svg className="welcome-scene" viewBox="0 0 640 260" fill="none" aria-hidden="true" focusable="false">
    <defs><linearGradient id="welcome-van-gold" x1="140" y1="110" x2="410" y2="205" gradientUnits="userSpaceOnUse"><stop stopColor="#E6C58C" /><stop offset="1" stopColor="#B78949" /></linearGradient></defs>
    <g className="welcome-skyline" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
      <path d="M25 191h26v-57l13-13 13 13v57h22v-83l9-15 9 15v83h23v-44l20-13 20 13v44h18M70 123V89l6-13 6 13v36M103 94V65l5-17 5 17v29M220 188h31v-66l15-17 15 17v66h26v-37l19-13 19 13v37h27M259 109V76l7-17 7 17v33M440 191v-70l12-16 12 16v70h28v-44l20-13 20 13v44h31v-58l13-15 13 15v58h33M448 110V82l4-15 4 15v28M573 122V98l3-13 3 13v24" />
      <path d="M18 207h604M28 207v-9h584v9M50 207v12m34-12v12m34-12v12m34-12v12m34-12v12m34-12v12m34-12v12m34-12v12m34-12v12m34-12v12m34-12v12m34-12v12m34-12v12m34-12v12m34-12v12m34-12v12" />
    </g>
    <g className="welcome-destination" transform="translate(550 89)" stroke="currentColor" strokeWidth="1.5"><path d="M0 0c-17 0-20 19-12 28L0 42l12-14C20 19 17 0 0 0Z" /><circle cy="16" r="6" /><text x="0" y="63" textAnchor="middle" stroke="none" fill="currentColor" fontSize="9" letterSpacing="2">PRAGUE</text></g>
    <path d="M0 230h640" stroke="currentColor" opacity=".28" />
    <path className="welcome-road-markings" d="M-100 242H740" stroke="currentColor" strokeWidth="2" strokeDasharray="24 24" opacity=".32" />
    <g className="welcome-vehicle">
      <ellipse cx="275" cy="221" rx="153" ry="6" fill="#000" opacity=".5" />
      <g className="welcome-van-body">
        <path d="M136 119h185a6 6 0 0 1 6 6v72H130v-72a6 6 0 0 1 6-6Z" fill="url(#welcome-van-gold)" />
        <path d="M327 135h48c8 0 11 4 15 11l26 35v16h-89Z" fill="url(#welcome-van-gold)" />
        <path d="M337 142h35l25 34h-60Z" fill="#25231D" />
        <path d="M131 185h285v14H131Z" fill="#8B6639" />
        <rect x="128" y="190" width="292" height="10" rx="4" fill="#D5B37B" />
        <path d="M410 181h8v9h-8" fill="#F3EEE5" /><path d="M130 179h5v9h-5" fill="#A94C37" />
        <text x="165" y="160" fill="#292117" fontFamily="Cormorant, Georgia, serif" fontSize="30" letterSpacing="3">MOOSA</text>
        <text x="167" y="176" fill="#463522" fontFamily="sans-serif" fontSize="6.5" letterSpacing="2">PRIVATE CHEF</text>
        <path d="M344 174v-12c0-5 5-9 11-9s12 4 12 9v12" fill="#141412" />
        <circle cx="355" cy="149" r="10" fill="#C69A72" />
        <path d="M346 148c0-11 18-11 18 0" fill="#29211B" />
        <path d="M350 153q5 4 10 0" stroke="#493026" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M344 140v-6c-7-1-7-10-1-11 0-7 10-10 14-4 7-4 15 3 11 9 6 6 0 11-5 10v2Z" fill="#F3EEE5" />
        <path d="M345 141h18v5h-18Z" fill="#E2D8C6" />
        <path d="m365 164 12 5" stroke="#C69A72" strokeWidth="4" strokeLinecap="round" />
        <circle cx="382" cy="170" r="8" stroke="#CBA66A" strokeWidth="2" />
      </g>
      {[195, 375].map(x => <g className="welcome-wheel" key={x}><circle cx={x} cy="201" r="20" fill="#171613" stroke="#CBA66A" strokeWidth="3" /><circle cx={x} cy="201" r="10" stroke="#8B7450" strokeWidth="2" /><g className="welcome-wheel-spokes" data-center={x}><path d={`M${x - 7} 194l14 14m-14 0 14-14`} stroke="#CBA66A" strokeWidth="1.5" /><circle cx={x} cy="201" r="3" fill="#CBA66A" /></g></g>)}
      <g className="welcome-steam" stroke="#D8BD90" strokeWidth="1.4" strokeLinecap="round"><path d="M205 107c-8-10 7-11 0-22M222 107c-8-10 7-11 0-22M239 107c-8-10 7-11 0-22" /></g>
    </g>
  </svg>;
}

export default function WelcomeIntro({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const completed = useRef(false);
  const callback = useRef(onComplete);
  callback.current = onComplete;
  const finish = () => { if (!completed.current) { completed.current = true; callback.current(); } };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timeout = window.setTimeout(finish, 6000);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => { if (motion.matches) finish(); };
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') finish(); };
    motion.addEventListener('change', onMotionChange);
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previousOverflow; window.clearTimeout(timeout); motion.removeEventListener('change', onMotionChange); window.removeEventListener('keydown', onKey); };
  }, []);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete: finish });
      timeline.fromTo('.welcome-copy', { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: .1, duration: .65, ease: 'power2.out' }, 0)
        .fromTo('.welcome-vehicle', { x: -95 }, { x: 65, duration: 2.9, ease: 'power1.inOut' }, .15)
        .fromTo('.welcome-vehicle', { opacity: 0 }, { opacity: 1, duration: .35 }, .1)
        .fromTo('.welcome-progress-line', { scaleX: 0 }, { scaleX: 1, duration: 3.15, ease: 'none' }, .1)
        .to(root.current, { opacity: 0, duration: .5, ease: 'power2.inOut' }, 3.25);
      gsap.to('.welcome-road-markings', { x: -96, duration: 1.1, repeat: 2, ease: 'none' });
      gsap.utils.toArray<SVGGElement>('.welcome-wheel-spokes').forEach(wheel => { gsap.to(wheel, { rotation: 720, svgOrigin: `${wheel.dataset.center} 201`, duration: 3.1, ease: 'none' }); });
      gsap.to('.welcome-van-body', { y: -2, duration: .18, yoyo: true, repeat: 14, ease: 'sine.inOut' });
      gsap.to('.welcome-steam', { y: -7, opacity: .15, duration: .8, yoyo: true, repeat: 3, ease: 'sine.inOut' });
    }, root);
    return () => context.revert();
  }, []);

  return <div className="welcome-intro" ref={root} aria-label="Welcome to Moosa">
    <header className="welcome-wordmark wordmark">MOOSA<span>PRIVATE CHEF · PRAGUE</span></header>
    <main className="welcome-content">
      <p className="welcome-eyebrow welcome-copy">A WORLD OF FLAVOUR. ON ITS WAY.</p>
      <h1 className="welcome-title welcome-copy">A little closer<br /><em>to your table.</em></h1>
      <ArrivalScene />
      <p className="welcome-caption welcome-copy" role="status">{site.launched ? 'Your private dining experience awaits.' : 'Coming soon to Prague.'}</p>
      <div className="welcome-progress" aria-hidden="true"><span className="welcome-progress-line" /></div>
    </main>
    <footer className="welcome-footer"><span>GOOD FOOD IS WORTH THE JOURNEY.</span><button type="button" onClick={finish}>Skip intro <ArrowUpRight size={15} aria-hidden="true" /></button></footer>
  </div>;
}
