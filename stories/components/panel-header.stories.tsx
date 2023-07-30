import { FaRegTrashAlt, FaFilter, FaPlus } from 'react-icons/fa';

import {
  PanelHeader,
  Accordion,
  Button,
  Modal,
  useOnOff,
} from '../../src/components';

export function Basic() {
  return (
    <div
      style={{
        height: 300,
      }}
    >
      <PanelHeader count={3} onClickSettings={() => {}}>
        <Button
          color={{ basic: 'black', hover: 'red' }}
          backgroundColor={{ basic: 'white', hover: 'white' }}
        >
          <FaRegTrashAlt />
        </Button>
        <Button
          color={{ basic: 'black', hover: 'black' }}
          backgroundColor={{ basic: 'white', hover: 'white' }}
        >
          <FaFilter style={{ pointerEvents: 'none', fontSize: '12px' }} />
        </Button>
        <Button
          color={{ basic: 'black', hover: 'black' }}
          backgroundColor={{ basic: 'white', hover: 'white' }}
        >
          <FaPlus style={{ pointerEvents: 'none', fontSize: '12px' }} />
        </Button>
      </PanelHeader>
    </div>
  );
}
export function WithModal() {
  const [isOpen, open, close] = useOnOff();
  return (
    <div
      style={{
        height: 300,
      }}
    >
      <PanelHeader count={5} onClickSettings={open}>
        <Button
          color={{ basic: 'black', hover: 'red' }}
          backgroundColor={{ basic: 'white', hover: 'white' }}
        >
          <FaRegTrashAlt />
        </Button>
        <Button
          color={{ basic: 'black', hover: 'black' }}
          backgroundColor={{ basic: 'white', hover: 'white' }}
        >
          <FaFilter style={{ pointerEvents: 'none', fontSize: '12px' }} />
        </Button>
        <Button
          color={{ basic: 'black', hover: 'black' }}
          backgroundColor={{ basic: 'white', hover: 'white' }}
        >
          <FaPlus style={{ pointerEvents: 'none', fontSize: '12px' }} />
        </Button>
      </PanelHeader>
      <Modal isOpen={isOpen} onRequestClose={close} width={400}>
        <Modal.Header>Settings</Modal.Header>
        <Modal.Body>
          <p style={{ paddingLeft: 20, paddingRight: 20 }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
            accusamus voluptas odit minima amet obcaecati eveniet voluptatibus
            assumenda esse animi id atque natus ipsa sunt iure illo,
            exercitationem voluptates non.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
          >
            <Button
              onClick={close}
              backgroundColor={{
                basic: 'hsla(243deg, 75%, 58%, 1)',
                hover: 'hsla(245deg, 58%, 50%, 1)',
              }}
              color={{ basic: 'white' }}
            >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export function WithAccordion() {
  return (
    <div
      style={{
        height: 300,
      }}
    >
      <Accordion>
        <Accordion.Item title="First Item" defaultOpened>
          <PanelHeader count={20} onClickSettings={() => {}}>
            <Button
              color={{ basic: 'black', hover: 'red' }}
              backgroundColor={{ basic: 'white', hover: 'white' }}
            >
              <FaRegTrashAlt />
            </Button>
            <Button
              color={{ basic: 'black', hover: 'black' }}
              backgroundColor={{ basic: 'white', hover: 'white' }}
            >
              <FaFilter style={{ pointerEvents: 'none', fontSize: '12px' }} />
            </Button>
            <Button
              color={{ basic: 'black', hover: 'black' }}
              backgroundColor={{ basic: 'white', hover: 'white' }}
            >
              <FaPlus style={{ pointerEvents: 'none', fontSize: '12px' }} />
            </Button>
          </PanelHeader>
          This is the first content
        </Accordion.Item>
        <Accordion.Item title="Second Item">
          <PanelHeader count={3} onClickSettings={() => {}}>
            <Button
              color={{ basic: 'black', hover: 'black' }}
              backgroundColor={{ basic: 'white', hover: 'white' }}
            >
              <FaFilter style={{ pointerEvents: 'none', fontSize: '12px' }} />
            </Button>
          </PanelHeader>
          This is the content of the second item
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
