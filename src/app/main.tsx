import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './main.css';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {import.meta.env.PROD ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            borderBottom: '1px solid black',
            lineHeight: 1,
            paddingBlock: 5,
          }}
        >
          <a href={`${import.meta.env.BASE_URL}stories/`}>Open stories</a>
        </div>
      ) : null}
      <App />
    </div>
  </StrictMode>,
);
