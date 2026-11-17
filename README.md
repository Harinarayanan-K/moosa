# MOOSA — Private Chef Prague

A complete, browser-only portfolio built with React, TypeScript, Vite, Tailwind CSS, GSAP/ScrollTrigger, Lucide and Radix Dialog. It contains no backend, API routes, database, authentication, forms or booking system.

## Coming-soon mode (currently active)

The entire portfolio is visible: chef biography, signature dishes, all 50 menu photographs, cuisine filters, experiences, gallery, FAQs and contact. A banner, hero label, menu/experience notices and contact copy clearly identify it as a coming-soon preview. WhatsApp and email messages state that these are early enquiries. No launch date or countdown is assumed.

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
- **`src/menu.ts`**: 50 illustrated dishes, with 10 in each cuisine, editable names, course labels and descriptions. Counts are calculated automatically; there are no invented prices or availability claims.
- **`src/menu-photos.json`**: the mapping between the 44 additional menu dishes and their local photographs. Original featured image paths remain in `src/menu.ts`.
- **`public/images/`**: optimised WebP photography. Match the existing filenames to replace an image without code changes, or update the image name in `src/content.ts`. Menu image variants use `name.webp` and `name-small.webp`.
- **`src/styles.css`**: palette, type, spacing, responsive layouts and motion preferences.
- **`src/cinematic.css`**: the cinematic enhancement layer and text masks.
- **`src/dining-guide.css`**: the planning guide and accessible FAQ layout.
- **`src/hooks/useHeroSlideshow.ts`**: slideshow timing, pause behavior, visibility and responsive motion preferences.
- **`src/hooks/useCinematicMotion.ts`**: GSAP text and photographic reveals, restrained portrait parallax and desktop signature-dish transitions.
- **`src/hero.css`**: the hero’s shared left alignment, complete headline phrases, supporting copy and responsive layout. The slideshow images, mobile image variants, region labels and dish captions are in `src/hero-slides.ts`.
- **`src/menu.css`**: the compact menu presentation.
- **`output/imagegen/hero-prompts.json`**: the final prompt set for the five generated hero images. Mobile prompts are in `output/imagegen/hero-mobile-prompts.json`; the pumpkin soup replacement prompts are in `output/imagegen/hero-pumpkin-prompts.json`. Original PNGs are saved in the same local directory; publishable WebP files are in `public/images/`. Regenerate derivatives with `node scripts/optimise-hero-assets.mjs` and `node scripts/optimise-mobile-hero-assets.mjs`.
- **`ASSETS.md`**: asset sources and generated-image production notes.
- **`PORTFOLIO-REVIEW.md`**: the official chef websites reviewed, the resulting improvements and remaining content recommendations.

To optimise new JPEG/PNG images, place them in `public/images/` and run `node scripts/optimise-assets.mjs`. This creates WebP files and removes those intermediate JPEG/PNG inputs. Existing WebP images are left alone unless a matching source is supplied. Sharp is a development tool; image processing is never performed on the live site.

## Behaviour and accessibility

- Native anchor navigation and natural scrolling; animated, focus-trapped mobile navigation.
- Masked text and photo reveals, restrained desktop parallax, signature-image crossfades and gallery feedback. All scrolling remains natural, and reduced motion is respected.
- Six photographic dishes appear initially. “See full menu” reveals all 50, and “Show less” restores the six-dish preview. Cuisine filters show ten photographed dishes each and returning to All restores the compact preview.
- A three-step enquiry guide, a checklist of helpful details, and native keyboard-accessible FAQs. Planning copy and FAQ answers are editable in `src/content.ts`.
- Sticky signature imagery on desktop and a natural vertical photo layout on mobile. Moosa's portrait appears only in the chef section. The hero opens with roasted pumpkin soup garnished with roasted cashews, toasted pumpkin seeds and green herb oil. It rotates five bespoke wide, illustrative food images every seven seconds with gentle slide transitions and no zoom. The photograph itself fills the hero with `object-fit: cover`, without side frames, masks or duplicate background layers; mobile uses dedicated portrait compositions as one continuous background behind the headline, description, buttons, slideshow controls and hero footer. Previous/next, region selectors and pause/play controls remain available. Playback continues while hovering and after pointer-based selections. Keyboard focus pauses playback; leaving the hero or hiding the tab temporarily suspends it. Reduced motion disables autoplay and animated transitions while keeping manual selection.
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
