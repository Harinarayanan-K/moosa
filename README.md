# MOOSA — Private Chef Prague

A complete, browser-only portfolio built with React, TypeScript, Vite, Tailwind CSS, GSAP/ScrollTrigger, Lucide and Radix Dialog. It contains no backend, API routes, database, authentication, forms or booking system.

## Coming-soon mode (currently active)

The entire portfolio is visible: chef biography, signature dishes, 25 selected menu photographs, cuisine filters, experiences, gallery, FAQs and contact. A banner, hero label, menu/experience notices and contact copy clearly identify it as a coming-soon preview. WhatsApp and email messages state that these are early enquiries. No launch date or countdown is assumed.

- `src/config/site.ts`: set `launched` to `true` to remove prelaunch notices. Update the title and description in `index.html` for launch, then rebuild and upload `dist/`.
- `src/launch.css`: the announcement banner and prelaunch notices.
- `src/config/contact.ts`: shared WhatsApp/email details and prefilled enquiry messages.

## Welcome animation

On the first visit in each tab session, a bespoke gold van and chef travel towards an illustrated Prague skyline. After about 3.75 seconds the full website opens. “Skip intro” and Escape open it immediately. Reduced motion and direct section links bypass the animation; it also works when browser storage is unavailable. The first food image preloads during the scene. A six-second fallback prevents animation failure from keeping visitors waiting.

Use “Replay welcome” in the footer to watch again. Set `welcomeAnimation: false` in `src/config/site.ts` to disable it. Edit the vector scene and timing in `src/components/WelcomeIntro.tsx` and its companion CSS. This is a short welcome animation, not a countdown to the service launch.

## Run and preview

Requires Node.js 22.13+ and npm.

```sh
npm ci
npm run dev
```

Production build and preview:

```sh
npm run build
npm run preview -- --port 4173
```

Open `http://127.0.0.1:4173`. The final static output is **`dist/`**. Upload its contents to any static host. No runtime environment variables or server functions are required. Vite uses a relative base, so the build also works at a host subdirectory. All photography and fonts are local files.

## Add real contact details

Edit **`src/config/contact.ts`**, then rebuild:

- `whatsappNumber`: real international number, digits only, including country code; no plus sign, punctuation or spaces.
- `emailAddress`: real email address.
- `defaultEnquiry`: default prefilled message.
- `emailSubject`: prefilled email subject.
- `enquiryFields`: helpful prompts appended to WhatsApp and email messages; set to `[]` to omit them. These are message prompts, not a website form.

WhatsApp is configured with the supplied number, +420 722 018 176, and email with libinsadk@gmail.com. WhatsApp enquiry text includes the selected cuisine or experience. Email subjects and bodies and WhatsApp messages are URL encoded. Email actions open the visitor’s email application; the website does not send email itself.

## Edit the portfolio

