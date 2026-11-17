// Illustrative regional favourites, not a fixed menu or photographs of Moosa's own dishes.
// Desktop and mobile compositions both show complete dishes; prompts: output/imagegen/.
// Replace images with local filenames from public/images (including the -small variant).
export const heroSlides = [
  { region: 'Kerala', dish: 'Kerala Fish Moilee', image: 'hero-kerala-wide', mobileImage: 'hero-kerala-mobile', width: 1600, height: 900 },
  { region: 'Indian', dish: 'Chicken Biryani', image: 'hero-indian-wide', mobileImage: 'hero-indian-mobile', width: 1600, height: 900 },
  { region: 'Italian', dish: 'Pizza Margherita', image: 'hero-italian-wide', mobileImage: 'hero-italian-mobile', width: 1600, height: 900 },
  { region: 'Middle Eastern', dish: 'Chargrilled Lamb Kofta', image: 'hero-middle-eastern-wide', mobileImage: 'hero-middle-eastern-mobile', width: 1600, height: 900 },
  { region: 'European', dish: 'Herb-Roasted Sea Bass', image: 'hero-european-wide', mobileImage: 'hero-european-mobile', width: 1600, height: 900 },
] as const;

export const heroSlideDuration = 7000;
