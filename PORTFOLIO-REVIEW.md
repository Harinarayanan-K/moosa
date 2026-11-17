# Chef portfolio reference review

Reviewed 17 November 2026. This is an editorial assessment of official websites, not an endorsement or affiliation. Their names, photographs, copy, credentials and operating policies have not been used as Moosa's own.

## References and useful patterns

| Official reference | Observed pattern | Application to Moosa |
| --- | --- | --- |
| [Clare Smyth](https://www.claresmyth.com/) and [biography](https://www.claresmyth.com/biography) | Biography and food gallery have clear, separate places in the navigation. | Keep the chef story, verified role and food imagery distinct. Moosa's portrait appears once, in the Meet Chef Moosa section. The hero uses an illustrative regional-food slideshow. |
| [Thomas Keller — Per Se private dining](https://thomaskeller.com/new-york-new-york/per-se/private-dining-events-general-information/) | Explains event possibilities, individual planning and menu customisation. | Add a short guide explaining what to share and what to discuss before agreeing an experience. |
| [Atelier Crenn FAQ](https://www.ateliercrenn.com/faq/) and [dietary restrictions](https://www.ateliercrenn.com/dietary-restrictions/) | Practical information answers questions guests have before enquiring or visiting. | Add useful FAQs. Ask guests to discuss dietary needs; do not assume the same accommodations, notice periods or policies apply to Moosa. |
| [Massimo Bottura — Francescana Family](https://francescanafamily.it/) | Introduces the group's identity and story before presenting the wider portfolio. | Retain Moosa's own five-cuisine identity and personal approach rather than adding generic prestige language. |
| [Core by Clare Smyth](https://corebyclaresmyth.com/) | A focused restaurant presentation organised around the chef, food and guest experience. | Keep the cuisine ribbon concise and visually subordinate to the photography and chef story. |
| [Aristeia — developer case study](https://artursdev.co.uk/work/aristeia) | Describes restrained restaurant-site motion with reduced-motion support and a user pause control. | Use restrained movement and a still reduced-motion alternative. The compact badge design is bespoke to Moosa. |

## Implemented improvements

1. **Planning guide:** three concise steps covering the occasion, preferred date, guest count, location, menu preferences and arrangements to discuss.
2. **Practical FAQs:** personalised menus, dietary requirements, guest arrangements and requesting an individual quotation. No invented capacity, rates, response times or dietary guarantees.
3. **Better enquiry messages:** WhatsApp and email templates include editable prompts, with the selected cuisine or experience retained in WhatsApp context. Messages are still URL encoded, and no invalid destination is rendered.
4. **Useful navigation:** an experience-to-planning link and a footer link to the FAQs.
5. **Cuisine badge ribbon:** small champagne-gold outlined badges replace the static cuisine row. A continuous 44-second loop has faded edges and a compact mobile layout. The heading, numbers, decorative stars and pause/play control were removed at the user's request. Reduced motion shows all five badges without animation; duplicated visual content is hidden from screen readers.
6. **Consistent menu imagery:** the menu now has 25 bespoke AI food illustrations, with warm stone, soft side lighting and fully framed plates. The signature-section dishes are excluded from the menu to avoid repetition; Prawn Curry, Mushroom Risotto and Lamb Mandi replace them. There are still five dishes per cuisine, with all five cuisines represented in the compact six-card preview. The public credits and menu label identify the imagery as AI illustrations.

The existing colour palette remains. The hero uses a five-dish food slideshow with pause/play and manual controls. The former scroll-pinned sequence remains removed, and Moosa's portrait appears once, in the chef section. Image motion uses restrained reveals, parallax and signature-dish crossfades with a reduced-motion alternative. The 25 selected illustrative dishes have photographs, with exactly five per cuisine. Six appear initially; “See menu preview” and “Show less” control the visible selection. Full menus are marked coming soon. Public photo credits identify the additional source images and their licences. All information is static; there are no forms, booking tools, trackers, backend services or runtime API requests.

## Highest-value next additions, when real information is supplied

### Czech mini burger references

The mini burger collection also includes petite interpretations of styles found on current Czech restaurant menus. [Burgerman](https://www.burgerman.cz/en/) lists smash cheeseburger and truffle variants; [The PUB Praha 2](https://www.thepub.cz/praha/?lng=en) lists a bacon-and-barbecue beef burger; [Amici](https://www.amici.cz/brno-bystrc/burgery/smazak/) lists a Smažák fried-cheese burger. These references informed the added smash cheeseburger, smoky bacon BBQ, truffle beef and Smažák miniatures. This is menu inspiration, not a popularity ranking, partnership or claim that these recipes originated in Czechia. Moosa's names, descriptions and AI images are independently prepared, with no restaurant prices or brands used in the public menu.

### Remaining content opportunities

- **Contact details:** the supplied WhatsApp number and email address are configured in `src/config/contact.ts`.
- **Original food photography:** replace the illustrative stock and generated dishes with Moosa's own work. Obtain the original standalone portrait to replace the AI-assisted poster reconstruction when available. Sources are recorded in `ASSETS.md`.
- **Confirmed service details:** define geographic coverage, guest limits, kitchen needs, staffing, inclusions and cancellation terms before publishing any such commitments.
- **Genuine client stories or press:** add only attributable, approved material. There is no reason to add empty testimonial or awards sections.
- **Current biography:** reconfirm the role and any additional career details before launch. The present biography uses the supplied poster, including the Sous Chef role at Deer Restaurant, Prague.

These content additions will improve trust more than more animation or a larger visual redesign. The current “Coming soon to Prague” status should remain until an actual launch is confirmed.
