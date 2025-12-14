import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CardsGrid from '../CardsGrid/CardsGrid';

// Mock для Card компонента
jest.mock('../Card/Card', () => ({
  __esModule: true,
  default: ({ item }: any) => <div data-testid={`card-${item.id}`}>Mocked Card</div>,
}));

// Mock store с карточками
const mockStore = configureStore({
  reducer: {
    cards: (state = {
      list: [
        { id: 1, img: '/images/test1.png', isHidden: false, isOpen: false },
        { id: 2, img: '/images/test2.png', isHidden: false, isOpen: false },
        { id: 3, img: '/images/test3.png', isHidden: false, isOpen: false },
        { id: 4, img: '/images/test4.png', isHidden: false, isOpen: false },
      ]
    }, action) => state,
    match: (state = { list: [] }, action) => state,
  },
});

describe('CardsGrid Component', () => {
  const renderWithProvider = () => {
    return render(
      <Provider store={mockStore}>
        <CardsGrid />
      </Provider>
    );
  };

  it('renders grid container', () => {
    renderWithProvider();

    const gridContainer = screen.getByTestId('cards-grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('cardsGrid');
  });

  it('renders correct number of Card components', () => {
    renderWithProvider();

    // Поскольку у нас 4 карточки в моке, должно отрендериться 4 карточки
    const cards = screen.getAllByText('Mocked Card');
    expect(cards).toHaveLength(4);
  });

  it('applies correct CSS classes to grid container', () => {
    renderWithProvider();

    const gridContainer = screen.getByTestId('cards-grid');
    expect(gridContainer).toHaveClass('cardsGrid');
  });
});