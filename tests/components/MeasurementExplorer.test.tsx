import { test, expect } from '@playwright/experimental-ct-react';

import { MeasurementExplorer } from '../../src';
import data from '../../stories/data/measurements.json';

const measurement = data.measurements.ir.entries[0];

test.describe('MeasurementExplorer', () => {
  test('initial variables', async ({ mount }) => {
    const component = await mount(
      <MeasurementExplorer measurement={measurement} />,
    );
    const dataIndex = component.locator('select >> nth=0');
    const xVariableName = component.locator('select >> nth=1');
    const yVariableName = component.locator('select >> nth=2');

    await expect(dataIndex).toHaveValue('0');
    await expect(xVariableName).toHaveValue('x');
    await expect(yVariableName).toHaveValue('y');
  });
  // TODO: bring back measurement with different data.
  test.skip('select variables', async ({ mount }) => {
    const component = await mount(
      <MeasurementExplorer measurement={measurement} />,
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
    ).toBeEnabled();
    await expect(
      component.locator('_react=MeasurementPlot[yVariableName="t"]'),
    ).toBeEnabled();
  });
  test('reverse btn', async ({ mount }) => {
    const component = await mount(
      <MeasurementExplorer measurement={measurement} />,
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
    ).toBeEnabled();
    await expect(
      component.locator('_react=MeasurementPlot[yVariableName="x"]'),
    ).toBeEnabled();
  });
  test('flip btn', async ({ mount }) => {
    const component = await mount(
      <MeasurementExplorer measurement={measurement} />,
    );

    const flipBtn = component.locator('_react=FaArrowsAltH');
    const noFlippedPlot = component.locator(
      '_react=MeasurementPlot[flipHorizontalAxis=false]',
    );
    const FlippedPlot = component.locator(
      '_react=MeasurementPlot[flipHorizontalAxis=true]',
    );

    // test MeasurementPlot props before flipping axis
    await expect(noFlippedPlot).toBeEnabled();
    await expect(FlippedPlot).toHaveCount(0);

    await flipBtn.click();

    // test MeasurementPlot props after flipping axis
    await expect(noFlippedPlot).toHaveCount(0);
    await expect(FlippedPlot).toBeEnabled();
  });
});
