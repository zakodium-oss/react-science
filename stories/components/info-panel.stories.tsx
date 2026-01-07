import type { InfoPanelData } from '../../src/components/index.js';
import { InfoPanel, Toolbar } from '../../src/components/index.js';

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
      test1: '400 MHz',
      test5: 'CDCl3',
      test2: false,
      test3: 0,
      test4: Number.NaN,
    },
  },
];

export function Basic() {
  return (
    <div style={{ width: 500, height: 400 }}>
      <InfoPanel data={data} />
    </div>
  );
}
export function Small() {
  return (
    <div style={{ width: 250, height: '100%' }}>
      <InfoPanel data={data} />
    </div>
  );
}
export function SmallWithLeftAndRightElements() {
  return (
    <div style={{ width: 500, height: '100%' }}>
      <InfoPanel
        leftElement={
          <Toolbar>
            <Toolbar.Item icon="add-child" />
            <Toolbar.Item icon="cube-edit" />
          </Toolbar>
        }
        rightElement={
          <Toolbar>
            <Toolbar.Item icon="cog" />
          </Toolbar>
        }
        data={data}
      />
    </div>
  );
}
