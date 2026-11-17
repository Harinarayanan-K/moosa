# Photography and fonts

All delivered assets are stored in `public/` and copied to `dist/` at build time. No remote assets are loaded by visitors.

## Chef portrait

`public/images/chef.webp` was prepared with the built-in Imagegen tool from the user's supplied Chef Moosa poster. The prompt required preserving his exact identity, appearance, black chef jacket and crossed-arm pose while removing typography and poster graphics. The result is an AI-assisted reconstruction of the poster photograph; replace it with the original standalone photograph when available.

Portrait prompt:

> Use case: identity-preserve / background-extraction. Input image 1 is the supplied Chef Moosa poster. Create a photographic portrait asset for his portfolio by extracting the EXACT chef photograph from the LEFT side of the poster. Preserve this man's exact identity, face, skin tone, hair, facial hair, black double-breasted chef jacket, crossed arms, and appearance. Do not substitute a different man, do not beautify or change him. Remove ALL poster text, logos, gold frames, foreground plated food, and other graphic elements. Fill only the areas previously obscured by the poster graphics with the continuation of his black jacket. Portrait 4:5 framing, head to hips, crossed arms in frame, warm dim restaurant background with copper light, cinematic realistic restaurant photography, natural skin texture, subtly dark edges. No text, no logo, no watermark. This is a crop/cleanup of the actual provided portrait, not a new fictional chef.

## Illustrative culinary images

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
