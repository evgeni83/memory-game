import store from './index';

describe('Store Configuration', () => {
  it('has correct structure', () => {
    // Проверяем, что стор имеет правильную структуру
    expect(store.getState()).toHaveProperty('game');
    expect(store.getState()).toHaveProperty('cards');
    expect(store.getState()).toHaveProperty('match');
  });

  it('handles actions correctly', () => {
    // Проверяем начальное состояние
    const initialState = store.getState();
    expect(initialState.game.isGameStarted).toBe(false);
    expect(initialState.game.isGameOver).toBe(false);
    // Проверяем, что cards.list определен и является массивом
    expect(initialState.cards.list).toBeDefined();
    expect(Array.isArray(initialState.cards.list)).toBe(true);
    // match - это кортеж [ICard?, ICard?], при инициализации пустой
    expect(initialState.match).toEqual([]);
  });
});