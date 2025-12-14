import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { rootReducer, RootState } from './reducers';

const store = configureStore( {
	reducer: rootReducer,
} );

// Тип для асинхронных экшенов (thunks)
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
