import { expect, test } from '@playwright/experimental-ct-react';
import type { Locator } from '@playwright/test';

import { SplitPaneWithFrame } from './split-pane.components.js';

test('keeps the drag while the pointer crosses an iframe', async ({
  mount,
  page,
}) => {
  const component = await mount(<SplitPaneWithFrame />);
  const splitter = component.getByText('⋮');
  const start = await centreOf(splitter);

  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(start.x + 200, start.y, { steps: 10 });
  await page.mouse.up();

  // A percentage size places the splitter a few pixels short of the pointer.
  const dragged = await centreOf(splitter);
  expect(Math.abs(dragged.x - (start.x + 200))).toBeLessThan(10);

  // Released over the iframe, the drag must be over: the splitter no longer
  // follows the pointer once it comes back over the page.
  await page.mouse.move(start.x - 100, start.y, { steps: 10 });
  const released = await centreOf(splitter);
  expect(released.x).toBe(dragged.x);
});

async function centreOf(locator: Locator) {
  const box = await locator.boundingBox();
  if (!box) throw new Error('the splitter is not rendered');
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}
