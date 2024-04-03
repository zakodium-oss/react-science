import { useState } from 'react';

import {
  Accordion,
  SplitPane,
  Toolbar,
  useToggleAccordion,
} from '../../src/components';
import { AccordionDecorator } from '../utils';

export default {
  title: 'Components / Accordion',
  decorators: [AccordionDecorator],
};

export function Fixed() {
  return (
    <div
      style={{
        height: 300,
      }}
    >
      <Accordion>
        <Accordion.Item title="First Item" defaultOpened>
          This is the first content
        </Accordion.Item>
        <Accordion.Item title="Second Item">
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
        <Accordion.Item title="With Toolbar">
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
      defaultOpened: true,
      content: 'This is the content of the first item',
    },
    {
      title: 'Second',
      defaultOpened: false,
      content: 'This is the content of the second item',
    },
  ]);

  function addElement() {
    setState([
      ...state,
      {
        title: `${state.length + 1}`,
        content: 'Element added',
        defaultOpened: false,
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
            <Accordion.Item key={element.title} {...element}>
              {content}
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </>
  );
}

export function WithToggle() {
  const utils = useToggleAccordion();

  function onCallback(title: string, action: 'open' | 'close') {
    if (action === 'open') {
      utils.open(title);
    } else {
      utils.close(title);
    }
  }

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
          <SplitPane size="35%">
            <div style={{ padding: 5, display: 'flex', gap: 5, height: 40 }}>
              <button
                type="button"
                onClick={() => onCallback('Spectra', 'open')}
                style={{
                  backgroundColor: 'rgba(252, 165, 165)',
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
              >
                Open Spectra
              </button>
              <button
                type="button"
                onClick={() => onCallback('Spectra', 'close')}
                style={{
                  backgroundColor: 'rgba(110, 231, 183)',
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
              >
                Close Spectra
              </button>
            </div>
            <div
              style={{
                width: '100%',
                height: '100%',
                flex: '1 1 0%',
              }}
            >
              <Accordion>
                <Accordion.Item title="Spectra" defaultOpened>
                  <p style={{ padding: 5 }}>Spectra lorem</p>
                </Accordion.Item>
                <Accordion.Item title="Integral">
                  <p style={{ padding: 5 }}>Integral lorem</p>
                </Accordion.Item>
              </Accordion>
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
}
