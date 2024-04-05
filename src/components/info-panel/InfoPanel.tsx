/** @jsxImportSource @emotion/react */
import { Icon, InputGroup } from '@blueprintjs/core';
import { css } from '@emotion/react';
import { Disclosure } from '@headlessui/react';
import { CSSProperties, useCallback, useMemo, useState } from 'react';

import { ValueRenderers } from '../index';
import { Table } from '../table/Table';

export interface InfoPanelData {
  description: string;
  data: Record<string, string | number | object | boolean | any>;
}

interface InfoPanelProps {
  title?: string;
  data?: InfoPanelData[];
  titleStyle?: CSSProperties;
  inputStyle?: CSSProperties;
}
const style = {
  container: css({
    padding: '5px',
  }),
  chevron: (open: boolean) =>
    css({
      rotate: open ? '90deg' : '0deg',
      transition: 'all 0.3s ease-in-out',
    }),
  button: css({
    borderBottom: '1px solid #f5f5f5',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '5px 2px',
    width: '100%',
    ':hover': {
      backgroundColor: '#f5f5f5',
    },
  }),
};

export function InfoPanel(props: InfoPanelProps) {
  const [search, setSearch] = useState('');
  const { title = 'Information', data = [], titleStyle, inputStyle } = props;
  const viewData = useCallback(
    (data: Record<string, string | number | object>) => {
      const exactMatch: Array<[string, string | number | object]> = [];
      const startsWith: Array<[string, string | number | object]> = [];
      const includes: Array<[string, string | number | object]> = [];
      const valueContains: Array<[string, string | number | object]> = [];

      for (const [key, value] of Object.entries(data).sort(([a], [b]) =>
        a.localeCompare(b),
      )) {
        const lowerKey = key.toLowerCase();
        const lowerSearch = search.toLowerCase();
        if (lowerKey === lowerSearch) {
          exactMatch.push([key, value]);
          continue;
        }
        if (lowerKey.startsWith(lowerSearch)) {
          startsWith.push([key, value]);
          continue;
        }
        if (lowerKey.includes(lowerSearch)) {
          includes.push([key, value]);
          continue;
        }
        if (valueSearch(value, search)) {
          valueContains.push([key, value]);
          continue;
        }
      }
      return [...exactMatch, ...startsWith, ...includes, ...valueContains];
    },
    [search],
  );
  const { filteredData, total, count } = useMemo(() => {
    const filteredData: Array<
      Omit<InfoPanelData, 'data'> & {
        data: Array<[string, string | number | object]>;
      }
    > = [];
    let total = 0;
    let count = 0;
    for (const { data: dataContent, ...other } of data) {
      total += Object.entries(dataContent).length;
      const content = viewData(dataContent);
      if (content.length === 0) continue;
      filteredData.push({ data: content, ...other });
      count += content.length;
    }
    return { filteredData, total, count };
  }, [data, viewData]);
  return (
    <div css={style.container}>
      <div style={titleStyle}>{title}</div>
      <div
        tabIndex={0}
        css={css({
          zIndex: 10,
          marginTop: '5px',
          position: 'sticky',
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
          placeholder="search for a parameter ..."
          value={search}
          onChange={({ target }) => {
            if (target.value !== undefined) {
              setSearch(target.value);
            }
          }}
          style={inputStyle}
          leftIcon="search"
          type="search"
          fill
        />
        [{count}/{total}]
      </div>
      <div
        style={{
          marginTop: '5px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        {filteredData.map(({ description, data }) => {
          return (
            <Disclosure defaultOpen key={description}>
              {({ open }) => (
                <>
                  <Disclosure.Button css={style.button}>
                    <Icon icon="chevron-right" css={style.chevron(open)} />
                    {description}
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    <Table
                      striped
                      css={css({
                        width: '100%',
                      })}
                      compact
                    >
                      <Table.Header>
                        <ValueRenderers.Header value="Parameter" />
                        <ValueRenderers.Header value="Value" />
                      </Table.Header>
                      {data.map(([key, value]) => (
                        <Table.Row
                          key={key}
                          bordered
                          style={{
                            height: '10px',
                            padding: '0 !imporant',
                          }}
                        >
                          <ValueRenderers.Text value={key} />
                          {valueCell(value)}
                        </Table.Row>
                      ))}
                    </Table>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          );
        })}
      </div>
    </div>
  );
}
/**
 * Get the value cell depending on the type of the value
 * @param value - ValueRenderers value.
 * @returns - ValueRenderers component.
 */
function valueCell(value: number | string | object | boolean) {
  switch (typeof value) {
    case 'boolean':
      return <ValueRenderers.Text value={value ? 'Yes' : 'No'} />;
    case 'number':
      return <ValueRenderers.Number value={value} />;
    case 'object':
      return <ValueRenderers.Object value={value} />;
    case 'string':
      return <ValueRenderers.Text value={value} />;
    default:
      <ValueRenderers.Text value={value} />;
  }
}

/**
 * Search a string in different type of values
 *
 * @param value - Value to search in.
 * @param search - Value to search for.
 * @returns - If search exist in value
 */
function valueSearch(
  value: number | string | object | boolean,
  search: string,
  lowerCase = true,
): boolean {
  if (lowerCase) {
    value = String(value).toLowerCase();
    search = search.toLowerCase();
  }
  switch (typeof value) {
    case 'number':
      return String(value).includes(search);
    case 'boolean':
      return String(value).includes(search);
    case 'object':
      return JSON.stringify(value).includes(search);
    case 'string':
      return value.includes(search);
    default:
      return true;
  }
}
