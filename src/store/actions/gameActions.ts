import { GameActionsTypes } from '../../types/game';
import { createAction } from '@reduxjs/toolkit';

export const startGame = createAction( GameActionsTypes.START_GAME );
export const stopGame = createAction<boolean>( GameActionsTypes.STOP_GAME );
export const startTimer = createAction<number>( GameActionsTypes.START_TIMER );
export const setLastTime = createAction<number>( GameActionsTypes.SET_LAST_TIME );
export const updateTimer = createAction<undefined|number>( GameActionsTypes.UPDATE_TIMER );
export const stopTimer = createAction( GameActionsTypes.STOP_TIMER );
export const getResults = createAction( GameActionsTypes.GET_RESULTS );
export const updateResults = createAction( GameActionsTypes.UPDATE_RESULTS );
export const setIsRecord = createAction<boolean>( GameActionsTypes.SET_IS_RECORD );

// export const startGame = () => ( dispatch, getState ) => {
// 	dispatch( shuffleCards() );
// 	dispatch( showAllHiddenCards() );
// 	dispatch( { type: GameActionsTypes.UPDATE_TIMER, payload: 0 } );
//
// 	const timerID = window.setInterval( () => {
// 		const { timer } = getState().game;
// 		dispatch( { type: GameActionsTypes.UPDATE_TIMER, payload: timer + 1 } );
// 	}, 1000 );
//
// 	dispatch( startTimer( timerID ) );
//
// 	const startGameAction: IStartGame = { type: GameActionsTypes.START_GAME };
//
// 	dispatch( startGameAction );
//
// 	dispatch( setIsRecord( false ) );
// };

// export const stopGame = ( isQuit: boolean = false ) => ( dispatch, getState ) => {
// 	const { timerID } = getState().game;
// 	window.clearInterval( timerID );
// 	dispatch( stopTimer() );
//
// 	if ( !isQuit ) {
// 		dispatch( updateResults() );
// 	}
//
// 	const stopGameAction: IStopGame = {
// 		type: GameActionsTypes.STOP_GAME,
// 		payload: isQuit,
// 	};
//
// 	dispatch( stopGameAction );
// };

// export const startTimer = ( timerID: number ): IStartTimer => ( {
// 	type: GameActionsTypes.START_TIMER,
// 	payload: timerID,
// } );

// export const stopTimer = (): IStopTimer => ( { type: GameActionsTypes.STOP_TIMER } );

// export const getResults = (): ThunkAction<void, RootState, unknown, Action> => (dispatch) => {
// 		const storedResults = localStorage.getItem( 'memoryGameResults' );
//
// 		if ( storedResults ) {
// 			const results = formatResults( JSON.parse( storedResults ) );
//
// 			const getResultsAction: IGetResults = { type: GameActionsTypes.GET_RESULTS, payload: results };
//
// 			dispatch( getResultsAction );
// 		}
// 	};

// export const updateResults = (): ThunkAction<void, RootState, unknown, Action> => ( dispatch, getState ) => {
// 	const { results, timer } = getState().game;
// 	const resultsHaveCurrentValue = results.findIndex( result => result === timer ) >= 0;
//
// 	if ( !resultsHaveCurrentValue ) {
// 		results.push( timer );
//
// 		const updatedResults = formatResults( results );
//
// 		window.localStorage.setItem( 'memoryGameResults', JSON.stringify( updatedResults ) );
//
// 		const updateResultsAction: IUpdateResults = { type: GameActionsTypes.UPDATE_RESULTS, payload: updatedResults };
//
// 		dispatch( updateResultsAction );
// 	}
// };

// export const setIsRecord = ( isRecord: boolean ): ISetIsRecord => ( {
// 	type: GameActionsTypes.SET_IS_RECORD,
// 	payload: isRecord,
// } );

