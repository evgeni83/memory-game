// src/components/Card/Card.test.tsx
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import Card from './Card';
import { ICard } from '../../types/cards';

// Создаем фиктивный store для тестирования
const mockStore = configureStore({
  reducer: {
    cards: () => ({ list: [], matchedCardsAmount: 0 }),
    match: () => [],
    game: () => ({
      isGameStarted: true,
      timer: 0,
      lastTime: 0,
      timerID: 0,
      isGameOver: false,
      results: [],
      isRecord: false
    })
  },
});

// Подготовим тестовые данные для карточки
const mockCard: ICard = {
  id: 1,
  img: './images/test.png',
  isOpen: false,
  isHidden: false,
};

describe('Card Component', () => {
  test('renders card component', async () => {
    await act(async () => {
      render(
        <Provider store={mockStore}>
          <Card item={mockCard} />
        </Provider>
      );
    });

    // Проверяем, что компонент карточки рендерится
    const cardElement = screen.getByRole('button');
    expect(cardElement).toBeInTheDocument();
  });

  test('applies correct CSS classes based on card state', async () => {
    await act(async () => {
      render(
        <Provider store={mockStore}>
          <Card item={mockCard} />
        </Provider>
      );
    });

    const cardElement = screen.getByRole('button');
    // Карточка не открыта и не скрыта, так что не должно быть соответствующих классов
    expect(cardElement).not.toHaveClass('opened');
    expect(cardElement).not.toHaveClass('hidden');
  });

  test('applies "opened" class when card is open', async () => {
    const openCard = { ...mockCard, isOpen: true };
    await act(async () => {
      render(
        <Provider store={mockStore}>
          <Card item={openCard} />
        </Provider>
      );
    });

    const cardElement = screen.getByRole('button');
    expect(cardElement).toHaveClass('opened');
  });

  test('applies "hidden" class when card is hidden', async () => {
    const hiddenCard = { ...mockCard, isHidden: true };
    await act(async () => {
      render(
        <Provider store={mockStore}>
          <Card item={hiddenCard} />
        </Provider>
      );
    });

    const cardElement = screen.getByRole('button');
    expect(cardElement).toHaveClass('hidden');
  });
});