import { IMatchState } from '../../types/match';
import { createReducer } from '@reduxjs/toolkit';
import { addToMatch, cleanMatch } from '../actions/matchActions';

const initialState: IMatchState = [];

export const matchReducer = createReducer( initialState, ( builder ) => {
	builder
		.addCase( addToMatch, ( state, action ) => {
			if ( state.length === 0 ) {
				state.push( action.payload );
			} else if ( state.length === 1 && state[ 0 ]?.id !== action.payload.id ) {
				state.push( action.payload );
			}
		} )
		.addCase( cleanMatch, () => {
			return [];
		});
} );
