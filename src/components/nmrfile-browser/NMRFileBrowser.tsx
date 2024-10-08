/** @jsxImportSource @emotion/react */
import { Collapse, Icon, InputGroup } from '@blueprintjs/core';
import { css } from '@emotion/react';
import { formatDistanceToNowStrict, formatISO9075 } from 'date-fns';
import { useState } from 'react';
import useResizeObserver from 'use-resize-observer';

import { Button } from '../index';

import { NMRFileDownload, NMRFileSpectraLink } from './NMRButtons';
import {
  getDim,
  getType,
  NMREntry,
  useStatsQuery,
  useSearchQuery,
  getSolvent,
} from './utils';

const style = {
  content: css({
    overflow: 'hidden',
    width: '100%',
    '.row:nth-child(odd)': {
      backgroundColor: '#f5f5f5',
    },
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
    justifyContent: 'space-between',
    gap: '10px',
    ':hover': {
      backgroundColor: '#f5f5f5',
    },
  }),
};

export interface NMRFileBrowserProps {
  setSpectra?: (ids: string | string[]) => void;
  appendSpectra?: (ids: string | string[]) => void;
  useTag?: boolean;
  displayNumber?: number;
  staleTime?: number;
}

export function NMRFileBrowser(props: NMRFileBrowserProps) {
  const {
    setSpectra,
    appendSpectra,
    useTag = true,
    staleTime = 250,
    displayNumber = 100,
  } = props;
  const [query, setQuery] = useState('');
  const [opened, setOpened] = useState<string>('');
  const statsQuery = useStatsQuery(staleTime);
  const searchQuery = useSearchQuery(query, staleTime);
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
        {statsQuery.status === 'pending' || searchQuery.status === 'pending' ? (
          <Button loading minimal />
        ) : (
          statsQuery.status === 'success' &&
          searchQuery.status === 'success' && (
            <span>
              [{searchQuery.data.length}/{statsQuery.data.nbNMRs.total}]
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
          minWidth: 270,
        }}
      >
        {statsQuery.status === 'error' ? (
          <span>Error: {statsQuery.error.message}</span>
        ) : searchQuery.status === 'error' ? (
          <span>Error: {searchQuery.error.message}</span>
        ) : (
          statsQuery.status === 'success' &&
          searchQuery.status === 'success' &&
          searchQuery.data.slice(0, displayNumber).map((entry: NMREntry) => (
            <div key={entry.groupName}>
              <div
                css={style.button}
                onClick={() => {
                  if (opened === entry.groupName) {
                    setOpened('');
                  } else {
                    setOpened(entry.groupName);
                  }
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
                  {width > 600 && (
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
                      gap: '3px',
                    }}
                  >
                    <NMRFileSpectraLink
                      entry={entry}
                      showAll={width > 450}
                      setSpectra={setSpectra}
                      useTag={useTag}
                    />
                  </div>
                  {width > 450 && <NMRFileDownload entry={entry} />}
                </div>
              </div>
              <Collapse
                transitionDuration={300}
                isOpen={opened === entry.groupName}
                css={style.content}
              >
                <table
                  style={{
                    width: '100%',
                    minWidth: 250,
                  }}
                >
                  <tbody>
                    {entry.children.map((child) => (
                      <tr
                        key={child.id}
                        style={{ borderBottom: '1px solid #f5f5f5' }}
                      >
                        {width > 600 && (
                          <td
                            style={{
                              width: '3fr',
                              padding: width > 450 ? 8 : 4,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {formatISO9075(child.lastModified)}
                          </td>
                        )}
                        <td
                          style={{ width: '1fr', padding: width > 450 ? 8 : 4 }}
                        >
                          {getDim(child)}
                        </td>
                        <td
                          style={{ width: '1fr', padding: width > 450 ? 8 : 4 }}
                        >
                          {getType(child)}
                        </td>

                        {width > 450 && (
                          <td
                            style={{
                              width: '1fr',
                              padding: width > 450 ? 8 : 4,
                            }}
                          >
                            {getSolvent(child)}
                          </td>
                        )}
                        {width > 450 && (
                          <td
                            style={{
                              width: '1fr',
                              padding: width > 450 ? 8 : 4,
                            }}
                          >
                            {child.frequency.toFixed(2)}
                          </td>
                        )}
                        <td
                          style={{
                            width: '1fr',
                            padding: width > 450 ? 8 : 4,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {child.pulseSequence}
                        </td>
                        <td
                          style={{
                            width: '1fr',
                            padding: width > 450 ? '8 8 8 0' : '4 4 4 0',
                            display: 'flex',
                            gap: width > 450 ? 10 : 5,
                            justifyContent: 'right',
                          }}
                        >
                          <Button
                            onClick={() => appendSpectra?.(child._nmrID)}
                            tooltipProps={{
                              content: 'Append',
                              position: 'bottom-left',
                            }}
                            css={css({
                              borderRadius: '5px',
                              width: '30px',
                              height: '30px',
                            })}
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
                            css={css({
                              borderRadius: '5px',
                              width: '30px',
                              height: '30px',
                            })}
                            icon="selection"
                            minimal
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Collapse>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
