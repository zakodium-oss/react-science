import { expect, test } from '@playwright/experimental-ct-react';

import { IrMeasurementExplorer } from './measurement-explorer.components.js';

test('initial variables', async ({ mount }) => {
  const component = await mount(<IrMeasurementExplorer />);
  const dataIndex = component.locator('select >> nth=0');
  const xVariableName = component.locator('select >> nth=1');
  const yVariableName = component.locator('select >> nth=2');

  await expect(dataIndex).toHaveValue('0');
  await expect(xVariableName).toHaveValue('x');
  await expect(yVariableName).toHaveValue('y');
});

test('select variables', async ({ mount }) => {
  const component = await mount(<IrMeasurementExplorer />);
  const dataIndex = component.locator('select >> nth=0');
  const xVariableName = component.locator('select >> nth=1');
  const yVariableName = component.locator('select >> nth=2');

  await dataIndex.selectOption('1');
  await xVariableName.selectOption('a');
  await yVariableName.selectOption('t');

  await expect(dataIndex).toHaveValue('1');
  await expect(xVariableName).toHaveValue('a');
  await expect(yVariableName).toHaveValue('t');
});

test('reverse btn', async ({ mount }) => {
  const component = await mount(<IrMeasurementExplorer />);

  const reverseBtn = component.getByRole('button', { name: 'Swap x/y' });
  const xVariableName = component.locator('select >> nth=1');
  const yVariableName = component.locator('select >> nth=2');

  // test selected variables before reverse (default variables)
  await expect(xVariableName).toHaveValue('x');
  await expect(yVariableName).toHaveValue('y');

  await reverseBtn.click();

  // test selected variables after reverse
  await expect(xVariableName).toHaveValue('y');
  await expect(yVariableName).toHaveValue('x');
});
