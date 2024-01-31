import { CardsActionsTypes } from '../../types/cards';
import { IMatchState } from '../../types/match';
import { createAction } from '@reduxjs/toolkit';

export const shuffleCards = createAction( CardsActionsTypes.SHUFFLE );
export const openCard = createAction<number>( CardsActionsTypes.OPEN );
export const closeOpenedCards = createAction<IMatchState>( CardsActionsTypes.CLOSE_OPENED );
export const hideMatchedCards = createAction<IMatchState>( CardsActionsTypes.HIDE_MATCHED );
export const showAllHiddenCards = createAction( CardsActionsTypes.SHOW_ALL_HIDDEN );
