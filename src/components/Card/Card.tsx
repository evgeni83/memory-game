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

	// Обновляем src при изменении item
	useEffect(() => {
		let isMounted = true; // Флаг для отслеживания, что компонент все еще смонтирован

		// Асинхронно определяем подходящий путь к изображению
		const setImage = async () => {
			try {
				const path = await getImagePath(item.img);

				// Обновляем состояние только если компонент все еще смонтирован
				if (isMounted) {
					setImageSrc(path);
					setImgLoaded(false); // Сбрасываем состояние загрузки при изменении изображения
				}
			} catch (error) {
				// Если возникла ошибка при определении пути, используем оригинальный путь
				if (isMounted) {
					setImageSrc(item.img);
					setImgLoaded(false);
				}
			}
		};

		setImage();

		// Очищаем флаг при размонтировании
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

	// Обработчик успешной загрузки изображения
	const handleImageLoad = useCallback(() => {
		setImgLoaded(true);
		setImgHasError(false);
	}, []);

	// Обработчик ошибки загрузки изображения
	const handleImageError = useCallback(() => {
		setImgHasError(true);
		// Если WebP не загрузился, возвращаемся к PNG
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
