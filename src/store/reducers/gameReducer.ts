import { GameAction, GameActionsTypes, IGameState } from '../../types/game';

const initialState: IGameState = {
	isGameStarted: false,
	isGameOver: false,
	timer: 0,
	timerID: 0,
	results: [],
	isRecord: false,
};

export const gameReducer = ( state = initialState, action: GameAction ): IGameState => {
	switch ( action.type ) {

		case GameActionsTypes.START_GAME:
			return { ...state, isGameStarted: true, isGameOver: false };

		case GameActionsTypes.STOP_GAME:
			return { ...state, isGameStarted: false, isGameOver: true };

		case GameActionsTypes.START_TIMER:
			return { ...state, timerID: action.payload };

		case GameActionsTypes.UPDATE_TIMER:
			return { ...state, timer: action.payload };

		case GameActionsTypes.STOP_TIMER:
			return { ...state, timerID: 0 };

		case GameActionsTypes.GET_RESULTS:
			return { ...state, results: action.payload };

		case GameActionsTypes.UPDATE_RESULTS:
			return { ...state, results: action.payload };

		case GameActionsTypes.SET_IS_RECORD:
			return { ...state, isRecord: action.payload };

		default:
			return state;
	}
};
