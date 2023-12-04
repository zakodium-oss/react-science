/** @jsxImportSource @emotion/react */
import { ContextMenu, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Table, ValueRenderers } from '../../src/components/index';
import data from '../data/table.json';

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

export function TableWithHeaderDropDownMenu() {
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
    <table>
      <thead>
        <tr>
          <ColumnWithDropdownMenu value="id" content={content} />
          <ColumnWithDropdownMenu value="name" content={content} />
          <ColumnWithDropdownMenu value="rn" content={content} />
          <ColumnWithDropdownMenu value="mw" content={content} />
          <ColumnWithDropdownMenu value="em" content={content} />
          <ColumnWithDropdownMenu value="isExpensive" content={content} />
          <ColumnWithDropdownMenu value="color" content={content} />
        </tr>
      </thead>
      <tbody>
        {data
          .slice(0, 2)
          .map(({ id, name, rn, mw, em, isExpensive, color }) => (
            <Table.Row key={id}>
              <ValueRenderers.Text value={id} />
              <ValueRenderers.Text value={name} />
              <ValueRenderers.Text value={rn} />
              <ValueRenderers.Number value={mw} fixed={2} />
              <ValueRenderers.Number value={em} fixed={4} />
              <ValueRenderers.Boolean value={isExpensive} />
              <ValueRenderers.Color value={color} />
            </Table.Row>
          ))}
      </tbody>
    </table>
  );
}

function ColumnWithDropdownMenu({
  value,
  content,
}: {
  value: string;
  content: JSX.Element;
}) {
  return (
    <ContextMenu content={content} tagName="th">
      {value}
    </ContextMenu>
  );
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
