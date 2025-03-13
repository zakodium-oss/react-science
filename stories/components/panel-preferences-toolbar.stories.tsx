import {
  Accordion,
  Button,
  PanelPreferencesToolbar,
  useOnOff,
} from '../../src/components/index.js';

export default {
  title: 'Components / PanelPreferencesToolbar',
  component: PanelPreferencesToolbar,
};

export function Basic() {
  return (
    <div style={{ width: 300, height: 300 }}>
      <PanelPreferencesToolbar title="With title" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, adipisci
        culpa. Sapiente nesciunt perferendis repellendus. Voluptatum, cumque,
        autem maiores eaque non vero, ut tempora esse possimus corporis ex
        doloribus culpa!
      </p>
      <PanelPreferencesToolbar />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, adipisci
        culpa. Sapiente nesciunt perferendis repellendus. Voluptatum, cumque,
        autem maiores eaque non vero, ut tempora esse possimus corporis ex
        doloribus culpa!
      </p>
    </div>
  );
}

export function WithAccordion() {
  const [isOpen, open, close] = useOnOff();

  return (
    <div
      style={{
        height: 300,
      }}
    >
      <Accordion>
        <Accordion.Item id="first" title="First Item" defaultOpen>
          {isOpen ? (
            <div>
              <PanelPreferencesToolbar onSave={close} onClose={close} />
              <div style={{ backgroundColor: 'rgb(241, 241, 241)' }}>
                This is preferences content
              </div>
            </div>
          ) : (
            <div>
              <Button onClick={open}>Click to open preferences</Button>
            </div>
          )}
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
