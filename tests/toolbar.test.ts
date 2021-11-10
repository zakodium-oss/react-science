import { test, expect } from '@playwright/test';

test('toolbar', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('_react=ToolbarItem')).toHaveCount(6);
});
