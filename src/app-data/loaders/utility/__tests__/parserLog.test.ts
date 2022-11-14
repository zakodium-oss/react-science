import { expect, test } from 'vitest';

import { createLogEntry } from '../parserLog';

test('create a parser log object', () => {
  expect(
    createLogEntry({
      relativePath: 'test/path.txt',
      branch: 'test-branch',
      error: new Error('test error'),
    }),
  ).toStrictEqual({
    parser: 'biologic-converter',
    message: 'Error parsing biologic experiment.',
    kind: 'error',
    branch: 'test-branch',
    relativePath: 'test/path.txt',
    error: new Error('test error'),
  });
});
