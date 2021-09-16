import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Toolbar } from '../Toolbar';

beforeEach(() => {
  render(
    <Toolbar orientation="horizontal">
      <Toolbar.Item id="a" title="first title">
        A
      </Toolbar.Item>
      <Toolbar.Item id="b" title="second title" active>
        B
      </Toolbar.Item>
    </Toolbar>,
  );
});

describe('<Toolbar />', () => {
  it('display the Toolbar', () => {
    const firstElement = screen.getByText('A');
    const secondElement = screen.getByText('B');

    expect(firstElement).toBeInTheDocument();
    expect(secondElement).toBeInTheDocument();
  });

  it('display the Toolbar in the right way', () => {
    const { parentElement } = screen.getByText('A')
      .parentElement as HTMLElement;

    expect(parentElement).toHaveStyle('flex-direction: row');
  });
});

describe('<Toolbar.Item />', () => {
  it('display the default active color', () => {
    const element = screen.getByText('B');
    expect(element).toHaveStyle('background-color: rgb(247, 247, 247)');
  });

  it('display the Toolbar.Item color', () => {
    const element = screen.getByText('A');
    userEvent.click(element, {}, { skipHover: true });

    expect(element).toHaveStyle('background-color: ButtonFace');
  });

  it('test the click on the button', () => {
    const fn = jest.fn();

    const { getByText } = render(
      <Toolbar orientation="horizontal">
        <Toolbar.Item id="c" title="c title">
          C
        </Toolbar.Item>
        <Toolbar.Item id="d" onClick={fn} title="c title" active>
          D
        </Toolbar.Item>
      </Toolbar>,
    );

    userEvent.click(getByText('D'));
    expect(fn).toHaveBeenCalled();
  });
});
