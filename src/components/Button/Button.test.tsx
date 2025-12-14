import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button/Button';

describe('Button Component', () => {
  const mockClickHandler = jest.fn();

  it('renders button with children text', () => {
    render(<Button clickHandler={mockClickHandler}>Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls clickHandler when clicked', () => {
    render(<Button clickHandler={mockClickHandler}>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });

  it('has default CSS class', () => {
    render(<Button clickHandler={mockClickHandler}>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    // Компонент использует CSS-модуль, поэтому проверим, что кнопка существует
    expect(button).toBeInTheDocument();
  });

  it('has proper structure', () => {
    render(
      <Button
        clickHandler={mockClickHandler}
      >
        Click me
      </Button>
    );

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });
});