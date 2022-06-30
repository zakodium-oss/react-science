/* eslint-disable jest/no-standalone-expect */
import { test, expect } from '@playwright/experimental-ct-react';

import { MeasurementPlot } from '../../src';
import measurement from '../../stories/data/measurement.json';

test.describe('MeasurementPlot test', () => {
  test('test default', async ({ mount }) => {
    const component = await mount(
      <MeasurementPlot measurement={measurement} />,
    );
    const xAxis = component.locator('_react=Axis >> nth=0');
    const yAxis = component.locator('_react=Axis >> nth=1');

    await expect(xAxis).toContainText('1/CM');
    await expect(yAxis).toContainText('% Transmittance');
    await expect(component).toContainText('Mattson Instruments');
  });
  test('test change variables', async ({ mount }) => {
    const component = await mount(
      <MeasurementPlot
        measurement={measurement}
        xVariableName="y"
        yVariableName="a"
        dataIndex={0}
      />,
    );
    const xAxis = component.locator('_react=Axis >> nth=0');
    const yAxis = component.locator('_react=Axis >> nth=1');

    await expect(xAxis).toContainText('% Transmittance');
    await expect(yAxis).toContainText('Absorbance');
  });
});
