/** @jsxImportSource @emotion/react */
import { Collapse, Icon, InputGroup } from '@blueprintjs/core';
import { css } from '@emotion/react';
import { formatDistanceToNowStrict, formatISO9075 } from 'date-fns';
import { useState } from 'react';
import useResizeObserver from 'use-resize-observer';

import { Button } from '../index';

import { NMRFileDownload, NMRFileSpectraLink } from './NMRButtons';
import { getDim, getType, NMREntry, usePostQuery } from './utils';

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
}

export function NMRFileBrowser(props: NMRFileBrowserProps) {
  const { setSpectra, appendSpectra, useTag = true } = props;
  const [query, setQuery] = useState('');
  const [opened, setOpened] = useState<string>('');
  const [total, setTotal] = useState(0);

  const displayFirst = 100;
  const { status, data, error } = usePostQuery(query, setTotal);
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
                      gap: '3px',
                    }}
                  >
                    <NMRFileSpectraLink
                      entry={entry}
                      showAll={width > 400}
                      setSpectra={setSpectra}
                      useTag={useTag}
                    />
                  </div>
                  {width > 400 && <NMRFileDownload entry={entry} />}
                </div>
              </div>
              <Collapse
                transitionDuration={300}
                isOpen={opened === entry.groupName}
                css={style.content}
              >
                {entry.children.map((child) => {
                  return (
                    <div
                      className="row"
                      key={child.id}
                      style={{
                        borderBottom: '1px solid #f5f5f5',
                        borderTop: '1px solid #f5f5f5',
                        display: 'grid',
                        alignItems: 'center',
                        padding: '5px 2px',
                        width: '100%',
                        gridTemplateColumns:
                          width > 500
                            ? '3fr 1fr 1fr 1fr 1fr 1fr auto'
                            : '1fr 1fr 1fr 1fr 1fr auto',
                      }}
                    >
                      {width > 500 && (
                        <span
                          style={{
                            padding: '0px 5px',
                          }}
                        >
                          {formatISO9075(child.lastModified)}
                        </span>
                      )}
                      <div
                        style={{
                          paddingLeft: width > 500 ? 0 : 25,
                        }}
                      >
                        {getDim(child)}
                      </div>
                      <div>{getType(child)}</div>
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
                      <div>{child.frequency}</div>
                      <div>{child.pulseSequence}</div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '10px',
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
                      </div>
                    </div>
                  );
                })}
              </Collapse>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
