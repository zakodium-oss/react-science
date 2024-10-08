interface SelectedTotalProps {
  total?: number;
  count?: number;
}

export function SelectedTotal(props: SelectedTotalProps) {
  const { total, count } = props;
  return (
    <div
      style={{
        whiteSpace: 'nowrap',
        margin: 0,
      }}
    >
      {formatCounterLabel(count, total)}
    </div>
  );
}

function formatCounterLabel(count?: number, total?: number) {
  const thinSpace = '\u2009';
  if (count !== undefined && total !== undefined) {
    return `[${thinSpace}${count}${thinSpace}/${thinSpace}${total}${thinSpace}]`;
  }
  if (count !== undefined) {
    return `[${thinSpace}${count}${thinSpace}]`;
  }
  if (total !== undefined) {
    return `[${thinSpace}${total}${thinSpace}]`;
  }
  return '';
}
