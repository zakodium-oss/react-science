/** @jsxImportSource @emotion/react */
import { AnchorButton, Icon, InputGroup } from '@blueprintjs/core';
import { css } from '@emotion/react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { formatDistance } from 'date-fns';
import { useEffect, useState } from 'react';

import { Button, Table, ValueRenderers } from '../index';

export interface NMRFileBrowserProps {
  setSpectra?: (ids: string | string[]) => void;
  appendSpectra?: (ids: string | string[]) => void;
}

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
type SpectrumKinds = 'all' | 'oneD' | 'twoD' | 'fid' | 'ft';
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
const dbURL = 'https:/nmrdb.cheminfo.org/';
async function processQuery(query: string) {
  const params = new URLSearchParams();
  params.set('query', query);

  const response = await fetch(`${dbURL}v1/searchNMRs?${params.toString()}`);
  const answer = await response.json();
  const entries = answer.result;

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
export function NMRFileBrowser(props: NMRFileBrowserProps) {
  const { setSpectra, appendSpectra } = props;

  const [entries, setEntries] = useState<NMREntry[]>([]);
  const [opened, setOpened] = useState<string>('');
  const [total, setTotal] = useState(0);

  function getLink(entry: NMREntry, kind: SpectrumKinds) {
    const labels: Record<SpectrumKinds, string> = {
      all: 'All',
      oneD: '1D',
      twoD: '2D',
      fid: 'FID',
      ft: 'FT',
    };
    const label = labels[kind];
    const ids = entry.links[kind].ids;
    if (ids.length === 0) {
      return (
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          // tooltipProps={{ content: `No spectra`, position: 'bottom-left' }}
          style={{
            borderRadius: '5px',
            padding: '5px',
          }}
          disabled
        >
          {label}
        </Button>
      );
    }
    return (
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setSpectra?.(ids);
        }}
        tooltipProps={{
          content: `Nb spectra: ${ids.length}`,
          position: 'bottom-left',
        }}
        intent="success"
        style={{
          borderRadius: '5px',
          padding: '5px',
        }}
      >
        {label}
      </Button>
    );
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

  return (
    <div
      style={{
        padding: '5px 0 0 0',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
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
              <div>
                <Icon icon="chevron-right" css={style.chevron} />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: '10px',
                    marginLeft: '10px',
                  }}
                >
                  <div
                    style={{
                      alignSelf: 'center',
                      flex: 2,
                    }}
                  >
                    {/* if name is long use ... */}
                    {entry.groupName.slice(0, 30)}
                    {opened !== entry.groupName && entry.groupName.length > 30
                      ? '...'
                      : ''}
                    <br />
                    {opened === entry.groupName
                      ? entry.groupName.slice(30)
                      : ''}
                  </div>
                  <div
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                    }}
                  >
                    {formatDistance(entry.lastModified, new Date(), {
                      addSuffix: true,
                    })}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignSelf: 'center',
                      gap: '2px',
                    }}
                  >
                    {getLink(entry, 'oneD')}
                    {getLink(entry, 'twoD')}
                    {getLink(entry, 'fid')}
                    {getLink(entry, 'ft')}
                    {getLink(entry, 'all')}
                  </div>
                  <div
                    style={{
                      alignSelf: 'center',
                    }}
                  >
                    {getDownloadLink(entry)}
                  </div>
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
                      value={new Date(child.lastModified)
                        .toISOString()
                        .slice(0, 16)
                        .replace('T', ' ')}
                    />
                    <ValueRenderers.Text value={getDim(child)} />
                    <ValueRenderers.Text value={getType(child)} />
                    <ValueRenderers.Text value={child.solvent} />
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
                          icon="add"
                          minimal
                        />
                        <Button
                          onClick={() => setSpectra?.(child._nmrID)}
                          tooltipProps={{
                            content: 'Set',
                            position: 'bottom-left',
                          }}
                          icon="reset"
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
