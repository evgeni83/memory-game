import { IMatchState } from '../../types/match';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { addToMatch, cleanMatch } from '../actions/matchActions';
import { ICard } from '../../types/cards';

const createInitialMatchState = (): IMatchState => [];

export const matchReducer = createReducer(
	createInitialMatchState(),
	(builder) => {
		builder
			.addCase(addToMatch, (state, action: PayloadAction<ICard>) => {
				try {
					if (state.length === 0) {
						state.push(action.payload);
					} else if (state.length === 1 && state[0]?.id !== action.payload.id) {
						state.push(action.payload);
					}
				} catch (error) {
					console.error('Error in addToMatch reducer:', error);
				}
			})
			.addCase(cleanMatch, () => {
				try {
					return [];
				} catch (error) {
					console.error('Error in cleanMatch reducer:', error);
					return [];
				}
			});
	}
);
