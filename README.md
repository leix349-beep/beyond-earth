# Beyond Earth / SpaceTime

[Open the website](https://beyond-earth-spacetime.genialconch.chatgpt.site) · [Source on GitHub](https://github.com/leix349-beep/beyond-earth)

A curated interactive history of spaceflight. React 19 + TypeScript + Vite, with responsive custom CSS (no Tailwind dependency). All 20 historical records, archive photographs, and Earth textures are local. Three.js renders the globe and flight scenes; Lenis provides damped wheel scrolling. Bundled data, recorded mission films, music and images work offline. The development server also provides an optional orbit-refresh endpoint; no API key is required.

## Run

Node 20.19+ or 22.12+ is required.

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite, normally http://localhost:5173. Alternatively use `pnpm install` and `pnpm dev` (a pnpm lockfile is included). If your pnpm setup requests approval for esbuild, approve only esbuild or use npm.

```sh
npm run build
npm run preview
```

On the supplied Codex environment, npm is not on PATH. Direct equivalents after dependency installation:

```sh
node node_modules/typescript/bin/tsc -b
node node_modules/vite/bin/vite.js build
node node_modules/vite/bin/vite.js --host 0.0.0.0
```

## Experience

- Timeline: horizontal year slider from 1957 to 2026, clickable year markers, category filters, text search, and chronological milestone cards.
- Detail: launch, operation / major events, recovery or end-of-mission information, and Where is it now. Native modal with Escape support and restored keyboard focus.
- Compare: Saturn V vs Falcon 9; Salyut 1 vs Mir vs ISS vs Tiangong.
- Evolution: Rockets, Space Stations, and Satellites, with clickable milestones.
- Cinematic sticky hero: real Earth-horizon photography, separate moving cloud layers, scroll-linked reveal into a rotating textured 3D Earth.
- Editorial cream/navy sections, asymmetric photographic features, progressive fade/blur reveals, and image zoom on hover.
- Four English-only archival films: Leaving Earth (Demo-2 mission), Inside the station, Back to Earth, and Apollo 11. Films retain original human voices and recorded sound; no generated speech is used. Chapter navigation, explanations, seeking, mute and fullscreen are available. Sound starts after a user action.
- Optional background music: Space 1990 by Kevin MacLeod, CC BY 4.0, credited in the site, film player and media notes. Its volume is reduced while mission audio plays. This is not a Star Trek soundtrack.
- Mission replays: play/pause, scrub, restart, 1×/2×/4× speed, phase selection, drag-to-rotate, zoom and fullscreen.
- ISS and Tiangong: actual AMSAT TLE elements propagated with SGP4, with altitude, speed, latitude/longitude, prediction time and provenance. Historical stories and orbit calculations occupy separate tabs.
- Twenty expanded mission dossiers: purpose, engineering, legacy, four key facts and a revealable misconception question. Story / Watch / Explore tabs keep reading, archival video and flight diagrams distinct.
- Ground-track map, Earth/follow-marker cameras and Motion/Life/Scale explanations make the real-data orbit view more than a globe and line.
- Larger text, simpler labels, one-column mobile mission images and shorter contextual explanations. Film context text is editorial explanation, not a verbatim transcript of the original speech.
- Responsive layouts, accessible controls, reduced-motion support, offscreen rendering pause, WebGL fallback, and official source links.

## Data and limits

`src/data.ts` is the structured editorial dataset. Each record has a date, agency, category, description, lifecycle events, fate/location summary, source, and optional comparison statistics. The 2026 timeline boundary is a browsing range, not a promise of a 2026 launch entry. This is a representative selection, not a complete launch catalog.

The archive describes historical milestones and known destinations, not live spacecraft health. For ongoing projects, future disposal is clearly marked as future; no completed end event is invented. Launch-vehicle families are distinguished from single missions: one Falcon 9 family does not have one physical location. Voyager is grouped under Satellites for this MVP’s uncrewed-spacecraft collection. Evolution shows a curated chronology, not technical descent. The Mission story replay is a schematic mission-type demonstration, not a historical orbital reconstruction. Routes cover Earth orbit, reentry, crew return, lunar return, Mars arrival, deep-space escape, L2 transfer and booster recovery. Distances, time and the generic satellite model are deliberately compressed or enlarged; the model does not reproduce each vehicle. Falcon 9 replay follows the booster only. Launch positions and orbit planes are illustrative. No measured flight telemetry is claimed for those schematic replays. The separate ISS/Tiangong orbit mode uses actual TLE elements and SGP4 calculations, as described below.

Official references are linked in every mission detail. Research checks included NASA’s Sputnik history, NASA’s Salyut history, NASA/ESA Mir histories, and SpaceX’s Falcon 9 specifications. Some source links are agency/program entrypoints; a future editorial pass should replace these with permanent, event-specific citations and independently verify every field before educational publication. Rocket payloads and success percentages are intentionally omitted because definitions and configurations differ.

## Real orbital data

`public/data/orbits.json` contains checksum-validated AMSAT TLEs for ISS (NORAD 25544) and Tiangong/Tianhe (48274). The bundled elements have epochs on **October 29, 2026**. Each record retains its original two lines, source URL and retrieval time. `src/orbit.ts` uses satellite.js 6.0.1, a pure JavaScript SGP4 implementation.

The orbit viewer samples one orbital period, converts TEME/ECI positions to Earth-fixed coordinates using Greenwich sidereal time, and computes geodetic latitude, longitude and height. Velocity is the inertial orbital speed. The globe uses a spherical Earth with normalized WGS84 equatorial radius; it does not model terrain or true vehicle dimensions. The displayed path is Earth-fixed, so one orbital period does not produce a closed loop over the rotating Earth.

Positions are predictions from elements, **not live telemetry**. Maneuvers and drag limit accuracy. When elements are over 72 hours from the browser clock, the viewer explicitly switches to the element epoch instead of presenting a stale extrapolation as current. This cutoff is an editorial safeguard, not an accuracy guarantee.

Refresh for a static build:

```sh
python scripts/update-orbits.py
npm run build
```

The updater retrieves only the required ISS/Tiangong records from [AMSAT bare elements](https://www.amsat.org/tle/current/nasabare.txt), validates checksums, and preserves the last valid file on failure. In development, Source & time → Check for an update uses a same-origin Vite endpoint with a two-hour server cache/backoff. The development endpoint is not a production backend; on static hosting, refresh the bundled file before rebuilding. CelesTrak was unreachable in this environment, so no CelesTrak data is represented as successfully fetched. Historical launch trajectories for the other missions remain illustrative.

## Mission cinema

The cinema now uses locally hosted NASA archive films, not the earlier generic launch animation. `src/films.ts` defines sources, durations, chapter boundaries and editorial context. Original human voices and mission sound are retained. NASA visualizations within source films are identified; the product does not claim that all scenes are direct camera footage. Raw recovery footage may contain ambient sound rather than narration.

- Leaving Earth: first 132 seconds of NASA's Demo-2 mission recap, from preparation through the return sequence.
- Inside the station: a 126-second excerpt of NASA's 25-years ISS tour, with Nicole Mann and Kjell Lindgren.
- Back to Earth: 116 seconds of the Demo-2 splashdown record.
- Apollo 11: four excerpts from NASA's 1969 film The Flight of Apollo 11, covering launch, lunar operations, surface work and recovery. The edit combines separate source intervals; it is not continuous real-time footage.

All UI text is English. The earlier Microsoft Zira voice clips and bilingual script have been removed. Optional music is a separate, user-controlled track. Its license and attribution are in IMAGE_CREDITS.md and the interface. Archived film sound may contain its original music; the music toggle controls the added site soundtrack, not source audio separation.

## Imagery

Photographs are stored in `public/media/` with provenance in `credits.json`, [IMAGE_CREDITS.md](IMAGE_CREDITS.md), the site footer and mission details. Archive photographs may depict later flights, museum models, test hardware or recovered capsules; they are not all launch-day photographs. Earth textures use NASA-derived Three.js example assets. Layout takes an editorial approach inspired by the references; no affiliation is implied.

## Verification

See [VALIDATION.md](VALIDATION.md). Optional browser smoke test: install Playwright (`npm install --no-save playwright`), install Chromium (`npx playwright install chromium`), then run `node scripts/visual-check.cjs`. Set `CHROME_PATH` to use a system Chrome instead. `PLAYWRIGHT_MODULE` can point to an existing Playwright module. The test starts and stops its own Vite server on port 5182 and writes screenshots to `previews/`. Current checks: `node scripts/check-orbits.mjs` (Node 22.18+ for native TypeScript stripping), and `node scripts/review-experience.cjs` for cinema, original audio, music, mission tabs and orbital context. `node scripts/record-demo.cjs` captures an actual running-app demo and Devpost gallery images. Browser scripts use `CHROME_PATH` / `PLAYWRIGHT_MODULE` when set.

## Hackathon pitch

We remember launches. We rarely follow what happens next. Beyond Earth makes every spaceflight story a lifecycle: what launched, what it achieved, how it returned or ended, and where its hardware is now. One timeline connects a radio beacon, a lunar landing, reusable rockets, and homes in orbit. Compare the machines, discover the turning points, and see exploration as a shared human story.

Demo: play a NASA film and jump between chapters → open Apollo 11, read its dossier and reveal an answer → open ISS Explore, compare Earth and follow-marker views and inspect the ground track → compare vehicles and station evolution.

## Future work

- Event-level primary citations, editorial review dates, and multilingual English/Chinese copy.
- More countries and missions, failures and crew safety history, and deeper lifecycle branching.
- Accurate per-vehicle models, real lunar/planetary textures and ephemeris-backed trajectories with documented coordinate systems.
- Deep links, saved comparisons, and curriculum-friendly guided journeys.
- An optional, clearly separate live telemetry layer with timestamps and uncertainty.
- Broader browser, screen-reader, and device testing.

The core experience and cached orbital predictions need no backend or API key. `dist/` can be hosted on any static host; fresh production orbital data requires a scheduled rebuild or a production refresh service.

## Devpost assets

`submission/DEVPOST_DRAFT.md` contains the project name, pitch and public story. `submission/DEMO_SCRIPT.md` describes the 1–2 minute running-app demo. Generated 3:2 PNG images are under `submission/`; the project demo must be uploaded to YouTube or Vimeo before its URL can be entered. A local file is not a submitted video and localhost is not a public demo. No GitHub remote is configured in this workspace. Main Challenge alignment, track and the exact on-site code must be confirmed by the participant.

## Typography

Newsreader for large titles and reading headings, DM Sans for body text and controls, IBM Plex Mono for dates and flight labels. Font files are bundled locally with their SIL Open Font Licenses in `public/fonts/`. Sources: [Google Fonts](https://github.com/google/fonts).

## Cinema reliability update

14 locally hosted films are mapped explicitly to 13 mission records. Other missions have no video shortcut. Film lookup never silently falls back to another mission. Each film is fully buffered into a temporary Blob URL before playback, because the current static host returns HTTP 200 instead of HTTP 206 for Range requests. A progress indicator, retry, source link, and abort-on-switch keep that behavior visible. This uses more up-front bandwidth than range streaming; a range-capable video CDN would remove that tradeoff.

The new NASA excerpts cover Voyager’s 2024 engineering-data reception, Hubble servicing tools, Curiosity communications, Artemis I launch highlights, Explorer 1’s legacy, Webb launch visualization, STS-135 preparations, and Michael Foale’s recollections of Mir and ISS. Excerpts are labeled; Webb is an animation, and the Shuttle clip shows preparations rather than the whole launch. Source manifest: `public/data/film-sources.json`.

`OrbitParameters` reads inclination, eccentricity, ascending node, and mean motion from the TLE with SGP4 period and epoch shown alongside. Historical illustrations do not claim measured launch telemetry. Hardware stories follow the separate components of all 20 records.

Regression: `scripts/test-cinema-v2.cjs` checks all 14 films, actual seekable ranges, back/forward movement, chapter seek, pointer dragging, mission mapping, orbit parameters, and mobile layout. `scripts/test-cinema-recovery.cjs` checks download failure/retry and fast switching. Set `PLAYWRIGHT_MODULE`, `CHROME_PATH`, and optionally `REVIEW_URL` for the installed browser/runtime.
