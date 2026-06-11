export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

/** Ledger voice: ISO date for mono metadata. */
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** Plate captions: "jul 2025" (lowercased to match the mono metadata voice). */
export const monthYearShort = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).toLowerCase();

export const isUpcoming = (d: Date) => d.getTime() >= Date.now();

export const groupByYear = <T>(items: T[], getDate: (t: T) => Date): [number, T[]][] => {
  const m = new Map<number, T[]>();
  for (const it of items) {
    const y = getDate(it).getUTCFullYear();
    m.set(y, [...(m.get(y) ?? []), it]);
  }
  return [...m.entries()].sort((a, b) => b[0] - a[0]);
};
