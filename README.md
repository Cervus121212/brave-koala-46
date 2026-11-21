[![best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/Cervus121212/brave-koala-46/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/Cervus121212/brave-koala-46/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)

# Night Market — Spot the Difference

An original spot-the-difference game for the [make.fun best-spot-the-difference-game-20261121-0451 bounty](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451) ($50, top 10 paid). Two near-identical pictures side by side, seven differences hiding in the right one — find them all before the 90-second timer runs out. Vanilla JS + Canvas 2D, no libraries, no network, every picture drawn procedurally from code.

## Play

```sh
node serve.ts          # serves game/ on http://localhost:8092
```

Click a difference on either picture · H = hint (−50 pts) · R = restart level · 1 / 2 / 3 = change level · Enter = start / next level.

## The game

- **3 levels, 7 differences each** — Night Market (lantern stalls, a sign that changes its letter, a cat on the roof), Aquarium (a fish that swims away, coral that turns pink, a treasure chest that opens), Rooftop Cats (a moon that turns full, a window that lights up, laundry that changes colour).
- **Scoring** — correct find +100 pts, combo up to x3 for finds in a row; wrong click −5 seconds and the screen shakes; finishing a level banks a time bonus (+5 pts per second left).
- **HUD** — `DIFFERENCES 3/7 FOUND`, `4 REMAIN`, 90-second timer, score, level name. Found differences get a red circle marker on both pictures.
- **Screenshot states** — `?shot=cover` (level 1, 3 found), `?shot=start` (title), `?shot=level2` (level 2, 2 found), `?shot=win` (final score screen). All four screenshots are real renders of this code in headless Chrome.

## Files

- `game/index.html` + `game/src/config.js` (levels + difference data, the single source of truth), `scenes.js` (procedural art), `render.js` (HUD, panels, markers, screens), `input.js` (mouse + keyboard), `main.js` (state, timer, score), `shots.js` (`?shot=` states).
- `main.ts` — copies `game/` + `screenshots/` to `$MAKEFUN_OUTPUT_DIR` (fallback `/output`) and writes `dossier.json` via `buildDossier` from `vendor/makefun-game.ts`.
- `screenshots/` — 4 JPEG renders (1280x800), `shots.json` describes each one.
