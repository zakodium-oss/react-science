import { useState } from 'react';

import {
  NMRFileBrowser,
  NMRFileBrowserProps,
  SplitPane,
} from '../../src/components/index';

export default {
  title: 'Components / NMRFileBrowser',
};

const actions = {
  setSpectra: {
    action: 'Spectra loaded',
  },
  appendSpectra: {
    action: 'Spectra appended',
  },
};

export function Control(props: NMRFileBrowserProps) {
  return (
    <div style={{ width: '75%', height: '100%' }}>
      <NMRFileBrowser {...props} />
    </div>
  );
}

Control.args = {
  useTag: true,
  displayNumber: 100,
  staleTime: 250,
};

Control.argTypes = actions;

export function InSplitPane() {
  const [spectra, setSpectra] = useState<string[]>([]);
  return (
    <SplitPane direction="horizontal">
      <div style={{ width: '100%', height: '100%' }}>
        <NMRFileBrowser
          setSpectra={(ids) => {
            if (typeof ids === 'string') {
              setSpectra([ids]);
            } else {
              setSpectra(ids);
            }
          }}
          appendSpectra={(ids) => {
            if (typeof ids === 'string') {
              setSpectra((current) => [...current, ids]);
            } else {
              setSpectra((current) => [...current, ...ids]);
            }
          }}
        />
      </div>
      <div>
        <ul>
          {spectra.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      </div>
    </SplitPane>
  );
}
