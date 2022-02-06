export enum GameActionsTypes {
	START_GAME = 'START_GAME',
	STOP_GAME = 'STOP_GAME',
	START_TIMER = 'START_TIMER',
	UPDATE_TIMER = 'UPDATE_TIMER',
	STOP_TIMER = 'STOP_TIMER',
	GET_RESULTS = 'GET_RESULTS',
	UPDATE_RESULTS = 'UPDATE_RESULTS',
	SET_IS_RECORD = 'SET_IS_RECORD',
}

export interface IGameState {
	isGameStarted: boolean,
	timer: number,
	timerID: number,
	isGameOver: boolean,
	results: Array<number>,
	isRecord: boolean
}

export interface IStartGame {
	type: GameActionsTypes.START_GAME;
}

export interface IStopGame {
	type: GameActionsTypes.STOP_GAME;
}

export interface IStartTimer {
	type: GameActionsTypes.START_TIMER;
	payload: number;
}

export interface IUpdateTimer {
	type: GameActionsTypes.UPDATE_TIMER;
	payload: number;
}

export interface IStopTimer {
	type: GameActionsTypes.STOP_TIMER;
}

export interface IGetResults {
	type: GameActionsTypes.GET_RESULTS;
	payload: Array<number>;
}

export interface IUpdateResults {
	type: GameActionsTypes.UPDATE_RESULTS;
	payload: Array<number>;
}

export interface ISetIsRecord {
	type: GameActionsTypes.SET_IS_RECORD;
	payload: boolean;
}

export type GameAction =
	IStartGame
	| IStopGame
	| IStartTimer
	| IUpdateTimer
	| IStopTimer
	| IGetResults
	| IUpdateResults
	| ISetIsRecord;
