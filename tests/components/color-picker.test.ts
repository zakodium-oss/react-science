import { expect, test } from '@playwright/test';

test('should load passed hex color', async ({ mount }) => {
  const component = await mount('components/color-picker/ColorPickerHex');
  const input = component.locator('input').first();
  await expect(input).toHaveValue('0099FF');
});
