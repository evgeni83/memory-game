export enum GameActionsTypes {
	START_GAME = 'START_GAME',
	STOP_GAME = 'STOP_GAME',
	START_TIMER = 'START_TIMER',
	UPDATE_TIMER = 'UPDATE_TIMER',
	STOP_TIMER = 'STOP_TIMER',
	SET_LAST_TIME = 'SET_LAST_TIME',
	GET_RESULTS = 'GET_RESULTS',
	UPDATE_RESULTS = 'UPDATE_RESULTS',
	SET_IS_RECORD = 'SET_IS_RECORD',
}

export interface IGameState {
	isGameStarted: boolean,
	timer: number,
	lastTime: number,
	timerID: number,
	isGameOver: boolean,
	results: Array<number>,
	isRecord: boolean
}
