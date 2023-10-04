import { AboutDialogToolbarButton } from '../../src/app';
import { Toolbar } from '../../src/components';

export default {
  title: 'Components / AboutDialogToolbarButton',
};

export function DisplayAboutDialog() {
  return (
    <Toolbar>
      <AboutDialogToolbarButton
        icon="airplane"
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
