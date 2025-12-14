import React from 'react';
import { render, screen } from '@testing-library/react';
import Timer from '../Timer/Timer';

describe('Timer Component', () => {
  it('formats time correctly', () => {
    render(<Timer timer={125} />); // 2 минуты, 5 секунд

    // 125 секунд = 2 минуты 5 секунд = 02:05
    expect(screen.getByText('02:05')).toBeInTheDocument();
  });

  it('formats time less than a minute correctly', () => {
    render(<Timer timer={35} />); // 35 секунд

    // 35 секунд = 00:35
    expect(screen.getByText('00:35')).toBeInTheDocument();
  });

  it('formats single digit correctly with leading zeros', () => {
    render(<Timer timer={5} />); // 5 секунд

    // 5 секунд = 00:05
    expect(screen.getByText('00:05')).toBeInTheDocument();
  });
});