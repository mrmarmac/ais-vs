# AIS:VS — AI Safety Versus

The official website for **AI Safety Versus (AIS:VS)** — the inter-city AI safety hackathon league that pits global city hubs against each other in technical alignment and governance sprints.

> **3 Hours. 2 Hubs. 1 Winner.**
> Season 01 MVP: **LISA (London) vs CAISH (Cambridge)**.

## Design language

Esports energy meets research-lab precision — dark theme, brand orange + electric-blue team colors, a cyan terminal accent, a live results ticker, a live scoreboard, a countdown clock, and smooth scroll micro-interactions.

## Sections

- **Hero / Versus** — LISA vs CAISH banner with a live countdown to the next round and event meta cards.
- **Live Scoreboard** — animated round-by-round scores, meters, and a live round timer.
- **What is AIS:VS** — the mission and league stats.
- **Format** — the three sprint rounds (Red-Team Sprint, Bot Brawl, Governance Gauntlet).
- **Matchup** — LISA vs CAISH head-to-head stats.
- **City Hubs** — the eight competing hubs (London, Cambridge, Oxford, SF, Berlin, Paris, Singapore, Lisbon).
- **Standings** — the Season 01 ladder.
- **Run of Show** — the three-hour schedule.
- **Node Captain Application** — form for organizers to bring AIS:VS to a new city.
- **Newsletter** — match-alert signup.

## Tech

Zero-dependency, no build step. Plain HTML, CSS, and vanilla JavaScript — fully responsive and deployable to any static host (including GitHub Pages) by serving the repository root.

```
index.html      # markup + all sections
styles.css      # design system + responsive layout
app.js          # countdown, ticker, scoreboard, hubs/standings, forms
assets/         # favicon
```

## Run locally

Any static server works, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes

Scoreboard, standings, and roster figures are illustrative demo data defined in `app.js`. Form submissions are handled client-side (validation + success state) and are not yet wired to a backend.
