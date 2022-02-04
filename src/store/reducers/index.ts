import { combineReducers } from 'redux';
import { cardsReducer } from './cardsReducer';
import { matchReducer } from './matchReducer';

export const rootReducer = combineReducers( {
	cards: cardsReducer,
	match: matchReducer
} );

export type RootState = ReturnType<typeof rootReducer>
