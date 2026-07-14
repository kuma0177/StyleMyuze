import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowUp,
  Bell,
  BookmarkSimple,
  Camera,
  CaretLeft,
  CaretRight,
  Check,
  Copy,
  Crosshair,
  DotsThree,
  Envelope,
  FacebookLogo,
  House,
  ImageSquare,
  InstagramLogo,
  Link,
  List,
  MagnifyingGlass,
  PaintBrush,
  PinterestLogo,
  Plus,
  Ruler,
  ShareNetwork,
  ShieldCheck,
  ShoppingBag,
  SignOut,
  Sparkle,
  Sword,
  UserCircle,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react';
import '@fontsource/instrument-sans/400.css';
import '@fontsource/instrument-sans/500.css';
import '@fontsource/instrument-sans/600.css';
import '@fontsource/instrument-sans/700.css';
import './styles/global.css';
import myuzeLogo from './assets/myuze-assets/myuze-logo-full.svg';
import googleLogo from './assets/myuze-assets/google-g.svg';
import dinnerWithFriends from './assets/myuze-assets/homepage/dinner-with-friends.webp';
import brunchDate from './assets/myuze-assets/homepage/brunch-date.webp';
import weekendGetaway from './assets/myuze-assets/homepage/weekend-getaway-v2.webp';
import workPresentation from './assets/myuze-assets/homepage/work-presentation-v2.webp';
import { initialState, looks, styleOptions } from './prototype/data';
import type { AuthView, Look, ModalId, TabId } from './prototype/types';
import { usePrototypeStore } from './prototype/usePrototypeStore';

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

