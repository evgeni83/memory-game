// src/store/reducers/matchReducer.test.ts
import { matchReducer } from './matchReducer';
import { addToMatch, cleanMatch } from '../../store/actions/matchActions';
import { ICard } from '../../types/cards';

describe('matchReducer', () => {
  test('should return the initial state', () => {
    expect(matchReducer(undefined, { type: '@@INIT' })).toEqual([]);
  });

  test('should handle addToMatch when match is empty', () => {
    const card: ICard = { id: 1, img: 'img1', isOpen: true, isHidden: false };
    const action = addToMatch(card);
    
    const newState = matchReducer([], action);
    expect(newState).toEqual([card]);
  });

  test('should handle addToMatch when match has one card and cards are different', () => {
    const existingCard: ICard = { id: 1, img: 'img1', isOpen: true, isHidden: false };
    const newCard: ICard = { id: 2, img: 'img2', isOpen: true, isHidden: false };
    
    const action = addToMatch(newCard);
    const newState = matchReducer([existingCard], action);
    
    expect(newState).toEqual([existingCard, newCard]);
  });

  test('should not add card to match when match has one card and cards are the same', () => {
    const existingCard: ICard = { id: 1, img: 'img1', isOpen: true, isHidden: false };
    
    // Пытаемся добавить ту же карту
    const action = addToMatch(existingCard);
    const newState = matchReducer([existingCard], action);
    
    expect(newState).toEqual([existingCard]); // не должно измениться
  });

  test('should not add card to match when match already has two cards', () => {
    const card1: ICard = { id: 1, img: 'img1', isOpen: true, isHidden: false };
    const card2: ICard = { id: 2, img: 'img2', isOpen: true, isHidden: false };
    const card3: ICard = { id: 3, img: 'img3', isOpen: true, isHidden: false };

    const stateWithTwoCards: [ICard, ICard] = [card1, card2];
    const action = addToMatch(card3);
    const newState = matchReducer(stateWithTwoCards, action);

    expect(newState).toEqual(stateWithTwoCards); // не должно измениться
  });

  test('should handle cleanMatch', () => {
    const stateWithCards: [ICard, ICard] = [
      { id: 1, img: 'img1', isOpen: true, isHidden: false },
      { id: 2, img: 'img2', isOpen: true, isHidden: false },
    ];

    const action = cleanMatch();
    const newState = matchReducer(stateWithCards, action);

    expect(newState).toEqual([]);
  });

  test('should not change state for unknown action', () => {
    const initialState: [ICard] = [
      { id: 1, img: 'img1', isOpen: true, isHidden: false },
    ];
    const originalStateCopy = JSON.parse(JSON.stringify(initialState));

    const action = { type: 'UNKNOWN_ACTION', payload: {} };
    const newState = matchReducer(initialState, action);

    expect(newState).toEqual(originalStateCopy);
  });
});