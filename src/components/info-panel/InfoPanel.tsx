/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Disclosure } from '@headlessui/react';
import { CSSProperties, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

import { Input, ValueRenderers } from '../index';
import { Table } from '../table/Table';

export interface InfoPanelData {
  description: string;
  data: Record<string, string | number | object | any>;
}

interface InfoPanelProps {
  title?: string;
  data?: InfoPanelData[];
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
    title = 'Information',
    data = [],
    titleStyle,
    inputStyle,
    tableStyle,
  } = props;
  function viewData(data: Record<string, string | number | object>) {
    return Object.keys(data)
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
      .filter((row) => row !== null);
  }
  return (
    <div css={style.container}>
      <div style={titleStyle}>{title}</div>
      <Input
        placeholder="search for a parameter ..."
        value={search}
        onChange={({ target }) => {
          if (target.value !== undefined) setSearch(target.value);
        }}
        style={inputStyle}
      />

      {data.map(({ description, data }) => {
        const content = viewData(data);
        return content.length > 0 ? (
          <Disclosure defaultOpen>
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
                    {content}
                  </Table>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ) : null;
      })}
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
