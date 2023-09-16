/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Disclosure } from '@headlessui/react';
import { isArray } from 'lodash';
import { CSSProperties, useCallback, useState } from 'react';
import { FaChevronRight, FaSearch } from 'react-icons/fa';

import { Input, ValueRenderers } from '../index';
import { Table } from '../table/Table';

export interface InfoPanelData {
  description: string;
  data: Record<string, string | number | object | any>;
}

interface InfoPanelProps {
  title?: string;
  data?: InfoPanelData[] | InfoPanelData;
  titleStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  tableStyle?: CSSProperties;
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
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '5px 2px',
  }),
  table: css`
    width: 100%;
    td:first-of-type {
      width: 30%;
    }
  `,
};

export function InfoPanel(props: InfoPanelProps) {
  const [search, setSearch] = useState('');
  const {
    title = '',
    data: dataArray = [],
    titleStyle,
    inputStyle,
    tableStyle,
  } = props;
  const viewData = useCallback(
    (data: Record<string, string | number | object>) =>
      Object.keys(data)
        .map((key) => {
          const value = data[key];
          if (
            !key.toLowerCase().includes(search.toLowerCase()) &&
            !valueSearch(value, search)
          ) {
            return null;
          }
          return (
            <Table.Row key={key}>
              <ValueRenderers.Text value={key} />
              {valueCell(value)}
            </Table.Row>
          );
        })
        .filter((row) => row !== null),
    [search],
  );
  const content = useCallback(
    (rowData: InfoPanelData, disclosure = true) => {
      const { description, data } = rowData;
      const rows = viewData(data);
      if (rows.length === 0) {
        return null;
      }
      if (disclosure) {
        return (
          <Disclosure defaultOpen key={description}>
            {({ open }) => (
              <>
                <Disclosure.Button css={style.button}>
                  <FaChevronRight css={style.chevron(open)} />
                  {description}
                </Disclosure.Button>
                <Disclosure.Panel>
                  <Table css={style.table} style={tableStyle}>
                    <Table.Header>
                      <ValueRenderers.Title value="Parameter" />
                      <ValueRenderers.Title value="Value" />
                    </Table.Header>
                    {rows}
                  </Table>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      }
      return (
        <div>
          <div
            style={{
              padding: 2,
            }}
          >
            {description}
          </div>
          <Table css={style.table} style={{ ...tableStyle, marginTop: 4 }}>
            <Table.Header>
              <ValueRenderers.Title value="Parameter" />
              <ValueRenderers.Title value="Value" />
            </Table.Header>
            {rows}
          </Table>
        </div>
      );
    },
    [tableStyle, viewData],
  );

  return (
    <div css={style.container}>
      <div style={titleStyle}>{title}</div>
      <Input
        placeholder="Search for a parameter ..."
        value={search}
        onChange={({ target }) => {
          if (target.value !== undefined) setSearch(target.value);
        }}
        style={inputStyle}
        leadingAddon={{ addon: <FaSearch />, inline: true }}
        clearable
      />

      {isArray(dataArray)
        ? dataArray.map((data) => content(data))
        : content(dataArray, false)}
    </div>
  );
}
/**
 * Get the value cell depending on the type of the value
 * @param value - ValueRenderers value.
 * @returns - ValueRenderers component.
 */
function valueCell(value: number | string | object) {
  switch (typeof value) {
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
function valueSearch(value: number | string | object, search: string): boolean {
  switch (typeof value) {
    case 'number':
      return String(value).includes(search.toLowerCase());
    case 'object':
      return JSON.stringify(value).toLowerCase().includes(search.toLowerCase());
    case 'string':
      return value.toLowerCase().includes(search.toLowerCase());
    default:
      return false;
  }
}
