// src/store/reducers/gameReducer.test.ts
import { gameReducer } from './gameReducer';
import { 
  startGame, 
  stopGame, 
  startTimer, 
  stopTimer, 
  updateTimer, 
  setLastTime, 
  getResults, 
  updateResults, 
  setIsRecord 
} from '../../store/actions/gameActions';
import { IGameState } from '../../types/game';

// Создаем начальное состояние для тестов
const initialGameState: IGameState = {
  isGameStarted: false,
  timer: 0,
  lastTime: 0,
  timerID: 0,
  isGameOver: false,
  results: [],
  isRecord: false,
};

describe('gameReducer', () => {
  test('should return the initial state', () => {
    expect(gameReducer(undefined, { type: '@@INIT' })).toEqual(initialGameState);
  });

  test('should handle startGame', () => {
    const action = startGame();
    const expectedState = {
      ...initialGameState,
      isGameStarted: true,
      isGameOver: false,
    };

    expect(gameReducer(initialGameState, action)).toEqual(expectedState);
  });

  test('should handle stopGame with quit=true', () => {
    const action = stopGame(true); // quit = true
    const stateWithGameStarted: IGameState = {
      ...initialGameState,
      isGameStarted: true,
      timerID: 12345,
    };
    const expectedState = {
      ...initialGameState,
      isGameStarted: false,
      isGameOver: false, // because !action.payload (quit = true so !true = false)
      // timerID остается без изменений, только clearInterval вызывается
      timerID: 12345,
    };

    expect(gameReducer(stateWithGameStarted, action)).toEqual(expectedState);
  });

  test('should handle stopGame with quit=false', () => {
    const action = stopGame(false); // quit = false
    const stateWithGameStarted: IGameState = {
      ...initialGameState,
      isGameStarted: true,
      timerID: 12345,
    };
    const expectedState = {
      ...initialGameState,
      isGameStarted: false,
      isGameOver: true, // because !action.payload (quit = false so !false = true)
      // timerID остается без изменений, только clearInterval вызывается
      timerID: 12345,
    };

    expect(gameReducer(stateWithGameStarted, action)).toEqual(expectedState);
  });

  test('should handle startTimer', () => {
    const action = startTimer(12345);
    const expectedState = {
      ...initialGameState,
      timerID: 12345,
    };

    expect(gameReducer(initialGameState, action)).toEqual(expectedState);
  });

  test('should handle updateTimer with undefined (increment)', () => {
    const stateWithTimer = { ...initialGameState, timer: 5 };
    const action = updateTimer(undefined); // should increment timer
    const expectedState = {
      ...initialGameState,
      timer: 6, // 5 + 1
    };

    expect(gameReducer(stateWithTimer, action)).toEqual(expectedState);
  });

  test('should handle updateTimer with 0 (reset)', () => {
    const stateWithTimer = { ...initialGameState, timer: 10 };
    const action = updateTimer(0);
    const expectedState = {
      ...initialGameState,
      timer: 0, // reset to 0
    };

    expect(gameReducer(stateWithTimer, action)).toEqual(expectedState);
  });

  test('should handle setLastTime', () => {
    const action = setLastTime(120);
    const expectedState = {
      ...initialGameState,
      lastTime: 120,
    };

    expect(gameReducer(initialGameState, action)).toEqual(expectedState);
  });

  test('should handle stopTimer', () => {
    const stateWithTimer = {
      ...initialGameState,
      timer: 100,
      timerID: 12345,
    };
    const action = stopTimer();
    const expectedState = {
      ...initialGameState,
      timer: 0,
      timerID: 0,
    };

    expect(gameReducer(stateWithTimer, action)).toEqual(expectedState);
  });

  test('should handle setIsRecord', () => {
    const action = setIsRecord(true);
    const expectedState = {
      ...initialGameState,
      isRecord: true,
    };

    expect(gameReducer(initialGameState, action)).toEqual(expectedState);
  });
});