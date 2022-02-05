import { GameActionsTypes } from '../../types/game';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../reducers';
import { showAllHiddenCards, shuffleCards } from './cardsActions';

export const startGame = (): ThunkAction<void, RootState, unknown, AnyAction> => ( dispatch, getState ) => {
	dispatch( shuffleCards() );
	dispatch( showAllHiddenCards() );
	dispatch( { type: GameActionsTypes.UPDATE_TIMER, payload: 0 } );

	const timerID = window.setInterval( () => {
		const { timer } = getState().game;
		dispatch( { type: GameActionsTypes.UPDATE_TIMER, payload: timer + 1 } );
	}, 1000 );

	dispatch( startTimer( timerID ) );
	dispatch( { type: GameActionsTypes.START_GAME } );
	dispatch( setIsRecord( false ) );
};

export const stopGame = (): ThunkAction<void, RootState, unknown, AnyAction> => ( dispatch, getState ) => {
	const { timerID } = getState().game;
	window.clearInterval( timerID );

	dispatch( stopTimer() );
	dispatch( updateResults() );
	dispatch( { type: GameActionsTypes.STOP_GAME } );
};

export const startTimer = ( timerID: number ) => ( { type: GameActionsTypes.START_TIMER, payload: timerID } );

export const stopTimer = () => ( { type: GameActionsTypes.STOP_TIMER } );

export const getResults = (): ThunkAction<void, RootState, unknown, AnyAction> => ( dispatch ) => {
	const storedResults = localStorage.getItem( 'memoryGameResults' );
	if ( storedResults ) {
		const results = formatResults( JSON.parse( storedResults ) );
		dispatch( { type: GameActionsTypes.GET_RESULTS, payload: results } );
	}
};

export const updateResults = (): ThunkAction<void, RootState, unknown, AnyAction> => ( dispatch, getState ) => {
	const { results, timer } = getState().game;
	const resultsHaveCurrentValue = results.findIndex( result => result === timer ) >= 0;
	if ( !resultsHaveCurrentValue ) {
		results.push( timer );
		const updatedResults = formatResults( results );
		window.localStorage.setItem( 'memoryGameResults', JSON.stringify( updatedResults ) );
		dispatch( { type: GameActionsTypes.UPDATE_RESULTS, payload: updatedResults } );
	}
};

export const setIsRecord = ( isRecord: boolean ) => ( { type: GameActionsTypes.SET_IS_RECORD, payload: isRecord } );

const formatResults = ( array: Array<number> ): Array<number> => array.sort( ( a: number, b: number ) => a - b ).slice( 0, 6 );
