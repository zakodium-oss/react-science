import {
  NMRFileBrowser,
  NMRFileBrowserProps,
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

export function Basic(props: NMRFileBrowserProps) {
  return (
    <div style={{ width: '50%', height: '100%' }}>
      <NMRFileBrowser {...props} />
    </div>
  );
}

Basic.argTypes = actions;
