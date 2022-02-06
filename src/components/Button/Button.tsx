import React, { FC, MouseEventHandler } from 'react';
import classes from './button.module.scss';

interface IButtonProps {
	clickHandler: MouseEventHandler;
}

const Button: FC<IButtonProps> = ( { clickHandler, children } ) => {
	return (
		<button className={ classes.btn }
				onClick={ clickHandler }
		>{ children }
		</button>
	);
};

export default Button;
