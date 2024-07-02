import {
  Accordion,
  ToolWindow,
  ToolWindowPanel,
  Toolbar,
  ToolbarItemProps,
} from '../../src/components';
import { AccordionDecorator } from '../utils';

export default {
  title: 'Components / ToolWindow',
  decorators: [AccordionDecorator],
};
const items: Array<
  Pick<ToolbarItemProps, 'tooltip' | 'icon' | 'disabled'> & {
    id: string;
  }
> = [
  {
    id: 'paperclip-blueprint',
    icon: 'paperclip',
    tooltip: 'BlueprintJS paperclip icon',
  },

  {
    id: 'clipboard-blueprint',
    icon: 'clipboard',
    tooltip: 'BlueprintJS paperclip icon',
  },

  {
    id: 'credit-card-blueprint',
    icon: 'credit-card',
    tooltip: 'BlueprintJS credit-card icon',
    disabled: false,
  },
];

export function Fixed() {
  const panels: ToolWindowPanel[] = [
    {
      id: 'first',
      icon: 'paperclip',
      renderPanel: () => (
        <Accordion.Item
          title="First Item"
          defaultOpened
          toolbar={
            <Toolbar>
              {items.map((item) => (
                <Toolbar.Item
                  key={item.id}
                  id={item.id}
                  tooltip={item.tooltip}
                  icon={item.icon}
                  onClick={({ event }) => {
                    event?.stopPropagation();
                  }}
                />
              ))}
            </Toolbar>
          }
        >
          This is the first content
        </Accordion.Item>
      ),
    },
    {
      id: 'second',
      icon: 'clipboard',
      renderPanel: () => (
        <Accordion.Item title="Second Item" defaultOpened>
          This is the content of the second item Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Error provident illum quidem quod dicta
          sed aperiam ex iusto nesciunt culpa esse, quibusdam quam ea
          praesentium vitae excepturi nulla aliquam maxime. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Consequuntur illo vel, quidem,
          fuga autem sint debitis accusamus, aperiam totam nam itaque excepturi.
          Fugit illo placeat dolorem quisquam vel dolores sed? Lorem ipsum dolor
          sit amet consectetur adipisicing elit. In aperiam excepturi facere
          dolore? Ut ipsum deserunt atque soluta voluptas minus, in facere sequi
          pariatur perferendis doloremque esse repellat exercitationem
          excepturi. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Totam exercitationem sed libero deserunt repellat impedit, veniam,
          laudantium consequuntur vero aspernatur odit. Ipsam delectus,
          consequatur at eveniet dolorum accusantium dolore eligendi? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Esse, fugiat eum
          obcaecati quod ex illum odit placeat, excepturi enim vero fuga ullam
          corrupti sunt odio a blanditiis incidunt asperiores ipsam. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Labore corrupti est
          numquam officiis, iusto minus ratione! Repudiandae iure ipsum laborum
          itaque eligendi rerum nesciunt, reprehenderit vero eveniet velit
          minima dignissimos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Facilis praesentium ipsum hic magnam ullam vel sunt. Eveniet non
          minus libero soluta! Voluptatum autem id voluptate ex possimus est
          soluta ab. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Maxime blanditiis suscipit fuga, sequi magnam fugiat sunt quibusdam!
          Ut eos exercitationem sit nostrum est, aperiam adipisci nemo, in
          placeat esse libero! Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Mollitia, iste praesentium atque numquam unde
          maiores eos dolorem quae eaque earum harum officiis, deserunt
          provident! Praesentium quas deserunt iusto et alias. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Recusandae ea labore eveniet
          praesentium itaque. Molestias mollitia architecto minima culpa
          reiciendis doloribus. Repudiandae dolorem iusto, quibusdam consequatur
          minima fugiat eum hic. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Voluptatibus maiores officia repellat cupiditate
          libero, ad, exercitationem odit, assumenda ex aperiam tempore harum
          delectus quidem amet dicta vitae commodi debitis. Fugiat? Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Ad ipsam enim quis iusto
          sit veniam esse id accusantium quos minima facilis commodi quibusdam,
          quisquam odit ratione fugiat ducimus accusamus alias!ebitis accusamus,
          aperiam totam nam itaque excepturi. Fugit illo placeat dolorem
          quisquam vel dolores sed? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. In aperiam excepturi facere dolore? Ut ipsum
          deserunt atque soluta voluptas minus, in facere sequi pariatur
          perferendis doloremque esse repellat exercitationem excepturi. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Totam
          exercitationem sed libero deserunt repellat impedit, veniam,
          laudantium consequuntur vero aspernatur odit. Ipsam delectus,
          consequatur at eveniet dolorum accusantium dolore eligendi? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Esse, fugiat eum
          obcaecati quod ex illum odit placeat, excepturi enim vero fuga ullam
          corrupti sunt odio a blanditiis incidunt asperiores ipsam. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Labore corrupti est
          numquam officiis, iusto minus ratione! Repudiandae iure ipsum laborum
          itaque eligendi rerum nesciunt, reprehenderit vero eveniet velit
          minima dignissimos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Facilis praesentium ipsum hic magnam ullam vel sunt. Eveniet non
          minus libero soluta! Voluptatum autem id voluptate ex possimus est
          soluta ab. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Maxime blanditiis suscipit fuga, sequi magnam fugiat sunt quibusdam!
          Ut eos exercitationem sit nostrum est, aperiam adipisci nemo, in
          placeat esse libero! Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Mollitia, iste praesentium atque numquam unde
          maiores eos dolorem quae eaque earum harum officiis, deserunt
          provident! Praesentium quas deserunt iusto et alias. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Recusandae ea labore eveniet
          praesentium itaque. Molestias mollitia architecto minima culpa
          reiciendis doloribus. Repudiandae dolorem iusto, quibusdam consequatur
          minima fugiat eum hic. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Voluptatibus maiores officia repellat cupiditate
          libero, ad, exercitationem odit, assumenda ex aperiam tempore harum
          delectus quidem amet dicta vitae commodi debitis. Fugiat? Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Ad ipsam enim quis iusto
          sit veniam esse id accusantium quos minima facilis commodi quibus
        </Accordion.Item>
      ),
    },
    {
      id: 'third',
      icon: 'credit-card',
      renderPanel: () => (
        <Accordion.Item title="With Toolbar" defaultOpened>
          <Toolbar>
            <Toolbar.Item tooltip="Test A" icon="lab-test" />
            <Toolbar.Item tooltip="Test B" icon="airplane" />
          </Toolbar>
        </Accordion.Item>
      ),
    },
  ];
  return (
    <div
      style={{
        height: 300,
      }}
    >
      <ToolWindow panels={panels} intialPanels={['first']} />
    </div>
  );
}
