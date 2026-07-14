# Myuze visual polish QA

- Primary visual reference: `design/reference/selected-homepage-option-3.png`
- Mobile issue reference: the user-supplied 390 px mobile screenshot
- Desktop implementation capture: `design/qa/homepage-implementation-desktop.png`
- Mobile implementation capture: `design/qa/homepage-mobile-390.png`
- Mobile before/after comparison: `design/qa/mobile-source-vs-implementation.png`
- Tested states: logged-out homepage, email authentication, onboarding, signed-in home, Try On, Discover, profile, shopping, challenges, and sharing

## Comparison history

### Pass 1 — Public entry experience

- P0 — Fresh visitors were initialized as signed in, so a clean browser skipped the homepage entirely.
- P1 — The logged-out state was presented inside the mobile app shell instead of as a clear product landing and authentication experience.
- Fix — Changed the fresh state to logged out and built a responsive public homepage with product positioning, Google/email entry, sign-in, women-forward style imagery, slideshow controls, and a concise how-it-works section.

### Pass 2 — Desktop fidelity

- P1 — The initial desktop hero was too tall and the heading wrapped to three lines, pushing the explanatory section below the intended fold.
- P2 — Image and copy proportions did not closely follow the selected split-layout reference.
- Fix — Calibrated the desktop hero to 740 px, reduced the headline scale to a two-line editorial lockup, tightened form spacing, and matched the women-led 3:1 image mix from the chosen direction.

### Pass 3 — Mobile correction

- P1 — The mobile page stacked a large white authentication section above the slideshow, producing excessive scrolling and weak visual impact.
- P1 — Typography did not scale fluidly enough for narrow screens.
- P1 — The Google button used a monochrome generic G icon.
- Fix — Rebuilt mobile as an image-backed hero with a contrast overlay and readable glass authentication card, added fluid type/spacing breakpoints, and replaced the icon with Google's official multicolor asset.

### Pass 4 — Interaction and accessibility polish

- P2 — Pagination dots and the compact mobile sign-in control were below practical mobile target sizes.
- Fix — Expanded interactive hit areas to 44 px while preserving small visual dots, retained labeled slideshow controls, and verified the 390 px layout has no horizontal overflow.

## Final comparison

- Typography: passed — locally bundled Instrument Sans provides the compact, bold, Pinterest-inspired hierarchy at 400/500/600/700 weights.
- Desktop layout: passed — the product promise and authentication column balance a women-forward 3:1 style story grid, with the how-it-works sequence immediately following the hero.
- Mobile layout: passed — imagery is the background, content scales with the viewport, authentication stays readable, and the primary journey fits within the first mobile screen without horizontal overflow.
- Branding: passed — Myuze blue, warm paper, near-black ink, the Myuze wordmark, and the official multicolor Google G are consistently applied.
- Imagery: passed — all visible fashion visuals are real raster assets, responsive, compressed to WebP, and cropped with `object-fit: cover`; women lead three of four style stories.
- States and behavior: passed — slideshow navigation, email validation, OTP, onboarding, save state, dialogs, drawer, notifications, discovery, shopping, challenges, sharing, keyboard dismissal, and logout were exercised.
- Accessibility: passed — semantic regions, labeled inputs and controls, visible focus states, reduced-motion support, meaningful alt text, 44 px primary targets, and zero mobile horizontal overflow were verified.
- Console: passed — no browser warnings or errors were present during the interaction sweep.

## Verification

- `npm run lint` — passed
- `npm run build` — passed, including PWA manifest and service worker generation
- `npm run test:e2e` — 10/10 passed across mobile and desktop Chromium projects
- In-app browser mobile interaction sweep — passed
- Mobile viewport overflow audit — passed at 390 CSS px
- Browser console — 0 warnings, 0 errors

final result: passed
