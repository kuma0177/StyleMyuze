import React, { useState } from 'react';
import './styles/global.css';
import myuzeLogo from './assets/myuze-assets/myuze-logo-full.svg';
import waitlistHero from './assets/myuze-assets/waitlist-hero-fashion.png';
import female1 from './assets/myuze-assets/female-1.png';
import female2 from './assets/myuze-assets/female-2.png';
import female3 from './assets/myuze-assets/female-3.png';
import female4 from './assets/myuze-assets/female-4.png';
import female5 from './assets/myuze-assets/female-5.png';
import female6 from './assets/myuze-assets/female-6.png';
import male1 from './assets/myuze-assets/male-1.png';
import male2 from './assets/myuze-assets/male-2.png';
import male3 from './assets/myuze-assets/male-3.png';
import male4 from './assets/myuze-assets/male-4.png';
import male5 from './assets/myuze-assets/male-5.png';
import male6 from './assets/myuze-assets/male-6.png';

type Tab = 'home' | 'discover' | 'tryon' | 'profile';
type AuthMode = 'waitlist' | 'signin' | 'signup' | 'otp';
type SetupStep = 'account' | 'style' | 'done';
type Modal = 'moodboard' | 'challenge' | 'share' | 'reel' | 'poll' | 'drawer' | null;

type TenantUser = {
  id: string;
  name: string;
  email: string;
  setupStep: SetupStep;
  profile: {
    fullName: string;
    gender: 'Female' | 'Male';
    skinTone: string;
    size: string;
    styles: string[];
    influencers: string[];
    inspirationLinks: string[];
  };
  chat: ChatMessage[];
  savedLooks: string[];
  tryOnHistory: string[];
  polls: Poll[];
};

type Tenant = {
  id: string;
  name: string;
  users: Record<string, TenantUser>;
};

type PrototypeStore = {
  activeTenantId: string;
  activeUserId: string;
  tenants: Record<string, Tenant>;
};

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  lookIds?: string[];
};

type Poll = {
  id: string;
  question: string;
  lookIds: string[];
  votes: Record<string, number>;
};

type Look = {
  id: string;
  title: string;
  vibe: string;
  price: string;
  tags: string[];
  items: string[];
  palette: string[];
  image: string;
  photo: string;
};

const modelPhotos = [female1, female2, female3, female4, female5, female6, male1, male2, male3, male4, male5, male6];

const looks: Look[] = [
  {
    id: 'soft-street',
    title: 'Soft Street',
    vibe: 'Clean layers, easy sneakers, relaxed-but-intentional.',
    price: '$84-ish',
    tags: ['warm weather', 'your colors', 'Gen Z casual'],
    items: ['Boxy white tee', 'Washed denim', 'Sage overshirt', 'Low-profile sneakers'],
    palette: ['#f7f3ea', '#95a987', '#0e1620', '#d7e9ff'],
    image: 'street',
    photo: male1,
  },
  {
    id: 'clean-weekend',
    title: 'Clean Weekend',
    vibe: 'Brunch-to-errands fit with soft neutrals and good shape.',
    price: '$112-ish',
    tags: ['minimal', 'weekend', 'shop similar'],
    items: ['Ribbed tank', 'Wide-leg trouser', 'Cropped jacket', 'Silver hoops'],
    palette: ['#ffffff', '#c9c2b8', '#111111', '#8aa6c9'],
    image: 'weekend',
    photo: female1,
  },
  {
    id: 'rooftop-casual',
    title: 'Rooftop Casual',
    vibe: 'Date-night energy without trying too hard.',
    price: '$96-ish',
    tags: ['date night', 'photo ready', 'night out'],
    items: ['Textured shirt', 'Tailored pant', 'Slim belt', 'Statement watch'],
    palette: ['#e8ddd0', '#7d8d74', '#f5f5f1', '#090909'],
    image: 'rooftop',
    photo: male3,
  },
  {
    id: 'work-ish',
    title: 'Work-ish',
    vibe: 'Polished enough for meetings, comfortable enough for the commute.',
    price: '$128-ish',
    tags: ['office', 'classic', 'millennial friendly'],
    items: ['Soft blazer', 'Relaxed denim', 'Cream knit', 'Loafers'],
    palette: ['#ebe5da', '#1d2939', '#bdc7c2', '#ffffff'],
    image: 'work',
    photo: female4,
  },
];

const defaultChat: ChatMessage[] = [
  {
    id: 'c1',
    role: 'assistant',
    text: 'Hi Maya. Drop a screenshot, link, product, or vibe and I will turn it into fits that remember your style twin.',
  },
];

