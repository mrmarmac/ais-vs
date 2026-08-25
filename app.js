/* ============================================================
   AIS:VS — interactions
   Countdown · live ticker · scoreboard · hubs · standings · forms
   ============================================================ */
(function () {
  "use strict";

  /* ---------- data ---------- */
  const HUBS = [
    { code: "LISA",  city: "London",     status: "active",    label: "In arena" },
    { code: "CAISH", city: "Cambridge",  status: "active",    label: "In arena" },
    { code: "OXAI",  city: "Oxford",     status: "qualified", label: "Qualified" },
    { code: "SFAI",  city: "San Francisco", status: "qualified", label: "Qualified" },
    { code: "BLIN",  city: "Berlin",     status: "qualified", label: "Qualified" },
    { code: "PARS",  city: "Paris",      status: "qualified", label: "Qualified" },
    { code: "SGAI",  city: "Singapore",  status: "qualified", label: "Qualified" },
    { code: "LSBN",  city: "Lisbon",     status: "open",      label: "Slot open" },
  ];

  const LADDER = [
    { hub: "LISA",  city: "London",        w: 7, l: 2, elo: 1204, form: "WWWLW", cls: "is-a" },
    { hub: "CAISH", city: "Cambridge",     w: 6, l: 3, elo: 1188, form: "WLWWW", cls: "is-b" },
    { hub: "OXAI",  city: "Oxford",        w: 6, l: 3, elo: 1176, form: "WWLWL", cls: "" },
    { hub: "SFAI",  city: "San Francisco", w: 5, l: 4, elo: 1152, form: "LWWLW", cls: "" },
    { hub: "BLIN",  city: "Berlin",        w: 4, l: 5, elo: 1121, form: "LWLWL", cls: "" },
    { hub: "PARS",  city: "Paris",         w: 4, l: 5, elo: 1109, form: "WLLWL", cls: "" },
    { hub: "SGAI",  city: "Singapore",     w: 3, l: 6, elo: 1088, form: "LLWLW", cls: "" },
    { hub: "LSBN",  city: "Lisbon",        w: 2, l: 7, elo: 1054, form: "LLWLL", cls: "" },
  ];

  const TICKER = [
    "<b>LIVE</b> · LISA 142 – 138 CAISH · Bot Brawl R2",
    "R1 FINAL · LISA 48 – 44 CAISH",
    "Next round · <b>Saturday high-noon</b>",
    "8 hubs qualified for Season 01",
    "OXAI upsets SFAI in overtime, 51–50",
    "Node Captain slots open in <b>Lisbon</b>",
    "Governance Gauntlet judges announced",
    "Entry is <b>free</b> — register at your local hub",
  ];

  /* ---------- helpers ---------- */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const pad = (n) => String(n).padStart(2, "0");

  /* ---------- ticker ---------- */
  function buildTicker() {
    const track = $("#tickerTrack");
    if (!track) return;
    const seq = TICKER.map((t) => `<span>${t}</span><span class="sep">◆</span>`).join("");
    track.innerHTML = seq + seq; // duplicate for seamless loop
  }

  /* ---------- countdown to next Saturday high-noon ---------- */
  function nextSaturdayNoon() {
    const now = new Date();
    const d = new Date(now);
    d.setHours(12, 0, 0, 0);
    // 6 = Saturday
    let diff = (6 - d.getDay() + 7) % 7;
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

  /* ---------- live board timer (counts down within the round) ---------- */
  function boardTimer() {
    const el = $("#boardTimer");
    if (!el) return;
    let total = 41 * 60 + 7;
    setInterval(() => {
      total = total > 0 ? total - 1 : 90 * 60;
      el.textContent = `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
    }, 1000);
  }

  /* ---------- animated score count-up on reveal ---------- */
  function countUp(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const dur = 1400, start = performance.now();
    function frame(t) {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- hubs ---------- */
  function buildHubs() {
    const grid = $("#hubgrid");
    if (!grid) return;
    grid.innerHTML = HUBS.map((h) => {
      const dot = h.status === "active" ? '<span class="dot"></span>'
        : h.status === "qualified" ? '<span class="dot dot--cyan"></span>'
        : '<span class="dot dot--mute"></span>';
      return `<div class="hub">
        <div class="hub__code">${h.code}</div>
        <div class="hub__city">${h.city}</div>
        <div class="hub__status hub__status--${h.status}">${dot}${h.label}</div>
      </div>`;
    }).join("");
  }

  /* ---------- standings ---------- */
  function buildLadder() {
    const body = $("#ladderBody");
    if (!body) return;
    body.innerHTML = LADDER.map((r, i) => {
      const form = r.form.split("").map((c) =>
        c === "W" ? '<span class="w">W</span>' : '<span class="l">L</span>').join("");
      return `<tr class="${r.cls}">
        <td class="ladder__rank">${i + 1}</td>
        <td class="ladder__hub">${r.hub}</td>
        <td>${r.city}</td>
        <td class="num">${r.w}</td>
        <td class="num">${r.l}</td>
        <td class="num">${r.elo}</td>
        <td class="num ladder__form">${form}</td>
      </tr>`;
    }).join("");
  }

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        $$(".board__score[data-count]", en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- nav ---------- */
  function initNav() {
    const nav = $("#nav"), toggle = $("#navToggle"), links = $("#navLinks");
    window.addEventListener("scroll", () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 10);
    }, { passive: true });
    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      links.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
          links.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  /* ---------- forms ---------- */
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function initCaptainForm() {
    const form = $("#captainForm");
    if (!form) return;
    const ok = $("#formOk");
    const rules = {
      name: (v) => v.trim().length >= 2 || "Please enter your name.",
      email: (v) => validEmail(v) || "Enter a valid email address.",
      city: (v) => v.trim().length >= 2 || "Which city?",
      capacity: (v) => !!v || "Pick a capacity range.",
    };
    function fieldOf(name) { return form.querySelector(`[name="${name}"]`).closest(".field"); }
    function showErr(name, msg) {
      const f = fieldOf(name);
      f.classList.toggle("is-invalid", !!msg);
      const e = f.querySelector(`.field__err[data-for="${name}"]`);
      if (e) e.textContent = msg || "";
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let firstBad = null;
      Object.keys(rules).forEach((name) => {
        const el = form.querySelector(`[name="${name}"]`);
        const res = rules[name](el.value);
        const msg = res === true ? "" : res;
        showErr(name, msg);
        if (msg && !firstBad) firstBad = el;
      });
      if (firstBad) { firstBad.focus(); return; }
      ok.hidden = false;
      form.querySelector('button[type="submit"]').textContent = "Sent ✓";
      form.reset();
    });
    form.addEventListener("input", (e) => {
      const name = e.target.name;
      if (rules[name]) { const r = rules[name](e.target.value); showErr(name, r === true ? "" : ""); }
    });
  }

  function initNewsletter() {
    const form = $("#newsForm");
    if (!form) return;
    const ok = $("#newsOk"), input = $("#newsEmail");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validEmail(input.value)) { input.focus(); input.style.borderColor = "#ff4444"; return; }
      ok.hidden = false;
      input.value = "";
      form.querySelector("button").textContent = "Subscribed ✓";
    });
  }

  /* ---------- init ---------- */
  function init() {
    const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
    buildTicker();
    buildHubs();
    buildLadder();
    tickCountdown(); setInterval(tickCountdown, 1000);
    boardTimer();
    initReveal();
    initNav();
    initCaptainForm();
    initNewsletter();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
