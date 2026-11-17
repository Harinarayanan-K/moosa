# Photography and fonts

All delivered assets are stored in `public/` and copied to `dist/` at build time. No remote assets are loaded by visitors.

## Chef portrait

`public/images/chef.webp` was prepared with the built-in Imagegen tool from the user's supplied Chef Moosa poster. The prompt required preserving his exact identity, appearance, black chef jacket and crossed-arm pose while removing typography and poster graphics. The result is an AI-assisted reconstruction of the poster photograph; replace it with the original standalone photograph when available.

Portrait prompt:

> Use case: identity-preserve / background-extraction. Input image 1 is the supplied Chef Moosa poster. Create a photographic portrait asset for his portfolio by extracting the EXACT chef photograph from the LEFT side of the poster. Preserve this man's exact identity, face, skin tone, hair, facial hair, black double-breasted chef jacket, crossed arms, and appearance. Do not substitute a different man, do not beautify or change him. Remove ALL poster text, logos, gold frames, foreground plated food, and other graphic elements. Fill only the areas previously obscured by the poster graphics with the continuation of his black jacket. Portrait 4:5 framing, head to hips, crossed arms in frame, warm dim restaurant background with copper light, cinematic realistic restaurant photography, natural skin texture, subtly dark edges. No text, no logo, no watermark. This is a crop/cleanup of the actual provided portrait, not a new fictional chef.

## Illustrative culinary images

### Current menu image series

The additional mini burger collection has nine bespoke images generated with the built-in `image_gen` tool: beef and cheddar, crispy chicken, spiced lamb, crispy fish, portobello with pesto, smash cheeseburger, smoky bacon BBQ, truffle beef, and Smažák fried cheese. Each shows two petite sliders on a fully framed charcoal plate against the same warm stone background as the menu series. Files are `public/images/mini-burger-*.webp` with `-small.webp` companions; originals are retained as `output/imagegen/mini-burger-*.png`. Final prompts are in `output/imagegen/mini-burger-prompts.json`, with names, fillings and alternative text in `src/mini-burgers.ts`. The menu optimisation helper processes both image collections. These are AI menu illustrations, not photographs of Moosa's own work.

All 25 dishes in the current menu preview use bespoke AI-generated editorial food illustrations from the built-in `image_gen` tool. They share warm dark stone, soft side lighting, realistic food textures and fully framed serving vessels. These are menu inspiration, not documentary photographs of Chef Moosa's own food. The menu is labelled “AI-illustrated menu”.

Publishable files are `public/images/menu-premium-*.webp`, with matching `-small.webp` variants. Original PNGs are retained under `output/imagegen/menu-premium-*.png` and excluded from Git. The full final prompts and dish descriptions are recorded in `output/imagegen/menu-premium-prompts.json`; file mappings and alternative text are in `src/menu-premium-images.json`. Croquette uses `public/images/croquette-editorial.webp` as its plating reference, retaining two croquettes and the geometric sauces. `node scripts/optimise-menu-assets.mjs` creates 1400- and 640-pixel-wide WebP derivatives without cropping the originals. Cards use a 3:2 frame.

Kerala Fish Moilee, Wild Mushroom Ravioli and Chargrilled Lamb Kofta remain in the signature section and are excluded from the menu preview. Malabar Prawn Curry, Risotto ai Funghi and Lamb Mandi replace them, preserving exactly five menu dishes per cuisine. Earlier stock assets and their licence records are retained as an editable source library; their credit entries do not describe the new AI menu illustrations.

### Wide hero photographs

Five bespoke hero assets were created with the built-in `image_gen` tool: `public/images/hero-pumpkin-wide.webp`, `hero-indian-wide.webp`, `hero-italian-wide.webp`, `hero-middle-eastern-wide.webp` and `hero-european-wide.webp`. Each has a 640-pixel `-small.webp` derivative. They are AI-generated illustrative photographs, not images of Moosa's own work.

