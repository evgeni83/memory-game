// src/store/reducers/cardsReducer.test.ts
import { cardsReducer } from './cardsReducer';
import { 
  shuffleCards, 
  openCard, 
  closeOpenedCards, 
  hideMatchedCards, 
  showAllHiddenCards 
} from '../../store/actions/cardsActions';
import { ICardsState } from '../../types/cards';
import { IMatchState } from '../../types/match';

// Создаем начальное состояние для тестов
// В реальном приложении createInitialCardsState создает 36 карточек
const createMockCardsState = (): ICardsState => {
  return {
    list: [
      { id: 1, img: 'img1', isOpen: false, isHidden: false },
      { id: 2, img: 'img2', isOpen: false, isHidden: false },
      { id: 3, img: 'img3', isOpen: false, isHidden: false },
    ],
    matchedCardsAmount: 0,
  };
};

describe('cardsReducer', () => {
  test('should return the initial state', () => {
    expect(cardsReducer(undefined, { type: '@@INIT' })).toBeDefined();
    expect(cardsReducer(undefined, { type: '@@INIT' })).toHaveProperty('list');
    expect(cardsReducer(undefined, { type: '@@INIT' })).toHaveProperty('matchedCardsAmount');
  });

  test('should handle openCard', () => {
    const initialState = createMockCardsState();
    const action = openCard(2); // Открываем карту с id 2
    
    const newState = cardsReducer(initialState, action);
    const openedCard = newState.list.find(card => card.id === 2);
    
    expect(openedCard).toBeDefined();
    expect(openedCard?.isOpen).toBe(true);
  });

  test('should handle closeOpenedCards', () => {
    // Создаем состояние с открытыми картами
    const initialState = {
      ...createMockCardsState(),
      list: [
        { id: 1, img: 'img1', isOpen: true, isHidden: false },
        { id: 2, img: 'img2', isOpen: true, isHidden: false },
        { id: 3, img: 'img3', isOpen: false, isHidden: false },
      ],
    };
    
    const cardsToClose: IMatchState = [
      { id: 1, img: 'img1', isOpen: true, isHidden: false },
      { id: 2, img: 'img2', isOpen: true, isHidden: false },
    ];
    
    const action = closeOpenedCards(cardsToClose);
    const newState = cardsReducer(initialState, action);
    
    const card1 = newState.list.find(card => card.id === 1);
    const card2 = newState.list.find(card => card.id === 2);
    
    expect(card1?.isOpen).toBe(false);
    expect(card2?.isOpen).toBe(false);
  });

  test('should handle hideMatchedCards', () => {
    const initialState = createMockCardsState();
    
    const matchedCards: IMatchState = [
      { id: 1, img: 'img1', isOpen: false, isHidden: false },
    ];
    
    const action = hideMatchedCards(matchedCards);
    const newState = cardsReducer(initialState, action);
    
    const hiddenCard = newState.list.find(card => card.id === 1);
    
    expect(hiddenCard?.isHidden).toBe(true);
    expect(newState.matchedCardsAmount).toBe(1);
  });

  test('should handle showAllHiddenCards', () => {
    const initialState = {
      ...createMockCardsState(),
      list: [
        { id: 1, img: 'img1', isOpen: true, isHidden: true },
        { id: 2, img: 'img2', isOpen: false, isHidden: true },
        { id: 3, img: 'img3', isOpen: false, isHidden: false },
      ],
      matchedCardsAmount: 2,
    };
    
    const action = showAllHiddenCards();
    const newState = cardsReducer(initialState, action);
    
    expect(newState.list.every(card => !card.isHidden)).toBe(true);
    expect(newState.list.every(card => !card.isOpen)).toBe(true);
    expect(newState.matchedCardsAmount).toBe(0);
  });

  test('should not change state for unknown action', () => {
    const initialState = createMockCardsState();
    const originalStateCopy = JSON.parse(JSON.stringify(initialState));
    
    const action = { type: 'UNKNOWN_ACTION', payload: {} };
    const newState = cardsReducer(initialState, action);
    
    expect(newState).toEqual(originalStateCopy);
  });
});