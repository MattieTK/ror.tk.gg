import { useState } from 'react';
import { itemBox, itemAccessible, itemInaccessible, positionText } from './Item.css';

const Item = ({
	image,
	name,
	description,
	classes,
	setHoveredItem,
	position,
	accessible = true,
}) => {
	const [hover, setHover] = useState(false);
	const [tapped, setTapped] = useState(false);

	const itemClassName = `${itemBox} ${accessible ? itemAccessible : itemInaccessible}`;
	const backgroundImage = accessible 
		? `url(/images/${image})`
		: `url(/images/Locked_Item.png)`;

	const showTooltip = () => {
		if (accessible) {
			setHover(true);
			setHoveredItem({
				name,
				description,
				classes,
				image,
			});
		}
	};

	const hideTooltip = () => {
		setHover(false);
		setTapped(false);
		setHoveredItem(null);
	};

	const handleClick = (e) => {
		e.preventDefault();
		if (accessible) {
			if (tapped) {
				hideTooltip();
			} else {
				setTapped(true);
				showTooltip();
			}
		}
	};

	return (
		<div
			className={itemClassName}
			style={{ backgroundImage }}
			data-image={image}
			data-name={name}
			data-description={description}
			data-item-container
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
			onClick={handleClick}
			onTouchStart={handleClick}
		>
		</div>
	);
};

export default Item;