const makeUser = (id: string, name: string, email: string): TenantUser => ({
  id,
  name,
  email,
  setupStep: 'account',
  profile: {
    fullName: name,
    gender: 'Female',
    skinTone: 'Medium',
    size: 'M',
    styles: ['Streetwear', 'Soft Minimal'],
    influencers: [],
    inspirationLinks: [],
  },
  chat: defaultChat,
  savedLooks: ['soft-street'],
  tryOnHistory: ['rooftop-casual'],
  polls: [],
});

const initialStore: PrototypeStore = {
  activeTenantId: 'myuze-studio',
  activeUserId: 'maya',
  tenants: {
    'myuze-studio': {
      id: 'myuze-studio',
      name: 'Myuze Studio',
      users: {
        maya: makeUser('maya', 'Maya Johnson', 'maya@myuze.app'),
        jordan: {
          ...makeUser('jordan', 'Jordan Lee', 'jordan@myuze.app'),
          setupStep: 'done',
          profile: {
            fullName: 'Jordan Lee',
            gender: 'Male',
            skinTone: 'Olive',
            size: 'L',
            styles: ['Workwear', 'Streetwear', 'Minimal'],
          influencers: [],
          inspirationLinks: ['capsule fall layers'],
          },
          chat: [
            ...defaultChat,
            {
              id: 'c2',
              role: 'user',
              text: 'I need a clean gallery opening fit that still feels like me.',
            },
            {
              id: 'c3',
              role: 'assistant',
              text: 'I remember you like structured layers and low-contrast palettes. I pulled three directions with softer tailoring.',
              lookIds: ['work-ish', 'soft-street', 'rooftop-casual'],
            },
          ],
        },
      },
    },
    'campus-drop': {
      id: 'campus-drop',
      name: 'Campus Drop',
      users: {
        tasha: {
          ...makeUser('tasha', 'Tasha Green', 'tasha@campus.example'),
          setupStep: 'done',
          profile: {
            fullName: 'Tasha Green',
            gender: 'Female',
            skinTone: 'Deep',
            size: 'S',
            styles: ['Y2K', 'Color Pop', 'Budget Finds'],
            influencers: [],
            inspirationLinks: ['festival haul screenshot'],
          },
          savedLooks: ['clean-weekend', 'soft-street'],
        },
      },
    },
  },
};

const storeKey = 'myuze-pwa-prototype-v1';

function loadStore(): PrototypeStore {
  try {
    const raw = localStorage.getItem(storeKey);
    if (!raw) return initialStore;
    const parsed = JSON.parse(raw) as PrototypeStore;
    Object.values(parsed.tenants).forEach(tenant => {
      Object.values(tenant.users).forEach(user => {
        if (!['account', 'style', 'done'].includes(user.setupStep)) {
          user.setupStep = 'account';
        }
      });
    });
    return parsed;
  } catch {
    return initialStore;
  }
}

function usePrototypeStore() {
  const [store, setStore] = useState<PrototypeStore>(loadStore);

  const commit = (updater: (draft: PrototypeStore) => PrototypeStore) => {
    setStore(prev => {
      const next = updater(structuredClone(prev));
      localStorage.setItem(storeKey, JSON.stringify(next));
      return next;
    });
  };

  const tenant = store.tenants[store.activeTenantId];
  const user = tenant.users[store.activeUserId];

  const updateUser = (updater: (user: TenantUser) => TenantUser) => commit(draft => {
    const activeTenant = draft.tenants[draft.activeTenantId];
    activeTenant.users[draft.activeUserId] = updater(activeTenant.users[draft.activeUserId]);
    return draft;
  });

  return { store, tenant, user, commit, updateUser };
}

const uid = () => Math.random().toString(36).slice(2, 9);

