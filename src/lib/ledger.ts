import type { CollectionEntry } from 'astro:content';

/**
 * Stable ledger index for industry research entries: #001 = oldest publishDate,
 * #N = newest, so numbers never shift as new notes are appended. Pass the FULL
 * collection (every page must use the same map or numbers diverge).
 */
export const ledgerIndices = (all: CollectionEntry<'industryResearch'>[]): Map<string, number> => {
  const asc = [...all].sort((a, b) => a.data.publishDate.localeCompare(b.data.publishDate));
  return new Map(asc.map((e, i) => [e.id, i + 1]));
};

export const ledgerNo = (n: number) => `#${String(n).padStart(3, '0')}`;
