import { expect, test } from '@playwright/experimental-ct-react';

import { ColorPicker } from '../../src/components/index.js';

test('should load passed hex color', async ({ mount }) => {
  const component = await mount(<ColorPicker color={{ hex: '0099ff' }} />);
  const input = component.locator('_react=EditableInput >> nth=0 >> input');
  await expect(input).toHaveValue('0099FF');
});
