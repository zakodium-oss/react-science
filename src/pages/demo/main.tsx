import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './main.css';

createRoot(document.querySelector('#root') as HTMLDivElement).render(
  <StrictMode>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          borderBottom: '1px solid black',
          gap: '10px',
          lineHeight: 1,
          paddingBlock: 5,
        }}
      >
        <a href="">Blank</a>
        <a href="#?filelist=https%3A%2F%2Fzakodium-oss.github.io%2Fanalysis-dataset%2Fjdx.json">
          JCAMP-DX
        </a>
        <a href="#?filelist=https%3A%2F%2Fzakodium-oss.github.io%2Fanalysis-dataset%2Fbiologic.json">
          Biologic
        </a>
        <a href="#?filelist=https%3A%2F%2Fzakodium-oss.github.io%2Fanalysis-dataset%2Fuvvis.json">
          UV-vis
        </a>
        <a href="#?filelist=https%3A%2F%2Fzakodium-oss.github.io%2Fanalysis-dataset%2Fhplc.json">
          HPLC
        </a>
        <a href="#?filelist=https%3A%2F%2Fzakodium-oss.github.io%2Fanalysis-dataset%2Fmass.json">
          Mass
        </a>
        <a href="#?filelist=https%3A%2F%2Fzakodium-oss.github.io%2Fanalysis-dataset%2Fgcms.json">
          GC/MS
        </a>
        <a href="#?filelist=https%3A%2F%2Fzakodium-oss.github.io%2Fanalysis-dataset%2Ffull.json">
          All the data we have
        </a>
        <a href="big-map.html">BIG-MAP application</a>
        {import.meta.env.PROD ? (
          <a href={`${import.meta.env.BASE_URL}stories/`}>Open stories</a>
        ) : null}
      </div>
      <App />
    </div>
  </StrictMode>,
);
