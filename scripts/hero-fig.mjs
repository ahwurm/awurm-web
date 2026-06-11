// Generates the static (no-JS / reduced-motion) drift-diffusion figures:
// polyline points for the hero's completed trial (first passage at 487 ms)
// and the 404 page's failed trial (boundary never crossed).
// Output is pasted into HeroAccumulator.astro / 404.astro. Deterministic seed.

const W = 560, H = 350, M = { l: 46, r: 14, t: 26, b: 36 };
const E_MIN = -0.18, E_MAX = 1.42, A = 1.2, MAX_MS = 600, STEP = 6;

const X = (t) => M.l + (t / MAX_MS) * (W - M.l - M.r);
const Y = (e) => M.t + ((E_MAX - e) / (E_MAX - E_MIN)) * (H - M.t - M.b);

// Mulberry32 — deterministic
const rng = (seed) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const gaussOf = (rnd) => () => {
  let u = 0, v = 0;
  while (u === 0) u = rnd();
  while (v === 0) v = rnd();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

const walk = (mu, sigma, rnd, stopAt = null) => {
  const g = gaussOf(rnd);
  const pts = [0];
  const dt = STEP / 1000, sq = Math.sqrt(dt) * sigma;
  for (let t = STEP; t <= MAX_MS; t += STEP) {
    const next = pts[pts.length - 1] + mu * dt + sq * g();
    pts.push(next);
    if (stopAt != null && next >= stopAt) break;
  }
  return pts;
};

const toPoints = (pts, tScale = 1) =>
  pts.map((e, i) => `${X(i * STEP * tScale).toFixed(1)},${Y(Math.max(E_MIN, Math.min(E_MAX, e))).toFixed(1)}`).join(' ');

// --- hero: search seeds for a winner crossing near 487ms that stays in frame
let hero = null;
for (let seed = 1; seed < 4000 && !hero; seed++) {
  const rnd = rng(seed);
  const pts = walk(2.4, 0.95, rnd, A);
  const last = pts[pts.length - 1];
  if (last < A) continue;
  const prev = pts[pts.length - 2];
  const crossT = (pts.length - 2 + (A - prev) / (last - prev)) * STEP;
  const min = Math.min(...pts);
  const maxBody = Math.max(...pts.slice(0, -1));
  if (min > -0.16 && maxBody < A && crossT > 400 && crossT < 560) {
    const tScale = 487 / crossT; // rescale time so first passage = exactly 487 ms
    hero = { seed, pts, tScale, crossT: 487 };
  }
}
if (!hero) throw new Error('no hero seed found');

// losers: frozen at the decision (sim stops when the winner commits)
const loserLen = Math.round(hero.crossT / (STEP * hero.tScale));
const losers = [];
for (let seed = 5000; seed < 9000 && losers.length < 3; seed++) {
  const rnd = rng(seed);
  const pts = walk(0.55 + losers.length * 0.35, 0.9, rnd).slice(0, loserLen + 1);
  if (Math.max(...pts) < A - 0.08 && Math.min(...pts) > -0.17) losers.push({ seed, pts });
}

console.log('=== HERO (viewBox 0 0 560 350, boundary y=' + Y(A).toFixed(1) + ', axis y=' + Y(0).toFixed(1) + ') ===');
console.log('cross: x=' + X(487).toFixed(1) + ' y=' + Y(A).toFixed(1));
const winPts = toPoints(hero.pts, hero.tScale);
const muIdx = Math.floor(hero.pts.length * 0.55);
console.log('mu label at: x=' + (X(muIdx * STEP * hero.tScale) + 6).toFixed(1) + ' y=' + (Y(hero.pts[muIdx]) - 8).toFixed(1));
losers.forEach((l, i) => console.log(`LOSER${i} seed=${l.seed}:\n${toPoints(l.pts, hero.tScale)}`));
console.log(`WINNER seed=${hero.seed}:\n${winPts}`);

// --- 404: three drifting walks, none cross
console.log('\n=== 404 (same viewBox) ===');
const cfgs = [
  [0.25, 0.85], // wanders
  [0.05, 0.8], // flat
  [-0.15, 0.75], // gives up
];
let found = 0;
for (let seed = 100; seed < 6000 && found < 3; seed++) {
  const [mu, sigma] = cfgs[found];
  const rnd = rng(seed);
  const pts = walk(mu, sigma, rnd);
  if (Math.max(...pts) < A - 0.15 && Math.min(...pts) > -0.17 && pts.length === MAX_MS / STEP + 1) {
    console.log(`T${found} seed=${seed} mu=${mu}:\n${toPoints(pts)}`);
    found++;
  }
}
