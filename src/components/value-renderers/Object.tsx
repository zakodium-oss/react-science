import { ObjectInspector } from 'react-inspector';

interface ObjectProps {
  value?: object;
}

export function Object({ value }: ObjectProps) {
  return <ObjectInspector data={value} />;
}
