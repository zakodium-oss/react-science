/** @jsxImportSource @emotion/react */
import { Collapse, InputGroup } from '@blueprintjs/core';
import { css } from '@emotion/react';
import {
  type CSSProperties,
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { Button } from '../button/Button.js';
import { SelectedTotal } from '../selected-total/index.js';
import { createTableColumnHelper, Table } from '../table/index.js';
import * as ValueRenderers from '../value-renderers/index.js';

export interface InfoPanelData {
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, string | number | object | boolean | any>;
}

interface InfoPanelProps {
  title?: string;
  data?: InfoPanelData[];
  titleStyle?: CSSProperties;
  inputStyle?: CSSProperties;
}

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
  button: (open: boolean) =>
    css({
      backgroundColor: 'white !important',
      zIndex: 10,
      position: 'sticky',
      height: 30,
      top: 0,
      '& .bp5-icon': {
        rotate: open ? '90deg' : '',
        transition: 'all 0.3s ease-in-out',
      },
      cursor: 'pointer',
      borderBottom: '1px solid #f5f5f5',
      display: 'flex',
      alignItems: 'center',
      padding: '5px 2px',
      width: '100%',
      ':hover': {
        backgroundColor: '#f5f5f5 !important',
      },
    }),
};

interface InfoPanelDatum {
  parameter: string;
  value: string | number | object;
}

const columnHelper = createTableColumnHelper<InfoPanelDatum>();
const columns = [
  columnHelper.accessor('parameter', {
    header: 'Parameter',
  }),
  columnHelper.accessor('value', {
    header: 'Value',
    cell: ({ getValue }) => valueCell(getValue()),
  }),
];

const emptyData: InfoPanelData[] = [];

export function InfoPanel(props: InfoPanelProps) {
  const {
    title = 'Information',
    data = emptyData,
    titleStyle,
    inputStyle,
  } = props;

  const [search, setSearch] = useState('');
  const viewData = useCallback(
    (data: Record<string, string | number | object>) => {
      const exactMatch: InfoPanelDatum[] = [];
      const startsWith: InfoPanelDatum[] = [];
      const includes: InfoPanelDatum[] = [];
      const valueContains: InfoPanelDatum[] = [];

      for (const [parameter, value] of Object.entries(data).sort(([a], [b]) =>
        a.localeCompare(b),
      )) {
        const lowerKey = parameter.toLowerCase();
        const lowerSearch = search.toLowerCase();
        if (lowerKey === lowerSearch) {
          exactMatch.push({ parameter, value });
          continue;
        }
        if (lowerKey.startsWith(lowerSearch)) {
          startsWith.push({ parameter, value });
          continue;
        }
        if (lowerKey.includes(lowerSearch)) {
          includes.push({ parameter, value });
          continue;
        }
        if (valueSearch(value, search)) {
          valueContains.push({ parameter, value });
          continue;
        }
      }
      return [...exactMatch, ...startsWith, ...includes, ...valueContains];
    },
    [search],
  );

  const { filteredData, total, count } = useMemo(() => {
    const filteredData: InfoPanelContentDatum[] = [];
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
      <div
        style={{
          padding: '0 5px',
          ...titleStyle,
        }}
      >
        {title}
      </div>
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
        <SelectedTotal count={count} total={total} />
      </div>
      <InfoPanelContent filteredData={filteredData} />
    </div>
  );
}

type InfoPanelContentDatum = Omit<InfoPanelData, 'data'> & {
  data: InfoPanelDatum[];
};

interface InfoPanelContentProps {
  filteredData: InfoPanelContentDatum[];
}

const InfoPanelContent = memo((props: InfoPanelContentProps) => {
  const { filteredData } = props;
  const [isOpen, setIsOpen] = useState<string[]>(
    filteredData.map(({ description }) => description),
  );
  return (
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
      {filteredData.map(({ description, data }) => {
        const open = isOpen.includes(description);
        return (
          <div key={description}>
            <Button
              minimal
              css={style.button(open)}
              onClick={() =>
                setIsOpen((pred) =>
                  open
                    ? pred.filter((o) => o !== description)
                    : [...pred, description],
                )
              }
              alignText="left"
              icon="chevron-right"
            >
              {description}
            </Button>
            <Collapse isOpen={open} css={style.content}>
              <Table
                data={data}
                columns={columns}
                striped
                tableProps={{ style: { width: '100%' } }}
                compact
              />
            </Collapse>
          </div>
        );
      })}
    </div>
  );
});

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
      return <ValueRenderers.Text value={value} />;
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
