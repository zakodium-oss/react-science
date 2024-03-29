/** @jsxImportSource @emotion/react */
import { InputGroup } from '@blueprintjs/core';
import { css } from '@emotion/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import { Disclosure } from '@headlessui/react';
import { CSSProperties, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

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
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '5px 2px',
  }),
};

export function InfoPanel(props: InfoPanelProps) {
  const [search, setSearch] = useState('');
  const { title = 'Information', data = [], titleStyle, inputStyle } = props;
  function viewData(data: Record<string, string | number | object>) {
    const exactMatch: Array<[string, string | number | object]> = [];
    const startsWith: Array<[string, string | number | object]> = [];
    const includes: Array<[string, string | number | object]> = [];
    const valueContains: Array<[string, string | number | object]> = [];

    for (const [key, value] of Object.entries(data)) {
      if (key === search) {
        exactMatch.push([key, value]);
        continue;
      }
      if (key.startsWith(search)) {
        startsWith.push([key, value]);
        continue;
      }
      if (key.includes(search)) {
        includes.push([key, value]);
        continue;
      }
      if (valueSearch(value, search)) {
        valueContains.push([key, value]);
        continue;
      }
    }
    return [...exactMatch, ...startsWith, ...includes, ...valueContains].map(
      ([key, value]) => (
        <Table.Row key={key}>
          <ValueRenderers.Text value={key} />
          {valueCell(value)}
        </Table.Row>
      ),
    );
  }
  return (
    <div css={style.container}>
      <div style={titleStyle}>{title}</div>
      <InputGroup
        placeholder="search for a parameter ..."
        value={search}
        onChange={({ target }) => {
          if (target.value !== undefined) setSearch(target.value);
        }}
        style={inputStyle}
        leftIcon="search"
        type="search"
      />

      {data.map(({ description, data }) => {
        const content = viewData(data);
        return content.length > 0 ? (
          <Disclosure defaultOpen key={description}>
            {({ open }) => (
              <>
                <Disclosure.Button css={style.button}>
                  <FaChevronRight css={style.chevron(open)} />
                  {description}
                </Disclosure.Button>
                <Disclosure.Panel>
                  <Table bordered>
                    <Table.Header>
                      <ValueRenderers.Header value="Parameter" />
                      <ValueRenderers.Header value="Value" />
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
): boolean {
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
