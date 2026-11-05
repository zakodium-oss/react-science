import { expect, test } from '@playwright/experimental-ct-react';

import {
  CapsuleGroupSingle,
  CapsuleGroupWithAll,
} from './capsule-group.components.js';

test('the All capsule is active while the value is null', async ({ mount }) => {
  const component = await mount(<CapsuleGroupWithAll />);

  await expect(
    component.getByRole('group', { name: 'Fraction' }),
  ).toBeVisible();
  await expect(component.getByRole('button', { name: 'All' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(
    component.getByRole('button', { name: 'Alpha' }),
  ).toHaveAttribute('aria-pressed', 'false');
  await expect(component.getByRole('button', { name: 'Beta' })).toHaveClass(
    /bp6-minimal/,
  );
  await expect(component.getByTestId('value')).toHaveText('null');
});

test('clicking the active option clears the value to null', async ({
  mount,
}) => {
  const component = await mount(<CapsuleGroupWithAll />);
  const all = component.getByRole('button', { name: 'All' });
  const beta = component.getByRole('button', { name: 'Beta' });

  await beta.click();
  await expect(component.getByTestId('value')).toHaveText('beta');
  await expect(beta).toHaveAttribute('aria-pressed', 'true');
  await expect(beta).not.toHaveClass(/bp6-minimal/);
  await expect(beta).toHaveClass(/bp6-intent-success/);
  await expect(all).toHaveAttribute('aria-pressed', 'false');

  await beta.click();
  await expect(component.getByTestId('value')).toHaveText('null');
  await expect(all).toHaveAttribute('aria-pressed', 'true');
  await expect(beta).toHaveAttribute('aria-pressed', 'false');
  await expect(beta).toHaveClass(/bp6-intent-success/);
});

test('clicking the All capsule clears the value to null', async ({ mount }) => {
  const component = await mount(<CapsuleGroupWithAll />);

  await component.getByRole('button', { name: 'Alpha' }).click();
  await expect(component.getByTestId('value')).toHaveText('alpha');

  await component.getByRole('button', { name: 'All' }).click();
  await expect(component.getByTestId('value')).toHaveText('null');
});

test('an option tooltip shows on hover', async ({ mount, page }) => {
  const component = await mount(<CapsuleGroupWithAll />);

  await component.getByRole('button', { name: 'Beta' }).hover();

  await expect(page.getByText('Second one')).toBeVisible();
});

test('without allOption, clicking the active option keeps it', async ({
  mount,
}) => {
  const component = await mount(<CapsuleGroupSingle />);

  await component.getByRole('button', { name: 'Alpha' }).click();

  await expect(component.getByTestId('changes')).toHaveText('1');
  await expect(component.getByTestId('value')).toHaveText('alpha');
});

test('a disabled option is not a button and ignores clicks', async ({
  mount,
}) => {
  const component = await mount(<CapsuleGroupSingle />);

  await expect(component.getByRole('button', { name: 'Gamma' })).toHaveCount(0);
  await component.getByText('Gamma').click();
  await component.getByRole('button', { name: 'Beta' }).click();

  await expect(component.getByTestId('value')).toHaveText('beta');
  await expect(component.getByTestId('changes')).toHaveText('1');
});
