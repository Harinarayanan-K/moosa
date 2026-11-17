import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import gsap from 'gsap';
import { heroSlides, heroSlideDuration } from '../hero-slides';

export default function useHeroSlideshow(root: RefObject<HTMLElement | null>, reduced: boolean) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(() => !document.hidden);
  const previous = useRef(0);

  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => setInView(entries[0].isIntersecting), { threshold: .15 });
    if (root.current) observer?.observe(root.current);
    return () => { document.removeEventListener('visibilitychange', update); observer?.disconnect(); };
  }, [root]);

  useEffect(() => {
    if (paused || reduced || !inView || !visible) return;
    const timer = window.setTimeout(() => setActive(index => (index + 1) % heroSlides.length), heroSlideDuration);
    return () => window.clearTimeout(timer);
  }, [active, paused, reduced, inView, visible]);

  useLayoutEffect(() => {
    const oldIndex = previous.current;
    previous.current = active;
    if (reduced) return;
    const context = gsap.context(() => {
      const frames = gsap.utils.toArray<HTMLElement>('.hero-slide');
      if (oldIndex !== active) {
        gsap.fromTo(frames[oldIndex], { opacity: 1, xPercent: 0 }, { opacity: 0, xPercent: -4, duration: 1.1, ease: 'power2.inOut', clearProps: 'opacity,transform' });
        gsap.fromTo(frames[active], { opacity: 0, xPercent: 4 }, { opacity: 1, xPercent: 0, duration: 1.1, ease: 'power2.inOut', clearProps: 'opacity,transform' });
        gsap.killTweensOf(root.current?.querySelectorAll('h1 .motion-word') ?? []);
        gsap.set(root.current?.querySelectorAll('h1 .motion-word') ?? [], { clearProps: 'opacity,transform' });
        gsap.fromTo('.hero-changing-copy', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .65, stagger: .08, ease: 'power2.out', overwrite: 'auto', clearProps: 'opacity,transform' });
      }
    }, root);
    return () => context.revert();
  }, [active, reduced, root]);

  const select = (index: number) => {
    setActive((index + heroSlides.length) % heroSlides.length);
  };
  return { active, paused, select, pause: () => setPaused(true), toggle: () => setPaused(value => !value) };
}
