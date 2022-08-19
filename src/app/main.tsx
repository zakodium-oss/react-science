import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './main.css';

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
          <a href={`${import.meta.env.BASE_URL}stories/`}>Open stories</a>
        </div>
      ) : null}
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);
