import React, { FC } from 'react';
import Timer from '../Timer/Timer';
import classes from './header.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Header: FC = () => {
	const { timer } = useTypedSelector( state => state.game );

	return (
		<header className={ classes.header }>
			<h1 className={ classes.title }>MEMORY GAME</h1>
			<span className={ classes.timer }>Timer <Timer timer={ timer }/></span>
		</header>
	);
};

export default React.memo(Header);
