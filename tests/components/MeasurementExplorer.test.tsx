import { test, expect } from '@playwright/experimental-ct-react';

import { MeasurementPlot } from '../../src';
import measurement from '../../stories/data/measurement.json';

test.describe('MeasurementPlot test', () => {
  test('should load passed hex color', async ({ mount }) => {
    const component = await mount(
      <MeasurementPlot measurement={measurement} />,
    );
    const dataIndex = component.locator('_react=select');
    // console.log(dataIndex);
    await expect(dataIndex).toHaveValue('0');
  });
});
