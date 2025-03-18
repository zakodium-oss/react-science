import styled from '@emotion/styled';
import { IdcodeSvgRenderer } from 'react-ocl';

import {
  createTableColumnHelper,
  ValueRenderers,
} from '../../src/components/index.js';
import type { table } from '../data/data.js';

const Truncate = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const columnHelper = createTableColumnHelper<(typeof table)[number]>();

export const columns = [
  columnHelper.accessor('ocl.idCode', {
    header: 'Molecule',
    cell: ({ getValue }) => <IdcodeSvgRenderer idcode={getValue()} />,
    meta: { color: 'yellow', width: 400 },
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    enableSorting: true,
    sortingFn: 'textCaseSensitive',
    cell: ({ getValue }) => <Truncate>{getValue()}</Truncate>,
    meta: {
      color: 'lightblue',
      width: 200,
    },
  }),
  columnHelper.accessor('rn', { header: 'RN' }),
  columnHelper.accessor('mw', {
    header: 'MW',
    cell: ({ getValue }) => (
      <ValueRenderers.Number value={getValue()} fixed={4} />
    ),
  }),
  columnHelper.accessor('em', {
    header: 'EM',
    sortingFn: 'basic',
    enableSorting: true,
    cell: ({ getValue }) => (
      <ValueRenderers.Number value={getValue()} fixed={4} />
    ),
  }),
  columnHelper.accessor('isExpensive', {
    header: 'Is expensive',
    sortingFn: (row) => {
      return row.original.isExpensive ? 1 : -1;
    },
    enableSorting: true,
  }),
  columnHelper.accessor('color', { header: 'Color' }),
];
