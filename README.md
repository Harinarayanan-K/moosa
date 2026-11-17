# MOOSA — Private Chef Prague

A complete, browser-only portfolio built with React, TypeScript, Vite, Tailwind CSS, GSAP/ScrollTrigger, Lucide and Radix Dialog. It contains no backend, API routes, database, authentication, forms or booking system.

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

WhatsApp is configured with the supplied number, +91 98464 39316, and email with libinsadk@gmail.com. WhatsApp enquiry text includes the selected cuisine or experience. Email subjects and bodies and WhatsApp messages are URL encoded. Email actions open the visitor’s email application; the website does not send email itself.

## Edit the portfolio

- **`src/content.ts`**: biography, chef role, experience descriptions, gallery captions, planning guide and FAQs. Biography facts come from the supplied poster.
- **`src/menu.ts`**: 50 illustrated dishes, with 10 in each cuisine, editable names, course labels and descriptions. Counts are calculated automatically; there are no invented prices or availability claims.
- **`src/menu-photos.json`**: the mapping between the 44 additional menu dishes and their local photographs. Original featured image paths remain in `src/menu.ts`.
- **`public/images/`**: optimised WebP photography. Match the existing filenames to replace an image without code changes, or update the image name in `src/content.ts`. Menu image variants use `name.webp` and `name-small.webp`.
- **`src/styles.css`**: palette, type, spacing, responsive layouts and motion preferences.
- **`src/cinematic.css`**: the cinematic enhancement layer and text masks.
- **`src/dining-guide.css`**: the planning guide and accessible FAQ layout.
- **`src/hooks/useCinematicMotion.ts`**: GSAP text and photographic reveals, restrained portrait parallax and desktop signature-dish transitions.
- **`src/hero.css`**: the editorial hero, dark photographic backdrop and responsive layout. Replace the hero photograph through the `table` asset in `src/App.tsx`.
- **`src/menu.css`**: the compact menu presentation.
- **`ASSETS.md`**: asset sources and generated-image production notes.
- **`PORTFOLIO-REVIEW.md`**: the official chef websites reviewed, the resulting improvements and remaining content recommendations.

To optimise new JPEG/PNG images, place them in `public/images/` and run `node scripts/optimise-assets.mjs`. This creates WebP files and removes those intermediate JPEG/PNG inputs. Existing WebP images are left alone unless a matching source is supplied. Sharp is a development tool; image processing is never performed on the live site.

## Behaviour and accessibility

- Native anchor navigation and natural scrolling; animated, focus-trapped mobile navigation.
- Masked text and photo reveals, restrained desktop parallax, signature-image crossfades and gallery feedback. All scrolling remains natural, and reduced motion is respected.
- Six photographic dishes appear initially. “See full menu” reveals all 50, and “Show less” restores the six-dish preview. Cuisine filters show ten photographed dishes each and returning to All restores the compact preview.
- A three-step enquiry guide, a checklist of helpful details, and native keyboard-accessible FAQs. Planning copy and FAQ answers are editable in `src/content.ts`.
- Sticky signature imagery on desktop and a natural vertical photo layout on mobile. Moosa's portrait appears only in the chef section. The hero uses an illustrative dining photograph with a four-second camera settle, disabled for reduced motion.
- Gallery dialog with previous/next, arrow keys, Escape, focus trapping and focus restoration.
- WhatsApp and email configuration validated before any external link is created.
- Reduced-motion preference respected, including changes while the page is open; animation listeners and instances cleaned up.
- Visible keyboard focus, a skip link, semantic sections, image alternative text, responsive images and reserved image space.
- Floating WhatsApp control accounts for mobile safe areas; footer includes extra clearance.

## Verification

```sh
npm test
```

Playwright tests the **production build** in installed Google Chrome at desktop and iPhone dimensions. Install Chrome or adjust the `channel` in `playwright.config.ts` to use your installed Playwright Chromium. Build before running tests. Tests cover all five 10-dish cuisine filters, menu completeness, anchor/mobile navigation, local assets, layout overflow, gallery keyboard/focus behaviour, contact fallback, URL encoding, signature-image crossfades and reduced motion. Screenshots are written to `test-results/`.

Additional menu photographs are local WebP files, with two sizes per dish. `scripts/source-menu-photos.mjs` is an optional build-time sourcing helper with resumable metadata caches; it is never run by the website. Public attribution and licence details are in `public/photo-credits.html` and `public/menu-photo-credits.json`, linked from the footer. Keep those credits when deploying or reusing the associated photographs.
