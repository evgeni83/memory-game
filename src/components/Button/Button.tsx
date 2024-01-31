import { motion } from 'framer-motion';
import React, { ComponentProps, FC, MouseEventHandler } from 'react';
import classes from './button.module.scss';

interface IButtonProps extends ComponentProps<any> {
	clickHandler: MouseEventHandler;
}

const Button: FC<IButtonProps> = ( { clickHandler, children } ) => {
	return (
		<motion.button className={ classes.btn }
					   onClick={ clickHandler }
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

export default Button;
