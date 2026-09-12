import classicImg from './assets/images/classic_battery_1788324817782.jpg';
import artistImg from './assets/images/artist_battery_1788324836196.jpg';
import craftImg from './assets/images/craft_battery_1788324851584.jpg';
import oceanImg from './assets/images/ocean_battery_1788324868295.jpg';

export interface Product {
  id: string;
  name: string;
  collection: string;
  price: number;
  description: string;
  image: string;
  details: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'classic-01',
    name: 'The Classic',
    collection: 'Core Series',
    price: 12.99,
    description: 'The tripwire. The conversation starter. The thing that makes someone say "wait, those are batteries?"',
    image: classicImg,
    details: ['4-Pack AA or AAA', 'Eco-friendly zinc-carbon', '10-year shelf life']
  },
  {
    id: 'artist-01',
    name: 'The Artist',
    collection: 'Artist Series',
    price: 12.99,
    description: 'Soft ethereal watercolor patterns inspired by wild meadows.',
    image: artistImg,
    details: ['4-Pack AA or AAA', 'Leak-proof technology', 'Artisan design']
  },
  {
    id: 'craft-01',
    name: 'The Craft',
    collection: 'Craft Series',
    price: 12.99,
    description: 'Tactile textures mimicking the organic patterns of ancient trees.',
    image: craftImg,
    details: ['4-Pack AA or AAA', 'Textured finish', 'Sustainable materials']
  },
  {
    id: 'ocean-01',
    name: 'The Ocean',
    collection: 'Ocean Series',
    price: 12.99,
    description: 'Deep obsidian and blue tones with metallic accents.',
    image: oceanImg,
    details: ['4-Pack AA or AAA', 'Luxury finish', 'Premium performance']
  }
];

export const BUNDLES = [
  {
    id: 'single-pack',
    name: 'Single Pack',
    price: 12.99,
    description: '4-pack, any collection. The impulse buy. The conversation starter.',
    savings: 'Pre-Order'
  },
  {
    id: 'founder-bundle',
    name: 'Founder Bundle',
    price: 34.99,
    description: '3 packs, mix collections. Free shipping. The one people keep reordering.',
    savings: 'Most Popular'
  },
  {
    id: 'full-collection',
    name: 'Full Collection Set',
    price: 64.99,
    description: 'All 7 collections. Premium gift box. For those who want everything.',
    savings: 'The Complete Set'
  }
];
