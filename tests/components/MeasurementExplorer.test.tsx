/* eslint-disable jest/no-standalone-expect */
import { test, expect } from '@playwright/experimental-ct-react';

import { MeasurementExplorer } from '../../src';
import measurement from '../../stories/data/measurement.json';

test.describe('MeasurementExplorer test', () => {
  test('test select', async ({ mount }) => {
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
  });
  test.skip('test select same variable', async ({ mount }) => {
    const component = await mount(
      <MeasurementExplorer measurement={measurement} />,
    );
    const xVariableName = component.locator('select >> nth=1');
    const yVariableName = component.locator('select >> nth=2');

    await xVariableName.selectOption('t');
    await yVariableName.selectOption('t');
    await expect(xVariableName).toHaveValue('t');
    await expect(yVariableName).toHaveValue('t');
  });
  test('test reverse btn', async ({ mount }) => {
    const component = await mount(
      <MeasurementExplorer measurement={measurement} />,
    );

    const reverseBtn = component.locator('_react=FaExchangeAlt');
    const xVariableName = component.locator('select >> nth=1');
    const yVariableName = component.locator('select >> nth=2');

    await expect(xVariableName).toHaveValue('x');
    await expect(yVariableName).toHaveValue('y');
    await reverseBtn.click();
    await expect(xVariableName).toHaveValue('y');
    await expect(yVariableName).toHaveValue('x');
  });
  test('test flip btn', async ({ mount }) => {
    const component = await mount(
      <MeasurementExplorer measurement={measurement} />,
    );

    // const MeasurementPlot = component.locator('_react=MeasurementPlot');
    const flipBtn = component.locator('_react=FaArrowsAltH');
    await flipBtn.click();
  });
});
