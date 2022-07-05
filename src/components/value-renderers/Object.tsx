import { Inspector } from 'react-inspector';

interface ObjectProps {
  value?: object;
}

export function Object({ value }: ObjectProps) {
  return <Inspector data={value} />;
}