function App() {
  const { state, update } = usePrototypeStore();
  const [tab, setTab] = useState<TabId>('tryon');
  const [authView, setAuthView] = useState<AuthView>('waitlist');
  const [modal, setModal] = useState<ModalId>(null);
  const [selectedLookId, setSelectedLookId] = useState('soft-street');
  const [query, setQuery] = useState('');
  const [discoverMode, setDiscoverMode] = useState<'For you' | 'Trending' | 'Following'>('For you');
  const [toast, setToast] = useState('');

  const selectedLook = looks.find(look => look.id === selectedLookId) ?? looks[0];
  const savedLooks = looks.filter(look => state.savedLookIds.includes(look.id));

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const openLook = (lookId: string) => {
    setSelectedLookId(lookId);
    setTab('tryon');
    setModal(null);
  };

  const toggleSave = (lookId = selectedLookId) => {
    const isSaved = state.savedLookIds.includes(lookId);
    update(current => ({
      ...current,
      savedLookIds: isSaved
        ? current.savedLookIds.filter(id => id !== lookId)
        : [lookId, ...current.savedLookIds],
    }));
    notify(isSaved ? 'Removed from saved looks.' : 'Saved to your looks.');
  };

  const completeAuth = () => {
    update(current => ({ ...current, signedIn: true, onboardingComplete: false }));
    setAuthView('waitlist');
  };

  const logout = () => {
    update(current => ({ ...current, signedIn: false }));
    setModal(null);
    setTab('home');
    setAuthView('waitlist');
    notify('You are signed out.');
  };

  if (!state.signedIn) {
    return (
      <div className="public-stage">
        <AuthScreen view={authView} setView={setAuthView} onComplete={completeAuth} notify={notify} />
        <Toast message={toast} />
      </div>
    );
  }

  if (!state.onboardingComplete) {
    return (
      <AppFrame>
        <Onboarding
          profile={state.profile}
          updateProfile={profile => update(current => ({ ...current, profile }))}
          onComplete={() => {
            update(current => ({ ...current, onboardingComplete: true }));
            setTab('home');
            notify('Your style profile is ready.');
          }}
        />
        <Toast message={toast} />
      </AppFrame>
    );
  }

  return (
    <AppFrame>
      <Header
        onMenu={() => setModal('drawer')}
        onNotifications={() => setModal('notifications')}
      />
      <main className="app-content" id="main-content">
        {tab === 'home' && (
          <HomeScreen
            state={state}
            openLook={openLook}
            openMoodboard={() => setModal('moodboard')}
            showAll={() => setTab('discover')}
            sendPrompt={text => {
              update(current => ({
                ...current,
                chat: [
                  ...current.chat,
                  { id: makeId(), role: 'user', text },
                  {
                    id: makeId(),
                    role: 'assistant',
                    text: `I used ${current.profile.styles.join(' and ')} to build three directions for you.`,
                    lookIds: ['soft-street', 'quiet-luxury', 'modern-workwear'],
                  },
                ],
              }));
              notify('Three looks are ready.');
            }}
          />
        )}
        {tab === 'tryon' && (
          <TryOnScreen
            look={selectedLook}
            savedLooks={savedLooks}
            isSaved={state.savedLookIds.includes(selectedLook.id)}
            openLook={openLook}
            tryNew={() => setModal('upload')}
            shop={() => setModal('product')}
            save={() => toggleSave()}
            challenge={() => setModal('challenge')}
            share={() => setModal('share')}
          />
        )}
        {tab === 'discover' && (
          <DiscoverScreen
            query={query}
            setQuery={setQuery}
            mode={discoverMode}
            setMode={setDiscoverMode}
            savedIds={state.savedLookIds}
            openLook={openLook}
            toggleSave={toggleSave}
            openDetails={lookId => {
              setSelectedLookId(lookId);
              setModal('product');
            }}
            notify={notify}
          />
        )}
      </main>
      <TabBar tab={tab} setTab={setTab} />

      {modal === 'drawer' && (
        <Drawer
          profileName={state.profile.fullName}
          onClose={() => setModal(null)}
          onProfile={() => setModal('profile')}
          onHistory={() => {
            setModal(null);
            setTab('tryon');
            notify('Showing your latest try-on.');
          }}
          logout={logout}
          notify={notify}
        />
      )}
      {modal === 'notifications' && (
        <Modal title="Notifications" onClose={() => setModal(null)}>
          <div className="notification-list">
            <NotificationItem title="Your gallery look is ready" detail="Soft Street was tailored to your saved fit." />
            <NotificationItem title="Three new ideas for you" detail="Fresh neutral layers landed in Discover." />
          </div>
          <button className="button secondary full" onClick={() => { setModal(null); notify('All notifications marked as read.'); }}>
            <Check size={19} weight="bold" /> Mark all as read
          </button>
        </Modal>
      )}
      {modal === 'moodboard' && (
        <MoodboardModal
          onClose={() => setModal(null)}
          onCreate={() => {
            setModal(null);
            openLook('soft-street');
            notify('Moodboard analyzed. Your looks are ready.');
          }}
        />
      )}
      {modal === 'product' && (
        <ProductModal
          look={selectedLook}
          onClose={() => setModal(null)}
          onSave={() => toggleSave()}
          onShop={() => {
            setModal(null);
            update(current => ({
              ...current,
              tryOnHistory: Array.from(new Set([selectedLook.id, ...current.tryOnHistory])),
            }));
            notify('Shopping list prepared. Product links connect when APIs are added.');
          }}
        />
      )}
      {modal === 'challenge' && (
        <ChallengeModal
          look={selectedLook}
          onClose={() => setModal(null)}
          onCreate={() => {
            setModal('share');
            notify('Challenge card created.');
          }}
        />
      )}
      {modal === 'share' && (
        <ShareModal
          look={selectedLook}
          onClose={() => setModal(null)}
          notify={notify}
          openReel={() => setModal('reel')}
        />
      )}
      {modal === 'reel' && (
        <ReelModal
          look={selectedLook}
          onClose={() => setModal(null)}
          onSave={() => { setModal(null); notify('Reel saved to your device.'); }}
        />
      )}
      {modal === 'upload' && (
        <UploadModal
          onClose={() => setModal(null)}
          onContinue={() => {
            setModal(null);
            openLook('quiet-luxury');
            notify('New try-on generated from your reference.');
          }}
        />
      )}
      {modal === 'profile' && (
        <ProfileModal
          profile={state.profile}
          savedCount={state.savedLookIds.length}
          onClose={() => setModal(null)}
          onSave={profile => {
            update(current => ({ ...current, profile }));
            setModal(null);
            notify('Profile changes saved.');
          }}
        />
      )}
      <Toast message={toast} />
    </AppFrame>
  );
}

function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-stage">
      <section className="app-shell mobile-prototype" aria-label="Myuze mobile app">
        {children}
      </section>
      <aside className="desktop-note" aria-hidden="true">
        <span>MYUZE</span>
        <h1>Dress for what is next.</h1>
        <p>Your personal AI stylist for looks worth wearing—and sharing.</p>
      </aside>
    </div>
  );
}

function Header({ onMenu, onNotifications }: { onMenu: () => void; onNotifications: () => void }) {
  return (
    <header className="app-header">
      <IconButton label="Open menu" onClick={onMenu}><List /></IconButton>
      <img className="wordmark" src={myuzeLogo} alt="Myuze" />
      <IconButton label="Open notifications" onClick={onNotifications}><Bell /></IconButton>
    </header>
  );
}