function App() {
  const { tenant, user, updateUser } = usePrototypeStore();
  const [authMode, setAuthMode] = useState<AuthMode>('waitlist');
  const [sessionActive, setSessionActive] = useState(user.setupStep !== 'account');
  const [tab, setTab] = useState<Tab>('home');
  const [modal, setModal] = useState<Modal>(null);
  const [selectedLookId, setSelectedLookId] = useState('soft-street');
  const [chatInput, setChatInput] = useState('');
  const [productOpen, setProductOpen] = useState(false);
  const [toast, setToast] = useState('');

  const isSignedIn = sessionActive;
  const setupComplete = user.setupStep === 'done';
  const selectedLook = looks.find(look => look.id === selectedLookId) ?? looks[0];

  const completeAuth = () => {
    setSessionActive(true);
    setToast(`Signed into ${tenant.name}. ${user.name}'s memory is isolated.`);
  };

  const sendChat = (text = chatInput) => {
    const clean = text.trim();
    if (!clean) return;
    updateUser(current => ({
      ...current,
      chat: [
        ...current.chat,
        { id: uid(), role: 'user', text: clean },
        {
          id: uid(),
          role: 'assistant',
          text: `I used ${current.profile.styles.join(', ') || 'your saved choices'} plus your past chats to make three looks. Pick one to try on or poll friends.`,
          lookIds: ['soft-street', 'clean-weekend', 'rooftop-casual'],
        },
      ],
    }));
    setChatInput('');
    setToast('Chat saved to this user profile. Backend can hydrate this from history later.');
  };

  const finishSetup = () => {
    updateUser(current => ({ ...current, setupStep: 'done' }));
    setSessionActive(true);
    setTab('home');
    setToast('');
  };

  const logOut = () => {
    setModal(null);
    setTab('home');
    setProductOpen(false);
    setAuthMode('waitlist');
    setSessionActive(false);
  };

  const openLook = (lookId: string, nextTab: Tab = 'tryon') => {
    setSelectedLookId(lookId);
    setTab(nextTab);
    setProductOpen(false);
  };

  const saveTryOn = (lookId = selectedLookId) => {
    updateUser(current => ({
      ...current,
      tryOnHistory: Array.from(new Set([lookId, ...current.tryOnHistory])),
      savedLooks: Array.from(new Set([lookId, ...current.savedLooks])),
    }));
    setToast('Saved to try-on history for this user only.');
  };

  const createPoll = () => {
    const challengerId = selectedLookId === 'soft-street' ? 'rooftop-casual' : selectedLookId;
    updateUser(current => ({
      ...current,
      polls: [
        {
          id: uid(),
          question: `Help ${current.name.split(' ')[0]} pick a fit`,
          lookIds: ['soft-street', challengerId],
          votes: { 'soft-street': 63, [challengerId]: 37 },
        },
        ...current.polls,
      ],
    }));
    setModal('poll');
    setToast('Public poll link created. Voters can try the vibe after voting.');
  };

  return (
    <main className="app-stage">
      <section className="phone-shell" aria-label="Myuze interactive PWA prototype">
        <StatusBar />
        {!isSignedIn ? (
          <AuthScreen mode={authMode} setMode={setAuthMode} onContinue={completeAuth} />
        ) : !setupComplete ? (
          <SetupFlow user={user} updateUser={updateUser} onDone={finishSetup} />
        ) : (
          <>
            <AppHeader
              tenant={tenant}
              user={user}
              onSwitch={() => setModal('drawer')}
              onNotify={() => setToast('New outfit ideas are waiting for this account.')}
            />
            <div className="screen-body">
              {tab === 'home' && (
                <HomeScreen
                  user={user}
                  chatInput={chatInput}
                  setChatInput={setChatInput}
                  sendChat={sendChat}
                  openMoodboard={() => setModal('moodboard')}
                  openLook={openLook}
                />
              )}
              {tab === 'discover' && (
                <DiscoverScreen
                  openLook={openLook}
                  openProduct={(lookId) => {
                    setSelectedLookId(lookId);
                    setProductOpen(true);
                  }}
                />
              )}
              {tab === 'tryon' && productOpen ? (
                <ProductDetail look={selectedLook} onTry={() => setProductOpen(false)} />
              ) : tab === 'tryon' ? (
                <TryOnScreen
                  look={selectedLook}
                  historyIds={user.tryOnHistory}
                  openLook={openLook}
                  onChallenge={() => setModal('challenge')}
                  onShare={() => setModal('share')}
                  onReel={() => setModal('reel')}
                  saveTryOn={saveTryOn}
                />
              ) : null}
              {tab === 'profile' && (
                <ProfileScreen user={user} updateUser={updateUser} setTab={setTab} onLogout={logOut} />
              )}
            </div>
            <TabBar tab={tab} setTab={setTab} />
          </>
        )}
        {modal === null && isSignedIn && toast && <Toast key={toast} message={toast} />}
        {modal === 'moodboard' && (
          <MoodboardSheet
            onClose={() => setModal(null)}
            onCreate={() => {
              updateUser(current => ({
                ...current,
                profile: {
                  ...current.profile,
                  inspirationLinks: Array.from(new Set(['uploaded moodboard', ...current.profile.inspirationLinks])),
                },
                chat: [
                  ...current.chat,
                  {
                    id: uid(),
                    role: 'assistant',
                    text: 'I read the vibe: soft neutrals, relaxed tailoring, photo-ready layers. Here are three looks built from your style twin.',
                    lookIds: ['soft-street', 'clean-weekend', 'rooftop-casual'],
                  },
                ],
              }));
              setModal(null);
              setTab('home');
              setToast('Moodboard saved as a user style signal.');
            }}
          />
        )}
        {modal === 'challenge' && (
          <ChallengeSheet
            onClose={() => setModal(null)}
            onPoll={createPoll}
            onShare={() => setModal('share')}
          />
        )}
        {modal === 'share' && (
          <ShareSheet
            look={selectedLook}
            onClose={() => setModal(null)}
            onCopy={() => setToast('Share link copied: myuze.ai/look/soft-street')}
          />
        )}
        {modal === 'reel' && (
          <ReelSheet look={selectedLook} onClose={() => setModal(null)} onSave={saveTryOn} />
        )}
        {modal === 'poll' && (
          <PollSheet user={user} onClose={() => setModal(null)} onTry={() => openLook('soft-street')} />
        )}
        {modal === 'drawer' && (
          <DrawerSheet
            user={user}
            onClose={() => setModal(null)}
            setTab={setTab}
            onToast={setToast}
            onLogout={logOut}
          />
        )}
      </section>
      <aside className="prototype-panel">
        <div>
          <p className="eyeline">Interactive prototype</p>
          <h1>End-to-end Myuze PWA experience</h1>
          <p>
            This front-end reuses the existing Vite PWA stack and models the future backend contract:
            every tenant owns distinct users, profiles, chats, selections, try-ons, and polls.
          </p>
        </div>
        <MemoryCard tenant={tenant} user={user} />
        <div className="handoff-card">
          <h3>Backend-ready data boundaries</h3>
          <ul>
            <li><strong>Tenant</strong>: brand, workspace, billing, limits.</li>
            <li><strong>User profile</strong>: measurements, size, tone, styles, inspiration.</li>
            <li><strong>Chat memory</strong>: full conversation history by user.</li>
            <li><strong>Creation graph</strong>: moodboards, looks, try-ons, reels, polls.</li>
          </ul>
        </div>
      </aside>
    </main>
  );
}

