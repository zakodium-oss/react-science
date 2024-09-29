import {
  Button,
  useStatsQuery,
  NMRStatsGraph,
  Stats,
} from '../../src/components/index';
import nmrfile from '../data/nmrfile.json';

export default {
  title: 'Components / NMRStatsGraph',
};
const nmrdata = nmrfile.result as Stats;

export function FromFetch() {
  const { status, data, error } = useStatsQuery();
  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  if (status === 'pending') {
    return <Button loading minimal />;
  }

  return <NMRStatsGraph data={data} />;
}

export function FromJson() {
  return <NMRStatsGraph data={nmrdata} />;
}
