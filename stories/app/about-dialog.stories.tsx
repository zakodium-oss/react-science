import { FaMeteor } from 'react-icons/fa';

import { AboutDialogToolbarButton } from '../../src/app/index';
import { Toolbar } from '../../src/components/index';
import { RootLayoutDecorator } from '../utils';

export default {
  title: 'Components / AboutDialogToolbarButton',
  decorators: [RootLayoutDecorator],
};

export function DisplayAboutDialog() {
  return (
    <Toolbar orientation="horizontal">
      <AboutDialogToolbarButton
        icon={<FaMeteor />}
        name="tooltip"
        body={
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime et
            quod deleniti quae error deserunt, maiores quis consequuntur
            praesentium eveniet ipsam totam illo explicabo, repellat quo beatae
            eaque quibusdam ut!
          </p>
        }
      />
    </Toolbar>
  );
}
