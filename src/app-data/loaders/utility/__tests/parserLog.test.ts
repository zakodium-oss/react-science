import { expect, test } from 'vitest';

import { createLogEntry } from '../parserLog';

test('create a parser log object', () => {
  expect(
    createLogEntry({
      relativePath: 'test/path',
      branch: 'test-branch',
    }),
  ).toStrictEqual({
    parser: 'biologic-converter',
    message: 'Error parsing biologic experiment.',
    branch: 'test-branch',
    kind: 'error',
    path: 'test/path',
  });
});
