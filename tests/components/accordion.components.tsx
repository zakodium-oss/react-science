import { Accordion, AccordionProvider } from '../../src/components/index.js';

export function AccordionWithItems() {
  return (
    <AccordionProvider>
      <Accordion>
        <Accordion.Item id="first" title="First" defaultOpen>
          First content
        </Accordion.Item>
        <Accordion.Item id="second" title="Second">
          Second content
        </Accordion.Item>
        <Accordion.Item id="third" title="Third" unmountChildren>
          Third content
        </Accordion.Item>
      </Accordion>
    </AccordionProvider>
  );
}
