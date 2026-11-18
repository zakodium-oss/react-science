import { expect, test } from '@playwright/test';

test('targets an item header by its button role', async ({ mount }) => {
  const component = await mount('components/accordion/MixedItems');
  const first = component.getByRole('button', { name: 'First' });
  const second = component.getByRole('button', { name: 'Second' });

  await expect(first).toHaveAttribute('aria-expanded', 'true');
  await expect(second).toHaveAttribute('aria-expanded', 'false');

  await second.click();
  await expect(second).toHaveAttribute('aria-expanded', 'true');
});

test('targets an item content by its region role', async ({ mount }) => {
  const component = await mount('components/accordion/MixedItems');

  await expect(component.getByRole('region', { name: 'First' })).toHaveText(
    'First content',
  );
  // Closed items keep their content mounted, but hidden.
  await expect(component.getByRole('region', { name: 'Second' })).toBeHidden();

  await component.getByRole('button', { name: 'Second' }).click();
  await expect(component.getByRole('region', { name: 'Second' })).toHaveText(
    'Second content',
  );
});

test('unmounts the content of a closed item with unmountChildren', async ({
  mount,
}) => {
  const component = await mount('components/accordion/MixedItems');
  const button = component.getByRole('button', { name: 'Third' });
  const region = component.getByRole('region', {
    name: 'Third',
    includeHidden: true,
  });

  await expect(region).toHaveCount(0);
  await expect(button).not.toHaveAttribute('aria-controls');

  await button.click();
  await expect(region).toHaveText('Third content');
  const regionId = await region.getAttribute('id');
  await expect(button).toHaveAttribute('aria-controls', regionId as string);
});
