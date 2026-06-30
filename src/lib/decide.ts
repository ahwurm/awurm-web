/**
 * "Let the model decide" — wire a button to race up to 4 visible cards through
 * the drift-diffusion accumulator (lib/accumulator) and scroll to the winner.
 * Shared by the speaking and projects pages; each card carries its race label
 * in data-label. Progressive enhancement: the caller's button starts hidden and
 * is revealed here, so no-JS users never see a dead control.
 */
import { createRace, type RaceHandle } from './accumulator';

interface DecideOpts {
  items: HTMLElement[];
  button: HTMLButtonElement;
  raceWrap: HTMLElement;
  canvas: HTMLCanvasElement;
  live: HTMLElement;
}

export const wireDecide = ({ items, button, raceWrap, canvas, live }: DecideOpts) => {
  if (!items.length) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const label = (el: HTMLElement) => el.dataset.label ?? '';
  button.hidden = false;

  let race: RaceHandle | null = null;
  let lastHit: HTMLElement | null = null;

  const goTo = (row: HTMLElement) => {
    lastHit?.classList.remove('row-hit');
    void row.offsetWidth; // restart the highlight animation
    row.classList.add('row-hit');
    lastHit = row;
    row.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
  };

  button.addEventListener('click', () => {
    if (race?.running()) return; // one trial at a time
    const pool = items.filter((i) => !i.hidden);
    if (!pool.length) return;
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const sampled = pool.slice(0, Math.min(4, pool.length));

    if (reduced || sampled.length === 1) {
      const w = sampled[Math.floor(Math.random() * sampled.length)];
      live.textContent = `decision: ${label(w)}`;
      goTo(w);
      return;
    }

    raceWrap.hidden = false;
    race?.dispose();
    race = createRace(canvas, {
      n: sampled.length,
      maxMs: 1600,
      axes: false,
      labels: sampled.map(label),
      onCommit: (winner, rt) => {
        live.textContent = `decision: ${label(sampled[winner])} · rt = ${rt} ms`;
        setTimeout(() => goTo(sampled[winner]), 450);
      },
    });
    race.start();
  });
};