function IconButton({ label, onClick, children, className = '' }: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return <button type="button" className={`icon-button ${className}`} aria-label={label} title={label} onClick={onClick}>{children}</button>;
}

function AuthScreen({ view, setView, onComplete, notify }: {
  view: AuthView;
  setView: (view: AuthView) => void;
  onComplete: () => void;
  notify: (message: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { image: dinnerWithFriends, title: 'Dinner with friends', detail: 'Smart casual', alt: 'Woman in a beige blazer and jeans walking through the city', mobilePosition: '35% 34%', mobileShift: '0%' },
    { image: brunchDate, title: 'Brunch date', detail: 'Relaxed and chic', alt: 'Woman in an ivory outfit on stone steps', mobilePosition: '48% 34%', mobileShift: '0%' },
    { image: weekendGetaway, title: 'Weekend getaway', detail: 'Laid-back layers', alt: 'Man in a navy blazer and neutral trousers', mobilePosition: '54% 32%', mobileShift: '0%' },
    { image: workPresentation, title: 'Work presentation', detail: 'Polished and confident', alt: 'Woman in a tailored neutral office look', mobilePosition: '56% 30%', mobileShift: '0%' },
  ];

  const continueWithEmail = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes('@')) { notify('Enter a valid email address.'); return; }
    setView('otp');
    notify('Your preview code is 2468.');
  };

  if (view === 'waitlist') {
    return (
      <div className="public-homepage">
        <header className="public-nav">
          <img src={myuzeLogo} alt="Myuze" />
          <nav aria-label="Homepage navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#style-stories">Explore looks</a>
            <button type="button" onClick={() => setView('signin')}>Sign in</button>
          </nav>
        </header>

        <main className="public-hero">
          <section className="public-copy" aria-labelledby="public-title">
            <span className="eyebrow">AI PERSONAL STYLIST</span>
            <h1 id="public-title">
              <span className="desktop-hero-copy">Find the look that feels like you.</span>
              <span className="mobile-hero-copy">Feel like yourself. Dress for what’s next.</span>
            </h1>
            <p>
              <span className="desktop-hero-copy">Myuze styles complete outfits for your real plans—so getting dressed feels effortless.</span>
              <span className="mobile-hero-copy">Personalized outfits for every plan, mood, and moment.</span>
            </p>
            <div className="public-auth-sheet">
              <form className="public-auth-form" onSubmit={continueWithEmail} noValidate>
                <button className="google-button" type="button" onClick={() => {
                  notify('Google sign-in is running in preview mode.');
                  onComplete();
                }}><img src={googleLogo} alt="" /> Continue with Google</button>
                <div className="auth-divider"><span>OR</span></div>
                <label htmlFor="homepage-email">Email</label>
                <input id="homepage-email" type="email" autoComplete="email" placeholder="Enter your email" value={email} onChange={event => setEmail(event.target.value)} />
                <button className="button primary full" type="submit">Continue with email</button>
              </form>
              <div className="public-support">
                <p className="member-prompt">Already a member? <button type="button" onClick={() => setView('signin')}>Sign in</button></p>
                <p className="free-note"><ShieldCheck weight="bold" /> Free to start. No credit card required.</p>
              </div>
            </div>
          </section>

          <section className="style-stories" id="style-stories" aria-label="Style inspiration slideshow">
            <article className="active-story" style={{ '--mobile-position': slides[activeSlide].mobilePosition, '--mobile-shift': slides[activeSlide].mobileShift } as React.CSSProperties}>
              <img src={slides[activeSlide].image} alt={slides[activeSlide].alt} />
              <span className="styled-label"><Sparkle weight="fill" /> Styled by Myuze</span>
              <div className="story-caption"><strong>{slides[activeSlide].title}</strong><span>{slides[activeSlide].detail}</span></div>
              <div className="story-navigation" aria-label="Style story controls">
                <button type="button" aria-label="Previous style story" onClick={() => setActiveSlide(current => (current + slides.length - 1) % slides.length)}><CaretLeft weight="bold" /></button>
                <span aria-live="polite">{String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
                <button type="button" aria-label="Next style story" onClick={() => setActiveSlide(current => (current + 1) % slides.length)}><CaretRight weight="bold" /></button>
              </div>
            </article>
            <div className="story-rail">
              {slides.filter((_, index) => index !== activeSlide).slice(0, 3).map(slide => {
                const index = slides.findIndex(item => item.title === slide.title);
                return <button className="story-preview-card" type="button" key={slide.title} onClick={() => setActiveSlide(index)}>
                  <img src={slide.image} alt="" />
                  <span><strong>{slide.title}</strong><small>{slide.detail}</small></span>
                </button>;
              })}
            </div>
          </section>
        </main>

        <section className="how-it-works" id="how-it-works" aria-labelledby="how-title">
          <h2 id="how-title">Style every plan in seconds</h2>
          <div>
            <article><span>1</span><strong>Share the moment</strong><p>Tell Myuze where you are going and the mood you want.</p></article>
            <article><span>2</span><strong>See complete looks</strong><p>Get styled outfits with pieces that work together.</p></article>
            <article><span>3</span><strong>Save what feels right</strong><p>Keep favorites ready for the days you want less guessing.</p></article>
          </div>
        </section>
      </div>
    );
  }

  return (
    <section className="public-auth-page">
      <div className="auth-screen">
      <button className="back-link" type="button" onClick={() => setView('waitlist')}><ArrowLeft /> Back</button>
      <img className="auth-logo" src={myuzeLogo} alt="Myuze" />
      {view === 'signin' ? (
        <form className="auth-form" onSubmit={event => {
          event.preventDefault();
          if (!email.includes('@')) { notify('Enter a valid email address.'); return; }
          setView('otp');
          notify('Your preview code is 2468.');
        }}>
          <span className="eyebrow">WELCOME BACK</span>
          <h1>Sign in to your style.</h1>
          <p>We will send a one-time code. No password needed.</p>
          <label htmlFor="signin-email">Email address</label>
          <div className="input-with-icon"><Envelope /><input id="signin-email" type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@email.com" /></div>
          <button className="button primary full" type="submit">Continue with email</button>
        </form>
      ) : (
        <form className="auth-form" onSubmit={event => {
          event.preventDefault();
          if (otp !== '2468') { notify('Use preview code 2468.'); return; }
          onComplete();
        }}>
          <span className="eyebrow">CHECK YOUR EMAIL</span>
          <h1>Enter your code.</h1>
          <p>For this prototype, use <strong>2468</strong>.</p>
          <label htmlFor="otp-code">Four-digit code</label>
          <input id="otp-code" className="otp-input" inputMode="numeric" maxLength={4} value={otp} onChange={event => setOtp(event.target.value.replace(/\D/g, ''))} placeholder="0000" />
          <button className="button primary full" type="submit">Verify and continue</button>
          <button className="text-action" type="button" onClick={() => notify('A new preview code was sent: 2468.')}>Resend code</button>
        </form>
      )}
      </div>
    </section>
  );
}