function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <span>5G 100%</span>
    </div>
  );
}

function BrandMark() {
  return (
    <div className="brand-mark">
      <img src={myuzeLogo} alt="Myuze" />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="google-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function AuthScreen({ mode, setMode, onContinue }: {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
  onContinue: () => void;
}) {
  if (mode === 'waitlist') {
    return (
      <div className="waitlist-screen">
        <img className="waitlist-photo" src={waitlistHero} alt="" />
        <div className="waitlist-top">
          <img src={myuzeLogo} alt="Myuze" />
        </div>
        <div className="waitlist-copy">
          <span className="coming-soon">COMING SOON</span>
          <h1>Find your style.<br />Try it on.<br />Own it.</h1>
          <p>Chat with an AI stylist, generate looks on your own photo, and share them before you buy.</p>
          <input placeholder="you@email.com" aria-label="Email for waitlist" />
          <button className="gradient-btn" data-testid="join-waitlist" onClick={() => setMode('signin')}>Join the waitlist</button>
          <button className="waitlist-link" onClick={() => setMode('signin')}>Already invited? <strong>Sign in</strong></button>
        </div>
      </div>
    );
  }
  const isOtp = mode === 'otp';
  return (
    <div className="auth-screen auth-visual-screen">
      <img className="auth-photo" src={waitlistHero} alt="" />
      <BrandMark />
      <div className="auth-visual-content">
        <div className="auth-copy">
          <h2>{isOtp ? 'Check your email' : mode === 'signup' ? 'Enter your email' : 'Find your style with AI.'}</h2>
          <p>{isOtp ? 'We sent a verification code to you@email.com' : mode === 'signup' ? 'Enter your email to sign up' : 'Try it on. Own it.'}</p>
        </div>
        {!isOtp ? (
          <div className="auth-form">
            <button className="outline-btn google-auth"><GoogleIcon />Log in with Google</button>
            <div className="divider">or</div>
            <label>Email<input placeholder="Enter email" /></label>
            <button className="primary-btn" data-testid="continue-email" onClick={() => setMode('otp')}>Continue with email</button>
            <button className="text-btn" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
              {mode === 'signin' ? 'Do not have an account? Sign Up' : 'Already using Myuze? Sign In'}
            </button>
          </div>
        ) : (
          <div className="auth-form">
            <div className="otp-row"><span>1</span><span>1</span><span>0</span><span /></div>
            <button className="primary-btn" data-testid="verify-otp" onClick={onContinue}>Verify</button>
            <button className="text-btn" onClick={() => setMode('signin')}>Back to sign in</button>
          </div>
        )}
      </div>
    </div>
  );
}

