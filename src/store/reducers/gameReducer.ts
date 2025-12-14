import { IGameState } from '../../types/game';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
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

const createInitialGameState = (): IGameState => ({
	isGameStarted: false,
	isGameOver: false,
	timer: 0,
	lastTime: 0,
	timerID: 0,
	results: [],
	isRecord: false,
});

const formatResults = (array: number[]): number[] => {
	try {
		return array.sort((a, b) => a - b).slice(0, 10); // Сохраняем топ-10 результатов
	} catch (error) {
		console.error('Error formatting results:', error);
		return [];
	}
};

export const gameReducer = createReducer(
	createInitialGameState(),
	(builder) => {
		builder
			.addCase(startGame, (state) => {
				try {
					state.isGameStarted = true;
					state.isGameOver = false;
				} catch (error) {
					console.error('Error in startGame reducer:', error);
				}
			})
			.addCase(stopGame, (state, action: PayloadAction<boolean>) => {
				try {
					state.isGameStarted = false;
					state.isGameOver = !action.payload;
					if (state.timerID) {
						clearInterval(state.timerID);
					}
				} catch (error) {
					console.error('Error in stopGame reducer:', error);
				}
			})
			.addCase(startTimer, (state, action: PayloadAction<number>) => {
				try {
					state.timerID = action.payload;
				} catch (error) {
					console.error('Error in startTimer reducer:', error);
				}
			})
			.addCase(updateTimer, (state, action: PayloadAction<number | undefined>) => {
				try {
					state.timer = action.payload === 0 ? 0 : state.timer + 1;
				} catch (error) {
					console.error('Error in updateTimer reducer:', error);
				}
			})
			.addCase(setLastTime, (state, action: PayloadAction<number>) => {
				try {
					state.lastTime = action.payload;
				} catch (error) {
					console.error('Error in setLastTime reducer:', error);
				}
			})
			.addCase(stopTimer, (state) => {
				try {
					if (state.timerID) {
						clearInterval(state.timerID);
					}
					state.timer = 0;
					state.timerID = 0;
				} catch (error) {
					console.error('Error in stopTimer reducer:', error);
				}
			})
			.addCase(getResults, (state) => {
				try {
					const storedResults = localStorage.getItem('memoryGameResults');
					if (storedResults) {
						const parsedResults = JSON.parse(storedResults);
						if (Array.isArray(parsedResults)) {
							state.results = formatResults(parsedResults);
						}
					}
				} catch (error) {
					console.error('Storage error in getResults:', error);
					// Возвращаем пустой массив при ошибках доступа к storage
					state.results = [];
				}
			})
			.addCase(updateResults, (state) => {
				try {
					const { results, timer } = state;
					const resultsHaveCurrentValue = results.some(result => result === timer);

					if (!resultsHaveCurrentValue) {
						const updatedResults = [...results, timer];
						const formattedResults = formatResults(updatedResults);

						try {
							window.localStorage.setItem('memoryGameResults', JSON.stringify(formattedResults));
						} catch (storageError) {
							console.error('Storage error in updateResults:', storageError);
						}

						state.results = formattedResults;
					}
				} catch (error) {
					console.error('Error in updateResults reducer:', error);
				}
			})
			.addCase(setIsRecord, (state, action: PayloadAction<boolean>) => {
				try {
					state.isRecord = action.payload;
				} catch (error) {
					console.error('Error in setIsRecord reducer:', error);
				}
			});
	}
);
