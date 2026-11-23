import { expect, test } from '@playwright/test';

test('PanelHeaderAccessibilityDefault settings can be targeted by accessible accessor', async ({
  mount,
}) => {
  const component = await mount(
    'components/panel-header/PanelHeaderAccessibilityDefault',
  );

  const header = component.getByLabel('Panel header');
  await expect(header).toHaveCount(1);

  const button = header.getByRole('button', { name: `Panel settings` });
  await expect(button).toHaveCount(1);
  await expect(button).toBeEnabled();
});

test('PanelHeaderAccessibilityCustomTooltip settings can be targeted by accessible accessor', async ({
  mount,
}) => {
  const component = await mount(
    'components/panel-header/PanelHeaderAccessibilityCustomTooltip',
  );

  const header = component.getByLabel('Panel header');
  await expect(header).toHaveCount(1);

  const button = header.getByRole('button', { name: `Settings` });
  await expect(button).toHaveCount(1);
  await expect(button).toBeEnabled();
});

test('PanelHeaderAccessibilityCustomAriaLabel settings can be targeted by accessible accessor', async ({
  mount,
}) => {
  const component = await mount(
    'components/panel-header/PanelHeaderAccessibilityCustomAriaLabel',
  );

  const header = component.getByLabel('Panel header');
  await expect(header).toHaveCount(1);

  const button = header.getByRole('button', { name: `Rich Text settings` });
  await expect(button).toHaveCount(1);
  await expect(button).toBeEnabled();
});
