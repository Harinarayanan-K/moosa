import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, ArrowDown, ArrowRight, ArrowLeft, ChefHat, Check, MapPin, Menu, Mail, Plus, X, Pause, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset, biography, cuisines, dishes, experiences, gallery, signatures, planningSteps, diningQuestions, cuisineCount } from './content';
import type { Cuisine, Dish } from './content';
import { contact, emailLink, whatsappLink } from './config/contact';
import { site } from './config/site';
import MotionText from './components/MotionText';
import WhatsAppIcon from './components/WhatsAppIcon';
import CuisineRibbon from './components/CuisineRibbon';
import useCinematicMotion from './hooks/useCinematicMotion';
import useHeroSlideshow from './hooks/useHeroSlideshow';
import { heroSlides } from './hero-slides';

gsap.registerPlugin(ScrollTrigger);
const links = [['The Chef', 'the-chef'], ['Menu', 'menu'], ['Experiences', 'experiences'], ['Gallery', 'gallery'], ['Contact', 'contact']];

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? 'eyebrow-dark' : ''}`}><span />{children}</p>;
}

function MenuDish({ dish }: { dish: Dish }) {
  return <article className={`menu-card ${dish.image ? 'menu-card-featured' : 'menu-card-text'}`}>
    {dish.image && <div className="menu-image"><img src={asset(dish.image, true)} srcSet={`${asset(dish.image, true)} 640w, ${asset(dish.image)} 1400w`} sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 30vw" alt={dish.alt ?? `Illustrative ${dish.name}`} width="1400" height="933" loading="lazy" /><span>{dish.cuisine}</span></div>}
    <div className="menu-card-info"><div className="menu-dish-meta"><span className="course-label">{dish.course}</span>{!dish.image && <span className="menu-cuisine-label">{dish.cuisine}</span>}</div><h3>{dish.name}</h3><p>{dish.description}</p></div>
  </article>;
}

function ContactAction({ children, context, email = false, className = '', icon = true }: { children: ReactNode; context?: string; email?: boolean; className?: string; icon?: boolean }) {
  const href = email ? emailLink() : whatsappLink(context);
  const content = <>{children}{icon && <ArrowUpRight size={17} aria-hidden="true" />}</>;
  if (href) return <a className={className} href={href} {...(!email ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{content}</a>;
  return <Dialog.Root><Dialog.Trigger asChild><button className={className} type="button">{content}</button></Dialog.Trigger>
    <Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="contact-dialog">
      <Dialog.Close className="dialog-close" aria-label="Close contact details"><X size={22} /></Dialog.Close>
      <ChefHat className="text-gold mb-7" size={32} strokeWidth={1} />
      <Eyebrow>Coming soon to Prague</Eyebrow>
      <Dialog.Title className="contact-dialog-title">Something wonderful<br /><em>is on the menu.</em></Dialog.Title>
      <Dialog.Description>{email ? 'Email details coming soon. You can enquire directly with Chef Moosa through WhatsApp.' : 'WhatsApp details coming soon. Please check back for Chef Moosa’s contact details.'}</Dialog.Description>
      <Dialog.Close className="button button-gold mt-8">Back to exploring <ArrowRight size={17} /></Dialog.Close>
    </Dialog.Content></Dialog.Portal>
  </Dialog.Root>;
}

function Navigation({ reduced }: { reduced: boolean }) {
  const [open, setOpen] = useState(false);
  const mobile = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open || reduced) return;
    const ctx = gsap.context(() => gsap.fromTo('.mobile-link', { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: .065, duration: .5, ease: 'power2.out', delay: .1 }), mobile);
    return () => ctx.revert();
  }, [open, reduced]);
  return <header className="site-header"><div className="reading-progress" aria-hidden="true" /><div className="nav-inner">
    <a href="#home" className="wordmark" aria-label="Moosa home">MOOSA<span>PRIVATE CHEF · PRAGUE</span></a>
    <nav aria-label="Main navigation" className="desktop-nav">{links.map(([name, id]) => <a key={id} href={`#${id}`}>{name}</a>)}</nav>
    <ContactAction className="nav-enquire">Let’s talk <ArrowUpRight size={15} /></ContactAction>
    <Dialog.Root open={open} onOpenChange={setOpen}><Dialog.Trigger asChild><button className="mobile-toggle" aria-label="Open navigation"><Menu size={24} strokeWidth={1.5} /></button></Dialog.Trigger>
      <Dialog.Portal><Dialog.Overlay className="dialog-overlay mobile-overlay" /><Dialog.Content ref={mobile} className="mobile-panel">
        <Dialog.Title className="wordmark">MOOSA<span>PRIVATE CHEF · PRAGUE</span></Dialog.Title>
        <Dialog.Description className="sr-only">Explore Chef Moosa’s portfolio.</Dialog.Description>
        <Dialog.Close className="dialog-close" aria-label="Close navigation"><X size={25} /></Dialog.Close>
        <nav aria-label="Mobile navigation">{links.map(([name, id], i) => <a className="mobile-link" href={`#${id}`} key={id} onClick={() => setOpen(false)}><span>0{i + 1}</span>{name}<ArrowUpRight size={24} /></a>)}</nav>
        <p className="mobile-location"><MapPin size={14} /> Coming soon to Prague</p>
      </Dialog.Content></Dialog.Portal>
    </Dialog.Root>
  </div></header>;
}

