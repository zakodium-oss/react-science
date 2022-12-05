import { readFile, writeFile } from 'node:fs/promises';

const rootLayoutFile = new URL(
  '../lib/components/root-layout/RootLayout.js',
  import.meta.url,
);

const rootLayout = await readFile(rootLayoutFile, 'utf8');
if (!rootLayout.includes('react-shadow/emotion')) {
  throw new Error(
    'react-shadow/emotion not found in lib/components/root-layout/RootLayout.js',
  );
}

const fixedRootLayout = rootLayout.replace(
  'react-shadow/emotion.esm',
  'react-shadow/emotion',
);

await writeFile(rootLayoutFile, fixedRootLayout);
