import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';

import './main.css';

const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
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
          <a href={`${import.meta.env.BASE_URL}storybook/`}>Open Storybook</a>
        </div>
      ) : null}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);