function App({ onReplayWelcome }: { onReplayWelcome?: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const heroElement = useRef<HTMLElement>(null);
  const menuGrid = useRef<HTMLDivElement>(null);
  const signatureImages = useRef<HTMLDivElement>(null);
  const galleryOpener = useRef<HTMLButtonElement | null>(null);
  const [cuisine, setCuisine] = useState<Cuisine>('All');
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [signature, setSignature] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [floatingVisible, setFloatingVisible] = useState(false);
  const reduced = useReducedMotion();
  const hero = useHeroSlideshow(heroElement, reduced);
  const filtered = dishes.filter(dish => cuisine === 'All' || dish.cuisine === cuisine);
  const visibleDishes = cuisine === 'All' && !menuExpanded ? filtered.slice(0, 6) : filtered;
  useCinematicMotion(root, reduced, setSignature);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setFloatingVisible(true); return; }
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target); });
      setFloatingVisible(visible.size === 0);
    });
    root.current?.querySelectorAll('.hero, .contact-section, .site-footer').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.menu-card-info', { opacity: .3, y: 15 }, { opacity: 1, y: 0, stagger: { amount: .35 }, duration: .6, ease: 'power3.out', clearProps: 'opacity,transform', onComplete: () => ScrollTrigger.refresh() });
      gsap.fromTo('.menu-image>img', { scale: 1.04, opacity: .4 }, { scale: 1, opacity: 1, stagger: .06, duration: .7, ease: 'power2.out', clearProps: 'transform,opacity' });
    }, menuGrid);
    return () => ctx.revert();
  }, [cuisine, reduced, menuExpanded]);

  useLayoutEffect(() => {
    const photos = signatureImages.current?.querySelectorAll<HTMLImageElement>('.signature-photo');
    if (!photos) return;
    if (reduced) { gsap.set(photos, { clearProps: 'opacity' }); return; }
    const tweens = [...photos].map((photo, i) => gsap.to(photo, { opacity: signature === i ? 1 : 0, duration: .65, ease: 'power2.inOut', overwrite: true }));
    return () => tweens.forEach(tween => tween.kill());
  }, [signature, reduced]);

  useLayoutEffect(() => {
    if (lightbox === null || reduced) return;
    // Dialog content lives in a portal; keep its image transition brief.
    const ctx = gsap.context(() => {
      gsap.fromTo('.lightbox-image>img', { opacity: .4 }, { opacity: 1, duration: .3, clearProps: 'opacity' });
      gsap.fromTo('.lightbox-bottom p', { y: 8, opacity: .3 }, { y: 0, opacity: 1, duration: .4, clearProps: 'transform,opacity' });
    });
    return () => ctx.revert();
  }, [lightbox, reduced]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); setLightbox(i => i === null ? null : (i + 1) % gallery.length); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); setLightbox(i => i === null ? null : (i - 1 + gallery.length) % gallery.length); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  return <div ref={root}>
    <a className="skip-link" href="#main">Skip to content</a>
    {!site.launched && <aside className="launch-banner" aria-label="Launch announcement"><strong><span className="status-dot" /> Coming soon to Prague</strong><span>A preview of Chef Moosa’s private dining experiences.</span><a href="#contact">Early enquiries <ArrowUpRight size={13} aria-hidden="true" /></a></aside>}
    <Navigation reduced={reduced} />
    <main id="main">
      <section id="home" ref={heroElement} className="hero hero-editorial" aria-labelledby="hero-title" onFocusCapture={event => { const target = event.target as HTMLElement; if (target.matches(':focus-visible') && !target.closest('.hero-slide-pause')) hero.pause(); }}>
        <div className="hero-backdrop" aria-hidden="true">{heroSlides.map((slide, index) => <div className={`hero-slide ${hero.active === index ? 'is-active' : ''}`} data-dish={slide.dish} key={slide.image}><picture><source media="(max-width: 600px)" srcSet={`${asset(slide.mobileImage, true)} 480w, ${asset(slide.mobileImage)} 900w`} sizes="100vw" width="900" height="1600" /><img src={asset(slide.image)} srcSet={`${asset(slide.image, true)} 640w, ${asset(slide.image)} ${slide.width}w`} sizes="100vw" alt="" width={slide.width} height={slide.height} fetchPriority={index === 0 ? 'high' : 'low'} /></picture></div>)}</div>
        <div className="section-shell hero-foreground">
        <div className="hero-copy">
          <div className="hero-reveal"><Eyebrow>MOOSA · PRIVATE CHEF PRAGUE</Eyebrow></div>
          <h1 id="hero-title" aria-label="A world of flavour. A table of your own."><span className="hero-reveal"><MotionText>A world of flavour.</MotionText></span><span className="hero-reveal gold-italic"><MotionText>A table of your own.</MotionText></span></h1>
          <div className="hero-introduction">
            <p className="hero-description hero-reveal">Personalised dining experiences inspired by Kerala, Indian, Italian, European, and Middle Eastern cuisine.</p>
            <div className="hero-actions hero-reveal"><a className="button button-gold" href="#menu">Explore the Menu <ArrowUpRight size={17} /></a><ContactAction className="text-link" icon={false}><WhatsAppIcon size={16} /> Enquire on WhatsApp</ContactAction></div>
            <p className="hero-launch hero-reveal"><span className="status-dot" />{site.launched ? 'Personalised menus on request' : 'Not launched yet · Early enquiries welcome'}</p>
          </div>
        </div>
        <div className="hero-slideshow-controls" role="group" aria-label="Featured dishes slideshow" onKeyDownCapture={event => { if (['Enter', ' '].includes(event.key) && !(event.target as HTMLElement).closest('.hero-slide-pause')) hero.pause(); }}>
          <div className="hero-slide-caption" aria-live={hero.paused || reduced ? 'polite' : 'off'} aria-atomic="true"><span>{String(hero.active + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')} · {heroSlides[hero.active].region}</span><p>{heroSlides[hero.active].dish}</p></div>
          <div className="hero-slide-navigation">
            <button type="button" className="hero-slide-arrow" aria-label="Previous dish" onClick={() => hero.select(hero.active - 1)}><ArrowLeft size={17} /></button>
            <div className="hero-slide-dots">{heroSlides.map((slide, index) => <button type="button" key={slide.image} aria-label={`Show ${slide.region}: ${slide.dish}`} aria-pressed={hero.active === index} onClick={() => hero.select(index)}><span /></button>)}</div>
            <button type="button" className="hero-slide-arrow" aria-label="Next dish" onClick={() => hero.select(hero.active + 1)}><ArrowRight size={17} /></button>
            {!reduced && <button type="button" className="hero-slide-arrow hero-slide-pause" aria-label={hero.paused ? 'Play slideshow' : 'Pause slideshow'} onClick={hero.toggle}>{hero.paused ? <Play size={15} /> : <Pause size={15} />}</button>}
          </div>
        </div>
        <div className="hero-bottom"><span><MapPin size={13} /> BASED IN PRAGUE</span><span>PRIVATE DINING · SPECIAL OCCASIONS · PERSONALISED MENUS</span><a className="hero-chef-link" href="#the-chef">Meet Chef Moosa <ArrowDown size={14} /></a></div>
        <span className="hero-image-credit">Illustrative dishes · A taste of five culinary worlds</span>
        </div>
      </section>

      <CuisineRibbon reduced={reduced} />

      <section className="chef-section" id="the-chef" aria-labelledby="chef-title"><div className="section-shell chef-layout">
        <div className="chef-image-wrap" data-reveal><div className="chef-image"><img src={asset('chef')} alt="Chef Moosa in his black chef jacket, standing with arms folded in a warmly lit restaurant" width="1000" height="1250" loading="lazy" /></div><span className="image-index">01 / THE PERSON BEHIND THE PLATE</span><div className="chef-seal"><ChefHat size={30} strokeWidth={1} /><span>MADE WITH<br />PERSONALITY</span></div></div>
        <div className="chef-copy" data-reveal><Eyebrow light>MEET CHEF MOOSA</Eyebrow><h2 id="chef-title">{biography.heading.map((line, i) => <span key={line}>{i > 0 && <br />}{i === 1 ? <em><MotionText>{line}</MotionText></em> : <MotionText>{line}</MotionText>}</span>)}</h2><div className="biography">{biography.paragraphs.map(p => <p key={p}>{p}</p>)}</div><div className="chef-signature">Moosa<span>{biography.role}</span></div><a href="#experiences" className="text-link dark-link">Discover the experience <ArrowUpRight size={17} /></a></div>
      </div></section>

      <section className="signature-section section-shell" aria-labelledby="signature-title">
        <div className="section-heading" data-reveal><div><Eyebrow>AN EXPRESSION OF FLAVOUR</Eyebrow><h2 id="signature-title"><MotionText>Rooted in tradition.</MotionText><br /><em><MotionText>Inspired by the world.</MotionText></em></h2></div><p>A few possibilities from a world of flavours.<br />Each one, a starting point for your own menu.</p></div>
        <div className="signature-layout"><div className="signature-stories">{signatures.map((dish, i) => <article className={`signature-story ${signature === i ? 'active' : ''}`} key={dish.name}>
          <div className="signature-number"><span>0{i + 1}</span><span>{dish.cuisine}</span></div><h3>{dish.name}</h3><p>{dish.description}</p><span className="signature-note">A SIGNATURE-INSPIRED POSSIBILITY</span><img className="signature-mobile-photo" src={asset(dish.image)} width="1000" height="1000" loading="lazy" alt={dish.alt} />
        </article>)}</div><div className="signature-stage" ref={signatureImages}><div className="signature-image-stack">{signatures.map((dish, i) => <img key={dish.name} data-signature={i} className={`signature-photo ${signature === i ? 'is-active' : ''}`} src={asset(dish.image)} width="1200" height="1400" alt={dish.alt} loading="lazy" />)}<span className="image-corner">✧</span></div><div className="signature-image-caption"><span>AN EXPLORATION IN THREE CHAPTERS</span><span>0{signature + 1} / 03</span></div></div></div>
        <p className="image-disclaimer">Food photography is illustrative. Dishes shown are menu inspiration.</p>
      </section>

      <section id="menu" className="menu-section" aria-labelledby="menu-title"><div className="section-shell">
        <div className="menu-intro" data-reveal><Eyebrow>{site.launched ? 'A MENU WITHOUT BORDERS' : 'MENU PREVIEW · COMING SOON'}</Eyebrow><h2 id="menu-title"><MotionText>Follow your</MotionText>{' '}<em><MotionText>appetite.</MotionText></em></h2><p>{dishes.length} illustrative dishes. Five culinary worlds.<br />Five dishes from each cuisine, selected to inspire your own menu.</p></div>
        {!site.launched && <p className="launch-preview-note">Full menus coming soon. Explore five signature ideas from each cuisine.</p>}
        <div className="menu-filter" aria-label="Filter menu by cuisine">{cuisines.map(name => <button type="button" aria-pressed={cuisine === name} className={cuisine === name ? 'selected' : ''} onClick={() => { setCuisine(name); setMenuExpanded(false); }} key={name}>{name}<span>{String(cuisineCount(name)).padStart(2, '0')}</span></button>)}</div>
        <div className="menu-status"><span><span className="status-dot" /> AI-ILLUSTRATED MENU</span><span aria-live="polite" role="status">{visibleDishes.length < filtered.length ? `Showing ${visibleDishes.length} of ${filtered.length} dishes` : `${filtered.length} dishes`} · {cuisine === 'All' ? 'All cuisines' : cuisine}</span></div>
        <div className="menu-grid" id="menu-dishes" ref={menuGrid}>{visibleDishes.map(dish => <MenuDish dish={dish} key={dish.name} />)}</div>
        {cuisine === 'All' && <div className="menu-expand"><p>{menuExpanded ? 'Five dishes per cuisine. Full menus coming soon.' : `Explore all ${dishes.length} dishes in this preview. Full menus coming soon.`}</p><button type="button" className="button button-outline" aria-expanded={menuExpanded} aria-controls="menu-dishes" onClick={() => {
          setMenuExpanded(value => !value);
          if (menuExpanded) requestAnimationFrame(() => document.getElementById('menu')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' }));
        }}>{menuExpanded ? 'Show less' : site.launched ? 'See full menu' : 'See menu preview'}<ArrowDown className={menuExpanded ? 'menu-toggle-up' : ''} size={17} /></button></div>}
        <div className="menu-footnote"><div><Check size={17} strokeWidth={1.5} /><span>Personalised menus on request</span></div><ContactAction className="text-link" context={`${cuisine === 'All' ? 'a menu exploring all cuisines' : `the ${cuisine} menu`}`}>Enquire about this menu</ContactAction></div>
      </div></section>

      <section className="experiences-section section-shell" id="experiences" aria-labelledby="experiences-title"><div className="section-heading" data-reveal><div><Eyebrow>MORE THAN A MEAL</Eyebrow><h2 id="experiences-title"><MotionText>Your occasion.</MotionText><br /><em><MotionText>My inspiration.</MotionText></em></h2></div><p>{site.launched ? <>Thoughtful food. Meaningful moments.<br />An experience that feels entirely your own.</> : <>Experiences coming soon to Prague.<br />Explore what’s being prepared for your table.</>}</p></div>
        <div className="experience-rows">{experiences.map(item => <article className="experience-row" key={item.title} data-reveal><span className="experience-number">{item.number}</span><div className="experience-name"><h3><MotionText>{item.title}</MotionText></h3><p>{item.note}</p></div><p className="experience-description">{item.description}</p><ContactAction className="round-link" context={item.title} icon={false}><span className="sr-only">Enquire on WhatsApp about {item.title}</span><ArrowUpRight size={25} strokeWidth={1} /></ContactAction></article>)}</div>
        <a className="text-link planning-shortcut" href="#planning">How it comes together <ArrowDown size={15} /></a>
      </section>

      <section className="planning-section section-shell" id="planning" aria-labelledby="planning-title">
        <div className="section-heading" data-reveal><div><Eyebrow>FROM AN IDEA TO AN EVENING</Eyebrow><h2 id="planning-title"><MotionText>It begins with</MotionText><br /><em><MotionText>a conversation.</MotionText></em></h2></div><p>A few thoughtful details help shape<br />an experience around your table.</p></div>
        <ol className="planning-steps">{planningSteps.map(step => <li key={step.number}><span className="planning-number">{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
        <div className="planning-brief"><div><span className="planning-brief-label">HELPFUL TO HAVE IN MIND</span><ul>{contact.enquiryFields.map(field => <li key={field}>{field}</li>)}</ul></div><ContactAction className="text-link" context="planning a private dining experience">Discuss your evening</ContactAction></div>
      </section>

      <section className="gallery-section section-shell" id="gallery" aria-labelledby="gallery-title"><div className="section-heading" data-reveal><div><Eyebrow>A FEAST FOR THE EYES</Eyebrow><h2 id="gallery-title"><MotionText>Taste,</MotionText>{' '}<em><MotionText>in a frame.</MotionText></em></h2></div><p>A glimpse of the flavours, details and<br />atmosphere that inspire the experience.</p></div>
        <Dialog.Root open={lightbox !== null} onOpenChange={open => { if (!open) setLightbox(null); }}><div className="gallery-grid">{gallery.map((item, i) => <Dialog.Trigger key={item.image} asChild><button type="button" className={`gallery-item gallery-item-${i + 1}`} onClick={event => { galleryOpener.current = event.currentTarget; setLightbox(i); }} aria-label={`Open image ${i + 1}: ${item.title}`}><img src={asset(item.image)} alt={item.alt} width="1200" height="1000" loading="lazy" /><span className="gallery-hover"><span>{item.title}</span><Plus size={23} strokeWidth={1} /></span><span className="gallery-plus"><Plus size={20} strokeWidth={1} /></span></button></Dialog.Trigger>)}</div>
          <Dialog.Portal><Dialog.Overlay className="dialog-overlay lightbox-overlay" /><Dialog.Content className="lightbox-content" onCloseAutoFocus={event => { event.preventDefault(); galleryOpener.current?.focus({ preventScroll: true }); }}>
            <Dialog.Title className="sr-only">{gallery[lightbox ?? 0].title}</Dialog.Title><Dialog.Description className="sr-only">Illustrative food and dining photography. Use the left and right arrow keys to browse, or Escape to close.</Dialog.Description>
            <Dialog.Close className="dialog-close lightbox-close" aria-label="Close gallery"><X size={24} /></Dialog.Close>
            <div className="lightbox-image"><img src={asset(gallery[lightbox ?? 0].image)} alt={gallery[lightbox ?? 0].alt} width="1400" height="1200" /></div>
            <div className="lightbox-bottom"><div aria-live="polite"><p>{gallery[lightbox ?? 0].title}</p><span>Illustrative photography · {String((lightbox ?? 0) + 1).padStart(2, '0')} / 06</span></div><div className="lightbox-controls"><button aria-label="Previous image" onClick={() => setLightbox(i => ((i ?? 0) - 1 + gallery.length) % gallery.length)}><ArrowLeft size={22} /></button><button aria-label="Next image" onClick={() => setLightbox(i => ((i ?? 0) + 1) % gallery.length)}><ArrowRight size={22} /></button></div></div>
          </Dialog.Content></Dialog.Portal>
        </Dialog.Root><p className="image-disclaimer">A visual moodboard · All food and dining photography is illustrative.</p>
      </section>

      <section className="questions-section" id="questions" aria-labelledby="questions-title"><div className="section-shell questions-layout"><div className="questions-intro" data-reveal><Eyebrow>GOOD TO KNOW</Eyebrow><h2 id="questions-title"><MotionText>Before we</MotionText><br /><em><MotionText>set the table.</MotionText></em></h2><p>A few answers to help you<br />imagine your own experience.</p><a className="text-link" href="#contact">Have another question? <ArrowUpRight size={16} /></a></div><div className="questions-list">{diningQuestions.map(item => <details className="dining-question" name="dining-questions" key={item.question}><summary><span>{item.question}</span><Plus size={19} aria-hidden="true" /></summary><div className="question-answer"><p>{item.answer}</p></div></details>)}</div></div></section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="contact-watermark" aria-hidden="true">MOOSA</div><div className="section-shell contact-inner" data-reveal><ChefHat className="contact-hat" size={38} strokeWidth={1} /><Eyebrow>YOUR TABLE. YOUR PEOPLE. YOUR MOMENT.</Eyebrow><h2 id="contact-title"><MotionText>Let’s create an unforgettable</MotionText><br /><em><MotionText>dining experience.</MotionText></em></h2><p>It all starts with a conversation.<br />Tell me what you have in mind, and we’ll take it from there.</p>{!site.launched && <span className="contact-launch-note">We haven’t launched yet. Get in touch for early enquiries about future dining experiences.</span>}<div className="contact-actions"><ContactAction className="button button-gold"><WhatsAppIcon size={18} />Chat on WhatsApp</ContactAction><ContactAction email className="button button-outline"><Mail size={18} strokeWidth={1.5} />Send an Email</ContactAction></div>{!whatsappLink() && !emailLink() && <span className="contact-soon"><span className="status-dot" /> Contact details coming soon</span>}<span className="contact-location"><MapPin size={13} />COMING SOON TO PRAGUE</span></div></section>
    </main>
    <footer className="site-footer section-shell"><a className="wordmark" href="#home">MOOSA<span>PRIVATE CHEF · PRAGUE</span></a><span>Authentic flavours. International cuisine.</span><div><span>© {new Date().getFullYear()} Chef Moosa</span><a href="#questions">Good to know <ArrowUpRight size={14} /></a><a href={`${import.meta.env.BASE_URL}photo-credits.html`}>Photo credits <ArrowUpRight size={14} /></a>{onReplayWelcome && !reduced && <button type="button" className="welcome-replay" onClick={onReplayWelcome}>Replay welcome <Play size={12} aria-hidden="true" /></button>}<a href="#home" aria-label="Back to top">Back to top <ArrowUpRight size={14} /></a></div></footer>
    <ContactAction className={`floating-whatsapp ${floatingVisible ? '' : 'floating-hidden'}`} icon={false}><WhatsAppIcon size={24} /><span className="floating-label">{whatsappLink() ? 'Chat on WhatsApp' : 'WhatsApp · Coming soon'}</span></ContactAction>
  </div>;
}

export default App;
