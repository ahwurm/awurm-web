export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export const isUpcoming = (d: Date) => d.getTime() >= Date.now();

export const groupByYear = <T>(items: T[], getDate: (t: T) => Date): [number, T[]][] => {
  const m = new Map<number, T[]>();
  for (const it of items) {
    const y = getDate(it).getUTCFullYear();
    m.set(y, [...(m.get(y) ?? []), it]);
  }
  return [...m.entries()].sort((a, b) => b[0] - a[0]);
};
