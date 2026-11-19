import { expect, test } from '@playwright/test';

test('activity bar and items can be targeted with accessible selectors', async ({
  mount,
}) => {
  const component = await mount('components/activity_bar/Accessible');

  const activityBar = component.getByRole('toolbar', { name: 'Activities' });
  await expect(activityBar).toHaveAttribute('aria-orientation', 'vertical');

  const buttons = activityBar.getByRole('button');
  await expect(buttons).toHaveCount(5);
  await expect(buttons.nth(0)).toHaveAccessibleName('string tooltip only');
  await expect(buttons.nth(1)).toHaveAccessibleName('aria-label only');
  await expect(buttons.nth(2)).toHaveAccessibleName('aria-label and tooltip');
  await expect(buttons.nth(3)).toHaveAccessibleName('');
  await expect(buttons.nth(4)).toHaveAccessibleName('disabled');
  await expect(buttons.nth(4)).toBeDisabled();
});

test('active state of items is exposed as pressed', async ({ mount }) => {
  const component = await mount('components/activity_bar/Accessible');

  const item = component.getByRole('button', { name: 'string tooltip only' });
  await expect(item).toHaveAttribute('aria-pressed', 'false');

  await item.click();
  await expect(item).toHaveAttribute('aria-pressed', 'true');
  await expect(
    component.getByRole('button', { pressed: true }),
  ).toHaveAccessibleName('string tooltip only');

  await item.click();
  await expect(item).toHaveAttribute('aria-pressed', 'false');
  await expect(component.getByRole('button', { pressed: true })).toBeHidden();
});
