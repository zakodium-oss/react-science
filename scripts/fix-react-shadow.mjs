import { readFile, writeFile } from 'fs/promises';

const rootLayoutFile = new URL(
  './../lib/components/RootLayout.js',
  import.meta.url,
);

const rootLayout = await readFile(rootLayoutFile, 'utf-8');
if (!rootLayout.includes('react-shadow/emotion')) {
  throw new Error(
    'react-shadow/emotion not found in lib/components/RootLayout.js',
  );
}

const fixedRootLayout = rootLayout.replace(
  'react-shadow/emotion.esm',
  'react-shadow/emotion',
);

await writeFile(rootLayoutFile, fixedRootLayout);
