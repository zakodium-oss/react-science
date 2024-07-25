/** @jsxImportSource @emotion/react */
import { Icon, InputGroup } from '@blueprintjs/core';
import { css } from '@emotion/react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useEffect, useState } from 'react';

import { Button, Table, ValueRenderers } from '../index';

export interface FileBrowserProps {
  setSpectra?: (ids: string | string[]) => void;
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
    zIndex: 10,
    position: 'sticky',
    // height: 30,
    top: 0,
    "&[data-state='open'] > span": {
      rotate: '90deg',
    },
    cursor: 'pointer',
    borderBottom: '1px solid #f5f5f5',
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
function getLinksForChildren(children: any[]) {
  const links: any = {
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
function getLastModified(entry: any) {
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
  // displayTable(entries);
}
function findCommonParentFolder(paths: any) {
  paths = paths.sort();
  const first = paths[0];
  const last = paths.at(-1);
  let i = 0;
  for (; i < first.length && first[i] === last[i]; i++);
  const common = first.slice(0, i);
  return common.split('/').slice(0, -1).join('/');
}
function getDownloadLink(entry: any) {
  if (entry.children.length === 0) {
    return '';
  }
  const source = entry.children[0].source;
  const relativePath = findCommonParentFolder(
    entry.children.map((child: any) => child.relativePath),
  );
  const params = new URLSearchParams();
  params.set('source', source);
  params.set('relativePath', relativePath);
  const link = `${dbURL}v1/getZip?${params.toString()}`;

  return (
    <a
      href={link}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      🔗
    </a>
  );
}

function epochToString(epoch: any) {
  const epochNow = Date.now();
  const difference = Math.abs(epoch - epochNow);
  const milliInDay = 1000 * 60 * 60 * 24;
  const milliInHour = 1000 * 60 * 60;

  let nbDays = Math.round(difference / milliInDay);

  if (nbDays > 30) {
    return new Date(epoch).toISOString().slice(0, 16).replace('T', ' ');
  }

  const nbHour = Math.round(difference / milliInHour);

  const relativeHour = (nbDays === 0 ? nbHour : nbHour - nbDays * 24) % 24;

  if (nbHour === 0) {
    nbDays += 1;
  } else if (nbHour === (nbDays - 1) * 24) {
    nbDays -= 1;
  }

  const dayS = nbDays > 1 ? 'days' : 'day';
  const hourS = relativeHour > 1 ? 'hours' : 'hour';

  let fullString = '';

  if (nbDays > 0) {
    fullString += `${nbDays} ${dayS}`;
    if (relativeHour > 0) {
      fullString += ' ';
    }
  }

  if (relativeHour > 0) {
    fullString += `${relativeHour} ${hourS}`;
  }

  if (epoch > epochNow) {
    return `Will be in ${fullString}`;
  } else if (epoch === epochNow || (relativeHour === 0 && nbDays === 0)) {
    return 'Now';
  } else {
    return `${fullString} ago`;
  }
}
export function FileBrowser(props: FileBrowserProps) {
  const { setSpectra } = props;

  const [entries, setEntries] = useState<any>([]);
  const [total, setTotal] = useState(0);

  function getLink(entry: any, kind: any) {
    const labels: any = {
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
          tooltipProps={{ content: `No spectra` }}
          style={{
            borderRadius: '5px',
            padding: '5px',
          }}
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
        tooltipProps={{ content: `Nb spectra: ${ids.length}` }}
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
        {entries.slice(0, displayFirst).map((entry: any) => (
          <Collapsible.Root key={entry.groupName} className="CollapsibleRoot">
            <Collapsible.Trigger asChild css={style.button}>
              <div>
                <Icon icon="chevron-right" css={style.chevron} />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: '10px',
                    marginLeft: '5px',
                  }}
                >
                  <div
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                    }}
                  >
                    {entry.groupName}
                  </div>
                  <div>{epochToString(entry.lastModified)}</div>
                  <div
                    style={{
                      display: 'flex',
                      gap: '2px',
                    }}
                  >
                    {getLink(entry, 'oneD')}
                    {getLink(entry, 'twoD')}
                    {getLink(entry, 'fid')}
                    {getLink(entry, 'ft')}
                    {getLink(entry, 'all')}
                  </div>
                  <div>{getDownloadLink(entry)}</div>
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
                {entry.children.map((child: any, i: number) => (
                  <Table.Row
                    key={i}
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
                    <ValueRenderers.Text value={child.is1D ? '1D' : ''} />
                    <ValueRenderers.Text value={child.is2D ? '2D' : ''} />
                    <ValueRenderers.Text value={child.isFid ? 'FID' : ''} />
                    <ValueRenderers.Text value={child.isFt ? 'FT' : ''} />
                    <ValueRenderers.Text value={child.solvent} />
                    <ValueRenderers.Text value={child.frequency.toFixed(0)} />
                    <ValueRenderers.Text value={child.pulseSequence} />
                    <ValueRenderers.Component>
                      <Button
                        onClick={() => setSpectra?.(child._nmrID)}
                        intent="success"
                      >
                        Append
                      </Button>
                    </ValueRenderers.Component>
                    <ValueRenderers.Component>
                      <Button
                        onClick={() => setSpectra?.(child._nmrID)}
                        intent="success"
                      >
                        Set
                      </Button>
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
