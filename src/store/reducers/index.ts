import { combineReducers } from '@reduxjs/toolkit';
import { cardsReducer } from './cardsReducer';
import { matchReducer } from './matchReducer';
import { gameReducer } from './gameReducer';

export const rootReducer = combineReducers( {
	cards: cardsReducer,
	match: matchReducer,
	game: gameReducer,
} );

export type RootState = ReturnType<typeof rootReducer>