function SetupFlow({ user, updateUser, onDone }: {
  user: TenantUser;
  updateUser: (updater: (user: TenantUser) => TenantUser) => void;
  onDone: () => void;
}) {
  const steps: SetupStep[] = ['account', 'style'];
  const currentIndex = Math.max(0, steps.indexOf(user.setupStep));
  const next = () => {
    const nextStep = steps[currentIndex + 1];
    if (nextStep) updateUser(current => ({ ...current, setupStep: nextStep }));
    else onDone();
  };

  return (
    <div className="setup-screen">
      <BrandMark />
      <div className="progress"><span style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }} /></div>
      {user.setupStep === 'account' && (
        <section className="setup-section">
          <h2>Let's get to know you</h2>
          <p>One quick step — this powers your AI try-on.</p>
          <label>Full Name<input placeholder="Enter full name" defaultValue={user.profile.fullName} /></label>
          <div className="field-grid">
            <label>Skin Tone<input defaultValue="Tan" /></label>
            <label>Size<input defaultValue={user.profile.size} /></label>
          </div>
          <div className="single-upload-slot">
            <FashionFigure />
            <strong>Your photo (for try-on)</strong>
            <span>Clean background, good lighting. Private and secure — never shared.</span>
            <div>
              <button className="outline-btn">Choose photo</button>
              <button className="secondary-btn">Open camera</button>
            </div>
          </div>
          <p className="privacy-note">Photos stay private in this prototype. Later this maps to per-user secure object storage.</p>
        </section>
      )}
      {user.setupStep === 'style' && (
        <section className="setup-section">
          <h2>Pick a vibe <span>(optional)</span></h2>
          <p>AI recommends styling based on your profile.</p>
          <div className="style-grid">
            {styleOptions(user.profile.gender).map(option => (
              <button
                className={user.profile.styles.includes(option) ? 'style-card selected' : 'style-card'}
                onClick={() => updateUser(current => ({
                  ...current,
                  profile: {
                    ...current.profile,
                    styles: current.profile.styles.includes(option)
                      ? current.profile.styles.filter(item => item !== option)
                      : [...current.profile.styles, option],
                  },
                }))}
                key={option}
              >
                <FashionTile variant={option} />
                <span>{option}</span>
              </button>
            ))}
          </div>
        </section>
      )}
      <button className="primary-btn bottom-action" data-testid="setup-continue" onClick={next}>{currentIndex === steps.length - 1 ? 'Continue' : 'Continue'}</button>
    </div>
  );
}

function styleOptions(gender: 'Female' | 'Male') {
  return gender === 'Female'
    ? ['Minimal', 'Casual', 'Office', 'Vintage', 'Athleisure', 'Bohemian']
    : ['Streetwear', 'Workwear', 'Business Casual', 'Classic', 'Minimal', 'Athleisure'];
}

function AppHeader({ tenant, user, onSwitch, onNotify }: {
  tenant: Tenant;
  user: TenantUser;
  onSwitch: () => void;
  onNotify: () => void;
}) {
  return (
    <header className="app-header">
      <button className="icon-btn" data-testid="hamburger-menu" aria-label="Open menu" onClick={onSwitch}>☰</button>
      <BrandMark />
      <button className="icon-btn" aria-label="Notifications" onClick={onNotify}>⌁</button>
      <button className="tenant-chip" onClick={onSwitch}>{tenant.name} · {user.name.split(' ')[0]}</button>
    </header>
  );
}

