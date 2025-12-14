import { motion } from 'framer-motion';
import React, { ComponentProps, FC, MouseEventHandler, useCallback } from 'react';
import classes from './button.module.scss';

interface IButtonProps extends ComponentProps<'button'> {
	clickHandler: MouseEventHandler;
}

const Button: FC<IButtonProps> = ( { clickHandler, children } ) => {
	// Используем useCallback для оптимизации колбэка
	const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		clickHandler(e);
	}, [clickHandler]);

	return (
		<motion.button className={ classes.btn }
					   onClick={ handleClick }
					   whileHover={{ scale: 1.05 }}
					   whileTap={{ scale: 0.95 }}
					   initial={{
						   scale: 0,
						   rotate: -360
					   }}
					   animate={{
						   scale: 1,
						   rotate: 0
					   }}
					   transition={{
						   type: "spring",
						   damping: 10,
						   stiffness: 100,
						   duration: 0.5
					   }}
		>{ children }
		</motion.button>
	);
};

export default React.memo(Button);
