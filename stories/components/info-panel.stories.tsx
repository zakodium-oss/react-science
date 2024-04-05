import { InfoPanel, InfoPanelData } from '../../src/components';

export default {
  title: 'Components / InfoPanel',
  component: InfoPanel,
};
const data: InfoPanelData[] = [
  {
    description: 'Custom information',
    data: {
      prop5: 'field5',
      __field4__: 'value4',
      field1: 'VALue1',
      field2: 'value2',
      fie: 'value3',
      FIeld6: 'value6',
    },
  },
  {
    description: 'Spectrum information',
    data: {
      frequency: '400 MHz',
      solvent: 'CDCl3',
      isFi: false,
      temperature: 0,
      Test: Number.NaN,
    },
  },
];

export function Basic() {
  return (
    <div style={{ width: 500 }}>
      <InfoPanel data={data} />
    </div>
  );
}
export function Small() {
  return (
    <div style={{ width: '20%' }}>
      <InfoPanel data={data} />
    </div>
  );
}
