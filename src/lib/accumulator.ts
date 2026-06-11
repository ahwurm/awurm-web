/**
 * Drift-diffusion race renderer (canvas 2D, devicePixelRatio-aware).
 * Shared by the hero methods figure and the research-page
 * "let the model decide" mini race.
 *
 * Honest instrument: the x position of every trace is wall-clock elapsed ms
 * since start (fixed 16 ms sim steps catch up to real time each frame), and
 * the reported rt is the real first-passage time.
 */

export interface RaceOpts {
  boundary?: number; // a
  maxMs?: number; // x-axis domain
  n?: number; // number of traces
  labels?: string[]; // optional mono label drawn at each trace head
  axes?: boolean; // axis labels + ticks (default true)
  onCommit?: (winner: number, rtMs: number) => void;
}

export interface RaceHandle {
  start: () => void;
  running: () => boolean;
  redraw: () => void;
  dispose: () => void;
}

const STEP = 16; // ms per sim step
const E_MIN = -0.18;
const E_MAX = 1.42;

const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const palette = () => ({
  ink: css('--color-ink'),
  dim: css('--color-dim'),
  // "gold" = the decision/commit color; --color-accent is the theme-adaptive
  // gold (deep ochre on paper, bright gold on navy) so the winner stays legible.
  gold: css('--color-accent'),
});

