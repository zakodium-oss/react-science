import { InfoPanel, InfoPanelData } from '../../src/components';

export default {
  title: 'Components / InfoPanel',
  component: InfoPanel,
};
const data: InfoPanelData[] = [
  {
    description: 'Custom information',
    data: {
      field1: 'value1',
      field2: 'value2',
    },
  },
  {
    description: 'Spectrum information',
    data: {
      frequency: '400 MHz',
      solvent: 'CDCl3',
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