function HomeScreen({ user, chatInput, setChatInput, sendChat, openMoodboard, openLook }: {
  user: TenantUser;
  chatInput: string;
  setChatInput: (value: string) => void;
  sendChat: (text?: string) => void;
  openMoodboard: () => void;
  openLook: (lookId: string) => void;
}) {
  const isEmptyState = user.chat.length <= 1;

  return (
    <section className="home-screen">
      <div className="home-hero">
        <div className="sparkle-logo"><img src={myuzeLogo} alt="Myuze" /></div>
        <h2>Hi there 👋</h2>
        <p>Ask Myuze for outfit ideas — I'll get to know your style as we chat.</p>
      </div>
      <div className="quick-grid">
        {['Style me for a first date', "What's trending this week?", 'Pack for a beach trip'].map(prompt => (
          <button key={prompt} onClick={() => sendChat(prompt)}>{prompt}</button>
        ))}
      </div>
      {isEmptyState ? (
        <section className="trending-looks" aria-label="Trending looks">
          <div className="section-row">
            <h3>Trending looks</h3>
            <button type="button">See all</button>
          </div>
          <div className="trending-row">
            {looks.map(look => (
              <button className="trending-card" key={look.id} onClick={() => openLook(look.id)}>
                <FashionTile variant={look.image} />
                <strong>Try Now</strong>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <div className="chat-list">
          {user.chat.map(message => (
            <article className={`chat-bubble ${message.role}`} key={message.id}>
              <p>{message.text}</p>
              {message.lookIds && (
                <div className="mini-look-row">
                  {message.lookIds.map(id => {
                    const look = looks.find(item => item.id === id)!;
                    return (
                      <button key={id} onClick={() => openLook(id)}>
                        <FashionTile variant={look.image} />
                        <span>{look.title}</span>
                        <strong>Try Now</strong>
                      </button>
                    );
                  })}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
      <Composer value={chatInput} setValue={setChatInput} onSend={() => sendChat()} onPlus={openMoodboard} />
    </section>
  );
}

function DiscoverScreen({ openLook, openProduct }: {
  openLook: (lookId: string) => void;
  openProduct: (lookId: string) => void;
}) {
  const [segment, setSegment] = useState('For You');
  return (
    <section className="discover-screen">
      <div className="search-row">
        <button className="filter-btn">≋</button>
        <input placeholder="Search" />
        <button className="filter-btn">⌕</button>
      </div>
      <div className="segments">
        {['For You', 'Trending', 'Following'].map(item => <button className={segment === item ? 'active' : ''} onClick={() => setSegment(item)} key={item}>{item}</button>)}
      </div>
      <div className={segment === 'Following' ? 'following-feed' : 'discover-grid'}>
        {looks.concat(looks.slice(0, 2)).map((look, index) => segment === 'Following' ? (
          <article className="following-card" key={`${look.id}-${index}`}>
            <Avatar name={['Kellyyy_33', 'Stevee_', 'Mari_e_1'][index % 3]} index={index} />
            <div>
              <strong>{look.title}</strong>
              <p>{look.vibe}</p>
              <button onClick={() => openLook(look.id)}>Try Now</button>
            </div>
            <FashionTile variant={look.image} />
          </article>
        ) : (
          <article className="discover-card" key={`${look.id}-${index}`}>
            <button className="more">•••</button>
            <FashionTile variant={look.image} />
            <div>
              <button onClick={() => openLook(look.id)}>Try Now</button>
              <button onClick={() => openProduct(look.id)}>Details</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductDetail({ look, onTry }: { look: Look; onTry: () => void }) {
  return (
    <section className="product-screen">
      <FashionHero look={look} />
      <div className="thumbnail-row">{looks.map(item => <button key={item.id}><FashionTile variant={item.image} /></button>)}</div>
      <h2>Men's Oversized Cotton Crewneck Tee</h2>
      <h3>USD $39.99</h3>
      <p><strong>Type:</strong> Cotton</p>
      <div className="swatches">{look.palette.map(color => <span style={{ background: color }} key={color} />)}</div>
      <button className="soft-banner" onClick={onTry}>✦ Try On Look</button>
      <button className="primary-btn">Shop Now</button>
    </section>
  );
}

function TryOnScreen({ look, historyIds, openLook, onChallenge, onShare, onReel, saveTryOn }: {
  look: Look;
  historyIds: string[];
  openLook: (lookId: string) => void;
  onChallenge: () => void;
  onShare: () => void;
  onReel: () => void;
  saveTryOn: () => void;
}) {
  return (
    <section className="tryon-screen">
      <div className="screen-title">
        <h2>Try On</h2>
        <button onClick={onShare}>⌯</button>
      </div>
      <div className="tryon-card">
        <FashionHero look={look} />
      </div>
      <div className="thumbnail-row">{looks.map(item => <button onClick={() => openLook(item.id)} className={item.id === look.id ? 'active' : ''} key={item.id}><FashionTile variant={item.image} /></button>)}</div>
      <div className="action-grid">
        <button className="outline-btn" onClick={onChallenge}>Challenge</button>
        <button className="outline-btn" onClick={onReel}>Create Reel</button>
        <button className="primary-btn wide" onClick={saveTryOn}>Shop Now</button>
      </div>
      <h3>Try on history</h3>
      <div className="history-grid">
        {historyIds.map(id => {
          const item = looks.find(lookItem => lookItem.id === id) ?? looks[0];
          return <button onClick={() => openLook(item.id)} key={id}><FashionTile variant={item.image} /><span>{item.title}</span></button>;
        })}
      </div>
    </section>
  );
}

function ProfileScreen({ user, updateUser, setTab, onLogout }: {
  user: TenantUser;
  updateUser: (updater: (user: TenantUser) => TenantUser) => void;
  setTab: (tab: Tab) => void;
  onLogout: () => void;
}) {
  return (
    <section className="profile-screen">
      <div className="profile-card">
        <Avatar name={user.name} />
        <div><h2>{user.profile.fullName}</h2><p>{user.email}</p></div>
      </div>
      <label>Full name<input value={user.profile.fullName} onChange={event => updateUser(current => ({ ...current, profile: { ...current.profile, fullName: event.target.value } }))} /></label>
      <label>Email<input value={user.email} readOnly /></label>
      {['Fit Preferences', 'Privacy Policy', 'Help & Support'].map(item => <button className="settings-row" key={item}>{item}<span>›</span></button>)}
      <button className="settings-row" onClick={() => setTab('tryon')}>Try On History<span>›</span></button>
      <button className="logout-btn" onClick={onLogout}>Log Out</button>
    </section>
  );
}

function Composer({ value, setValue, onSend, onPlus }: {
  value: string;
  setValue: (value: string) => void;
  onSend: () => void;
  onPlus: () => void;
}) {
  return (
    <div className="composer">
      <button onClick={onPlus}>＋</button>
      <input value={value} onChange={event => setValue(event.target.value)} onKeyDown={event => event.key === 'Enter' && onSend()} placeholder="Ask me anything..." />
      <button onClick={onSend}>↑</button>
    </div>
  );
}

function MoodboardSheet({ onClose, onCreate }: { onClose: () => void; onCreate: () => void }) {
  return (
    <BottomSheet title="New Moodboard" onClose={onClose}>
      <div className="collage">
        {['street', 'weekend', 'work', 'rooftop', 'minimal', 'sage'].map(item => <FashionTile variant={item} key={item} />)}
      </div>
      <button className="sheet-action" onClick={onCreate}><strong>Create 3 looks</strong><span>AI outfit generator with your profile</span></button>
      <button className="sheet-action"><strong>Try this on me</strong><span>Use a garment or product screenshot</span></button>
      <button className="sheet-action"><strong>Find similar pieces</strong><span>Shape matching items for shopping</span></button>
    </BottomSheet>
  );
}

function ChallengeSheet({ onClose, onPoll, onShare }: { onClose: () => void; onPoll: () => void; onShare: () => void }) {
  return (
    <BottomSheet title="Style Challenge" onClose={onClose}>
      <button className="outline-btn" onClick={onPoll}>Who Wore It Better?</button>
      <button className="outline-btn">Style This Item</button>
      <button className="outline-btn" onClick={onPoll}>Outfit Battle</button>
      <div className="sheet-footer"><button className="text-btn" onClick={onClose}>Cancel</button><button className="primary-btn" onClick={onShare}>Share</button></div>
    </BottomSheet>
  );
}

function ShareSheet({ look, onClose, onCopy }: { look: Look; onClose: () => void; onCopy: () => void }) {
  return (
    <BottomSheet title="Share" onClose={onClose}>
      <div className="share-preview"><FashionTile variant={look.image} /><div><strong>{look.title}</strong><span>Made with Myuze</span></div></div>
      <div className="share-icons">
        {['Save', 'FB', 'IG', 'WA', 'Snap', 'Pin', 'More'].map(item => <button onClick={item === 'More' ? onCopy : undefined} key={item}>{item}</button>)}
      </div>
    </BottomSheet>
  );
}

function ReelSheet({ look, onClose, onSave }: { look: Look; onClose: () => void; onSave: () => void }) {
  const [preview, setPreview] = useState(false);
  return (
    <BottomSheet title={preview ? 'Reel Preview' : 'Create Reel'} onClose={onClose}>
      <div className="reel-card">
        <FashionHero look={look} />
        {preview && <div className="play">▶<span>0:05 / 0:15</span></div>}
      </div>
      <div className="segments compact">{['Clean', 'Elegant', 'Playful'].map(item => <button key={item}>{item}</button>)}</div>
      <button className="primary-btn" onClick={() => preview ? onSave() : setPreview(true)}>{preview ? 'Save Reel' : 'Create Reel'}</button>
      <button className="outline-btn">Challenge</button>
    </BottomSheet>
  );
}

function PollSheet({ user, onClose, onTry }: { user: TenantUser; onClose: () => void; onTry: () => void }) {
  const poll = user.polls[0] ?? { question: `Help ${user.name.split(' ')[0]} pick a fit`, lookIds: ['soft-street', 'rooftop-casual'], votes: { 'soft-street': 63, 'rooftop-casual': 37 } };
  return (
    <BottomSheet title="Public Fit Poll" onClose={onClose}>
      <h3>{poll.question}</h3>
      <div className="poll-grid">
        {poll.lookIds.map(id => {
          const look = looks.find(item => item.id === id) ?? looks[0];
          return (
            <button key={id}>
              <FashionTile variant={look.image} />
              <strong>{look.title}</strong>
              <div className="vote-bar"><span style={{ width: `${poll.votes[id] ?? 40}%` }} /></div>
              <small>{poll.votes[id] ?? 40}% voted</small>
            </button>
          );
        })}
      </div>
      <div className="reaction-row">{['fire', 'clean', 'too much', 'more edge'].map(item => <button key={item}>{item}</button>)}</div>
      <button className="primary-btn" onClick={onTry}>Try this vibe on me</button>
    </BottomSheet>
  );
}

function DrawerSheet({ user, onClose, setTab, onToast, onLogout }: {
  user: TenantUser;
  onClose: () => void;
  setTab: (tab: Tab) => void;
  onToast: (message: string) => void;
  onLogout: () => void;
}) {
  const openTryOnHistory = () => {
    setTab('tryon');
    onClose();
    onToast('Opened Try-on History.');
  };

  return (
    <div className="drawer-scrim" data-testid="drawer-scrim" onClick={onClose}>
      <aside className="drawer-panel" aria-label="Myuze menu" onClick={event => event.stopPropagation()}>
        <div className="drawer-profile">
          <Avatar name={user.name} index={0} />
          <span>
            <strong>{user.name}</strong>
            <button onClick={() => {
              setTab('profile');
              onClose();
            }}>Edit Profile</button>
          </span>
        </div>
        <nav className="drawer-nav">
          <button onClick={() => onToast('Fit Preferences will open in the full account flow.')}>♡ <span>Fit Preferences</span><b>›</b></button>
          <button onClick={openTryOnHistory}>◷ <span>Try-on History</span><b>›</b></button>
          <button onClick={() => onToast('Privacy Policy will open in the full account flow.')}>◇ <span>Privacy Policy</span><b>›</b></button>
          <button onClick={() => onToast('Help & Support will open in the full account flow.')}>? <span>Help & Support</span><b>›</b></button>
        </nav>
        <button className="drawer-logout" data-testid="drawer-logout" onClick={onLogout}>↪ <span>Log Out</span></button>
      </aside>
    </div>
  );
}

function BottomSheet({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="sheet-scrim">
      <div className="bottom-sheet">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

function TabBar({ tab, setTab }: { tab: Tab; setTab: (tab: Tab) => void }) {
  const tabs: Array<[Tab, string, string]> = [['home', '⌂', 'Home'], ['tryon', '✦', 'Try On'], ['discover', '◇', 'Discover']];
  return (
    <nav className="tab-bar">
      {tabs.map(([id, icon, label]) => (
        <button
          className={tab === id ? 'active' : ''}
          data-testid={`tab-${id}`}
          onClick={() => setTab(id)}
          key={id}
        >
          <span>{icon}</span>{label}
        </button>
      ))}
    </nav>
  );
}

function MemoryCard({ tenant, user }: { tenant: Tenant; user: TenantUser }) {
  return (
    <div className="memory-card">
      <h3>Current memory scope</h3>
      <dl>
        <dt>Tenant</dt><dd>{tenant.name}</dd>
        <dt>User</dt><dd>{user.name}</dd>
        <dt>Profile</dt><dd>{user.profile.gender}, {user.profile.size}, {user.profile.skinTone}</dd>
        <dt>Styles</dt><dd>{user.profile.styles.join(', ') || 'None yet'}</dd>
        <dt>Chat history</dt><dd>{user.chat.length} messages</dd>
        <dt>Saved looks</dt><dd>{user.savedLooks.length}</dd>
      </dl>
    </div>
  );
}

function Toast({ message }: { message: string }) {
  return <div className="toast">{message}</div>;
}

function FashionHero({ look }: { look: Look }) {
  return (
    <div className={`fashion-hero ${look.image}`}>
      <img src={look.photo} alt="" />
      <div className="hero-caption"><strong>{look.title}</strong><span>{look.vibe}</span></div>
    </div>
  );
}

function FashionTile({ variant }: { variant: string }) {
  const normalized = variant.toLowerCase().replace(/\s+/g, '-');
  const indexByVariant: Record<string, number> = {
    street: 6,
    streetwear: 6,
    weekend: 0,
    casual: 1,
    'clean-weekend': 1,
    rooftop: 8,
    'rooftop-casual': 8,
    work: 3,
    office: 4,
    'business-casual': 9,
    minimal: 2,
    'soft-minimal': 2,
    vintage: 5,
    bohemian: 5,
    athleisure: 10,
    y2k: 11,
    sage: 7,
  };
  const photo = modelPhotos[indexByVariant[normalized] ?? 0];
  return (
    <div className={`fashion-tile ${normalized}`}>
      <img src={photo} alt="" />
    </div>
  );
}

function FashionFigure({ mini = false }: { mini?: boolean }) {
  return (
    <div className={mini ? 'figure mini' : 'figure'}>
      <span className="head" />
      <span className="body" />
      <span className="leg left" />
      <span className="leg right" />
    </div>
  );
}

function Avatar({ name, index = 0 }: { name: string; index?: number }) {
  return <span className="avatar"><img src={modelPhotos[index % modelPhotos.length]} alt="" /><b>{name.slice(0, 1).toUpperCase()}</b></span>;
}

export default App;
