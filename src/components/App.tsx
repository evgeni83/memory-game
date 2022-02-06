import React, { FC, useEffect } from 'react';
import CardsGrid from './CardsGrid/CardsGrid';
import './App.scss';
import Header from './Header/Header';
import { useTypedSelector } from '../hooks/useTypedSelector';
import StartScreen from './StartScreen/StartScreen';
import { useDispatch } from 'react-redux';
import { getResults, stopGame } from '../store/actions/gameActions';
import Button from './Button/Button';

const App: FC = () => {
	const { isGameStarted, isGameOver } = useTypedSelector( state => state.game );
	const { list, matchedCardsAmount } = useTypedSelector( state => state.cards );

	const dispatch = useDispatch();

	useEffect( () => {
		dispatch( getResults() );
	}, [] );

	useEffect( () => {
		if ( matchedCardsAmount === list.length ) {
			dispatch( stopGame() );
		}
	}, [ matchedCardsAmount ] );

	const clickHandler = () => {
		dispatch( stopGame( true ) )
	}

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