const gauss = () => {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

interface Trace {
  pts: number[]; // evidence value per 16ms step
  mu: number;
}

export const createRace = (canvas: HTMLCanvasElement, opts: RaceOpts = {}): RaceHandle => {
  const { boundary = 1.2, maxMs = 2200, n = 4, labels, axes = true, onCommit } = opts;
  const ctx = canvas.getContext('2d')!;

  let traces: Trace[] = [];
  let winner = -1;
  let crossX = 0; // ms of first passage (interpolated)
  let rt = 0; // real elapsed ms at commit
  let startT = 0;
  let raf = 0;
  let active = false;
  let disposed = false;

  // CSS-pixel geometry, refreshed on resize
  let w = 0;
  let h = 0;
  const m = axes ? { l: 46, r: 14, t: 26, b: 36 } : { l: 10, r: 44, t: 18, b: 12 };
  const x = (t: number) => m.l + (t / maxMs) * (w - m.l - m.r);
  const y = (e: number) => m.t + ((E_MAX - e) / (E_MAX - E_MIN)) * (h - m.t - m.b);

  const fit = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const mono = (size: number) => `500 ${size}px "JetBrains Mono Variable", ui-monospace, monospace`;

  const newTraces = () => {
    // One clear favorite plus chasers; jittered so the winner varies.
    const base = [1.05, 0.8, 0.62, 0.5].slice(0, n);
    for (let i = base.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [base[i], base[j]] = [base[j], base[i]];
    }
    traces = base.map((mu) => ({ pts: [0], mu: mu * (0.9 + Math.random() * 0.2) }));
    winner = -1;
    crossX = 0;
    rt = 0;
  };

  const step = () => {
    // advance every trace one 16ms step; returns true if someone crossed
    const sigma = 0.42;
    const dt = STEP / 1000;
    const sq = Math.sqrt(dt) * sigma;
    for (let i = 0; i < traces.length; i++) {
      const tr = traces[i];
      const prev = tr.pts[tr.pts.length - 1];
      const next = prev + tr.mu * dt + sq * gauss();
      tr.pts.push(next);
      if (winner < 0 && next >= boundary) {
        winner = i;
        const f = (boundary - prev) / (next - prev);
        crossX = (tr.pts.length - 2 + f) * STEP;
      }
    }
    return winner >= 0;
  };

  const draw = () => {
    const p = palette();
    ctx.clearRect(0, 0, w, h);
    if ('letterSpacing' in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0.08em';

    const x0 = x(0);
    const x1 = w - m.r;
    const yAxis = y(0);
    const yBound = y(boundary);

    // axes
    ctx.lineWidth = 1;
    ctx.strokeStyle = p.dim;
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.moveTo(x0, m.t);
    ctx.lineTo(x0, yAxis);
    ctx.lineTo(x1, yAxis);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // boundary (dashed)
    ctx.strokeStyle = p.dim;
    ctx.setLineDash([6, 5]);
    ctx.beginPath();
    ctx.moveTo(x0, yBound);
    ctx.lineTo(x1, yBound);
    ctx.stroke();
    ctx.setLineDash([]);

    if (axes) {
      ctx.fillStyle = p.dim;
      ctx.font = mono(10.5);
      // boundary label
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`a = ${boundary}`, x1, yBound - 4);
      // x ticks every 500ms, labels every 1000
      ctx.textBaseline = 'top';
      for (let t = 0; t <= maxMs - 100; t += 500) {
        const tx = x(t);
        ctx.strokeStyle = p.dim;
        ctx.globalAlpha = 0.75;
        ctx.beginPath();
        ctx.moveTo(tx, yAxis);
        ctx.lineTo(tx, yAxis + (t % 1000 === 0 ? 5 : 3));
        ctx.stroke();
        ctx.globalAlpha = 1;
        if (t % 1000 === 0) {
          ctx.textAlign = 'center';
          ctx.fillText(String(t), tx, yAxis + 8);
        }
      }
      // axis titles
      ctx.textAlign = 'center';
      ctx.fillText('time (ms)', (x0 + x1) / 2, yAxis + 21);
      ctx.save();
      ctx.translate(x0 - 30, (m.t + yAxis) / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textBaseline = 'middle';
      ctx.fillText('evidence', 0, 0);
      ctx.restore();
    }

    // traces (clip to plot area)
    ctx.save();
    ctx.beginPath();
    ctx.rect(x0, m.t - 8, x1 - x0, yAxis - m.t + 8);
    ctx.clip();
    const alphas = [0.85, 0.55, 0.42, 0.32];
    for (let i = 0; i < traces.length; i++) {
      const tr = traces[i];
      const isWin = i === winner;
      ctx.strokeStyle = isWin ? p.gold : p.ink;
      ctx.globalAlpha = isWin ? 1 : alphas[i % alphas.length];
      ctx.lineWidth = isWin ? 2 : 1.4;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(x0, y(tr.pts[0]));
      for (let k = 1; k < tr.pts.length; k++) ctx.lineTo(x(k * STEP), y(tr.pts[k]));
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    ctx.restore();

    // per-trace head labels (mini race)
    if (labels) {
      ctx.font = mono(10);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      for (let i = 0; i < traces.length; i++) {
        const tr = traces[i];
        const hx = x((tr.pts.length - 1) * STEP);
        const hy = y(tr.pts[tr.pts.length - 1]);
        ctx.fillStyle = i === winner ? p.gold : p.dim;
        ctx.fillText(labels[i] ?? '', Math.min(hx, x1) + 5, Math.max(m.t, Math.min(hy, yAxis)));
      }
    }

    // commit: gold tick + dot at first passage, μ near the winner's slope
    if (winner >= 0) {
      const cx = x(crossX);
      ctx.strokeStyle = p.gold;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, yBound - 7);
      ctx.lineTo(cx, yBound + 7);
      ctx.stroke();
      ctx.fillStyle = p.gold;
      ctx.beginPath();
      ctx.arc(cx, yBound, 3, 0, Math.PI * 2);
      ctx.fill();
      if (axes) {
        const tr = traces[winner];
        const k = Math.floor(tr.pts.length * 0.55);
        ctx.fillStyle = p.gold;
        ctx.font = `italic 500 12px "JetBrains Mono Variable", ui-monospace, monospace`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText('μ', x(k * STEP) + 6, y(tr.pts[k]) - 6);
      }
    }
  };

  const frame = () => {
    if (disposed) return;
    const elapsed = performance.now() - startT;
    let crossed = winner >= 0;
    let guard = Math.ceil(maxMs / STEP) + 2;
    while (!crossed && traces[0].pts.length * STEP <= Math.min(elapsed, maxMs) && guard-- > 0) {
      // late nudge so a slow trial still resolves inside the figure
      if (traces[0].pts.length * STEP > maxMs - 220) for (const tr of traces) tr.mu *= 1.06;
      crossed = step();
    }
    draw();
    if (crossed) {
      active = false;
      rt = Math.round(performance.now() - startT);
      onCommit?.(winner, rt);
      return;
    }
    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (active || disposed) return;
    active = true;
    cancelAnimationFrame(raf);
    fit();
    newTraces();
    startT = performance.now();
    raf = requestAnimationFrame(frame);
  };

  // keep crisp on resize / correct colors on theme change
  const ro = new ResizeObserver(() => {
    if (canvas.clientWidth !== w || canvas.clientHeight !== h) {
      fit();
      draw();
    }
  });
  ro.observe(canvas);

  return {
    start,
    running: () => active,
    redraw: () => {
      if (!active && traces.length) draw();
    },
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    },
  };
};
