import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../Header/Header';

describe('Header Component', () => {
  it('displays timer correctly', () => {
    const store = configureStore({
      reducer: {
        game: (state = { timer: 45 }, action) => state,
      },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Таймер 45 секунд должен отображаться как 00:45
    expect(screen.getByText('00:45')).toBeInTheDocument();
  });

  it('formats timer correctly for different values', () => {
    // Проверим форматирование таймера с разными значениями
    const store = configureStore({
      reducer: {
        game: (state = { timer: 3665 }, action) => state, // 1 час, 1 минута, 5 секунд
      },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // 3665 секунд = 1ч 1м 5с, но таймер в игре ограничивается минутами и секундами
    // Формат: MM:SS, где MM - минуты, SS - секунды
    // 3665 % 3600 = 65 секунд = 1 минута, 5 секунд = 01:05
    expect(screen.getByText('01:05')).toBeInTheDocument();
  });

  it('displays title correctly', () => {
    const store = configureStore({
      reducer: {
        game: (state = { timer: 30 }, action) => state,
      },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText('MEMORY GAME')).toBeInTheDocument();
  });
});