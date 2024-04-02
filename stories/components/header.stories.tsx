import { Header, Toolbar } from '../../src/components';

export default {
  title: 'Components / Header',
};

export function Basic() {
  return (
    <Header>
      <Toolbar>
        <Toolbar.Item hoverContent="Logo" icon="airplane" />
      </Toolbar>
      <Toolbar>
        <Toolbar.Item hoverContent="User manual" icon="manual" />
        <Toolbar.Item hoverContent="General settings" icon="cog" />
        <Toolbar.Item hoverContent="Full screen" icon="fullscreen" />
      </Toolbar>
    </Header>
  );
}