The photographs use a consistent wide tabletop composition, warm dark stone, complete serving vessels, natural side lighting and space for typography. Current hero subjects are Roasted Pumpkin Soup, Croquette, Chicken Biryani, Lamb Kofta and Herb-Roasted Sea Bass. The older Pizza Margherita hero asset is retained but is not rendered in the hero. The complete final prompt set and generation mode are recorded in `output/imagegen/hero-prompts.json`. Original PNGs are retained locally in `output/imagegen/` and excluded from Git; `node scripts/optimise-hero-assets.mjs` creates the WebP derivatives without cropping. The website uses `object-fit: cover` to fill the hero directly; on mobile it uses a full portrait composition, with the headline over the tabletop and a substantially larger complete serving plate. There is no photo zoom animation.

The website identifies all food and dining imagery as illustrative. It does not present it as Chef Moosa's own photographed work. The dishes are ideas for a personalised menu, not a fixed offering.

Locally stored stock images from Unsplash:

| File | Original source |
| --- | --- |
| `biryani.webp` | https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8 |
| `garden.webp` | https://images.unsplash.com/photo-1512621776951-a57141f2eefd |
| `table.webp` | https://images.unsplash.com/photo-1414235077428-338989a2e8c0 |

Stock source: [Unsplash](https://unsplash.com/license). The refresh helper is `scripts/download-assets.mjs`.

The 44 additional menu images were sourced from Wikimedia Commons. Their author, original file page, licence and image adaptations are recorded per photograph in `public/menu-photo-credits.json` and the publicly accessible `public/photo-credits.html`, linked from the website footer. They are cropped for display, resized and converted to WebP; their derivatives use the original stated licences. The retained metadata caches and `scripts/source-menu-photos.mjs` support refreshing these assets. All photographs are still presented as illustrative, rather than as Moosa's own photographed work.

Additional illustrative assets were created with the built-in Imagegen tool and converted to WebP. Final prompts follow.

### `moilee.webp`

> Use case: photorealistic-natural. Asset type: illustrative food photograph for a premium private chef portfolio. Primary request: cinematic close-up editorial food photography of Kerala fish moilee, elegantly served in a handmade shallow matte dark charcoal ceramic bowl. Two perfectly cooked white fish fillets in a silky pale golden coconut milk sauce with a few fresh green curry leaves, thin green chilli, tiny toasted mustard seeds, sophisticated restrained plating. Bowl on a dark warm stone restaurant table, soft natural side light illuminating the fish, warm quiet shadows, subtle golden oil droplets, appetising and realistic, tactile surface, 85mm lens with gentle depth of field, luxury hospitality magazine quality. Portrait 4:5 composition, bowl filling image with some dark negative space at edges, no text, no logos, no watermark, no hands. This is illustrative menu inspiration.

### `ravioli-editorial.webp`

> Use case: photorealistic-natural. Illustrative food photograph for a luxury private chef portfolio. Photograph an elegant serving of hand-folded WILD MUSHROOM RAVIOLI, 6 large fresh pasta pillows in glossy brown butter sauce with tiny sauteed wild mushrooms and fresh sage leaves, restrained parmesan shavings. Wide handmade ivory ceramic shallow plate on very dark warm brown restaurant table. Beautiful appetising realistic food texture, cinematic soft side lighting, editorial hospitality magazine photography, delicate shallow depth of field, subtle warm gold and earthy tones, no artificial garnish, no text, no hands, no logos. Portrait 4:5 close composition, plate fills most of frame, premium and understated. Must be stuffed ravioli, not spaghetti. This is illustrative food inspiration.

### `kofta-editorial.webp`

> Use case: photorealistic-natural. Illustrative food photograph for a luxury private chef portfolio. Middle Eastern chargrilled lamb kofta: three beautifully shaped spiced ground lamb kebabs with dark grill marks on an elegant matte dark oval ceramic plate, a restrained swoosh of creamy yoghurt sauce, fresh parsley, a small roasted tomato, sumac and herb oil. Sophisticated high end plating with natural textures. Warm very dark restaurant table background, cinematic warm natural side light, editorial hospitality magazine photography, subtle depth of field, appetising charred meat, earthy greens and gold tones. No cutlery, no hands, no words or logos. Portrait 4:5 close photographic composition. This is illustrative menu inspiration.

### `sea-bass-editorial.webp`

> Use case: photorealistic-natural. Asset type: illustrative luxury food photograph for private chef website. Beautiful cooked herb-roasted sea bass FILLET, NOT a whole raw fish. One perfectly seared white fish fillet with crisp bronze skin on top, elegant sophisticated restaurant plating on a large handmade dark charcoal ceramic plate, with a few pieces of roasted baby carrots, tender green seasonal vegetables, delicate golden herb sauce. Realistic and appetising, restrained thoughtful presentation, premium culinary magazine photography. Dark warm restaurant table, soft cinematic warm side lighting, natural food texture, shallow depth of field. Portrait 4:5 composition, plate fills frame, no hands, no words, no logos. This is illustrative menu inspiration.

## Fonts

Cormorant Garamond (normal and italic) and DM Sans are hosted locally as Latin-subset WOFF2 files. Both are distributed under the SIL Open Font License. Upstream licence files are included in `public/fonts/`. `scripts/download-fonts.mjs` records the Google Fonts source and refreshes the compressed files. Serif fallbacks are Georgia and the system serif; body fallbacks use the system sans-serif.

## WhatsApp icon

The WhatsApp SVG mark is from [Bootstrap Icons](https://icons.getbootstrap.com/icons/whatsapp/), distributed under the MIT licence. Its licence is included at `public/licenses/bootstrap-icons.txt`; the reusable component is `src/components/WhatsAppIcon.tsx`.

### Mobile hero photographs

Five portrait companions were generated with the built-in `image_gen` tool, using the corresponding wide hero PNG as the visual reference. These `public/images/hero-*-mobile.webp` assets and their `-small.webp` variants show the same dishes in a 9:16 composition. The food occupies roughly three quarters of the image width, below room for the headline. They are resized without cropping. Original PNGs are retained in `output/imagegen/`, with final prompt and reference paths in `output/imagegen/hero-mobile-prompts.json`. Recreate WebP derivatives with `node scripts/optimise-mobile-hero-assets.mjs`. Desktop continues using the wide compositions.

### Pumpkin soup hero replacement

The active opening hero dish is Roasted Pumpkin Soup, labelled Seasonal, with roasted cashews, toasted pumpkin seeds and green herb oil. Its desktop and mobile images were made with the built-in `image_gen` tool, using the prior hero compositions as references for the warm stone tabletop and lighting. Neither appam nor fish curry appears in these new images. Publishable derivatives are `public/images/hero-pumpkin-wide.webp`, `hero-pumpkin-wide-small.webp`, `hero-pumpkin-mobile.webp` and `hero-pumpkin-mobile-small.webp`. Original PNGs and the final prompt set are in `output/imagegen/hero-pumpkin-*.png` and `output/imagegen/hero-pumpkin-prompts.json`. Recreate just these derivatives with `node scripts/optimise-hero-assets.mjs pumpkin` and `node scripts/optimise-mobile-hero-assets.mjs pumpkin`. The menu’s Kerala dishes remain separate from the hero image selection.

### Croquette illustrations

Three assets were created with the built-in `image_gen` tool from the user-supplied croquette plating photograph. They preserve the two golden croquettes, the ivory plate and the intersecting dark triangular sauces with pale golden outlines and a green oil inset. The lighting, crumb texture and presentation were refined for the site’s premium style. The filling has not been inferred. Hero files are `public/images/hero-croquette-wide.webp` and `hero-croquette-mobile.webp`; the menu uses `public/images/croquette-editorial.webp`. Each has a `-small.webp` companion. The original PNGs are retained in `output/imagegen/` and the full final prompts are in `output/imagegen/croquette-prompts.json`. Hero derivatives can be refreshed with `node scripts/optimise-hero-assets.mjs croquette` and `node scripts/optimise-mobile-hero-assets.mjs croquette`. Menu images are resized to 1400 and 640 pixels wide with Sharp and encoded as WebP. These are AI illustrations based on a supplied plating reference, not documentary photographs.
