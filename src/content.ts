import { site } from './config/site';

// Edit this file to update the biography, menu, services and image descriptions.
// Biography facts are from the supplied Chef Moosa poster; no awards or claims
// about experience have been inferred. Menu dishes and food photos illustrate
// the concept and do not represent a fixed or currently available menu.
export const biography = {
  heading: ['Authentic flavours.', 'International', 'cuisine.'],
  paragraphs: [
    'Meet Moosa, a chef bringing together the flavours of Kerala, India, Italy, Europe and the Middle East — with a personal approach to every table.',
    'Currently working as Sous Chef at Deer Restaurant, Prague, Moosa is preparing to bring his cooking to a more intimate setting: your own.',
    'From private dinners to special occasions, each experience begins with a conversation and a menu created around you.',
  ],
  role: 'Sous Chef · Deer Restaurant, Prague',
};

// Footer copy stays here so the closing message can be edited independently.
export const footerContent = {
  tagline: 'Made for your table.',
  description: 'Private dining and personalised menus, inspired by Kerala and flavours from around the world.',
  prelaunchStatus: 'Coming soon to Prague',
  launchedStatus: 'Private chef · Prague',
  prelaunchContactHeading: 'Early enquiries',
  contactHeading: 'Get in touch',
  prelaunchContactNote: 'Tell me about a future occasion. We’ll start with your ideas.',
  contactNote: 'Tell me about your occasion. We’ll start with your ideas.',
};


export { cuisines, dishes, signatures, cuisineCount } from './menu';
export type { Cuisine, Dish } from './menu';

export const experiences = [
  { title: 'Private Dining', note: 'An intimate table. An extraordinary evening.', description: 'A thoughtfully composed dining experience in the comfort of your own space. Enjoy the company; let the food become part of the conversation.', number: '01' },
  { title: 'Special Occasions', note: 'For moments worth gathering around.', description: 'Birthdays, anniversaries and the occasions that deserve a little more. A personal culinary touch for the people who matter most.', number: '02' },
  { title: 'Personalised Menus', note: 'Your taste. Your story. Your menu.', description: 'Explore your favourite cuisines and discover something new. Share your preferences and dietary requirements to begin shaping a menu together.', number: '03' },
];

// Practical guidance only: confirm event-specific arrangements directly.
export const planningSteps = [
  { number: '01', title: 'Tell me about your table.', description: 'Start with your occasion, preferred date, location and approximate guest count.' },
  { number: '02', title: 'Find your flavours.', description: 'Share your favourite cuisines, menu ideas and any allergies or dietary requirements.' },
  { number: '03', title: 'Agree the details.', description: 'Discuss the proposed menu, quotation and practical arrangements directly with Moosa before confirming your plans.' },
];

export const diningQuestions = [
  ...(!site.launched ? [{ question: 'Have private dining experiences launched yet?', answer: 'Not yet. Chef Moosa’s private dining experiences are coming soon to Prague. Explore this website as a preview of the chef, cuisines and future experiences. WhatsApp and email are open for early enquiries; availability and arrangements will be confirmed directly.' }] : []),
  { question: 'Can I request a menu that is not shown?', answer: 'Yes. Personalised menus are the starting point. The dishes on this website are illustrative ideas; share the cuisines and flavours you enjoy to begin a conversation about your own menu.' },
  { question: 'What about allergies and dietary requirements?', answer: 'Please mention allergies, intolerances and dietary requirements in your first enquiry. Confirm menu suitability and any limitations directly with Moosa before agreeing an experience.' },
  { question: 'How many guests can I enquire for?', answer: 'Include your approximate guest count and intended setting in your enquiry. The suitability of your location and any kitchen or service arrangements should be discussed individually.' },
  { question: 'How much does a private dining experience cost?', answer: 'Personalised menus on request. Ask for an individual quotation for your proposed menu, guest count and occasion. The illustrative dishes on this website do not have fixed prices.' },
];

export const gallery = [
  { image: 'sea-bass-editorial', title: 'The art of the plate', alt: 'Illustrative roasted sea bass fillet, thoughtfully plated' },
  { image: 'table', title: 'A table, thoughtfully set', alt: 'Illustrative intimate restaurant table with warm lighting' },
  { image: 'ravioli-editorial', title: 'Simple ingredients. Beautiful possibilities.', alt: 'Illustrative mushroom ravioli finished with fresh sage' },
  { image: 'kofta-editorial', title: 'A little fire. A world of flavour.', alt: 'Illustrative chargrilled lamb kofta with yoghurt and herbs' },
  { image: 'biryani', title: 'Rooted in flavour', alt: 'Illustrative richly spiced chicken biryani' },
  { image: 'garden', title: 'The finishing touch', alt: 'Illustrative colourful seasonal dish' },
];

export const asset = (name: string, small = false) => `${import.meta.env.BASE_URL}images/${name}${small ? '-small' : ''}.webp`;