function Onboarding({ profile, updateProfile, onComplete }: {
  profile: typeof initialState.profile;
  updateProfile: (profile: typeof initialState.profile) => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);
  return (
    <section className="onboarding-screen">
      <div className="onboarding-top">
        <img src={myuzeLogo} alt="Myuze" />
        <span>{step + 1} / 2</span>
      </div>
      <div className="progress-track"><span style={{ width: `${(step + 1) * 50}%` }} /></div>
      {step === 0 ? (
        <div className="onboarding-body">
          <span className="eyebrow">LET'S START WITH YOU</span>
          <h1>Make every suggestion fit.</h1>
          <p>These details stay in your style profile and can be changed anytime.</p>
          <label htmlFor="profile-name">Name</label>
          <input id="profile-name" value={profile.fullName} onChange={event => updateProfile({ ...profile, fullName: event.target.value })} />
          <div className="field-pair">
            <label>Style profile<select value={profile.gender} onChange={event => updateProfile({ ...profile, gender: event.target.value as 'Female' | 'Male' })}><option>Female</option><option>Male</option></select></label>
            <label>Usual size<select value={profile.size} onChange={event => updateProfile({ ...profile, size: event.target.value })}>{['XS', 'S', 'M', 'L', 'XL'].map(size => <option key={size}>{size}</option>)}</select></label>
          </div>
        </div>
      ) : (
        <div className="onboarding-body">
          <span className="eyebrow">YOUR VISUAL LANGUAGE</span>
          <h1>What feels like you?</h1>
          <p>Choose at least two. Myuze will keep learning from what you save and skip.</p>
          <div className="style-choice-grid">
            {styleOptions.map(style => {
              const active = profile.styles.includes(style);
              return <button className={active ? 'style-choice active' : 'style-choice'} type="button" aria-pressed={active} onClick={() => updateProfile({ ...profile, styles: active ? profile.styles.filter(item => item !== style) : [...profile.styles, style] })} key={style}>{active && <Check weight="bold" />} {style}</button>;
            })}
          </div>
        </div>
      )}
      <button className="button primary full onboarding-next" type="button" onClick={() => step === 0 ? setStep(1) : onComplete()} disabled={step === 1 && profile.styles.length < 2}>{step === 0 ? 'Continue' : 'Finish profile'}</button>
    </section>
  );
}

