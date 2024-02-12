import { test, expect } from '@playwright/experimental-ct-react';

import { MeasurementPlot } from '../../src/app/helpers/index';
import type {
  IrMeasurement,
  MeasurementAppView,
} from '../../src/app-data/index';
import measurement from '../../stories/data/irMeasurement.json';

const irMeasurement = measurement as IrMeasurement;
const measurementDisplay: MeasurementAppView = {
  color: {
    kind: 'fixed',
    color: 'red',
  },
  visible: true,
};

const beforeZoom = [
  // horizontal axis default values
  500,
  1000,
  1500,
  2000,
  2500,
  3000,
  3500,
  4000,
  '1/CM',

  // vertical axis default values
  40,
  45,
  50,
  55,
  60,
  65,
  70,
  75,
  80,
  85,
  '% Transmittance',
].join('');

test('default props', async ({ mount, page }) => {
  const component = await mount(
    <MeasurementPlot
      measurement={irMeasurement}
      measurementDisplay={measurementDisplay}
    />,
  );
  await expect(component).toBeVisible();

  const xAxis = component.locator('_react=Axis >> nth=0');
  const yAxis = component.locator('_react=Axis >> nth=1');

  await test.step('Axis', async () => {
    await expect(xAxis).toBeVisible();
    await expect(yAxis).toBeVisible();

    await expect(xAxis).toContainText('1/CM');
    await expect(yAxis).toContainText('% Transmittance');
    await expect(component).toContainText('Mattson Instruments');
  });

  await test.step('Flip', async () => {
    await expect(
      component.locator('_react=Axis[flip=false] >> nth=0'),
    ).toBeVisible();
  });

  await test.step('CrossHair', async () => {
    await expect(component.locator('_react=Annotations')).toBeHidden();
    await component.hover({ position: { x: 200, y: 200 } });
    await expect(component.locator('_react=Annotations')).toHaveCount(3);
  });

  await test.step('Grids', async () => {
    // vertical
    await expect(component.locator('_react=line[y2="0"]')).toHaveCount(8);

    // horizontal
    await expect(component.locator('_react=line[x1="0"]')).toHaveCount(10);
  });

  await test.step('Horizontal zoom', async () => {
    await expect(component).toContainText(beforeZoom);

    await component.hover({ position: { x: 100, y: 100 } });
    await page.mouse.down();
    await component.hover({ position: { x: 200, y: 200 } });
    await page.mouse.up();

    const afterZoom = [
      // new horizontal axis values after zoom
      580,
      600,
      620,
      640,
      660,
      680,
      700,
      720,
      740,
      760,
      780,
      800,
      820,
      840,
      860,
      '1/CM',

      // vertical axis default values
      40,
      45,
      50,
      55,
      60,
      65,
      70,
      75,
      80,
      85,
      '% Transmittance',
    ].join('');
    await expect(component).toContainText(afterZoom);

    await component.dblclick();
    await expect(component).toContainText(beforeZoom);
  });
});

test('change variables', async ({ mount }) => {
  const component = await mount(
    <MeasurementPlot
      measurement={irMeasurement}
      xVariableName="y"
      yVariableName="a"
      dataIndex={1}
      measurementDisplay={measurementDisplay}
    />,
  );
  await expect(component).toBeVisible();

  const xAxis = component.locator('_react=Axis >> nth=0');
  const yAxis = component.locator('_react=Axis >> nth=1');

  await expect(xAxis).toBeVisible();
  await expect(yAxis).toBeVisible();

  await expect(xAxis).toContainText('TRANSMITTANCE');
  await expect(yAxis).toContainText('Absorbance');
});

test('flip axis', async ({ mount }) => {
  const component = await mount(
    <MeasurementPlot
      measurement={irMeasurement}
      flipHorizontalAxis
      measurementDisplay={measurementDisplay}
    />,
  );
  await expect(component).toBeVisible();

  const xAxis = component.locator('_react=Axis[flip=true] >> nth=0');
  await expect(xAxis).toBeVisible();
});

test('remove horizontal axis', async ({ mount }) => {
  const component = await mount(
    <MeasurementPlot
      measurement={irMeasurement}
      showHorizontalAxis={false}
      measurementDisplay={measurementDisplay}
    />,
  );
  await expect(component).toBeVisible();

  const xAxis = component.locator('_react=Axis >> nth=0');
  await expect(xAxis).toHaveText('');
});

test('remove vertical axis', async ({ mount }) => {
  const component = await mount(
    <MeasurementPlot
      measurement={irMeasurement}
      showVerticalAxis={false}
      measurementDisplay={measurementDisplay}
    />,
  );
  await expect(component).toBeVisible();

  const yAxis = component.locator('_react=Axis >> nth=1');
  await expect(yAxis).toHaveText('');
});

test('vertical zoom', async ({ mount, page }) => {
  const component = await mount(
    <MeasurementPlot
      measurement={irMeasurement}
      zoom="vertical"
      measurementDisplay={measurementDisplay}
    />,
  );
  await expect(component).toBeVisible();

  await expect(component).toContainText(beforeZoom);
  await component.hover({ position: { x: 100, y: 100 } });
  await page.mouse.down();
  await component.hover({ position: { x: 200, y: 200 } });
  await page.mouse.up();

  const afterZoom = [
    // horizontal axis default values
    500,
    1000,
    1500,
    2000,
    2500,
    3000,
    3500,
    4000,
    '1/CM',

    // new vertical axis values after zoom
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    '% Transmittance',
  ].join('');
  await expect(component).toContainText(afterZoom);
});

test('rectangular zoom', async ({ mount, page }) => {
  const component = await mount(
    <MeasurementPlot
      measurement={irMeasurement}
      zoom="rectangular"
      measurementDisplay={measurementDisplay}
    />,
  );
  await expect(component).toBeVisible();

  await expect(component).toContainText(beforeZoom);
  await component.hover({ position: { x: 100, y: 100 } });
  await page.mouse.down();
  await component.hover({ position: { x: 200, y: 200 } });
  await page.mouse.up();

  const afterZoom = [
    // new horizontal axis values after zoom
    580,
    600,
    620,
    640,
    660,
    680,
    700,
    720,
    740,
    760,
    780,
    800,
    820,
    840,
    860,
    '1/CM',

    // new vertical axis values after zoom
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    '% Transmittance',
  ].join('');
  await expect(component).toContainText(afterZoom);
});

test('remove horizontal grid', async ({ mount }) => {
  const component = await mount(
    <MeasurementPlot
      measurement={irMeasurement}
      showHorizontalGrid={false}
      measurementDisplay={measurementDisplay}
    />,
  );
  await expect(component).toBeVisible();

  await expect(component.locator('_react=line[x1="0"]')).toBeHidden();
});

test('remove vertical grid', async ({ mount }) => {
  const component = await mount(
    <MeasurementPlot
      measurement={irMeasurement}
      showVerticalGrid={false}
      measurementDisplay={measurementDisplay}
    />,
  );
  await expect(component).toBeVisible();

  await expect(component.locator('_react=line[y2="0"]')).toBeHidden();
});

test('crossHair', async ({ mount }) => {
  const component = await mount(
    <MeasurementPlot
      measurement={irMeasurement}
      crossHair={false}
      measurementDisplay={measurementDisplay}
    />,
  );
  await expect(component).toBeVisible();

  await component.hover({ position: { x: 200, y: 200 } });
  await expect(component.locator('_react=Annotations')).toBeHidden();
});
