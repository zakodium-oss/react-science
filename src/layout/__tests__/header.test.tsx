import { render, screen } from '@testing-library/react';
import React from 'react';

import { Header } from '../Header';

beforeEach(() => {
  render(
    <Header>
      <p title="a">A</p>
      <p title="b">B</p>
    </Header>,
  );
});

describe('<Header />', () => {
  it('display two element while creating a simple header', () => {
    const firstContent = screen.getByText('A');
    const secondContent = screen.getByText('B');

    expect(firstContent).toBeInTheDocument();
    expect(secondContent).toBeInTheDocument();
  });
});
