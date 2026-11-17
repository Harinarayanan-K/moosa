// Original brand messages, not attributed quotations or guest testimonials.
// Each image, headline, description and enquiry context changes together.
// Images are illustrative; the fusion scene is adapted from the supplied prawn image.
// Replace images with local filenames from public/images (including -small variants).
export const heroSlides = [
  {
    region: 'Seasonal', dish: 'Roasted Pumpkin Soup', image: 'hero-pumpkin-wide', mobileImage: 'hero-pumpkin-mobile', width: 1600, height: 900,
    headline: ['A world of flavour.', 'A table of your own.'],
    description: 'Personalised dining experiences inspired by Kerala, Indian, Italian, European, and Middle Eastern cuisine.',
    enquiryContext: 'a personalised dining experience with a menu created around my preferences', menuTarget: '#menu',
  },
  {
    region: 'Fusion', dish: 'Coconut Milk–Poached Roasted Prawns', image: 'hero-fusion-prawns-wide', mobileImage: 'hero-fusion-prawns-mobile', width: 1600, height: 900,
    headline: ['Kerala meets Europe.', 'A fusion of flavour.'],
    description: 'Roasted prawns, silky coconut milk and Kerala aromatics. Explore gentle fusion menus shaped around your tastes and preferred spice level.',
    enquiryContext: 'a personalised, mild Kerala–European fusion menu, including Coconut Milk–Poached Roasted Prawns', menuTarget: '#fusion-menu',
  },
  {
    region: 'European', dish: 'Croquette', image: 'hero-croquette-wide', mobileImage: 'hero-croquette-mobile', width: 1600, height: 900,
    headline: ['Your tastes.', 'A menu made for you.'],
    description: 'Your favourite ingredients, your occasion, your ideas. Share your tastes and dietary needs to begin planning a menu around you.',
    enquiryContext: 'a menu tailored to my tastes, occasion and dietary requirements', menuTarget: '#menu',
  },
  {
    region: 'Indian', dish: 'Chicken Biryani', image: 'hero-indian-wide', mobileImage: 'hero-indian-mobile', width: 1600, height: 900,
    headline: ['Familiar flavours.', 'A personal touch.'],
    description: 'Kerala and Indian inspiration, prepared around the flavours you enjoy. Tell me your favourite dishes and preferred level of spice.',
    enquiryContext: 'a personalised Kerala or Indian menu with my preferred level of spice', menuTarget: '#menu',
  },
  {
    region: 'Middle Eastern', dish: 'Chargrilled Lamb Kofta', image: 'hero-middle-eastern-wide', mobileImage: 'hero-middle-eastern-mobile', width: 1600, height: 900,
    headline: ['Made for sharing.', 'Made for your people.'],
    description: 'From an intimate dinner to a special celebration, begin with the flavours your guests enjoy and a menu made for the occasion.',
    enquiryContext: 'a personalised sharing menu for a private dinner or special occasion', menuTarget: '#menu',
  },
  {
    region: 'European', dish: 'Herb-Roasted Sea Bass', image: 'hero-european-wide', mobileImage: 'hero-european-mobile', width: 1600, height: 900,
    headline: ['Simply seasonal.', 'Personally yours.'],
    description: 'Seasonal ingredients, thoughtful cooking and a personal approach. Let’s shape a dining experience around what you love to eat.',
    enquiryContext: 'a seasonal menu created around my favourite ingredients', menuTarget: '#menu',
  },
] as const;

export const heroSlideDuration = 5000;
