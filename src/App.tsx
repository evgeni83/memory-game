import React, { FC, useEffect } from 'react';
import CardsGrid from './components/CardsGrid/CardsGrid';
import './App.scss';
import Header from './components/Header/Header';
import { useTypedSelector } from './hooks/useTypedSelector';
import StartScreen from './components/StartScreen/StartScreen';
import { useDispatch } from 'react-redux';
import { getResults, stopGame } from './store/actions/gameActions';

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

	return <div className={ 'App' }>
		<Header/>
		{ ( !isGameStarted || isGameOver ) && <StartScreen/> }
		{ isGameStarted && !isGameOver && <CardsGrid/> }

	</div>;
};

export default App;
