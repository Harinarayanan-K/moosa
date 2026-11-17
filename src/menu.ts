// Illustrative menu ideas, not a fixed offering. No prices or availability are implied.
import sourcedPhotos from './menu-photos.json' with { type: 'json' };
const menuPhotos: Record<string, string> = sourcedPhotos;
export const cuisines = ['All', 'Kerala', 'Indian', 'Italian', 'European', 'Middle Eastern'] as const;
export type Cuisine = typeof cuisines[number];
export type Dish = {
  name: string;
  cuisine: Exclude<Cuisine, 'All'>;
  course: string;
  description: string;
  image?: string;
  alt?: string;
};

export const featuredDishes = [
  { name: 'Kerala Fish Moilee', cuisine: 'Kerala', course: 'Main course', description: 'Delicate fish, coconut milk, fresh curry leaves and a gentle warmth of spice.', image: 'moilee', alt: 'Illustrative fish curry with a golden coconut sauce' },
  { name: 'Chicken Biryani', cuisine: 'Indian', course: 'Main course', description: 'Fragrant basmati rice, warming spices and tender chicken, layered with care.', image: 'biryani', alt: 'Illustrative aromatic biryani with herbs and spices' },
  { name: 'Wild Mushroom Ravioli', cuisine: 'Italian', course: 'Pasta', description: 'Silken pasta, earthy wild mushrooms, brown butter and fresh herbs.', image: 'ravioli-editorial', alt: 'Illustrative handmade mushroom ravioli in brown butter with sage' },
  { name: 'Herb-Roasted Sea Bass', cuisine: 'European', course: 'Main course', description: 'Crisp-skinned sea bass, seasonal vegetables and a delicate herb finish.', image: 'sea-bass-editorial', alt: 'Illustrative crisp-skinned sea bass fillet with roasted vegetables and herbs' },
  { name: 'Chargrilled Lamb Kofta', cuisine: 'Middle Eastern', course: 'Main course', description: 'Chargrilled spiced lamb, cool yoghurt and bright, freshly picked herbs.', image: 'kofta-editorial', alt: 'Illustrative chargrilled lamb kofta with yoghurt and herbs' },
  { name: 'Seasonal Garden Plate', cuisine: 'European', course: 'Starter', description: 'A celebration of seasonal vegetables, contrasting textures and fresh flavours.', image: 'garden', alt: 'Illustrative carefully composed seasonal vegetable plate' },
] as const satisfies readonly Dish[];

// Each entry is [dish name, course, editable description].
function ideas(cuisine: Dish['cuisine'], entries: readonly (readonly [string, string, string])[]): Dish[] {
  return entries.map(([name, course, description]) => ({ name, cuisine, course, description, image: menuPhotos[name], alt: `Illustrative ${name}` }));
}

