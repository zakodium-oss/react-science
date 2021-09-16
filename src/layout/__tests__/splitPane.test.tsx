import { render, screen } from '@testing-library/react';
import React from 'react';

import { SplitPane } from '../SplitPane';

beforeEach(() => {
  render(
    <SplitPane initialSeparation="50%" sideSeparation="end">
      <p>A</p>
      <p>B</p>
    </SplitPane>,
  );
});

describe('<SplitPane />', () => {
  it('display the SplitPane', () => {
    const firstElement = screen.getByText('A');
    const secondElement = screen.getByText('B');

    expect(firstElement).toBeInTheDocument();
    expect(secondElement).toBeInTheDocument();
  });

  it('should set the initialSeparation to 50%', () => {
    const { parentElement: element } = screen.getByText('A');
    const { parentElement } = element as HTMLElement;

    expect(parentElement?.childNodes[2]).toHaveStyle('width: 50%');
  });
});
