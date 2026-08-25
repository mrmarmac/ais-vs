/* ============================================================
   AIS:VS — LISA vs CAISH (MVP)
   Live ticker + countdown to the next round.
   ============================================================ */
(function () {
  "use strict";

  const TICKER_TEXT = "3 HOURS. 2 HUBS. 1 WINNER.";

  const $ = (s) => document.querySelector(s);
  const pad = (n) => String(n).padStart(2, "0");

  /* ---------- ticker: repeat the tagline ---------- */
  function buildTicker() {
    const track = $("#tickerTrack");
    if (!track) return;
    const unit = `<span>${TICKER_TEXT}</span><span class="sep">◆</span>`;
    // enough repeats to fill wide screens, then duplicated for a seamless loop
    const half = unit.repeat(8);
    track.innerHTML = half + half;
  }

  /* ---------- countdown to next Saturday high-noon ---------- */
  function nextSaturdayNoon() {
    const now = new Date();
    const d = new Date(now);
    d.setHours(12, 0, 0, 0);
    let diff = (6 - d.getDay() + 7) % 7; // 6 = Saturday
    if (diff === 0 && d.getTime() <= now.getTime()) diff = 7;
    d.setDate(d.getDate() + diff);
    return d;
  }

  let target = nextSaturdayNoon();
  function tickCountdown() {
    let ms = target - new Date();
    if (ms <= 0) { target = nextSaturdayNoon(); ms = target - new Date(); }
    const s = Math.floor(ms / 1000);
    const set = (id, v) => { const el = $(id); if (el) el.textContent = pad(v); };
    set("#cd-d", Math.floor(s / 86400));
    set("#cd-h", Math.floor((s % 86400) / 3600));
    set("#cd-m", Math.floor((s % 3600) / 60));
    set("#cd-s", s % 60);
  }

  /* ---------- background audio + play/pause toggle ---------- */
  function setupAudio() {
    const audio = $("#bgAudio");
    const btn = $("#audioToggle");
    if (!audio || !btn) return;

    audio.volume = 0.6;

    const reflect = () => {
      const paused = audio.paused;
      btn.classList.toggle("is-paused", paused);
      btn.setAttribute("aria-pressed", String(!paused));
      btn.setAttribute("aria-label", paused ? "Play background music" : "Pause background music");
    };

    // Try to start playback on load. Browsers often block autoplay with sound
    // until the visitor interacts, so fall back to starting on first gesture.
    const tryPlay = () => audio.play().then(reflect).catch(reflect);

    tryPlay().then(() => {
      if (audio.paused) {
        const kick = () => { audio.play().then(reflect).catch(reflect); };
        const opts = { once: true };
        window.addEventListener("pointerdown", kick, opts);
        window.addEventListener("keydown", kick, opts);
      }
    });

    btn.addEventListener("click", () => {
      if (audio.paused) audio.play().then(reflect).catch(reflect);
      else { audio.pause(); reflect(); }
    });

    audio.addEventListener("play", reflect);
    audio.addEventListener("pause", reflect);
    reflect();
  }

  function init() {
    buildTicker();
    tickCountdown();
    setInterval(tickCountdown, 1000);
    setupAudio();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
