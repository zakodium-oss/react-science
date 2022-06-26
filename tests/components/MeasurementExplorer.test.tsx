import { test, expect } from '@playwright/experimental-ct-react';

import { MeasurementPlot } from '../../src';
import measurement from '../../stories/data/measurement.json';

test.use({ viewport: { width: 500, height: 500 } });

test.describe('MeasurementPlot test', () => {
  test('should load passed hex color', async ({ mount }) => {
    const component = await mount(
      <MeasurementPlot measurement={measurement} />,
    );
    const input = component.locator('_react=EditableInput >> nth=0 >> input');

    await expect(input).toHaveValue('0099FF');
  });
});
