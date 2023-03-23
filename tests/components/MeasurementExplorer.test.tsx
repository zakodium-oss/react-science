import { test, expect } from '@playwright/experimental-ct-react';

import { MeasurementExplorer } from '../../src/app/index';
import type { IrMeasurement, MeasurementAppView } from '../../src/app-data';
import measurement from '../../stories/data/irMeasurement.json';

let irMeasurement = measurement as IrMeasurement;

const measurementDisplay: MeasurementAppView = {
  color: {
    kind: 'fixed',
    color: 'red',
  },
  visible: true,
};

test.describe('MeasurementExplorer', () => {
  test('initial variables', async ({ mount }) => {
    const component = await mount(
      <MeasurementExplorer
        measurement={irMeasurement}
        measurementDisplay={measurementDisplay}
      />,
    );
    const dataIndex = component.locator('select >> nth=0');
    const xVariableName = component.locator('select >> nth=1');
    const yVariableName = component.locator('select >> nth=2');

    await expect(dataIndex).toHaveValue('0');
    await expect(xVariableName).toHaveValue('x');
    await expect(yVariableName).toHaveValue('y');
  });
  test('select variables', async ({ mount }) => {
    const component = await mount(
      <MeasurementExplorer
        measurement={irMeasurement}
        measurementDisplay={measurementDisplay}
      />,
    );
    const dataIndex = component.locator('select >> nth=0');
    const xVariableName = component.locator('select >> nth=1');
    const yVariableName = component.locator('select >> nth=2');

    await dataIndex.selectOption('1');
    await xVariableName.selectOption('a');
    await yVariableName.selectOption('t');

    await expect(dataIndex).toHaveValue('1');
    await expect(xVariableName).toHaveValue('a');
    await expect(yVariableName).toHaveValue('t');

    // test MeasurementPlot props after select variables
    await component.locator('_react=MeasurementPlot[dataIndex=1]').isEnabled();
    await expect(
      component.locator('_react=MeasurementPlot[xVariableName="a"]'),
    ).toBeVisible();
    await expect(
      component.locator('_react=MeasurementPlot[yVariableName="t"]'),
    ).toBeVisible();
  });
  test('reverse btn', async ({ mount }) => {
    const component = await mount(
      <MeasurementExplorer
        measurement={irMeasurement}
        measurementDisplay={measurementDisplay}
      />,
    );

    const reverseBtn = component.locator('_react=FaExchangeAlt');
    const xVariableName = component.locator('select >> nth=1');
    const yVariableName = component.locator('select >> nth=2');

    // test selected variables before reverse (default variables)
    await expect(xVariableName).toHaveValue('x');
    await expect(yVariableName).toHaveValue('y');

    await reverseBtn.click();

    // test selected variables after reverse
    await expect(xVariableName).toHaveValue('y');
    await expect(yVariableName).toHaveValue('x');

    // test MeasurementPlot props after reverse
    await expect(
      component.locator('_react=MeasurementPlot[xVariableName="y"]'),
    ).toBeVisible();
    await expect(
      component.locator('_react=MeasurementPlot[yVariableName="x"]'),
    ).toBeVisible();
  });
  test('flip btn', async ({ mount }) => {
    const component = await mount(
      <MeasurementExplorer
        measurement={irMeasurement}
        measurementDisplay={measurementDisplay}
      />,
    );

    const flipBtn = component.locator('_react=FaArrowsAltH');
    const noFlippedPlot = component.locator(
      '_react=MeasurementPlot[flipHorizontalAxis=false]',
    );
    const FlippedPlot = component.locator(
      '_react=MeasurementPlot[flipHorizontalAxis=true]',
    );

    // test MeasurementPlot props before flipping axis
    await expect(noFlippedPlot).toBeVisible();
    await expect(FlippedPlot).toHaveCount(0);

    await flipBtn.click();

    // test MeasurementPlot props after flipping axis
    await expect(noFlippedPlot).toHaveCount(0);
    await expect(FlippedPlot).toBeVisible();
  });
});
