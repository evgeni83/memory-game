import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import StartScreen from '../StartScreen/StartScreen';

// Создаем mock store
const mockStore = configureStore({
  reducer: {
    game: (state = { isGameStarted: false, isGameOver: false, results: [] }, action) => state,
    cards: (state = { list: [] }, action) => state,
  },
});

describe('StartScreen Component', () => {
  const renderWithProvider = () => {
    return render(
      <Provider store={mockStore}>
        <StartScreen />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders start screen with play button', () => {
    renderWithProvider();

    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('renders "You win!" and results when game is over', () => {
    // Модифицируем store для теста с завершенной игрой
    const storeWithGameOver = configureStore({
      reducer: {
        game: (state = { isGameStarted: false, isGameOver: true, results: [45], lastTime: 45 }, action) => state,
        cards: (state = { list: [] }, action) => state,
      },
    });

    render(
      <Provider store={storeWithGameOver}>
        <StartScreen />
      </Provider>
    );

    expect(screen.getByText('You win!')).toBeInTheDocument();
    expect(screen.getByText('Play again')).toBeInTheDocument();
  });

  it('renders play button', () => {
    renderWithProvider();

    const playButton = screen.getByRole('button', { name: /play/i });
    expect(playButton).toBeInTheDocument();
  });

  it('renders results list when game results exist', () => {
    const storeWithResults = configureStore({
      reducer: {
        game: (state = { isGameStarted: false, isGameOver: false, results: [45, 60, 75] }, action) => state,
        cards: (state = { list: [] }, action) => state,
      },
    });

    render(
      <Provider store={storeWithResults}>
        <StartScreen />
      </Provider>
    );

    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('2.')).toBeInTheDocument();
    expect(screen.getByText('3.')).toBeInTheDocument();
  });
});