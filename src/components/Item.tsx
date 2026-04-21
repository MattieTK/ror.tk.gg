import { useState } from 'react';
import {
	itemAccessible,
	itemBox,
	itemInaccessible,
} from './Item.css';

export interface HoveredItem {
	name: string;
	description: string;
	image: string;
}

interface ItemProps {
	image: string;
	name: string;
	description: string;
	position?: number;
	accessible?: boolean;
	setHoveredItem: (item: HoveredItem | null) => void;
}

export function Item({
	image,
	name,
	description,
	setHoveredItem,
	accessible = true,
}: ItemProps) {
	const [tapped, setTapped] = useState(false);

	const itemClassName = `${itemBox} ${accessible ? itemAccessible : itemInaccessible}`;
	const backgroundImage = accessible
		? `url(/images/${image})`
		: `url(/images/Locked_Item.png)`;

	const showTooltip = () => {
		if (accessible) {
			setHoveredItem({ name, description, image });
		}
	};

	const hideTooltip = () => {
		setTapped(false);
		setHoveredItem(null);
	};

	const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
		e.preventDefault();
		if (!accessible) return;
		if (tapped) {
			hideTooltip();
		} else {
			setTapped(true);
			showTooltip();
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
		/>
	);
}

export default Item;
