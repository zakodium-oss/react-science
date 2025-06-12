import { expect, test } from 'vitest';

import { normalizeDOI } from '../utils.js';

const dois = [
  '/10.3762/bjoc.20.4',
  '10.3762/bjoc.20.4',
  'http://dx.doi.org//10.3762/bjoc.20.4',
  'https://dx.doi.org//10.3762/bjoc.20.4',
  'http://www.doi.org//10.3762/bjoc.20.4',
  'https://www.doi.org//10.3762/bjoc.20.4',
  'http://doi.org//10.3762/bjoc.20.4',
  'https://doi.org//10.3762/bjoc.20.4',
];

test('normalize doi', async () => {
  for (const doi of dois) {
    const result = normalizeDOI(doi);
    expect(result).toBe('10.3762/bjoc.20.4');
  }
});
