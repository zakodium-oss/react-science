import { useQuery } from '@tanstack/react-query';

export const dbURL = 'https://nmrdb.cheminfo.org/v1/';

export type SpectrumKinds = 'all' | 'oneD' | 'twoD' | 'fid' | 'ft';
export interface NMREntryChild {
  id: string;
  is1D: boolean;
  is2D: boolean;
  isFid: boolean;
  isFt: boolean;
  lastModified: number;
  solvent: string;
  frequency: number;
  pulseSequence: string;
  _nmrID: string;
  relativePath: string;
  source: string;
}

export interface NMREntryLink {
  ids: string[];
}
export interface NMREntry {
  groupName: string;
  lastModified: number;
  children: NMREntryChild[];
  links: Record<SpectrumKinds, NMREntryLink>;
}

function getLinksForChildren(children: NMREntryChild[]) {
  const links: Record<SpectrumKinds, NMREntryLink> = {
    oneD: { ids: [] },
    twoD: { ids: [] },
    fid: { ids: [] },
    ft: { ids: [] },
    all: { ids: [] },
  };
  for (const child of children) {
    links.all.ids.push(child.id);
    if (child.is1D) {
      links.oneD.ids.push(child.id);
    }
    if (child.is2D) {
      links.twoD.ids.push(child.id);
    }
    if (child.isFid) {
      links.fid.ids.push(child.id);
    }
    if (child.isFt) {
      links.ft.ids.push(child.id);
    }
  }
  return links;
}

function getLastModified(entry: NMREntry) {
  let lastModified = 0;
  for (const child of entry.children) {
    if (child.lastModified > lastModified) {
      lastModified = child.lastModified;
    }
  }
  return lastModified;
}

export function useSearchQuery(query: string, staleTime = 250) {
  return useQuery({
    queryKey: ['post', query],
    queryFn: async () => {
      const response = await fetch(`${dbURL}searchNMRs?query=${query}`);
      const answer = await response.json();
      const entries = answer.result;
      for (const entry of entries) {
        entry.links = getLinksForChildren(entry.children);
        entry.lastModified = getLastModified(entry);
      }
      return entries;
    },
    staleTime,
  });
}

export function useStatsQuery(staleTime = 250) {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await fetch(`${dbURL}getStats`);
      const answer = await response.json();
      return answer.result;
    },
    staleTime,
  });
}

export function findCommonParentFolder(paths: string[]) {
  paths = paths.sort();
  const first = paths[0];
  const last = paths.at(-1) || '';
  let i = 0;
  for (; i < first.length && first[i] === last[i]; i++);
  const common = first.slice(0, i);
  return common.split('/').slice(0, -1).join('/');
}

export function getDim(child: NMREntryChild) {
  if (child.is1D) {
    return '1D';
  }
  if (child.is2D) {
    return '2D';
  }
  return '';
}

export function getType(child: NMREntryChild) {
  if (child.isFid) {
    return 'FID';
  }
  if (child.isFt) {
    return 'FT';
  }
  return '';
}

export function getSolvent(child: NMREntryChild) {
  return child.solvent
    .split(/(\d+)/)
    .map((part, index) =>
      /\d/.test(part) ? <sub key={index}>{part}</sub> : part,
    );
}
