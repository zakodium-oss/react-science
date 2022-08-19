import { Table, ValueRenderers } from '../../src';
import data from '../data/table.json';

export default {
  title: 'Components / Table',
  component: Table,
};

export function Control() {
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
    <Table>
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
