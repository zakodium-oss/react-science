import {
  Button,
  useStatsQuery,
  NMRDashboard,
  Stats,
} from '../../src/components/index';
import nmrfile from '../data/nmrfile.json';

export default {
  title: 'Components / NMRDashboard',
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

  return <NMRDashboard data={data} />;
}

export function FromJson() {
  return <NMRDashboard data={nmrdata} />;
}
