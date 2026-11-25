import { expect, test } from '@playwright/test';

test('toolbar item can targeted with accessible selectors', async ({
  mount,
}) => {
  const component = await mount('components/toolbar/Accessible');

  const toolbar = component.getByRole('toolbar', {
    name: 'Accessible toolbar',
  });
  const buttons = toolbar.getByRole('button');

  await expect(buttons).toHaveCount(7);
  await expect(buttons.nth(0)).toHaveAccessibleName('string tooltip only');
  await expect(buttons.nth(1)).toHaveAccessibleName('aria-label only');
  await expect(buttons.nth(2)).toHaveAccessibleName('aria-label and tooltip');
  await expect(buttons.nth(3)).toHaveAccessibleName('');
  await expect(buttons.nth(4)).toHaveAccessibleName('TooltipHelpContent title');
  await expect(buttons.nth(5)).toHaveAccessibleName('toggle');
  await expect(buttons.nth(6)).toHaveAccessibleName('popover item');
});

test('pressed state is only exposed when active is set', async ({ mount }) => {
  const component = await mount('components/toolbar/Accessible');

  const plain = component.getByRole('button', { name: 'string tooltip only' });
  await expect(plain).not.toHaveAttribute('aria-pressed');

  const toggle = component.getByRole('button', { name: 'toggle' });
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(
    component.getByRole('button', { pressed: true }),
  ).toHaveAccessibleName('toggle');

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
});