export const dishes: readonly Dish[] = [
  ...featuredDishes,
  ...ideas('Kerala', [
    ['Appam & Vegetable Stew', 'Main course', 'Lacy appam with a gentle coconut-milk stew of vegetables, ginger and whole spices.'],
    ['Kerala Chicken Roast', 'Main course', 'Chicken in a deeply flavoured onion masala, finished with curry leaves and black pepper.'],
    ['Beef Ularthiyathu', 'Main course', 'Slow-cooked beef roasted with coconut slivers, aromatic spices and curry leaves.'],
    ['Karimeen Pollichathu', 'Main course', 'Pearl spot fish coated in shallot masala and cooked in a banana-leaf parcel.'],
    ['Malabar Prawn Curry', 'Main course', 'Prawns in a coconut-based curry with a bright, tangy finish and fragrant curry leaves.'],
    ['Thalassery Chicken Biryani', 'Rice', 'Fragrant short-grain rice layered with spiced chicken, fried onions and fresh herbs.'],
    ['Puttu & Kadala Curry', 'Main course', 'Steamed rice flour and coconut, served with a warmly spiced black-chickpea curry.'],
    ['Avial', 'Vegetable dish', 'Mixed vegetables with ground coconut, cumin, yoghurt and a fragrant coconut-oil finish.'],
    ['Ada Pradhaman', 'Dessert', 'Tender rice ada in a rich coconut-milk and jaggery pudding, finished with roasted cashews.'],
  ]),
  ...ideas('Indian', [
    ['Butter Chicken', 'Main course', 'Tender chicken in a smooth tomato sauce with butter, cream and dried fenugreek.'],
    ['Chicken Tikka Masala', 'Main course', 'Chargrilled chicken pieces in a full-bodied tomato and spice sauce.'],
    ['Tandoori Chicken', 'Main course', 'Yoghurt-marinated chicken with warming spices and a smoky, lightly charred finish.'],
    ['Palak Paneer', 'Main course', 'Soft paneer in a vibrant spinach sauce with garlic, cumin and a touch of cream.'],
    ['Paneer Tikka', 'Starter', 'Marinated paneer, peppers and onions, chargrilled and finished with a squeeze of lime.'],
    ['Chole Masala', 'Main course', 'Chickpeas simmered in an onion and tomato masala with warming whole spices.'],
    ['Dal Makhani', 'Main course', 'Slow-simmered black lentils and kidney beans with butter, cream and gentle spice.'],
    ['Rogan Josh', 'Main course', 'Tender lamb in a fragrant sauce of Kashmiri chilli, ginger and aromatic spices.'],
    ['Gulab Jamun', 'Dessert', 'Soft milk dumplings soaked in a delicately scented cardamom and rose syrup.'],
  ]),
  ...ideas('Italian', [
    ['Spaghetti Carbonara', 'Pasta', 'Spaghetti with guanciale, egg, pecorino and freshly cracked black pepper.'],
    ['Tagliatelle al Ragù', 'Pasta', 'Ribbon pasta with a slowly cooked meat ragù and a fine grating of parmesan.'],
    ['Lasagna al Forno', 'Pasta', 'Layers of pasta, rich meat ragù and béchamel, baked until golden.'],
    ['Risotto ai Funghi', 'Main course', 'Creamy risotto with earthy mushrooms, parmesan and fresh herbs.'],
    ['Gnocchi al Pomodoro', 'Pasta', 'Soft potato gnocchi in a bright tomato sauce with basil and parmesan.'],
    ['Pizza Margherita', 'Main course', 'A classic combination of tomato, mozzarella, fresh basil and olive oil.'],
    ['Burrata & Heirloom Tomatoes', 'Starter', 'Creamy burrata with ripe tomatoes, basil and extra-virgin olive oil.'],
    ['Tiramisu', 'Dessert', 'Coffee-soaked sponge fingers layered with mascarpone cream and a dusting of cocoa.'],
    ['Vanilla Panna Cotta', 'Dessert', 'Silky vanilla-set cream with a bright seasonal berry compote.'],
  ]),
  ...ideas('European', [
    ['Beef Bourguignon', 'Main course', 'Slow-braised beef in a red-wine sauce with mushrooms, pearl onions and herbs.'],
    ['Coq au Vin', 'Main course', 'Chicken braised with wine, mushrooms, shallots and a fragrant bouquet of herbs.'],
    ['Duck Confit', 'Main course', 'Slow-cooked duck with crisp golden skin, served with seasonal accompaniments.'],
    ['Beef Wellington', 'Main course', 'Beef fillet and mushroom duxelles wrapped in golden, crisp puff pastry.'],
    ['Salmon en Croûte', 'Main course', 'Salmon and a delicate spinach filling enclosed in buttery puff pastry.'],
    ['Ratatouille', 'Vegetable dish', 'Aubergine, courgette, peppers and tomatoes, gently cooked with olive oil and herbs.'],
    ['Potato Gratin', 'Side dish', 'Thinly sliced potatoes baked with cream, garlic and a golden cheese crust.'],
    ['Crème Brûlée', 'Dessert', 'Vanilla custard beneath a delicate, freshly caramelised sugar crust.'],
  ]),
  ...ideas('Middle Eastern', [
    ['Chicken Shawarma', 'Main course', 'Spice-marinated chicken with warm flatbread, pickles and a creamy garlic sauce.'],
    ['Shish Tawook', 'Main course', 'Yoghurt and lemon-marinated chicken skewers, chargrilled and finished with fresh herbs.'],
    ['Falafel', 'Starter', 'Crisp chickpea and herb fritters with tahini sauce and fresh salad.'],
    ['Hummus', 'Mezze', 'Smooth chickpeas blended with tahini, lemon and garlic, finished with olive oil.'],
    ['Baba Ganoush', 'Mezze', 'Smoky roasted aubergine with tahini, lemon and a drizzle of olive oil.'],
    ['Fattoush', 'Salad', 'Crisp vegetables, fresh herbs and toasted flatbread with a bright sumac dressing.'],
    ['Tabbouleh', 'Salad', 'Finely chopped parsley, tomatoes and bulgur with lemon and olive oil.'],
    ['Lamb Mandi', 'Rice', 'Tender, richly spiced lamb served over fragrant rice with warm Arabian spices.'],
    ['Kunafa', 'Dessert', 'Golden pastry with a soft cheese filling, fragrant syrup and chopped pistachios.'],
  ]),
];

export const signatures = [featuredDishes[0], featuredDishes[2], featuredDishes[4]];
export const cuisineCount = (cuisine: Cuisine) => cuisine === 'All' ? dishes.length : dishes.filter(dish => dish.cuisine === cuisine).length;
