import { FaChevronDown } from 'react-icons/fa';

import { AboutDialogToolbarButton } from '../../src/app/index';
import { Toolbar } from '../../src/components/index';

export default {
  title: 'Components / AboutDialogToolbarButton',
};

export function DisplayAboutDialog() {
  return (
    <Toolbar orientation="horizontal">
      <AboutDialogToolbarButton
        icon={<FaChevronDown />}
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
