import { useState } from 'react';
import {
	itemAccessible,
	itemBox,
	itemDisabled,
	itemEnabled,
	itemInaccessible,
	positionBadge,
} from './Item.css';

export interface HoveredItem {
	name: string;
	description: string;
	image: string;
	rarity: string;
	expansion: string;
	// Survivor-specific "why it fits" note, shown when hovering a build pick.
	reason?: string;
}

interface ItemProps {
	image: string;
	name: string;
	description: string;
	rarity: string;
	expansion: string;
	reason?: string;
	position?: number;
	accessible?: boolean;
	highlight?: boolean;
	setHoveredItem: (item: HoveredItem | null) => void;
}

export function Item({
	image,
	name,
	description,
	rarity,
	expansion,
	reason,
	position,
	setHoveredItem,
	accessible = true,
	highlight = true,
}: ItemProps) {
	const [tapped, setTapped] = useState(false);

	const itemClassName = `${itemBox} ${accessible ? itemAccessible : itemInaccessible} ${highlight ? itemEnabled : itemDisabled}`;
	// Quote the URL so literal apostrophes/special chars in filenames are valid
	// in the CSS value.
	const backgroundImage = accessible
		? `url("/images/${image}")`
		: `url("/images/Locked_Item.png")`;

	const showTooltip = () => {
		if (accessible) {
			setHoveredItem({ name, description, image, rarity, expansion, reason });
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
		>
			{import.meta.env.DEV && position !== undefined && (
				<span className={positionBadge}>{position}</span>
			)}
		</div>
	);
}

export default Item;
