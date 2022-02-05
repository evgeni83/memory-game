import { IMatchState, MatchAction, MatchActionsTypes } from '../../types/match';

const initialState: IMatchState = [];

export const matchReducer = ( state = initialState, action: MatchAction ): IMatchState => {
	switch ( action.type ) {
		case MatchActionsTypes.ADD_CARD:
			if ( state.length === 0 ) {
				return [ action.payload ];
			}

			if ( state.length === 1 ) {
				if ( state[ 0 ]?.id === action.payload.id ) {
					return [ ...state ];
				}
				return [ state[ 0 ], action.payload ];
			}

			return [ ...state ];

		case MatchActionsTypes.CLEAN:
			return [];

		default:
			return state;
	}
};