function HomeScreen({ state, openLook, openMoodboard, showAll, sendPrompt }: {
  state: typeof initialState;
  openLook: (lookId: string) => void;
  openMoodboard: () => void;
  showAll: () => void;
  sendPrompt: (text: string) => void;
}) {
  const [message, setMessage] = useState('');
  const latest = state.chat.slice(-3);
  return (
    <section className="screen home-screen">
      <span className="eyebrow">PERSONAL STYLIST</span>
      <h1>What are you dressing for?</h1>
      <div className="prompt-row">
        {['Gallery opening', 'First date', 'Weekend away'].map(prompt => <button type="button" onClick={() => sendPrompt(`Style me for a ${prompt.toLowerCase()}.`)} key={prompt}>{prompt}</button>)}
      </div>
      {state.chat.length === 1 ? (
        <div className="feature-look">
          <img src={looks[0].image} alt="Soft Street gallery opening outfit" />
          <div><span>CURATED FOR YOU</span><h2>Soft Street</h2><p>A gallery-ready mix of ease and structure.</p><button type="button" onClick={() => openLook('soft-street')}>Try this look</button></div>
        </div>
      ) : (
        <div className="conversation" aria-live="polite">
          {latest.map(item => <article className={item.role} key={item.id}><p>{item.text}</p>{item.lookIds && <div className="chat-look-row">{item.lookIds.map(id => { const look = looks.find(entry => entry.id === id)!; return <button type="button" onClick={() => openLook(id)} key={id}><img src={look.image} alt="" /><span>{look.title}</span></button>; })}</div>}</article>)}
        </div>
      )}
      <div className="section-heading"><div><span className="eyebrow">FRESH IDEAS</span><h2>Trending for you</h2></div><button type="button" onClick={showAll}>See all</button></div>
      <div className="horizontal-looks">{looks.slice(1, 5).map(look => <button type="button" onClick={() => openLook(look.id)} key={look.id}><img src={look.image} alt={`${look.title} outfit`} /><strong>{look.title}</strong><span>{look.tags[0]}</span></button>)}</div>
      <form className="composer" onSubmit={event => { event.preventDefault(); if (!message.trim()) return; sendPrompt(message); setMessage(''); }}>
        <IconButton label="Add a moodboard or image" onClick={openMoodboard}><Plus /></IconButton>
        <label className="sr-only" htmlFor="stylist-message">Ask Myuze</label>
        <input id="stylist-message" value={message} onChange={event => setMessage(event.target.value)} placeholder="Ask Myuze anything…" />
        <button type="submit" className="send-button" aria-label="Send message"><ArrowUp weight="bold" /></button>
      </form>
    </section>
  );
}

function TryOnScreen({ look, savedLooks, isSaved, openLook, tryNew, shop, save, challenge, share }: {
  look: Look;
  savedLooks: Look[];
  isSaved: boolean;
  openLook: (id: string) => void;
  tryNew: () => void;
  shop: () => void;
  save: () => void;
  challenge: () => void;
  share: () => void;
}) {
  const railLooks = [...savedLooks, ...looks.filter(item => !savedLooks.some(saved => saved.id === item.id))].slice(0, 4);
  return (
    <section className="screen tryon-screen">
      <h1>{look.occasion}</h1>
      <div className="result-layout">
        <img className="result-image" src={look.image} alt={`${look.title}: ${look.rationale}`} />
        <aside className="saved-rail" aria-label="Saved looks">
          <span>Saved looks</span>
          {railLooks.map(item => <button type="button" className={item.id === look.id ? 'active' : ''} aria-label={`Open ${item.title}`} onClick={() => openLook(item.id)} key={item.id}><img src={item.image} alt="" /></button>)}
          <button type="button" className="try-new" onClick={tryNew}><Plus /><span>Try new<br />look</span></button>
        </aside>
      </div>
      <div className="look-summary">
        <div><h2>{look.title}</h2><p>{look.rationale}</p></div>
        <span className="ai-badge">AI <Sparkle weight="fill" /></span>
      </div>
      <button className="button primary shop-button" type="button" onClick={shop}><ShoppingBag weight="bold" /> Shop the look</button>
      <div className="result-actions">
        <button type="button" aria-pressed={isSaved} onClick={save}><BookmarkSimple weight={isSaved ? 'fill' : 'regular'} /><span>{isSaved ? 'Saved' : 'Save'}</span></button>
        <button type="button" onClick={challenge}><Sword /><span>Challenge</span></button>
        <button type="button" onClick={share}><ShareNetwork /><span>Share</span></button>
      </div>
    </section>
  );
}

