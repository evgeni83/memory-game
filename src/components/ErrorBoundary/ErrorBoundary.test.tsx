import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

// Компонент, который генерирует ошибку для тестирования ErrorBoundary
const BrokenComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    // Подавляем ошибки в консоли во время тестирования
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Normal content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();
    // В русской версии ошибка отображается как "Что-то пошло не так."
    expect(screen.queryByText('Что-то пошло не так.')).not.toBeInTheDocument();
  });

  it('renders error message when child component throws error', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Что-то пошло не так.')).toBeInTheDocument();
  });

  it('has correct CSS classes', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    // Ожидаем, что ошибка будет в элементе с классом errorContainer
    const errorContainer = screen.getByText('Что-то пошло не так.').closest('div');
    expect(errorContainer).toHaveClass('errorContainer');
  });
});