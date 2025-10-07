import { IGameState } from '../../types/game';
import { createReducer } from '@reduxjs/toolkit';
import {
	getResults,
	setIsRecord, setLastTime,
	startGame,
	startTimer,
	stopGame,
	stopTimer,
	updateResults,
	updateTimer,
} from '../actions/gameActions';

const initialState: IGameState = {
	isGameStarted: false,
	isGameOver: false,
	timer: 0,
	lastTime: 0,
	timerID: 0,
	results: [],
	isRecord: false,
};

const formatResults = ( array: Array<number> ): Array<number> => array.sort( ( a: number, b: number ) => a - b ).slice( 0, 6 );

export const gameReducer = createReducer( initialState, ( builder ) => {
	builder
		.addCase( startGame, ( state ) => {
			state.isGameStarted = true;
			state.isGameOver = false;
		} )
		.addCase( stopGame, ( state, action ) => {
			state.isGameStarted = false;
			state.isGameOver = !action.payload;
			clearInterval( state.timerID );
		} )
		.addCase( startTimer, ( state, action ) => {
			state.timerID = action.payload;
		} )
		.addCase( updateTimer, ( state, action ) => {
			state.timer = action.payload === 0 ? 0 : state.timer + 1;
		} )
		.addCase( setLastTime, ( state, action ) => {
			state.lastTime = action.payload;
		})
		.addCase( stopTimer, ( state ) => {
			state.timer = 0;
			state.timerID = 0;
		} )
		.addCase( getResults, ( state ) => {
			try {
				const storedResults = localStorage.getItem( 'memoryGameResults' );
				if ( storedResults ) {
					state.results = formatResults( JSON.parse( storedResults ) );
				}
			} catch (e) {
				// Ignore storage errors (e.g., private mode)
				state.results = [];
			}
		} )
		.addCase( updateResults, ( state ) => {
			const { results, timer } = state;
			const resultsHaveCurrentValue = results.findIndex( result => result === timer ) >= 0;

			if ( !resultsHaveCurrentValue ) {
				results.push( timer );

				const updatedResults = formatResults( results );

				try {
					window.localStorage.setItem( 'memoryGameResults', JSON.stringify( updatedResults ) );
				} catch (e) {
					// Ignore storage errors
				}

				state.results = updatedResults;
			}
		} )
		.addCase( setIsRecord, ( state, action ) => {
			state.isRecord = action.payload;
		} );
} );
// action: GameAction ): IGameState => {
// 	switch ( action.type ) {
//
// 		case GameActionsTypes.START_GAME:
// 			return { ...state, isGameStarted: true, isGameOver: false };
//
// 		case GameActionsTypes.STOP_GAME:
// 			return { ...state, isGameStarted: false, isGameOver: !action.payload };
//
// 		case GameActionsTypes.START_TIMER:
// 			return { ...state, timerID: action.payload };
//
// 		case GameActionsTypes.UPDATE_TIMER:
// 			return { ...state, timer: action.payload };
//
// 		case GameActionsTypes.STOP_TIMER:
// 			return { ...state, timerID: 0 };
//
// 		case GameActionsTypes.GET_RESULTS:
// 			return { ...state, results: action.payload };
//
// 		case GameActionsTypes.UPDATE_RESULTS:
// 			return { ...state, results: action.payload };
//
// 		case GameActionsTypes.SET_IS_RECORD:
// 			return { ...state, isRecord: action.payload };
//
// 		default:
// 			return state;
// 	}
// };