function DiscoverScreen({ query, setQuery, mode, setMode, savedIds, openLook, toggleSave, openDetails, notify }: {
  query: string;
  setQuery: (query: string) => void;
  mode: 'For you' | 'Trending' | 'Following';
  setMode: (mode: 'For you' | 'Trending' | 'Following') => void;
  savedIds: string[];
  openLook: (id: string) => void;
  toggleSave: (id: string) => void;
  openDetails: (id: string) => void;
  notify: (message: string) => void;
}) {
  const filtered = useMemo(() => looks.filter(look => `${look.title} ${look.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <section className="screen discover-screen">
      <span className="eyebrow">VISUAL DISCOVERY</span>
      <h1>Find your next look.</h1>
      <div className="search-box"><MagnifyingGlass /><label className="sr-only" htmlFor="discover-search">Search looks</label><input id="discover-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search style, occasion, or vibe" />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')}><X /></button>}</div>
      <div className="segment-control" aria-label="Discover feed">
        {(['For you', 'Trending', 'Following'] as const).map(item => <button type="button" className={mode === item ? 'active' : ''} aria-pressed={mode === item} onClick={() => setMode(item)} key={item}>{item}</button>)}
      </div>
      {filtered.length ? (
        <div className="masonry-grid">
          {filtered.map((look, index) => (
            <article className={index % 3 === 1 ? 'look-card tall' : 'look-card'} key={look.id}>
              <button className="look-image-button" type="button" onClick={() => openLook(look.id)}><img src={look.image} alt={`${look.title} outfit`} /></button>
              <IconButton label={savedIds.includes(look.id) ? `Remove ${look.title} from saved` : `Save ${look.title}`} onClick={() => toggleSave(look.id)} className="floating-save"><BookmarkSimple weight={savedIds.includes(look.id) ? 'fill' : 'regular'} /></IconButton>
              <div className="look-card-copy"><button type="button" onClick={() => openDetails(look.id)}><strong>{look.title}</strong><span>{look.creator}</span></button><IconButton label={`More options for ${look.title}`} onClick={() => notify(`${look.title} options opened.`)}><DotsThree weight="bold" /></IconButton></div>
            </article>
          ))}
        </div>
      ) : <div className="empty-state"><MagnifyingGlass /><h2>No looks yet</h2><p>Try a broader search, like “minimal” or “gallery.”</p><button className="button secondary" type="button" onClick={() => setQuery('')}>Clear search</button></div>}
    </section>
  );
}

function TabBar({ tab, setTab }: { tab: TabId; setTab: (tab: TabId) => void }) {
  const items: Array<{ id: TabId; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Home', icon: <House /> },
    { id: 'tryon', label: 'Try On', icon: <Sparkle weight="fill" /> },
    { id: 'discover', label: 'Discover', icon: <MagnifyingGlass /> },
  ];
  return (
    <nav className="tab-bar" aria-label="Primary navigation">
      {items.map(item => <button type="button" className={tab === item.id ? 'active' : ''} aria-current={tab === item.id ? 'page' : undefined} onClick={() => setTab(item.id)} data-testid={`tab-${item.id}`} key={item.id}>{item.icon}<span>{item.label}</span></button>)}
    </nav>
  );
}

function Modal({ title, onClose, children, className = '' }: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('button, input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(item => !item.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="modal-scrim" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <div className={`modal-sheet ${className}`} role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={dialogRef}>
        <IconButton label={`Close ${title}`} onClick={onClose} className="modal-close"><X /></IconButton>
        <h2 id="modal-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Drawer({ profileName, onClose, onProfile, onHistory, logout, notify }: {
  profileName: string;
  onClose: () => void;
  onProfile: () => void;
  onHistory: () => void;
  logout: () => void;
  notify: (message: string) => void;
}) {
  return (
    <div className="drawer-scrim" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <aside className="drawer-panel" role="dialog" aria-modal="true" aria-label="Myuze menu">
        <div className="drawer-top"><img src={myuzeLogo} alt="Myuze" /><IconButton label="Close menu" onClick={onClose}><X /></IconButton></div>
        <button className="drawer-profile" type="button" onClick={onProfile}><UserCircle weight="duotone" /><span><strong>{profileName}</strong><small>Edit style profile</small></span></button>
        <nav aria-label="Account options">
          <button type="button" onClick={onProfile}><Ruler /><span>Fit preferences</span></button>
          <button type="button" onClick={onHistory}><Crosshair /><span>Try-on history</span></button>
          <button type="button" onClick={() => notify('Privacy policy opened in preview mode.')}><ShieldCheck /><span>Privacy and data</span></button>
          <button type="button" onClick={() => notify('Support request started.')}><PaintBrush /><span>Help and feedback</span></button>
        </nav>
        <button className="drawer-logout" type="button" onClick={logout}><SignOut /><span>Log out</span></button>
      </aside>
    </div>
  );
}

function NotificationItem({ title, detail }: { title: string; detail: string }) {
  return <article className="notification-item"><span><Bell weight="fill" /></span><div><strong>{title}</strong><p>{detail}</p></div></article>;
}

function MoodboardModal({ onClose, onCreate }: { onClose: () => void; onCreate: () => void }) {
  const [selected, setSelected] = useState(0);
  return (
    <Modal title="Build from inspiration" onClose={onClose}>
      <p className="modal-intro">Choose a source and Myuze will translate the visual language into outfits.</p>
      <div className="source-grid">
        {[{ icon: <ImageSquare />, title: 'Photo library', detail: 'Upload screenshots or a moodboard' }, { icon: <Camera />, title: 'Camera', detail: 'Capture an item you already own' }, { icon: <Link />, title: 'Paste a link', detail: 'Use a product or inspiration URL' }].map((source, index) => <button type="button" className={selected === index ? 'active' : ''} aria-pressed={selected === index} onClick={() => setSelected(index)} key={source.title}>{source.icon}<span><strong>{source.title}</strong><small>{source.detail}</small></span>{selected === index && <Check weight="bold" />}</button>)}
      </div>
      <button className="button primary full" type="button" onClick={onCreate}><Sparkle weight="fill" /> Create three looks</button>
    </Modal>
  );
}

function ProductModal({ look, onClose, onSave, onShop }: { look: Look; onClose: () => void; onSave: () => void; onShop: () => void }) {
  return (
    <Modal title="Shop the look" onClose={onClose} className="product-modal">
      <div className="product-hero"><img src={look.image} alt={`${look.title} outfit`} /><div><span>{look.tags[0]}</span><h3>{look.title}</h3><p>{look.rationale}</p></div></div>
      <ul className="product-list">{look.items.map((item, index) => <li key={item}><span>{index + 1}</span><div><strong>{item}</strong><small>Similar pieces from ${Math.round(look.price / look.items.length)}</small></div><Check weight="bold" /></li>)}</ul>
      <div className="price-row"><span>Estimated total</span><strong>${look.price}</strong></div>
      <div className="modal-actions"><button className="button secondary" type="button" onClick={onSave}><BookmarkSimple /> Save</button><button className="button primary" type="button" onClick={onShop}><ShoppingBag /> Prepare shopping list</button></div>
    </Modal>
  );
}

function ChallengeModal({ look, onClose, onCreate }: { look: Look; onClose: () => void; onCreate: () => void }) {
  const [type, setType] = useState('Vote on this look');
  return (
    <Modal title="Create a challenge" onClose={onClose}>
      <p className="modal-intro">Invite friends to vote without making them create an account.</p>
      <div className="challenge-preview"><img src={look.image} alt="" /><div><span>HELP MAYA DECIDE</span><strong>{look.title}</strong><p>Would you wear it?</p></div></div>
      <fieldset className="choice-list"><legend>Challenge format</legend>{['Vote on this look', 'Outfit battle', 'Style this item'].map(item => <label key={item}><input type="radio" name="challenge" value={item} checked={type === item} onChange={() => setType(item)} /><span>{item}</span></label>)}</fieldset>
      <button className="button primary full" type="button" onClick={onCreate}><ShareNetwork /> Create share card</button>
    </Modal>
  );
}

function ShareModal({ look, onClose, notify, openReel }: { look: Look; onClose: () => void; notify: (message: string) => void; openReel: () => void }) {
  const share = (destination: string) => notify(`${destination} share is ready. Native sharing connects with the production API.`);
  return (
    <Modal title="Share your look" onClose={onClose}>
      <div className="share-preview"><img src={look.image} alt={`${look.title} share preview`} /><div><img src={myuzeLogo} alt="Myuze" /><span>STYLED FOR MAYA</span><strong>{look.title}</strong><small>Try this vibe on yourself</small></div></div>
      <button className="reel-action" type="button" onClick={openReel}><Sparkle weight="fill" /><span><strong>Create a 9:16 story</strong><small>Animated reveal, ready for Reels or Stories</small></span></button>
      <div className="share-grid">
        <button type="button" onClick={() => share('Instagram')}><InstagramLogo /><span>Instagram</span></button>
        <button type="button" onClick={() => share('Pinterest')}><PinterestLogo /><span>Pinterest</span></button>
        <button type="button" onClick={() => share('WhatsApp')}><WhatsappLogo /><span>WhatsApp</span></button>
        <button type="button" onClick={() => share('Facebook')}><FacebookLogo /><span>Facebook</span></button>
      </div>
      <button className="copy-link" type="button" onClick={async () => { await navigator.clipboard?.writeText(`https://myuze.app/look/${look.id}`); notify('Share link copied.'); }}><Link /><span>myuze.app/look/{look.id}</span><Copy /></button>
    </Modal>
  );
}

function ReelModal({ look, onClose, onSave }: { look: Look; onClose: () => void; onSave: () => void }) {
  const [style, setStyle] = useState('Editorial');
  return (
    <Modal title="Story preview" onClose={onClose} className="reel-modal">
      <div className="story-preview"><img src={look.image} alt="Animated story preview" /><div><img src={myuzeLogo} alt="Myuze" /><span>YOUR GALLERY OPENING LOOK</span><strong>{look.title}</strong><small>Styled with Myuze</small></div></div>
      <div className="segment-control">{['Editorial', 'Clean', 'Playful'].map(item => <button type="button" className={style === item ? 'active' : ''} onClick={() => setStyle(item)} key={item}>{item}</button>)}</div>
      <button className="button primary full" type="button" onClick={onSave}>Save story</button>
    </Modal>
  );
}

function UploadModal({ onClose, onContinue }: { onClose: () => void; onContinue: () => void }) {
  const [source, setSource] = useState<'photo' | 'camera'>('photo');
  return (
    <Modal title="Try a new look" onClose={onClose}>
      <p className="modal-intro">Add a garment, screenshot, or full outfit. The production API will replace this preview step.</p>
      <button className="upload-zone" type="button" onClick={() => setSource('photo')}><ImageSquare /><strong>{source === 'photo' ? 'Reference selected' : 'Choose from photos'}</strong><span>PNG, JPG, or HEIC</span></button>
      <div className="modal-actions"><button className={source === 'camera' ? 'button secondary active' : 'button secondary'} type="button" onClick={() => setSource('camera')}><Camera /> Use camera</button><button className="button primary" type="button" onClick={onContinue}><Sparkle weight="fill" /> Generate preview</button></div>
    </Modal>
  );
}

function ProfileModal({ profile, savedCount, onClose, onSave }: {
  profile: typeof initialState.profile;
  savedCount: number;
  onClose: () => void;
  onSave: (profile: typeof initialState.profile) => void;
}) {
  const [draft, setDraft] = useState(profile);
  return (
    <Modal title="Style profile" onClose={onClose}>
      <div className="profile-stats"><div><strong>{savedCount}</strong><span>Saved looks</span></div><div><strong>{draft.styles.length}</strong><span>Style signals</span></div></div>
      <div className="profile-form">
        <label>Name<input value={draft.fullName} onChange={event => setDraft({ ...draft, fullName: event.target.value })} /></label>
        <div className="field-pair"><label>Profile<select value={draft.gender} onChange={event => setDraft({ ...draft, gender: event.target.value as 'Female' | 'Male' })}><option>Female</option><option>Male</option></select></label><label>Size<select value={draft.size} onChange={event => setDraft({ ...draft, size: event.target.value })}>{['XS', 'S', 'M', 'L', 'XL'].map(size => <option key={size}>{size}</option>)}</select></label></div>
        <fieldset><legend>Style signals</legend><div className="style-choice-grid compact">{styleOptions.map(style => { const active = draft.styles.includes(style); return <button type="button" className={active ? 'style-choice active' : 'style-choice'} aria-pressed={active} onClick={() => setDraft({ ...draft, styles: active ? draft.styles.filter(item => item !== style) : [...draft.styles, style] })} key={style}>{active && <Check />} {style}</button>; })}</div></fieldset>
      </div>
      <button className="button primary full" type="button" onClick={() => onSave(draft)}>Save profile</button>
    </Modal>
  );
}

function Toast({ message }: { message: string }) {
  return <div className={message ? 'toast visible' : 'toast'} role="status" aria-live="polite">{message}</div>;
}

export default App;
