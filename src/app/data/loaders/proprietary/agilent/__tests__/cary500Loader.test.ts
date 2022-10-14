import { readFileSync } from 'fs';
import { join } from 'path';

import { cary500Loader } from '../cary500Loader';

test('cary500Loader', () => {
  const csv = readFileSync(join(__dirname, 'cary500-uvvis.csv'));
  cary500Loader();
});
