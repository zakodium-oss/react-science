import { ObjectInspector } from 'react-inspector';

interface ObjectRendererProps {
  value?: object;
}

export function ObjectRenderer({ value }: ObjectRendererProps) {
  return <ObjectInspector data={value} />;
}
