import { Button } from '@blueprintjs/core';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { useCallback, useState } from 'react';

import type {
  AccordionItemProps,
  ToolbarItemProps,
} from '../../src/components/index.js';
import {
  Accordion,
  AccordionProvider,
  SplitPane,
  Toolbar,
  useAccordionControls,
} from '../../src/components/index.js';
import { AccordionDecorator } from '../utils.js';

export default {
  title: 'Components / Accordion',
  component: Accordion.Item,
  decorators: [AccordionDecorator],
  args: {
    onOpenChange: action('onOpenChange'),
  },
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

export function Control(props: AccordionItemProps) {
  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <Accordion>
        <Accordion.Item
          {...props}
          id="first"
          title="First Item"
          defaultOpen
          renderToolbar={() => (
            <Toolbar>
              {items.map((item) => (
                <Toolbar.Item
                  key={item.id}
                  id={item.id}
                  tooltip={item.tooltip}
                  icon={item.icon}
                  onClick={(event) => {
                    event?.stopPropagation();
                  }}
                />
              ))}
            </Toolbar>
          )}
        >
          This is the first content
        </Accordion.Item>
        <Accordion.Item {...props} id="second" title="Second Item">
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
        <Accordion.Item {...props} title="With Toolbar">
          <Toolbar>
            <Toolbar.Item tooltip="Test A" icon="lab-test" />
            <Toolbar.Item tooltip="Test B" icon="airplane" />
          </Toolbar>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export function WithDynamicItems() {
  const [state, setState] = useState([
    {
      title: 'first',
      defaultOpen: true,
      content: 'This is the content of the first item',
    },
    {
      title: 'Second',
      defaultOpen: false,
      content: 'This is the content of the second item',
    },
  ]);

  function addElement() {
    setState([
      ...state,
      {
        title: `${state.length + 1}`,
        content: 'Element added',
        defaultOpen: false,
      },
    ]);
  }

  function removeElement() {
    const elements = state.slice();
    elements.pop();

    setState([...elements]);
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 20,
          marginTop: 20,
          gap: 10,
        }}
      >
        <button
          type="button"
          onClick={addElement}
          style={{ backgroundColor: 'rgba(252, 165, 165)', padding: 5 }}
        >
          Add new element
        </button>

        <button
          type="button"
          onClick={removeElement}
          style={{ backgroundColor: 'rgba(252, 165, 165)', padding: 5 }}
        >
          Delete the latest element
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          height: 300,
        }}
      >
        <Accordion>
          {state.map(({ content, ...element }) => (
            <Accordion.Item id={element.title} key={element.title} {...element}>
              {content}
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </>
  );
}

type WithToggleTitle = 'spectra' | 'integral';

export function WithToggle() {
  const utils = useAccordionControls<WithToggleTitle>();
  const TypedAccordionItem = Accordion.Item<WithToggleTitle>;
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '300px',
          }}
        >
          <SplitPane defaultSize="35%">
            <div
              style={{
                padding: 5,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridTemplateRows: '30px 30px',
                gap: 5,
              }}
            >
              <Button onClick={() => utils.open('spectra')}>
                Open Spectra
              </Button>
              <Button onClick={() => utils.close('spectra')}>
                Close Spectra
              </Button>
              <Button onClick={() => utils.toggle('spectra')}>
                Toggle Spectra
              </Button>
              <Button onClick={() => utils.open('integral')}>
                Open Integral
              </Button>
              <Button onClick={() => utils.close('integral')}>
                Close Integral
              </Button>
              <Button onClick={() => utils.toggle('integral')}>
                Toggle Integral
              </Button>
            </div>
            <div
              style={{
                width: '100%',
                height: '100%',
                flex: '1 1 0%',
              }}
            >
              <Accordion>
                <TypedAccordionItem id="spectra" title="Spectra" defaultOpen>
                  <p style={{ padding: 5 }}>Spectra lorem</p>
                </TypedAccordionItem>
                <TypedAccordionItem id="integral" title="Integral">
                  <p style={{ padding: 5 }}>Integral lorem</p>
                </TypedAccordionItem>
              </Accordion>
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
}

WithToggle.storyName = 'With the useToggleAccordion hook';

export const UnmountChildren = {
  decorators: [],
  args: {
    unmountChildren: true,
  },
  render: (props) => {
    return (
      <AccordionProvider {...props}>
        <Accordion>
          <Accordion.Item id="first" title="First">
            <Count />
          </Accordion.Item>
          <Accordion.Item id="second" title="Second" defaultOpen>
            <Count />
          </Accordion.Item>
        </Accordion>
      </AccordionProvider>
    );
  },
} satisfies Meta;

export function UnmountSomeChildren() {
  return (
    <Accordion>
      <Accordion.Item id="1" title="Always render children" defaultOpen>
        <Count />
      </Accordion.Item>
      <Accordion.Item
        id="2"
        title="Unmount children"
        defaultOpen
        unmountChildren
      >
        <Count />
      </Accordion.Item>
    </Accordion>
  );
}

export function WithToolbar() {
  function renderToolbar(isOpen: boolean) {
    return <Button icon={isOpen ? 'minus' : 'plus'} variant="minimal" />;
  }
  return (
    <Accordion>
      <Accordion.Item id="first" title="First" renderToolbar={renderToolbar}>
        First content
      </Accordion.Item>
      <Accordion.Item
        id="second"
        title="Second"
        defaultOpen
        renderToolbar={renderToolbar}
      >
        Second content
      </Accordion.Item>
    </Accordion>
  );
}

type ControlledTitle = 'first' | 'second';

export function ControlledState() {
  const [openItems, setOpenItems] = useState<ControlledTitle[]>(['first']);

  const addItem = useCallback(
    (title: ControlledTitle) => {
      setOpenItems((openItems) => Array.from(new Set([...openItems, title])));
    },
    [setOpenItems],
  );

  const removeItem = useCallback(
    (title: ControlledTitle) => {
      setOpenItems((openItems) => openItems.filter((item) => item !== title));
    },
    [setOpenItems],
  );

  const TypedAccordionItem = Accordion.Item<ControlledTitle>;

  return (
    <Accordion>
      <TypedAccordionItem
        id="first"
        title="First"
        open={openItems.includes('first')}
        onOpenChange={(isOpen) =>
          isOpen ? addItem('first') : removeItem('first')
        }
      >
        First content
      </TypedAccordionItem>
      <TypedAccordionItem
        id="second"
        title="Second"
        open={openItems.includes('second')}
        onOpenChange={(isOpen) =>
          isOpen ? addItem('second') : removeItem('second')
        }
      >
        Second content
      </TypedAccordionItem>
    </Accordion>
  );
}

export function BadWithIdenticalTitle() {
  return (
    <>
      <div>
        This story should throw a global exception and thus not be displayed
        properly
      </div>
      <Accordion>
        <Accordion.Item id="item" title="Accordion item">
          Item 1
        </Accordion.Item>
        <Accordion.Item id="item" title="Accordion item">
          Item 2
        </Accordion.Item>
      </Accordion>
    </>
  );
}

function Count() {
  const [count, setCount] = useState(0);

  return (
    <Button
      onClick={() => setCount((prev) => prev + 1)}
      style={{ margin: 4, alignSelf: 'start' }}
    >
      Click to increment ({count})
    </Button>
  );
}
