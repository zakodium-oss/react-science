import { test, expect } from '@playwright/test';

test('toolbar', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.locator('_react=ToolbarItem')).toHaveCount(6);
});