- **`src/content.ts`**: biography, chef role, experience descriptions, gallery captions, planning guide and FAQs. Biography facts come from the supplied poster.
- **`footerContent` in `src/content.ts`**: the editable closing message, description, launch status and enquiry copy. Footer layout is in `src/components/SiteFooter.tsx` and `src/components/site-footer.css`. It groups the brand story, useful navigation and direct contact links, with a separate utility row. WhatsApp and email destinations still come exclusively from `src/config/contact.ts`.
- **`src/menu.ts`**: 25 illustrated preview dishes, exactly five in each cuisine, editable names, course labels and descriptions. The `previewDishNames` selection controls the visible dishes; the larger `allMenuIdeas` collection is retained for future editing. Counts are calculated automatically. Full menus are marked coming soon; there are no invented prices or availability claims.
- **`src/menu-photos.json`**: the mapping between the 44 additional menu dishes and their local photographs. Original featured image paths remain in `src/menu.ts`.
- **`src/menu-premium-images.json`**: the current menu's 25 bespoke AI illustrations and descriptive alternative text. Signature dishes stay exclusive to “An Expression of Flavour”; the menu instead includes Malabar Prawn Curry, Risotto ai Funghi and Lamb Mandi. The first six cards introduce all five cuisines.
- **`src/mini-burgers.ts`**: nine additional mini burger variations, with editable names, fillings, groups and image paths. They appear in a separate, initially collapsed collection within the menu, preserving the five-dishes-per-cuisine preview. Its built-in Imagegen prompts are in `output/imagegen/mini-burger-prompts.json`; image files are `public/images/mini-burger-*.webp`. The menu optimisation script also processes this collection, or accepts individual burger slugs.
- **`src/fusion-menu.ts`**: six mild Kerala–European fusion ideas, with editable descriptions, course labels, pairing notes and image paths. The independent “Kerala meets Europe” collection uses coconut milk, cashew cream, brown butter, curry leaves, ginger and cardamom. Its original AI prompts are in `output/imagegen/fusion-menu-prompts.json`, with local images at `public/images/fusion-*.webp`. The menu optimisation helper processes these assets too. These are illustrative ideas, with the coming-soon notice and a contextual WhatsApp enquiry action.
- **`public/images/`**: optimised WebP photography. Match the existing filenames to replace an image without code changes, or update the image name in `src/content.ts`. Menu image variants use `name.webp` and `name-small.webp`.
- **`src/styles.css`**: palette, type, spacing, responsive layouts and motion preferences.
- **`src/cinematic.css`**: the cinematic enhancement layer and text masks.
- **`src/dining-guide.css`**: the planning guide and accessible FAQ layout.
- **`src/hooks/useHeroSlideshow.ts`**: slideshow timing, pause behavior, visibility and responsive motion preferences.
- **`src/hooks/useCinematicMotion.ts`**: GSAP text and photographic reveals, restrained portrait parallax and desktop signature-dish transitions.
- **`src/hero.css`**: the hero’s shared left alignment, reserved headline/copy space and responsive layout. All six slides' editable two-line brand messages, descriptions, enquiry contexts, menu destinations, images, mobile variants and captions are in `src/hero-slides.ts`. These are original brand messages, not attributed quotations or testimonials. The first slide retains the original headline; the second pairs the supplied prawn dish with the mild fusion message and opens the fusion collection directly.
- **`src/menu.css`**: the compact menu presentation.
- **`src/components/CuisineRibbon.tsx`** and **`src/components/cuisine-ribbon.css`**: the compact cuisine badges, continuous 44-second motion loop and static reduced-motion layout. Cuisine names come from the shared menu content.
- **`output/imagegen/hero-prompts.json`**: the final prompt set for the five generated hero images. Mobile prompts are in `output/imagegen/hero-mobile-prompts.json`; the pumpkin soup replacement prompts are in `output/imagegen/hero-pumpkin-prompts.json`; croquette prompts are in `output/imagegen/croquette-prompts.json`. Original PNGs are saved in the same local directory; publishable WebP files are in `public/images/`. Regenerate derivatives with `node scripts/optimise-hero-assets.mjs` and `node scripts/optimise-mobile-hero-assets.mjs`.
- **`ASSETS.md`**: asset sources and generated-image production notes.
- **`output/imagegen/menu-premium-prompts.json`**: the final prompt set for the 25 menu images, generated with the built-in Imagegen tool. Optimise their original PNGs with `node scripts/optimise-menu-assets.mjs`; it creates 1400- and 640-pixel WebP variants without cropping.
- **`PORTFOLIO-REVIEW.md`**: the official chef websites reviewed, the resulting improvements and remaining content recommendations.

To optimise new JPEG/PNG images, place them in `public/images/` and run `node scripts/optimise-assets.mjs`. This creates WebP files and removes those intermediate JPEG/PNG inputs. Existing WebP images are left alone unless a matching source is supplied. Sharp is a development tool; image processing is never performed on the live site.

