import { Meta } from '@storybook/react';
import React from 'react';

import { Table, Text, Number, Boolean, Color, Title } from '../src';

import data from './data/table.json';

export default {
  title: 'Layout/Table',
  component: Table,
} as Meta;

export function TableControl() {
  const Rows = data.map(({ id, name, rn, mw, em, isExpensive, color }) => (
    <Table.Row key={id}>
      <Text value={id} />
      <Text value={name} />
      <Text value={rn} />
      <Number value={mw} fixed={2} />
      <Number value={em} fixed={4} />
      <Boolean value={isExpensive} />
      <Color value={color} />
    </Table.Row>
  ));
  return (
    <Table>
      <Table.Header>
        <Title value="id" />
        <Title value="name" />
        <Title value="rn" />
        <Title value="mw" />
        <Title value="em" />
        <Title value="isExpensive" />
        <Title value="color" />
      </Table.Header>
      {Rows}
    </Table>
  );
}
