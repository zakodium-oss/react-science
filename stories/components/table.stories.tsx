import data from '../data/table.json';

import { Table, ValueRenderers } from '@/components';

interface TableStoryProps {
  border: boolean;
}

export function Controls({ border }: TableStoryProps) {
  const Rows = data.map(({ id, name, rn, mw, em, isExpensive, color }) => (
    <Table.Row key={id}>
      <ValueRenderers.Text value={id} />
      <ValueRenderers.Text value={name} />
      <ValueRenderers.Text value={rn} />
      <ValueRenderers.Number value={mw} fixed={2} />
      <ValueRenderers.Number value={em} fixed={4} />
      <ValueRenderers.Boolean value={isExpensive} />
      <ValueRenderers.Color value={color} />
    </Table.Row>
  ));
  return (
    <Table border={border}>
      <Table.Header>
        <ValueRenderers.Title value="id" />
        <ValueRenderers.Title value="name" />
        <ValueRenderers.Title value="rn" />
        <ValueRenderers.Title value="mw" />
        <ValueRenderers.Title value="em" />
        <ValueRenderers.Title value="isExpensive" />
        <ValueRenderers.Title value="color" />
      </Table.Header>
      {Rows}
    </Table>
  );
}

export default {
  title: 'Components / Table',
};

export function Control({ border }: TableStoryProps) {
  const Rows = data.map(({ id, name, rn, mw, em, isExpensive, color }) => (
    <Table.Row key={id} border={border}>
      <ValueRenderers.Text value={id} />
      <ValueRenderers.Text value={name} />
      <ValueRenderers.Text value={rn} />
      <ValueRenderers.Number value={mw} fixed={2} />
      <ValueRenderers.Number value={em} fixed={4} />
      <ValueRenderers.Boolean value={isExpensive} />
      <ValueRenderers.Color value={color} />
    </Table.Row>
  ));
  return (
    <Table border={border}>
      <Table.Header>
        <ValueRenderers.Title value="id" />
        <ValueRenderers.Title value="name" />
        <ValueRenderers.Title value="rn" />
        <ValueRenderers.Title value="mw" />
        <ValueRenderers.Title value="em" />
        <ValueRenderers.Title value="isExpensive" />
        <ValueRenderers.Title value="color" />
      </Table.Header>
      {Rows}
    </Table>
  );
}
export function RowBorder({ border }: TableStoryProps) {
  const Rows = data.map(({ id, name, rn, mw, em, isExpensive, color }) => (
    <Table.Row border={border} key={id}>
      <ValueRenderers.Text value={id} />
      <ValueRenderers.Text value={name} />
      <ValueRenderers.Text value={rn} />
      <ValueRenderers.Number value={mw} fixed={2} />
      <ValueRenderers.Number value={em} fixed={4} />
      <ValueRenderers.Boolean value={isExpensive} />
      <ValueRenderers.Color value={color} />
    </Table.Row>
  ));
  return (
    <Table border={false}>
      <Table.Header>
        <ValueRenderers.Title value="id" />
        <ValueRenderers.Title value="name" />
        <ValueRenderers.Title value="rn" />
        <ValueRenderers.Title value="mw" />
        <ValueRenderers.Title value="em" />
        <ValueRenderers.Title value="isExpensive" />
        <ValueRenderers.Title value="color" />
      </Table.Header>
      {Rows}
    </Table>
  );
}
RowBorder.args = { border: false };
export function HeaderBorder({ border }: TableStoryProps) {
  const Rows = data.map(({ id, name, rn, mw, em, isExpensive, color }) => (
    <Table.Row key={id}>
      <ValueRenderers.Text value={id} />
      <ValueRenderers.Text value={name} />
      <ValueRenderers.Text value={rn} />
      <ValueRenderers.Number value={mw} fixed={2} />
      <ValueRenderers.Number value={em} fixed={4} />
      <ValueRenderers.Boolean value={isExpensive} />
      <ValueRenderers.Color value={color} />
    </Table.Row>
  ));
  return (
    <Table border={false}>
      <Table.Header border={border}>
        <ValueRenderers.Title value="id" />
        <ValueRenderers.Title value="name" />
        <ValueRenderers.Title value="rn" />
        <ValueRenderers.Title value="mw" />
        <ValueRenderers.Title value="em" />
        <ValueRenderers.Title value="isExpensive" />
        <ValueRenderers.Title value="color" />
      </Table.Header>
      {Rows}
    </Table>
  );
}
HeaderBorder.args = { border: false };
