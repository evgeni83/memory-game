import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import StartScreen from './StartScreen/StartScreen';
import CardsGrid from './CardsGrid/CardsGrid';
import Header from './Header/Header';
import Button from './Button/Button';
import { getResults, setIsRecord, setLastTime, stopGame, stopTimer, updateResults } from '../store/actions/gameActions';
import { shuffleCards } from '../store/actions/cardsActions';
import './App.scss';

/**
 * Главный компонент приложения Memory Game
 * Управляет состоянием игры, отображает компоненты в зависимости от состояния игры
 *
 * @returns {JSX.Element} JSX элемент приложения
 */
const App: FC = () => {
	const { isGameStarted, isGameOver, results, timer } = useTypedSelector( state => state.game );
	const { list, matchedCardsAmount } = useTypedSelector( state => state.cards );

	const dispatch = useDispatch();

	useEffect( () => {
		dispatch( getResults() );
		dispatch( shuffleCards() );
	}, [] );

	useEffect( () => {
		if ( matchedCardsAmount === list.length ) {
			dispatch( stopGame( false ) );
			dispatch( updateResults() );
			dispatch( setLastTime( timer ) );
			if ( results.length === 0 || timer < results[ 0 ] ) {
				dispatch( setIsRecord( true ) );
			}
			dispatch( stopTimer() );
		}
	}, [ matchedCardsAmount ] );

	const clickHandler = () => {
		dispatch( stopGame( true ) );
		dispatch( stopTimer() );
	};

	return <div className={ 'App' }>
		<Header/>
		{ ( !isGameStarted || isGameOver ) && <StartScreen/> }
		{ isGameStarted && !isGameOver && <>
			<CardsGrid/>
			<Button clickHandler={ clickHandler }>Quit</Button>
		</> }

	</div>;
};

export default App;
