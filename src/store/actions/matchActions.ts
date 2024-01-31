import { ICard } from '../../types/cards';
import { MatchActionsTypes } from '../../types/match';
import { createAction } from '@reduxjs/toolkit';

export const addToMatch = createAction<ICard>( MatchActionsTypes.ADD_CARD );
export const cleanMatch = createAction( MatchActionsTypes.CLEAN );
