import gallerySoftStreet from '../assets/myuze-assets/generated/gallery-soft-street.webp';
import femaleMinimal from '../assets/myuze-assets/style-female-minimal.jpg';
import femaleOffice from '../assets/myuze-assets/style-female-office.jpg';
import femaleVintage from '../assets/myuze-assets/style-female-vintage.jpg';
import maleClassic from '../assets/myuze-assets/style-male-classic.jpg';
import maleStreetwear from '../assets/myuze-assets/style-male-streetwear.jpg';
import maleWorkwear from '../assets/myuze-assets/style-male-workwear.jpg';
import type { AppState, Look } from './types';

export const looks: Look[] = [
  {
    id: 'soft-street',
    title: 'Soft Street',
    occasion: 'Your gallery opening look',
    rationale: 'Clean layers, easy sneakers, relaxed—but intentional.',
    image: gallerySoftStreet,
    price: 168,
    items: ['Charcoal heavyweight hoodie', 'Relaxed cargo trouser', 'Stone trail sneaker'],
    creator: 'Styled for Maya',
    tags: ['Gallery', 'Streetwear', 'Neutral'],
  },
  {
    id: 'quiet-luxury',
    title: 'Quiet Luxury',
    occasion: 'Your dinner reservation look',
    rationale: 'Warm tailoring and a soft palette that always photographs well.',
    image: maleClassic,
    price: 212,
    items: ['Sand chore jacket', 'Cream knit', 'Tapered trouser'],
    creator: 'Myuze edit',
    tags: ['Dinner', 'Minimal', 'Classic'],
  },
  {
    id: 'modern-workwear',
    title: 'Modern Workwear',
    occasion: 'Your creative meeting look',
    rationale: 'Structured utility pieces with enough ease for the whole day.',
    image: maleWorkwear,
    price: 186,
    items: ['Olive utility overshirt', 'White tee', 'Washed work pant'],
    creator: 'Trending near you',
    tags: ['Workwear', 'Utility', 'Layered'],
  },
  {
    id: 'after-hours',
    title: 'After Hours',
    occasion: 'Your rooftop drinks look',
    rationale: 'Dark proportions and one clean line from jacket to shoe.',
    image: maleStreetwear,
    price: 148,
    items: ['Cropped bomber', 'Soft jersey tee', 'Wide-leg trouser'],
    creator: 'Based on your saves',
    tags: ['Night out', 'Streetwear', 'Monochrome'],
  },
  {
    id: 'soft-focus',
    title: 'Soft Focus',
    occasion: 'Your Sunday city look',
    rationale: 'A light tonal column with quiet texture and an easy silhouette.',
    image: femaleMinimal,
    price: 154,
    items: ['Ivory knit', 'Wide-leg trouser', 'Minimal leather sneaker'],
    creator: 'For your softer side',
    tags: ['Minimal', 'Weekend', 'Tonal'],
  },
  {
    id: 'new-romantic',
    title: 'New Romantic',
    occasion: 'Your date-night look',
    rationale: 'Vintage references, modern shape, and just enough color.',
    image: femaleVintage,
    price: 172,
    items: ['Printed blouse', 'High-rise trouser', 'Sculptural heel'],
    creator: 'Myuze edit',
    tags: ['Vintage', 'Date night', 'Color'],
  },
  {
    id: 'studio-polish',
    title: 'Studio Polish',
    occasion: 'Your presentation look',
    rationale: 'A precise but relaxed uniform for days when the details matter.',
    image: femaleOffice,
    price: 198,
    items: ['Relaxed blazer', 'Silk shell', 'Straight trouser'],
    creator: 'Saved by 2.4k stylists',
    tags: ['Office', 'Polished', 'Modern'],
  },
];

export const initialState: AppState = {
  signedIn: false,
  onboardingComplete: false,
  profile: {
    fullName: 'Maya Johnson',
    email: 'maya@myuze.app',
    gender: 'Male',
    size: 'M',
    styles: ['Streetwear', 'Minimal'],
  },
  savedLookIds: ['soft-street', 'quiet-luxury'],
  tryOnHistory: ['soft-street'],
  chat: [
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Tell me where you are going or share a piece you want to wear. I will style the rest around you.',
    },
  ],
};

export const styleOptions = ['Streetwear', 'Minimal', 'Workwear', 'Classic', 'Vintage', 'Color'];
