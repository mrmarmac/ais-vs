# AIS:VS — AI Safety Versus

The official website for **AI Safety Versus (AIS:VS)** — the inter-city AI safety hackathon league.

> **3 Hours. 2 Hubs. 1 Winner.**

## MVP (this site)

The live site is a single-screen hero for the Season 01 versus: **LISA (London) vs CAISH (Cambridge)**.

- A scrolling ticker repeating **3 HOURS. 2 HUBS. 1 WINNER.**
- The AIS:VS brand mark.
- The LISA vs CAISH matchup banner.
- A live countdown to the next round (Saturday high-noon).
- Event meta cards: Format · Next Round · Where · Entry.

No registration, signup, or additional pages yet — this is a deliberately minimal MVP.

```
index.html   # the hero
styles.css   # design system + responsive layout
app.js       # ticker + countdown
assets/      # favicon
```

## `/future/`

The `future/` folder holds the full, expanded site (live scoreboard, format, head-to-head
matchup, city hubs, standings, run-of-show timeline, Node Captain application, and newsletter).
It's a complete, runnable snapshot kept for when the league expands — it is **not** part of the
live MVP. See [`future/README.md`](future/README.md).

## Run locally

Any static server works:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Plain static files — deploy to any static host. For GitHub Pages: **Settings → Pages →
Deploy from a branch → `main` → `/ (root)`**. The site is served at
`https://<user>.github.io/ais-vs/`.
