import React, { FC, useEffect } from 'react';
import classes from './start-screen.module.scss';
import { useDispatch } from 'react-redux';
import { setIsRecord, startGame } from '../../store/actions/gameActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Timer from '../Timer/Timer';

const StartScreen: FC = () => {
	const dispatch = useDispatch();
	const { isGameOver, results, timer, isRecord } = useTypedSelector( state => state.game );

	const clickHandler = () => {
		dispatch( startGame() );
	};

	useEffect( () => {
		if ( results[ 0 ] === timer ) {
			dispatch( setIsRecord( true ) );
		}
	}, [] );

	return (
		<div className={ classes.wrapper }>
			{ isGameOver && <>
				<h1 className={ classes.title }>Congratulations! You win!</h1>
				<p className={ classes.time }>your { isRecord ? 'record ' : null }time is</p>
				<Timer timer={ timer }/>
			</> }
			<button className={ classes.btn }
					onClick={ clickHandler }
			>{ isGameOver ? 'Play again' : 'Play' }
			</button>
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
		</div>
	);
};

export default StartScreen;
