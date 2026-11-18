import { expect, test } from '@playwright/test';

test('toolbar', async ({ page }) => {
  await page.goto('/pages/demo.html');
  await expect(page.getByRole('toolbar').getByRole('button')).toHaveCount(9);
});
