import { Header, Toolbar } from '../../src/components';

export default {
  title: 'Components / Header',
};

export function Basic() {
  return (
    <Header>
      <Toolbar minimal>
        <Toolbar.Item title="Logo" icon="airplane" />
      </Toolbar>
      <Toolbar minimal>
        <Toolbar.Item title="User manual" icon="manual" />
        <Toolbar.Item title="General settings" icon="cog" />
        <Toolbar.Item title="Full screen" icon="fullscreen" />
      </Toolbar>
    </Header>
  );
}
