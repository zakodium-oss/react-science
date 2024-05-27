import { Table, ValueRenderers } from '../../src/components/index';
import data from '../data/table.json';

interface TableStoryProps {
  border: boolean;
}

interface ControlProps extends React.HTMLAttributes<HTMLTableElement> {
  bordered?: boolean;
  compact?: boolean;
  interactive?: boolean;
  striped?: boolean;
  sticky?: boolean;
}

export default {
  title: 'Components / Table',
  decorators: [
    (Story: any) => (
      <div style={{ margin: 12, height: '100%', overflowY: 'auto' }}>
        <Story />
      </div>
    ),
  ],
};

export function Control({
  bordered,
  compact,
  interactive,
  striped,
  sticky,
}: ControlProps) {
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
    <Table
      bordered={bordered}
      compact={compact}
      interactive={interactive}
      striped={striped}
    >
      <Table.Header sticky={sticky}>
        <ValueRenderers.Header value="id" />
        <ValueRenderers.Header value="name" />
        <ValueRenderers.Header value="rn" />
        <ValueRenderers.Header value="mw" />
        <ValueRenderers.Header value="em" />
        <ValueRenderers.Header value="isExpensive" />
        <ValueRenderers.Header value="color" />
      </Table.Header>
      {Rows}
    </Table>
  );
}
Control.args = {
  bordered: false,
  compact: false,
  interactive: false,
  striped: false,
  sticky: false,
};

export function RowBorder({ border }: TableStoryProps) {
  const Rows = data.map(({ id, name, rn, mw, em, isExpensive, color }) => (
    <Table.Row bordered={border} key={id}>
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
        <ValueRenderers.Header value="id" />
        <ValueRenderers.Header value="name" />
        <ValueRenderers.Header value="rn" />
        <ValueRenderers.Header value="mw" />
        <ValueRenderers.Header value="em" />
        <ValueRenderers.Header value="isExpensive" />
        <ValueRenderers.Header value="color" />
      </Table.Header>
      {Rows}
    </Table>
  );
}
RowBorder.args = {
  border: false,
};

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
    <Table>
      <Table.Header bordered={border}>
        <ValueRenderers.Header value="id" />
        <ValueRenderers.Header value="name" />
        <ValueRenderers.Header value="rn" />
        <ValueRenderers.Header value="mw" />
        <ValueRenderers.Header value="em" />
        <ValueRenderers.Header value="isExpensive" />
        <ValueRenderers.Header value="color" />
      </Table.Header>
      {Rows}
    </Table>
  );
}
HeaderBorder.args = {
  border: false,
};

export function StyledTable({
  bordered,
  compact,
  interactive,
  striped,
  sticky,
}: ControlProps) {
  return (
    <Table
      bordered={bordered}
      compact={compact}
      interactive={interactive}
      striped={striped}
      color="white"
    >
      <Table.Header sticky={sticky} style={{ backgroundColor: '#cccccc' }}>
        <ValueRenderers.Header value="id" />
        <ValueRenderers.Header value="name" />
        <ValueRenderers.Header value="message" />
      </Table.Header>

      <Table.Row style={{ backgroundColor: 'red' }}>
        <ValueRenderers.Text value="1" />
        <ValueRenderers.Text value="John" />
        <ValueRenderers.Text value="Hello" />
      </Table.Row>
      <Table.Row style={{ backgroundColor: 'green' }}>
        <ValueRenderers.Text value="2" />
        <ValueRenderers.Text value="Jane" />
        <ValueRenderers.Text value="Hi" />
      </Table.Row>
      <Table.Row style={{ backgroundColor: 'blue' }}>
        <ValueRenderers.Text value="3" />
        <ValueRenderers.Text value="Joe" />
        <ValueRenderers.Text value="Hey" />
      </Table.Row>
    </Table>
  );
}
StyledTable.args = {
  bordered: false,
  compact: false,
  interactive: false,
  striped: false,
  sticky: false,
};
