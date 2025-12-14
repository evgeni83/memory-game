import React, { FC, useState, useEffect, useCallback } from 'react';
import { ICard } from '../../types/cards';
import { useDispatch } from 'react-redux';
import { closeOpenedCards, openCard } from '../../store/actions/cardsActions';
import { addToMatch, cleanMatch } from '../../store/actions/matchActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getImagePath } from '../../utils/imageUtils';

import classes from './card.module.scss';

interface ICardProps {
	item: ICard;
}

// Простой SVG плейсхолдер
const PlaceholderIcon = () => (
	<svg
		className={classes.img}
		viewBox="0 0 100 100"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect x="0" y="0" width="100" height="100" fill="#e0e0e0" />
		<rect x="20" y="20" width="60" height="60" fill="#cccccc" />
	</svg>
);

const Card = React.memo<ICardProps>(({ item }) => {
	const match = useTypedSelector(state => state.match);
	const dispatch = useDispatch();

	// Состояние для отслеживания загрузки изображения
	const [imgLoaded, setImgLoaded] = useState(false);
	const [imgHasError, setImgHasError] = useState(false);
	const [imageSrc, setImageSrc] = useState('');

	const classNames: Array<string> = [classes.item];

	if (item.isOpen) {
		classNames.push(classes.opened);
	}

	if (item.isHidden) {
		classNames.push(classes.hidden);
	}

	// Update src when item changes
	useEffect(() => {
		let isMounted = true; // Flag to track if component is still mounted

		// Asynchronously determine the appropriate image path
		const setImage = async () => {
			try {
				const path = await getImagePath(item.img);

				// Update state only if component is still mounted
				if (isMounted) {
					setImageSrc(path);
					setImgLoaded(false); // Reset loading state when image changes
				}
			} catch (error) {
				// If there's an error determining the path, use the original path
				if (isMounted) {
					setImageSrc(item.img);
					setImgLoaded(false);
				}
			}
		};

		setImage();

		// Clear flag on unmount
		return () => {
			isMounted = false;
		};
	}, [item.img]);

	const clickHandler = (id: number) => {
		// Prevent interaction with already opened or hidden cards
		if (item.isHidden || item.isOpen) return;

		if (match.length >= 2) {
			dispatch(closeOpenedCards(match));
			dispatch(cleanMatch());
		} else {
			dispatch(openCard(id));
			dispatch(addToMatch(item));
		}
	};

	// Handler for successful image load
	const handleImageLoad = useCallback(() => {
		setImgLoaded(true);
		setImgHasError(false);
	}, []);

	// Handler for image loading error
	const handleImageError = useCallback(() => {
		setImgHasError(true);
		// If WebP fails to load, fall back to original image
		setImageSrc(item.img);
	}, [item.img]);

	return (
		<button
			className={classNames.join(' ')}
			disabled={item.isHidden || item.isOpen}
			onClick={() => {
				clickHandler(item.id);
			}}
		>
			<div className={classes.front}>
				{!imgLoaded && !imgHasError && <PlaceholderIcon />}
				<img
					className={`${classes.img} ${imgLoaded ? classes.loaded : ''}`}
					src={imageSrc}
					alt="card icon"
					onLoad={handleImageLoad}
					onError={handleImageError}
					loading="lazy" // Добавляем ленивую загрузку
				/>
			</div>
			<div className={classes.back} />
		</button>
	);
});

export default Card;
