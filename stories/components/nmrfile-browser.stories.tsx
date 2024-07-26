import { NMRFileBrowser } from '../../src/components/index';

export default {
  title: 'Components / NMRFileBrowser',
};

export function Basic() {
  return (
    <div style={{ width: '700px', height: '100%' }}>
      <NMRFileBrowser />
    </div>
  );
}
