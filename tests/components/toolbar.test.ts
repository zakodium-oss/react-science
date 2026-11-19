import { expect, test } from '@playwright/test';

test('toolbar item can targeted with accessible selectors', async ({
  mount,
}) => {
  const component = await mount('components/toolbar/Accessible');

  const toolbar = component.getByRole('toolbar');
  const buttons = toolbar.getByRole('button');

  await expect(buttons).toHaveCount(4);
  await expect(buttons.nth(0)).toHaveAccessibleName('string tooltip only');
  await expect(buttons.nth(1)).toHaveAccessibleName('aria-label only');
  await expect(buttons.nth(2)).toHaveAccessibleName('aria-label and tooltip');
  await expect(buttons.nth(3)).toHaveAccessibleName('');
});
