import { Meta } from '@storybook/react';
import React from 'react';

import {
  Table,
  TextCell,
  NumberCell,
  BooleanCell,
  ColorCell,
  HeaderCell,
} from '../src';

import data from './data/table.json';

export default {
  title: 'Layout/Table',
  component: Table,
} as Meta;

export function TableControl() {
  const Rows = data.map(({ id, name, rn, mw, em, isExpensive, color }) => (
    <Table.Row key={id}>
      <TextCell value={id} />
      <TextCell value={name} />
      <TextCell value={rn} />
      <NumberCell value={mw} fixed={2} />
      <NumberCell value={em} fixed={4} />
      <BooleanCell value={isExpensive} />
      <ColorCell value={color} />
    </Table.Row>
  ));
  return (
    <Table>
      <Table.Header>
        <HeaderCell value="id" />
        <HeaderCell value="name" />
        <HeaderCell value="rn" />
        <HeaderCell value="mw" />
        <HeaderCell value="em" />
        <HeaderCell value="isExpensive" />
        <HeaderCell value="color" />
      </Table.Header>
      {Rows}
    </Table>
  );
}
