import { expect, test } from '@playwright/experimental-ct-react';

import { NumericDraftFieldHarness } from './numeric-draft-input.components.js';

test('the label names the input', async ({ mount }) => {
  const component = await mount(<NumericDraftFieldHarness />);

  await expect(component.getByLabel('Mass (mg)')).toHaveValue('0');
});

test('a decimal can be typed into an input holding zero', async ({ mount }) => {
  const component = await mount(<NumericDraftFieldHarness />);
  const input = component.getByLabel('Mass (mg)');

  await input.fill('');
  await input.pressSequentially('0.');
  await expect(input).toHaveValue('0.');
  await input.pressSequentially('01');

  await expect(input).toHaveValue('0.01');
  await expect(component.getByTestId('value')).toHaveText('0.01');
});

test('an entry outside the bounds is kept, then clamped on blur', async ({
  mount,
}) => {
  const component = await mount(<NumericDraftFieldHarness />);
  const input = component.getByLabel('Mass (mg)');

  await input.fill('');
  await input.pressSequentially('50');
  await expect(component.getByTestId('value')).toHaveText('50');
  await input.pressSequentially('0');
  await expect(input).toHaveValue('500');
  await expect(component.getByTestId('value')).toHaveText('50');

  await input.blur();

  await expect(input).toHaveValue('100');
  await expect(component.getByTestId('value')).toHaveText('100');
});

test('a value changed elsewhere replaces the entry', async ({ mount }) => {
  const component = await mount(<NumericDraftFieldHarness />);
  const input = component.getByLabel('Mass (mg)');

  await input.fill('');
  await input.pressSequentially('7.');
  await component.getByRole('button', { name: 'Reset' }).click();

  await expect(input).toHaveValue('25');
  await expect(component.getByTestId('value')).toHaveText('25');
});
