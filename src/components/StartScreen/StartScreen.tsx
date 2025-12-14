import React, { FC, useEffect } from 'react';
import classes from './start-screen.module.scss';
import { useDispatch } from 'react-redux';
import { setIsRecord, startGame, startTimer, updateTimer } from '../../store/actions/gameActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Timer from '../Timer/Timer';
import Button from '../Button/Button';
import { showAllHiddenCards } from '../../store/actions/cardsActions';

const StartScreen: FC = () => {
	const dispatch = useDispatch();
	const { isGameOver, results, timer, isRecord, lastTime } = useTypedSelector( state => state.game );

	const clickHandler = () => {
		dispatch( showAllHiddenCards() );
		dispatch( updateTimer( 0 ) );
		const timerID = window.setInterval( () => {
			dispatch( updateTimer() );
		}, 1000 );
		dispatch( startTimer( timerID ) );
		dispatch( setIsRecord( false ) );
		dispatch( startGame() );
	};

	return (
		<div className={ classes.wrapper }>
			{ isGameOver && <>
				<h1 className={ classes.title }>You win!</h1>
				<p className={ classes.time }>your { isRecord ? 'record ' : null }time is</p>
				<Timer timer={ lastTime }/>
			</> }
			{ results.length > 0 && <>
				<h2 className={ classes.resultsTitle }>your best results</h2>
				<div className="last-results">
					{ results.map( ( item, i ) => {
						return (
							<div className={ classes.result } key={ i }>
								{ i + 1 }. <Timer timer={ item }/>
							</div>
						);
					} ) }
				</div>
			</> }
			<Button clickHandler={ clickHandler }
			>{ isGameOver ? 'Play again' : 'Play' }
			</Button>
		</div>
	);
};

export default React.memo(StartScreen);
