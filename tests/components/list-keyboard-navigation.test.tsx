import { expect, test } from '@playwright/experimental-ct-react';

import { TwoKeyboardLists } from './list-keyboard-navigation.components.js';

test('lists are marked, and only a container list is made focusable', async ({
  mount,
}) => {
  const component = await mount(<TwoKeyboardLists />);
  const containerList = component.getByTestId('container-list');
  const documentList = component.getByTestId('document-list');

  await expect(containerList).toHaveAttribute(
    'data-keyboard-list',
    'container',
  );
  await expect(containerList).toHaveAttribute('tabindex', '0');
  await expect(documentList).toHaveAttribute('data-keyboard-list', 'document');
  await expect(documentList).not.toHaveAttribute('tabindex');
});

test('a key press inside the container list moves only that list', async ({
  mount,
  page,
}) => {
  const component = await mount(<TwoKeyboardLists />);
  await component.getByText('container Alpha').click();
  await expect(component.getByTestId('container-list')).toBeFocused();

  await page.keyboard.press('ArrowDown');

  await expect(component.getByTestId('container-selected')).toHaveText('1');
  await expect(component.getByTestId('document-selected')).toHaveText('0');
});

test('a key press with nothing focused moves only the document list', async ({
  mount,
  page,
}) => {
  const component = await mount(<TwoKeyboardLists />);
  await component.getByRole('heading', { name: 'Two lists' }).click();

  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');

  await expect(component.getByTestId('document-selected')).toHaveText('2');
  await expect(component.getByTestId('container-selected')).toHaveText('0');
});

test('a key press in a text field moves no list', async ({ mount, page }) => {
  const component = await mount(<TwoKeyboardLists />);
  await component.getByLabel('Text field').focus();
  await page.keyboard.press('ArrowDown');

  // Leave the field and press once more: the document list then moves by one
  // row only, so the key typed in the field moved nothing.
  await component.getByRole('heading', { name: 'Two lists' }).click();
  await page.keyboard.press('ArrowDown');

  await expect(component.getByTestId('document-selected')).toHaveText('1');
  await expect(component.getByTestId('container-selected')).toHaveText('0');
});

test('ArrowUp on the first row keeps it selected', async ({ mount, page }) => {
  const component = await mount(<TwoKeyboardLists />);
  await component.getByText('container Alpha').click();
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('ArrowDown');
  await expect(component.getByTestId('container-selected')).toHaveText('1');
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('ArrowUp');
  await expect(component.getByTestId('container-selected')).toHaveText('0');

  await component.getByRole('heading', { name: 'Two lists' }).click();
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('ArrowDown');
  await expect(component.getByTestId('document-selected')).toHaveText('1');
});

test('ArrowDown on the last row keeps it selected', async ({ mount, page }) => {
  const component = await mount(<TwoKeyboardLists />);
  await component.getByText('container Delta').click();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowUp');

  await expect(component.getByTestId('container-selected')).toHaveText('2');
});
