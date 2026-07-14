# Myuze visual polish QA

- Primary visual reference: `design/reference/selected-homepage-option-3.png`
- Mobile issue reference: `design/reference/mweb-user-capture-2026-07-13.png`
- Desktop implementation capture: `design/qa/homepage-implementation-desktop.png`
- Mobile implementation capture: `design/qa/mweb-final-420x843.png`
- Mobile before/after comparison: `design/qa/mweb-before-vs-final.png`
- Latest alignment reference: `design/reference/mweb-alignment-user-capture-2026-07-13.png`
- Latest implementation capture: `design/qa/mweb-glass-final-420x843.png`
- Latest full and focused comparisons: `design/qa/mweb-alignment-before-vs-final.png`, `design/qa/mweb-auth-focused.png`
- Additional responsive captures: `design/qa/mweb-small-320x568.png`, `design/qa/mweb-short-390x667.png`, and `design/qa/mweb-tablet-768x1024.png`
- Final fix-it captures: `design/qa/mweb-fixit-top-520x1125.png`, `design/qa/mweb-fixit-short.png`, and `design/qa/desktop-fixit-final-1440x900.png`
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

### Pass 5 — Width-and-height responsive refinement

- P1 — The 420 × 843 user capture still gave the headline and authentication card too much visual weight, and the photo subject sat directly beneath the copy.
- P2 — Supporting reassurance copy did not reflow cleanly across tall, short, and narrow phones.
- Fix — Added per-image mobile focal points, reduced the mobile type and form scale, grouped supporting copy into a responsive region, and introduced dedicated ≤430 px and ≤720 px-height compositions. On short screens the secondary reassurance is intentionally removed while the primary sign-in path and slideshow controls remain visible.
- Post-fix evidence — `design/qa/mweb-before-vs-final.png` shows the tighter hierarchy at 420 × 843; the 320 × 568, 390 × 667, and 768 × 1024 captures show the composition adapting without horizontal overflow or clipped primary controls.

### Pass 6 — Mobile alignment, glass, copy, and portrait framing

- P1 — The headline and authentication panel read as left-heavy and vertically crowded in the latest phone capture.
- P1 — The authentication container was an opaque gray slab that obscured too much of the fashion story.
- P1 — Two source photographs were already cropped through the subjects' heads, so CSS focal-point adjustments could not recover the missing faces.
- Fix — Centered and balanced the mobile copy and authentication composition, introduced a lighter transparent glass treatment with crisp translucent controls, and added the mobile-specific message “Feel like yourself. Dress for what’s next.” Two women/men editorial portraits were regenerated with complete heads and full bodies, converted to WebP, and tuned with per-slide focal shifts.
- Post-fix evidence — `design/qa/mweb-alignment-before-vs-final.png` shows the corrected overall composition, `design/qa/mweb-auth-focused.png` shows the glass-card improvement, and `design/qa/mweb-face-1.png` through `design/qa/mweb-face-4.png` verify that every slideshow subject's face remains visible.

### Pass 7 — Bottom-sheet conversion and responsive carousel containment

- P1 — The mobile authentication surface floated in the middle of the photograph, while four outlined dots and two oversized arrow bubbles competed for attention below it.
- P1 — On desktop, intrinsic image-grid sizing allowed the story region to grow beyond the fixed hero track, clipping the intended composition.
- P2 — The tablet image transform could crop the subject's head and the carousel control could overlap the authentication surface.
- Fix — Converted mobile authentication into a bottom-anchored frosted sheet, replaced the six-control carousel UI with a compact previous / “01 / 04” / next group, constrained desktop grid rows with `minmax(0, 1fr)` and overflow containment, and added tablet-specific crop and control spacing.
- Post-fix evidence — `design/qa/mweb-bottom-sheet-before-vs-final.png` shows the mobile hierarchy and control simplification side by side. `design/audit/current/06-desktop-final.png` and `design/audit/current/07-tablet-final.png` verify desktop containment and tablet reflow.

### Pass 8 — Final polish after live screenshot review

- P2 — The mobile sheet still read too heavy, the carousel control competed with the form, and the hero-to-how-it-works transition felt more like a prototype boundary than an intentional onboarding flow.
- P2 — Mobile image focal points needed another pass so the face and outfit both stayed visible after the form was anchored to the bottom.
- Fix — Slimmed the mobile authentication sheet, reduced field and button height, softened the frosted background, moved the carousel control to a quieter position above the sheet, tuned mobile focal points per slide, and rewrote the first explainer section to feel more editorial: “Style every plan in seconds.”
- Post-fix evidence — `design/qa/mweb-fixit-top-520x1125.png` verifies the true top-of-page state with the sheet bottom anchored and no horizontal overflow; `design/qa/mweb-fixit-short.png` verifies the shorter mobile composition; `design/qa/desktop-fixit-final-1440x900.png` verifies desktop containment and the next section preview.

## Final comparison

- Typography: passed — locally bundled Instrument Sans provides the compact, bold, Pinterest-inspired hierarchy at 400/500/600/700 weights.
- Desktop layout: passed — the product promise and authentication column balance a women-forward 3:1 style story grid, with the how-it-works sequence immediately following the hero.
- Mobile layout: passed — imagery remains full-bleed in the background while type, form density, supporting copy, focal crop, and vertical spacing adapt by both width and height. The primary journey fits within the first mobile screen without horizontal overflow.
- Branding: passed — Myuze blue, warm paper, near-black ink, the Myuze wordmark, and the official multicolor Google G are consistently applied.
- Imagery: passed — all visible fashion visuals are raster assets, responsive, compressed to WebP, and cropped with `object-fit: cover`; women lead three of four style stories and every mobile slide keeps the subject's face visible.
- States and behavior: passed — slideshow navigation, email validation, OTP, onboarding, save state, dialogs, drawer, notifications, discovery, shopping, challenges, sharing, keyboard dismissal, and logout were exercised.
- Accessibility: passed — semantic regions, labeled inputs and controls, visible focus states, reduced-motion support, meaningful alt text, 44 px primary targets, and zero mobile horizontal overflow were verified.
- Console: passed — no browser warnings or errors were present during the interaction sweep.

## Verification

- `npm run lint` — passed
- `npm run build` — passed, including PWA manifest and service worker generation
- `npm run test:e2e` — 10/10 passed across mobile and desktop Chromium projects
- In-app browser mobile interaction sweep — passed
- Mobile viewport overflow audit — passed at 320, 390, 420, and 768 CSS px
- Browser console — 0 warnings, 0 errors

final result: passed
