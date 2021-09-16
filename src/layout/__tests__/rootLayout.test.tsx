import { render, screen } from '@testing-library/react';
import React from 'react';

import { RootLayout } from '../RootLayout';

beforeEach(() => {
  render(
    <RootLayout style={{ backgroundColor: 'red' }}>
      <p>A</p>
    </RootLayout>,
  );
});

describe('<RootLayout />', () => {
  it('display the RootLayout', () => {
    const element = screen.getByText('A');
    expect(element).toBeInTheDocument();
  });

  it('add the style if you give the props style', () => {
    const element = screen.getByText('A');
    expect(element.parentElement).toHaveStyle('background-color: red');
  });
});
