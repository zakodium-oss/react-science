import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Accordion } from '../..';
import { RootLayout } from '../RootLayout';

beforeEach(() => {
  render(
    <RootLayout>
      <div style={{ height: 500 }}>
        <Accordion>
          <Accordion.Item title="first">first element</Accordion.Item>
          <Accordion.Item title="second" defaultOpened>
            second element
          </Accordion.Item>
        </Accordion>
      </div>
    </RootLayout>,
  );
});

describe('<Accordion />', () => {
  it('Can open a menu', () => {
    const element = screen.getByText('first');
    const content = screen.getByText('first element');

    expect(content.parentElement).toHaveStyle('display: none');
    userEvent.click(element);

    setTimeout(() => {
      expect(content).toHaveStyle('display: flex');
    }, 300);
  });

  it('is default opened', () => {
    const content = screen.getByText('second element');
    expect(content).toHaveStyle('display: flex');
  });

  it('Can close a menu', () => {
    const element = screen.getByText('second');
    const content = screen.getByText('second element');

    expect(content).toHaveStyle('display: flex');
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
    expect(second.content.parentElement).toHaveStyle('display: flex');
    expect(first.content.parentElement).toHaveStyle('display: none');

    // double click on first title
    userEvent.click(first.title, undefined, { clickCount: 2 });

    setTimeout(() => {
      // first should be opened now
      expect(second.content.parentElement).toHaveStyle('display: none');
      expect(first.content.parentElement).toHaveStyle('display: flex');
    }, 300);
  });
});
