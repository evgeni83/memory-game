import { IMatchState, MatchAction, MatchActionsTypes } from '../../types/match';


const initialState: IMatchState = [];

export const matchReducer = ( state = initialState, action: MatchAction ): IMatchState => {
	let newState: IMatchState;
	switch ( action.type ) {
		case MatchActionsTypes.ADD_CARD:
			if (state.length === 0) {
				newState = [ action.payload ];
				console.log( newState );
				return newState;
			}
			if (state.length === 1) {
				newState = [ state[0], action.payload ];
				console.log( newState );
				return newState;
			}
			newState = [ ...state ];
			console.log( newState );
			return newState;

		case MatchActionsTypes.CLEAN:
			return []
		default:
			return state;
	}
}
