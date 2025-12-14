import React, { FC } from 'react';
import classes from './timer.module.scss';

interface ITimerProps {
	timer: number;
}

const Timer: FC<ITimerProps> = ( { timer } ) => {
	let sec = timer,
		min = Math.floor( timer / 60 );

	if ( timer > 59 ) {
		sec = timer - Math.floor( timer / 60 ) * 60;
	}

	if ( min > 59 ) {
		min = min - Math.floor( min / 60 ) * 60;
	}

	return (
		<span className={ classes.timer }>
            { min < 10 ? `0${ min }` : min }:{ sec < 10 ? `0${ sec }` : sec }
        </span>
	);
};

export default React.memo(Timer);
