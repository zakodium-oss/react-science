import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Accordion } from '../..';

beforeEach(() => {
  render(
    <Accordion>
      <Accordion.Item title="first">first element</Accordion.Item>
      <Accordion.Item title="second" defaultOpened>
        second element
      </Accordion.Item>
    </Accordion>,
  );
});

describe('<Accordion />', () => {
  it('Can open a menu', () => {
    const element = screen.getByText('first');
    const content = screen.getByText('first element');

    expect(content).toHaveStyle('display: none');
    userEvent.click(element);

    setTimeout(() => {
      expect(content).toHaveStyle('display: block');
    }, 300);
  });

  it('is default opened', () => {
    const content = screen.getByText('second element');
    expect(content).toHaveStyle('display: block');
  });

  it('Can close a menu', () => {
    const element = screen.getByText('second');
    const content = screen.getByText('second element');

    expect(content).toHaveStyle('display: block');
    userEvent.click(element);

    setTimeout(() => {
      expect(content).toHaveStyle('display: none');
    }, 300);
  });

  it('Close every accordion while double click', () => {
    const first = {
      title: screen.getByText('first'),
      content: screen.getByText('first element'),
    };

    const second = {
      title: screen.getByText('second'),
      content: screen.getByText('second element'),
    };

    // second should be opened (default) & first should be closed
    expect(second.content).toHaveStyle('display: block');
    expect(first.content).toHaveStyle('display: none');

    // double click on first title
    userEvent.click(first.title, undefined, { clickCount: 2 });

    setTimeout(() => {
      // first should be opened now
      expect(second.content).toHaveStyle('display: none');
      expect(first.content).toHaveStyle('display: block');
    }, 300);
  });
});
