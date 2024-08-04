/** @jsxImportSource @emotion/react */
import {
  AnchorButton,
  Collapse,
  Icon,
  IconProps,
  InputGroup,
} from '@blueprintjs/core';
import { css } from '@emotion/react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { formatDistanceToNowStrict, formatISO9075 } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

import { Button, Table, ValueRenderers } from '../index';
import useResizeObserver from 'use-resize-observer';
import { QueryClient, useQuery } from '@tanstack/react-query';

const style = {
  content: css({
    overflow: 'hidden',
  }),
  container: css({
    padding: '5px 0 0 0',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }),
  chevron: (open: boolean) =>
    css({
      transition: 'all 0.3s ease-in-out',
      rotate: open ? '90deg' : '0deg',
    }),
  button: css({
    cursor: 'pointer',
    borderBottom: '1px solid #f5f5f5',
    borderTop: '1px solid #f5f5f5',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '5px 2px',
    width: '100%',
    ':hover': {
      backgroundColor: '#f5f5f5',
    },
  }),
};

type SpectrumKinds = 'all' | 'oneD' | 'twoD' | 'fid' | 'ft';
interface NMREntryChild {
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

interface NMREntryLink {
  ids: string[];
}
interface NMREntry {
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

const dbURL = 'https://nmrdb.cheminfo.org/';

function throttle<T extends (...args: any[]) => any>(func: T, delay: number) {
  let lastCall = 0;
  return (...args: any) => {
    const now = Date.now();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}
function usePostQuery(query: string, setTotal: (total: number) => void) {
  return useQuery({
    queryKey: ['post', query],
    queryFn: async () => {
      const response = await fetch(`${dbURL}v1/searchNMRs?query=${query}`);
      const answer = await response.json();
      const entries = answer.result;
      for (const entry of entries) {
        entry.links = getLinksForChildren(entry.children);
        entry.lastModified = getLastModified(entry);
      }
      if (query === '') {
        setTotal(entries.length);
      }
      return entries;
    },
    staleTime: 250,
  });
}

function findCommonParentFolder(paths: string[]) {
  paths = paths.sort();
  const first = paths[0];
  const last = paths.at(-1) || '';
  let i = 0;
  for (; i < first.length && first[i] === last[i]; i++);
  const common = first.slice(0, i);
  return common.split('/').slice(0, -1).join('/');
}

function getDownloadLink(entry: NMREntry) {
  if (entry.children.length === 0) {
    return '';
  }
  const source = entry.children[0].source;
  const relativePath = findCommonParentFolder(
    entry.children.map((child: NMREntryChild) => child.relativePath),
  );
  const params = new URLSearchParams();
  params.set('source', source);
  params.set('relativePath', relativePath);
  const link = `${dbURL}v1/getZip?${params.toString()}`;

  return (
    <AnchorButton
      href={link}
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={{
        borderRadius: '5px',
        padding: '5px',
      }}
      minimal
      icon="import"
    />
  );
}

function getDim(child: NMREntryChild) {
  if (child.is1D) {
    return '1D';
  }
  if (child.is2D) {
    return '2D';
  }
  return '';
}

function getType(child: NMREntryChild) {
  if (child.isFid) {
    return 'FID';
  }
  if (child.isFt) {
    return 'FT';
  }
  return '';
}

export interface NMRFileBrowserProps {
  setSpectra?: (ids: string | string[]) => void;
  appendSpectra?: (ids: string | string[]) => void;
}

export function NMRFileBrowser(props: NMRFileBrowserProps) {
  const { setSpectra, appendSpectra } = props;

  // const [entries, setEntries] = useState<NMREntry[]>([]);
  const [query, setQuery] = useState('');
  const [opened, setOpened] = useState<string>('');
  const [total, setTotal] = useState(0);

  function getLink(entry: NMREntry, showAll: boolean) {
    const labels: Record<SpectrumKinds, string> = {
      all: 'All',
      oneD: '1D',
      twoD: '2D',
      fid: 'FID',
      ft: 'FT',
    };
    const icons: Record<SpectrumKinds, IconProps['icon'] | null> = {
      all: 'multi-select',
      oneD: 'pulse',
      twoD: 'scatter-plot',
      fid: null,
      ft: null,
    };
    const otherKinds: SpectrumKinds[] = ['oneD', 'twoD', 'fid', 'ft'];
    const kindsRender: SpectrumKinds[] = ['all'];

    if (showAll) {
      kindsRender.unshift(...otherKinds);
    }
    return kindsRender.map((kind) => {
      const label = labels[kind];
      const icon = icons[kind];
      const ids = entry.links[kind].ids;
      return (
        <Button
          key={kind}
          onClick={(e) => {
            e.stopPropagation();
            setSpectra?.(ids);
          }}
          tooltipProps={
            ids.length > 0
              ? {
                  content: `Nb ${label} spectra: ${ids.length}`,
                  position: 'bottom-left',
                }
              : {}
          }
          css={css({
            borderRadius: '5px',
            padding: '5px',
          })}
          disabled={ids.length === 0}
          icon={icon}
          minimal={ids.length > 0}
        >
          {icon ? null : label}
        </Button>
      );
    });
  }

  const displayFirst = 100;
  const { status, data, error, isFetching } = usePostQuery(query, setTotal);
  const { ref, width = 0 } = useResizeObserver<HTMLDivElement>();
  return (
    <div
      style={{
        padding: '5px 0 0 0',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      ref={ref}
    >
      <div
        tabIndex={0}
        css={css({
          padding: '0 5px',
          marginTop: '5px',
          backgroundColor: 'white',
          top: '5px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          width: '100%',
        })}
      >
        <InputGroup
          css={css({
            flexGrow: 1,
          })}
          value={query}
          placeholder="Search for a parameter"
          onChange={({ target }) => {
            if (target.value !== undefined) {
              setQuery(target.value);
            }
          }}
          leftIcon="search"
          type="search"
          fill
        />
        {status === 'pending' ? (
          <Button loading minimal />
        ) : (
          status === 'success' && (
            <span>
              [{data.length}/{total}]
            </span>
          )
        )}
      </div>
      <div
        style={{
          position: 'relative',
          marginTop: '5px',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          flex: 1,
        }}
      >
        {status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          status === 'success' &&
          data.slice(0, displayFirst).map((entry: NMREntry) => (
            <div>
              <div
                css={style.button}
                onClick={() => {
                  if (opened === entry.groupName) {
                    setOpened('');
                  } else {
                    setOpened(entry.groupName);
                  }
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: '10px',
                }}
              >
                <Icon
                  icon="chevron-right"
                  css={style.chevron(opened === entry.groupName)}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: '10px',
                  }}
                >
                  <span
                    style={{
                      overflow: 'hidden',
                      alignSelf: 'center',
                      textOverflow: 'ellipsis',
                      whiteSpace: opened === entry.groupName ? '' : 'nowrap',
                      wordWrap: 'break-word',
                      width: '1em',
                      flex: 1,
                    }}
                  >
                    {entry.groupName}
                  </span>
                  {width > 500 && (
                    <div
                      style={{
                        alignSelf: 'center',
                      }}
                    >
                      {formatDistanceToNowStrict(entry.lastModified, {
                        addSuffix: true,
                      })}
                    </div>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      alignSelf: 'center',
                      gap: '2px',
                    }}
                  >
                    {getLink(entry, width > 300)}
                  </div>
                  {
                    !(
                      width > 300 && (
                        <div
                          style={{
                            alignSelf: 'center',
                          }}
                        >
                          {getDownloadLink(entry)}
                        </div>
                      )
                    )
                  }
                </div>
              </div>
              <Collapse
                transitionDuration={300}
                key={entry.groupName}
                className="CollapsibleRoot"
                isOpen={opened === entry.groupName}
                css={style.content}
              >
                <Table
                  striped
                  css={css({
                    width: '100%',
                  })}
                  compact
                >
                  {entry.children.map((child: NMREntryChild) => (
                    <Table.Row
                      key={child.id}
                      style={{
                        height: '10px',
                        padding: '0 !imporant',
                      }}
                    >
                      <ValueRenderers.Text
                        value={formatISO9075(child.lastModified)}
                      />
                      <ValueRenderers.Text value={getDim(child)} />
                      <ValueRenderers.Text value={getType(child)} />
                      <ValueRenderers.Component>
                        <div>
                          {child.solvent
                            .split(/(\d+)/)
                            .map((part, index) =>
                              /\d/.test(part) ? (
                                <sub key={index}>{part}</sub>
                              ) : (
                                part
                              ),
                            )}
                        </div>
                      </ValueRenderers.Component>
                      <ValueRenderers.Text value={child.frequency.toFixed(0)} />
                      <ValueRenderers.Text value={child.pulseSequence} />
                      <ValueRenderers.Component>
                        <div
                          style={{
                            display: 'flex',
                            gap: '5px',
                          }}
                        >
                          <Button
                            onClick={() => appendSpectra?.(child._nmrID)}
                            tooltipProps={{
                              content: 'Append',
                              position: 'bottom-left',
                            }}
                            style={{
                              borderRadius: '5px',
                              padding: '5px',
                            }}
                            color="red"
                            icon="plus"
                            minimal
                          />
                          <Button
                            onClick={() => setSpectra?.(child._nmrID)}
                            tooltipProps={{
                              content: 'Set',
                              position: 'bottom-left',
                            }}
                            style={{
                              borderRadius: '5px',
                              padding: '5px',
                            }}
                            icon="selection"
                            minimal
                          />
                        </div>
                      </ValueRenderers.Component>
                    </Table.Row>
                  ))}
                </Table>
              </Collapse>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
