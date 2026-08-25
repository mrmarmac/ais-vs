# AIS:VS — future / expanded site

This folder is a **complete, runnable snapshot** of the full AIS:VS site, kept for when the
league expands beyond the LISA vs CAISH MVP. It is **not** wired into the live site at the repo
root.

It contains everything trimmed out of the MVP:

- Live scoreboard (round-by-round scores, meters, live timer)
- What is AIS:VS / mission + league stats
- Format — the three sprint rounds (Red-Team Sprint, Bot Brawl, Governance Gauntlet)
- Head-to-head matchup stats
- City hubs grid (London, Cambridge, Oxford, SF, Berlin, Paris, Singapore, Lisbon)
- Season standings ladder
- Run-of-show timeline
- Node Captain application form
- Newsletter signup
- Full nav + register CTAs

## Run it standalone

```bash
cd future
python3 -m http.server 8001
# open http://localhost:8001
```

When you're ready to promote a feature into the live MVP, lift the relevant section markup from
`future/index.html`, its styles from `future/styles.css`, and its behavior from `future/app.js`
into the root files.
