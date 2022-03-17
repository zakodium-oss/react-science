import { Meta } from '@storybook/react';
import React from 'react';

import { Table } from '../src';

import data from './data/table.json';

export default {
  title: 'Layout/Table',
  component: Table,
} as Meta;

export function TableControl() {
  const Rows = data.map(({ id, name, rn, mw, em, isExpensive, color }) => (
    <Table.Row key={id}>
      <Table.TextCell value={id} />
      <Table.TextCell value={name} />
      <Table.TextCell value={rn} />
      <Table.NumberCell value={mw} fixed={2} />
      <Table.NumberCell value={em} fixed={4} />
      <Table.BooleanCell value={isExpensive} />
      <Table.ColorCell value={color} />
    </Table.Row>
  ));
  return (
    <Table>
      <Table.Header>
        <Table.HeaderCell value="id" />
        <Table.HeaderCell value="name" />
        <Table.HeaderCell value="rn" />
        <Table.HeaderCell value="mw" />
        <Table.HeaderCell value="em" />
        <Table.HeaderCell value="isExpensive" />
        <Table.HeaderCell value="color" />
      </Table.Header>
      {Rows}
    </Table>
  );
}
