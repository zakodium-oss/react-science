/** @jsxImportSource @emotion/react */
import { AnchorButton, Icon, InputGroup } from '@blueprintjs/core';
import { BlueprintIcons_16Id as BlueprintIcons } from '@blueprintjs/icons/lib/esm/generated/16px/blueprint-icons-16';
import { css } from '@emotion/react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { formatDistanceToNowStrict, formatISO9075 } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

import { Button, Table, ValueRenderers } from '../index';

const style = {
  content: css({
    overflow: 'hidden',
    "&[data-state='open']": {
      animation: 'slideDown 300ms ease-out',
    },
    '&[data-state="closed"]': {
      animation: 'slideUp 300ms ease-out',
    },
    '@keyframes slideDown': {
      from: {
        height: 0,
      },
      to: { height: 'var(--radix-collapsible-content-height)' },
    },
    '@keyframes slideUp': {
      from: {
        height: 'var(--radix-collapsible-content-height)',
      },
      to: { height: 0 },
    },
  }),
  container: css({
    padding: '5px 0 0 0',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }),
  chevron: css({
    transition: 'all 0.3s ease-in-out',
  }),
  button: css({
    "&[data-state='open'] > span": {
      rotate: '90deg',
    },
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

async function processQuery(query: string) {
  const throttleTime = 250;

  const throttledFetch = throttle(async (query: string): Promise<any> => {
    const params = new URLSearchParams();
    params.set('query', query);

    const response = await fetch(`${dbURL}v1/searchNMRs?${params.toString()}`);
    const answer = await response.json();

    return answer;
  }, throttleTime);

  const response = await throttledFetch(query);
  const entries = response.result;

  for (const entry of entries) {
    entry.links = getLinksForChildren(entry.children);
    entry.lastModified = getLastModified(entry);
  }
  return entries;
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

  const [entries, setEntries] = useState<NMREntry[]>([]);
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
    const icons: Record<SpectrumKinds, BlueprintIcons | null> = {
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
  useEffect(() => {
    processQuery('')
      .then((entries) => {
        setEntries(entries);
        setTotal(entries.length);
      })
      .catch(() => {});
  }, []);

  const TableRef = useRef<HTMLDivElement>(null);
  return (
    <div
      style={{
        padding: '5px 0 0 0',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      ref={TableRef}
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
          placeholder="Search for a parameter"
          onChange={({ target }) => {
            if (target.value !== undefined) {
              processQuery(target.value)
                .then((entries) => {
                  setEntries(entries);
                })
                .catch(() => {});
            }
          }}
          leftIcon="search"
          type="search"
          fill
        />
        [{entries.length}/{total}]<div id="selection" />
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
        {entries.slice(0, displayFirst).map((entry: NMREntry) => (
          <Collapsible.Root
            key={entry.groupName}
            className="CollapsibleRoot"
            open={opened === entry.groupName}
            onOpenChange={(open) => {
              if (open) {
                setOpened(entry.groupName);
              } else {
                setOpened('');
              }
            }}
          >
            <Collapsible.Trigger asChild css={style.button}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: '10px',
                }}
              >
                <Icon icon="chevron-right" css={style.chevron} />
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
                  {TableRef.current?.offsetWidth === undefined ||
                    (TableRef.current?.offsetWidth > 300 && (
                      <div
                        style={{
                          alignSelf: 'center',
                        }}
                      >
                        {formatDistanceToNowStrict(entry.lastModified, {
                          addSuffix: true,
                        })}
                      </div>
                    ))}
                  <div
                    style={{
                      display: 'flex',
                      alignSelf: 'center',
                      gap: '2px',
                    }}
                  >
                    {getLink(
                      entry,
                      TableRef.current?.offsetWidth === undefined ||
                        TableRef.current?.offsetWidth > 500,
                    )}
                  </div>
                  {TableRef.current?.offsetWidth === undefined ||
                    (TableRef.current?.offsetWidth > 500 && (
                      <div
                        style={{
                          alignSelf: 'center',
                        }}
                      >
                        {getDownloadLink(entry)}
                      </div>
                    ))}
                </div>
              </div>
            </Collapsible.Trigger>
            <Collapsible.Content css={style.content}>
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
                      <div
                        dangerouslySetInnerHTML={{
                          __html: child.solvent.replaceAll(
                            /(\d+)/g,
                            '<sub>$1</sub>',
                          ),
                        }}
                      />
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
            </Collapsible.Content>
          </Collapsible.Root>
        ))}
      </div>
    </div>
  );
}
