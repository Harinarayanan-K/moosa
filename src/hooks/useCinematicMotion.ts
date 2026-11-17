import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** All scroll effects use native scrolling, scoped selectors and reversible contexts. */
export default function useCinematicMotion(root: RefObject<HTMLDivElement | null>, reduced: boolean, onSignature: (index: number) => void) {
  useLayoutEffect(() => {
    if (reduced || !root.current) return;
    const media = gsap.matchMedia();
    let disposed = false;
    let frame = 0;
    const context = gsap.context(() => {
      try {
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: .08 });
        // One gentle camera settle, under five seconds; no looping movement.
        gsap.fromTo('.hero-backdrop img', { scale: 1.075 }, { scale: 1, duration: 4, ease: 'power2.out', clearProps: 'transform' });
        intro.fromTo('.hero-copy>.hero-reveal', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .8, clearProps: 'transform,opacity' }, 0)
          .fromTo('.hero h1 .motion-word', { yPercent: 112, rotateX: -22, opacity: 0 }, { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.3, stagger: .075, clearProps: 'transform,opacity' }, .12)
          .fromTo('.hero-intro-label, .hero-location, .hero-launch', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .85, stagger: .12, clearProps: 'transform,opacity' }, .55)
          .fromTo('.hero-description, .hero-actions, .scroll-cue', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: .95, stagger: .12, clearProps: 'transform,opacity' }, .65);

        // A shared reveal vocabulary, with each child entering independently.
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(section => {
          const words = section.querySelectorAll('.motion-word');
          const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 88%', once: true } });
          if (words.length) timeline.fromTo(words, { yPercent: 108, opacity: .15, rotateX: -12 }, { yPercent: 0, opacity: 1, rotateX: 0, duration: 1, stagger: .055, ease: 'power3.out', clearProps: 'transform,opacity' }, 0);
          const children = [...section.children].filter(child => !child.matches('img') && !child.querySelector('img') && !child.querySelector('.motion-word') && !child.classList.contains('motion-text'));
          if (children.length) timeline.fromTo(children, { y: 38, opacity: .2 }, { y: 0, opacity: 1, duration: .95, stagger: .1, ease: 'power3.out', clearProps: 'transform,opacity' }, .12);
        });

        gsap.fromTo('.cuisine-ribbon>span', { y: 25, opacity: .15 }, { y: 0, opacity: 1, stagger: .1, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: '.cuisine-ribbon', start: 'top 96%', once: true }, clearProps: 'transform,opacity' });
        gsap.fromTo('.chef-image', { clipPath: 'inset(8% 0 8% 0)' }, { clipPath: 'inset(0% 0 0% 0)', duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: '.chef-image', start: 'top 88%', once: true }, clearProps: 'clipPath' });
        gsap.utils.toArray<HTMLElement>('.gallery-item:not(.gallery-item-6)').forEach(item => {
          gsap.fromTo(item, { y: 22, opacity: .4 }, { y: 0, opacity: 1, duration: .75, ease: 'power2.out', scrollTrigger: { trigger: item, start: 'top 93%', once: true }, clearProps: 'transform,opacity' });
        });
        gsap.to('.reading-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: () => ScrollTrigger.maxScroll(window), scrub: .15, invalidateOnRefresh: true } });

        media.add({ desktop: '(min-width: 900px)', mobile: '(max-width: 899px)' }, match => {
          const desktop = !!match.conditions?.desktop;
          if (desktop) {
            gsap.fromTo('.chef-image>img', { scale: 1.06, yPercent: -2 }, { scale: 1.06, yPercent: 2, ease: 'none', scrollTrigger: { trigger: '.chef-image', start: 'top bottom', end: 'bottom top', scrub: .8 } });
            gsap.fromTo('.hero h1', { y: 0 }, { y: -65, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .9 } });
            gsap.utils.toArray<HTMLElement>('.signature-story').forEach((story, i) => {
              ScrollTrigger.create({ trigger: story, start: 'top 58%', end: 'bottom 58%', onEnter: () => onSignature(i), onEnterBack: () => onSignature(i) });
              gsap.fromTo(story.querySelectorAll('h3, p, .signature-note'), { y: 32, opacity: .3 }, { y: 0, opacity: 1, stagger: .08, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: story, start: 'top 83%', once: true }, clearProps: 'transform,opacity' });
            });

          }
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        });

        gsap.fromTo('.contact-watermark', { y: 85 }, { y: -12, ease: 'none', scrollTrigger: { trigger: '.contact-section', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      } catch (error) {
        // Revert incomplete timelines: a motion failure must never hide content.
        media.revert();
        console.warn('Cinematic motion unavailable; showing the static portfolio.', error);
        gsap.set('.hero-reveal, .motion-word, [data-reveal], [data-reveal]>*, .gallery-item', { clearProps: 'transform,opacity,clipPath' });
      }
    }, root);

    const refresh = () => { if (!disposed) { ScrollTrigger.sort(); ScrollTrigger.refresh(); } };
    document.fonts.ready.then(() => { if (!disposed) frame = requestAnimationFrame(refresh); });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      media.revert();
      context.revert();
    };
  }, [root, reduced, onSignature]);
}
