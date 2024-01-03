import { expect, test } from '@playwright/test';

test('toolbar', async ({ page }) => {
  await page.goto('http://localhost:5173/pages/demo.html');
  await expect(page.locator('_react=ToolbarItem')).toHaveCount(5);
  throw new Error('test');
});
