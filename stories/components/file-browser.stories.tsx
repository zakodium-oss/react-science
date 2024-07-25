import { FileBrowser } from '../../src/components/index';

export default {
  title: 'Components / FileBrowser',
};

export function Basic() {
  return (
    <div style={{ width: '700px', height: '100%' }}>
      <FileBrowser />
    </div>
  );
}