## Behaviour and accessibility

- Native anchor navigation and natural scrolling; animated, focus-trapped mobile navigation.
- A minimal, continuously moving champagne-gold cuisine badge ribbon, without a heading or controls. Screen readers receive each cuisine once; reduced motion presents all five badges in a still, wrapping layout.
- Masked text and photo reveals, restrained desktop parallax, signature-image crossfades and gallery feedback. All scrolling remains natural, and reduced motion is respected.
- Six photographic dishes appear initially. “See menu preview” reveals all 25 selected dishes, and “Show less” restores the compact preview. Cuisine filters show exactly five photographed dishes each and returning to All restores the compact preview.
- The mini burger collection opens independently with mouse, touch or keyboard. It offers beef and cheddar, crispy chicken, spiced lamb, crispy fish and portobello with pesto, plus four Czech-menu-inspired miniatures: smash cheeseburger, bacon BBQ, truffle beef and Smažák fried cheese. All nine have matching AI illustrations and a shared WhatsApp enquiry link. It remains labelled coming soon before launch.
- A separate six-dish mild fusion menu opens independently, preserving the compact main menu. Both collections share presentation styles in `src/menu.css`, native keyboard-accessible disclosures and a still reduced-motion alternative. Opening or closing a collection refreshes downstream scroll animations.
- A three-step enquiry guide, a checklist of helpful details, and native keyboard-accessible FAQs. Planning copy and FAQ answers are editable in `src/content.ts`.
- Sticky signature imagery on desktop and a natural vertical photo layout on mobile. Moosa's portrait appears only in the chef section. The hero opens with roasted pumpkin soup garnished with roasted cashews, toasted pumpkin seeds and green herb oil. It rotates six wide, illustrative food images every five seconds with gentle slide transitions and no zoom. Each image has its own headline and description about personalised menus, occasions or flavour preferences; the text changes with a restrained fade. The second slide uses wide and mobile adaptations of the supplied Coconut Milk–Poached Roasted Prawns image for Kerala–European fusion. Its menu action opens that collection and its WhatsApp message includes the fusion context. The photograph itself fills the hero with `object-fit: cover`, without side frames, masks or duplicate background layers; mobile uses dedicated portrait compositions as one continuous background behind all hero content. Its upper 120 pixels of empty tabletop are trimmed to bring the food higher, with a correspondingly shorter hero and no zoom animation. Previous/next, region selectors and pause/play controls remain available. Playback continues while hovering and after pointer-based selections. Keyboard focus pauses playback; leaving the hero or hiding the tab temporarily suspends it. Reduced motion disables autoplay and animated transitions while keeping manual selection.
- Gallery dialog with previous/next, arrow keys, Escape, focus trapping and focus restoration.
- WhatsApp and email configuration validated before any external link is created.
- Reduced-motion preference respected, including changes while the page is open; animation listeners and instances cleaned up.
- Visible keyboard focus, a skip link, semantic sections, image alternative text, responsive images and reserved image space.
- Floating WhatsApp control accounts for mobile safe areas; footer includes extra clearance.

## Verification

```sh
npm test
```

Playwright tests the **production build** in installed Google Chrome at desktop and iPhone dimensions. Install Chrome or adjust the `channel` in `playwright.config.ts` to use your installed Playwright Chromium. Build before running tests. The full portfolio checks run in coming-soon mode, including menu filters, contact destinations, image loading, keyboard navigation, responsive layouts, gallery controls and reduced motion. Additional prelaunch checks verify notices and early-enquiry messages. Screenshots are written to `test-results/`.

Additional menu photographs are local WebP files, with two sizes per dish. `scripts/source-menu-photos.mjs` is an optional build-time sourcing helper with resumable metadata caches; it is never run by the website. Public attribution and licence details are in `public/photo-credits.html` and `public/menu-photo-credits.json`, linked from the footer. Keep those credits when deploying or reusing the associated photographs.
