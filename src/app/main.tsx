import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './main.css';

createRoot(document.getElementById('root') as HTMLDivElement).render(
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
        <a
          href={`${
            import.meta.env.BASE_URL
          }?filelist=https://zakodium-oss.github.io/analysis-dataset/jdx.json`}
        >
          JCAMP-DX
        </a>
        <a
          href={`${
            import.meta.env.BASE_URL
          }?filelist=https://zakodium-oss.github.io/analysis-dataset/biologic.json`}
        >
          Biologic
        </a>
        <a
          href={`${
            import.meta.env.BASE_URL
          }?filelist=https://zakodium-oss.github.io/analysis-dataset/uvvis.json`}
        >
          UV-vis
        </a>
        <a
          href={`${
            import.meta.env.BASE_URL
          }?filelist=https://zakodium-oss.github.io/analysis-dataset/hplc.json`}
        >
          HPLC
        </a>
        <a
          href={`${
            import.meta.env.BASE_URL
          }?filelist=https://zakodium-oss.github.io/analysis-dataset/gcms.json`}
        >
          GC/MS
        </a>
        <a
          href={`${
            import.meta.env.BASE_URL
          }?filelist=https://zakodium-oss.github.io/analysis-dataset/full.json`}
        >
          All the data we have
        </a>
        {import.meta.env.PROD ? (
          <a href={`${import.meta.env.BASE_URL}stories/`}>Open stories</a>
        ) : null}
      </div>
      <App />
    </div>
  </StrictMode>,
);
