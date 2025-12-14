import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App'; // Правильный путь

// Мокаем экшены
jest.mock('../store/actions/gameActions', () => {
  const original = jest.requireActual('../store/actions/gameActions');
  return {
    __esModule: true,
    ...original,
    getResults: jest.fn(() => ({ type: 'GET_RESULTS' })),
    setIsRecord: jest.fn(() => ({ type: 'SET_IS_RECORD', payload: false })),
    setLastTime: jest.fn(() => ({ type: 'SET_LAST_TIME', payload: 0 })),
    stopGame: jest.fn(() => ({ type: 'STOP_GAME', payload: true })),
    stopTimer: jest.fn(() => ({ type: 'STOP_TIMER' })),
    updateResults: jest.fn(() => ({ type: 'UPDATE_RESULTS' })),
    startGame: jest.fn(() => ({ type: 'START_GAME' })),
    updateTimer: jest.fn(() => ({ type: 'UPDATE_TIMER' })),
    startTimer: jest.fn(() => ({ type: 'START_TIMER', payload: 0 })),
  };
});

jest.mock('../store/actions/cardsActions', () => {
  const original = jest.requireActual('../store/actions/cardsActions');
  return {
    __esModule: true,
    ...original,
    shuffleCards: jest.fn(() => ({ type: 'SHUFFLE' })),
    showAllHiddenCards: jest.fn(() => ({ type: 'SHOW_ALL_HIDDEN' })),
  };
});

import * as gameActions from '../store/actions/gameActions';
import * as cardsActions from '../store/actions/cardsActions';

const mockGetResults = gameActions.getResults;
const mockShuffleCards = cardsActions.shuffleCards;
const mockStopGame = gameActions.stopGame;
const mockStopTimer = gameActions.stopTimer;
const mockUpdateResults = gameActions.updateResults;
const mockSetLastTime = gameActions.setLastTime;
const mockIsSetRecord = gameActions.setIsRecord;

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders start screen when game is not started', () => {
    const store = configureStore({
      reducer: {
        game: (state = { isGameStarted: false, isGameOver: false, results: [], timer: 0 }, action) => state,
        cards: (state = { list: [], matchedCardsAmount: 0 }, action) => state,
        match: (state = { list: [] }, action) => state,
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('MEMORY GAME')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('renders quit button when game is started', () => {
    const store = configureStore({
      reducer: {
        game: (state = { isGameStarted: true, isGameOver: false, results: [], timer: 0 }, action) => state,
        cards: (state = { list: [], matchedCardsAmount: 0 }, action) => state,
        match: (state = { list: [] }, action) => state,
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('MEMORY GAME')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /quit/i })).toBeInTheDocument();
  });

  it('renders cards grid when game is started', () => {
    const store = configureStore({
      reducer: {
        game: (state = { isGameStarted: true, isGameOver: false, results: [], timer: 0 }, action) => state,
        cards: (state = {
          list: [
            { id: 1, img: '/images/test.png', isHidden: false, isOpen: false },
            { id: 2, img: '/images/test.png', isHidden: false, isOpen: false },
          ],
          matchedCardsAmount: 0
        }, action) => state,
        match: (state = { list: [] }, action) => state,
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByTestId('cards-grid')).toBeInTheDocument();
  });

  it('dispatches actions on initial render', () => {
    const store = configureStore({
      reducer: {
        game: (state = { isGameStarted: false, isGameOver: false, results: [], timer: 0 }, action) => state,
        cards: (state = { list: [], matchedCardsAmount: 0 }, action) => state,
        match: (state = { list: [] }, action) => state,
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(mockGetResults).toHaveBeenCalledTimes(1);
    expect(mockShuffleCards).toHaveBeenCalledTimes(1);
  });

  it('dispatches stopGame and stopTimer when quit button is clicked', () => {
    const store = configureStore({
      reducer: {
        game: (state = { isGameStarted: true, isGameOver: false, results: [], timer: 0 }, action) => state,
        cards: (state = { list: [{id: 1, img:'', isHidden:false, isOpen:false}], matchedCardsAmount: 0 }, action) => state, // Создаем список с 1 элементом, чтобы matchedCardsAmount !== list.length
        match: (state = { list: [] }, action) => state,
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const quitButton = screen.getByRole('button', { name: /quit/i });
    fireEvent.click(quitButton);

    expect(mockStopGame).toHaveBeenCalledWith(true);
    expect(mockStopTimer).toHaveBeenCalledTimes(1);
  });
});