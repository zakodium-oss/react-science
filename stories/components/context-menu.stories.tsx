/** @jsxImportSource @emotion/react */
import { ContextMenu, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ReactElement } from 'react';

import {
  createTableColumnHelper,
  Table,
  ValueRenderers,
} from '../../src/components/index.js';
import data from '../data/table.json' with { type: 'json' };

export default {
  title: 'Components / ContextMenu',
};

export function ContextDropdown() {
  const content = (
    <Menu>
      <MenuItem text="Default workspace" />
      <MenuItem text="Exercise" icon="person" />
      <MenuDivider />
      <MenuItem text="Tests">
        <MenuItem text="Test" disabled />
        <MenuItem text="Test 2" />
      </MenuItem>
    </Menu>
  );

  return (
    <ContextMenu
      content={content}
      css={css`
        height: 500px;
        width: 500px;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <p>Hello, World!</p>
    </ContextMenu>
  );
}

const content = (
  <Menu>
    <MenuItem text="Back" icon="book" />
    <MenuItem text="Forward" icon="step-forward" disabled />
    <MenuItem text="Refresh" icon="refresh" />
    <MenuDivider />
    <MenuItem text="Save as" icon="saved" />
    <MenuItem text="Print" icon="print" />
    <MenuItem text="Cast media to device" icon="video" />
    <MenuDivider />
    <MenuItem text="Send page to your devices" icon="add" />
    <MenuItem text="Create QR Code for this page" icon="settings" />
  </Menu>
);

const columnHelper = createTableColumnHelper<(typeof data)[number]>();
const columns = [
  columnHelper.accessor('id', {
    header: () => <ColumnWithDropdownMenu value="id" content={content} />,
  }),
  columnHelper.accessor('name', {
    header: () => <ColumnWithDropdownMenu value="name" content={content} />,
    enableSorting: true,
  }),
  columnHelper.accessor('rn', {
    header: () => <ColumnWithDropdownMenu value="rn" content={content} />,
  }),
  columnHelper.accessor('mw', {
    header: () => <ColumnWithDropdownMenu value="mw" content={content} />,
    cell: ({ getValue }) => (
      <ValueRenderers.Number value={getValue()} fixed={2} />
    ),
  }),
  columnHelper.accessor('em', {
    header: () => <ColumnWithDropdownMenu value="em" content={content} />,
    cell: ({ getValue }) => (
      <ValueRenderers.Number value={getValue()} fixed={4} />
    ),
  }),
  columnHelper.accessor('isExpensive', {
    header: () => (
      <ColumnWithDropdownMenu value="isExpensive" content={content} />
    ),
    cell: ({ getValue }) => <ValueRenderers.Boolean value={getValue()} />,
  }),
  columnHelper.accessor('color', {
    header: () => <ColumnWithDropdownMenu value="color" content={content} />,
    cell: ({ getValue }) => <ValueRenderers.Color value={getValue()} />,
  }),
];

export function TableWithHeaderDropDownMenu() {
  return <Table data={data.slice(0, 10)} columns={columns} />;
}

function ColumnWithDropdownMenu({
  value,
  content,
}: {
  value: string;
  content: ReactElement;
}) {
  return <ContextMenu content={content}>{value}</ContextMenu>;
}

const TableWithContext = styled.table`
  border: 0.55px solid gray;
  th,
  td {
    border: 0.55px solid gray;
    padding: 0.4em;
  }
`;

export function TableWithContextMenu() {
  const headerContent = (
    <Menu>
      <MenuItem text="Copy" icon="book" />
      <MenuItem text="Paste" icon="paste-variable" disabled />
    </Menu>
  );
  const content = (
    <Menu>
      <MenuItem text="Back" icon="book" />
      <MenuItem text="Forward" icon="step-forward" disabled />
      <MenuItem text="Refresh" icon="refresh" />
      <MenuDivider />
      <MenuItem text="Save as" icon="saved" />
      <MenuItem text="Print" icon="print" />
      <MenuItem text="Cast media to device" icon="video" />
      <MenuDivider />
      <MenuItem text="Send page to your devices" icon="add" />
      <MenuItem text="Create QR Code for this page" icon="settings" />
    </Menu>
  );

  return (
    <TableWithContext>
      <thead>
        <ContextMenu content={headerContent} tagName="tr">
          <th>id</th>
          <th>name</th>
          <th>rn</th>
          <th>mw</th>
          <th>em</th>
          <th>isExpensive</th>
        </ContextMenu>
      </thead>
      <tbody>
        {data.slice(0, 2).map(({ id, name, rn, mw, em, isExpensive }) => (
          <ContextMenu key={id} tagName="tr" content={content}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{rn}</td>
            <td>{mw}</td>
            <td>{em}</td>
            <td>{isExpensive}</td>
          </ContextMenu>
        ))}
      </tbody>
    </TableWithContext>
  );
}
