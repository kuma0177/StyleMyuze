export type TabId = 'home' | 'tryon' | 'discover';

export type AuthView = 'waitlist' | 'signin' | 'otp';

export type ModalId =
  | 'drawer'
  | 'notifications'
  | 'moodboard'
  | 'product'
  | 'challenge'
  | 'share'
  | 'reel'
  | 'upload'
  | 'profile'
  | null;

export type Look = {
  id: string;
  title: string;
  occasion: string;
  rationale: string;
  image: string;
  price: number;
  items: string[];
  creator: string;
  tags: string[];
};

export type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  lookIds?: string[];
};

export type Profile = {
  fullName: string;
  email: string;
  gender: 'Female' | 'Male';
  size: string;
  styles: string[];
};

export type AppState = {
  signedIn: boolean;
  onboardingComplete: boolean;
  profile: Profile;
  savedLookIds: string[];
  tryOnHistory: string[];
  chat: ChatMessage[];
};
