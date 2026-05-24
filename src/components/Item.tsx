import type { Dispatch, SetStateAction } from 'react';
import useIsTouchDevice from '~/lib/useIsTouchDevice';
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
	setHoveredItem: Dispatch<SetStateAction<HoveredItem | null>>;
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
	// On touch devices, hover is replaced by tap-to-toggle (see below).
	const isTouch = useIsTouchDevice();

	const itemClassName = `${itemBox} ${accessible ? itemAccessible : itemInaccessible} ${highlight ? itemEnabled : itemDisabled}`;
	// Quote the URL so literal apostrophes/special chars in filenames are valid
	// in the CSS value.
	const backgroundImage = accessible
		? `url("/images/${image}")`
		: `url("/images/Locked_Item.png")`;

	const hovered: HoveredItem = {
		name,
		description,
		image,
		rarity,
		expansion,
		reason,
	};

	const show = () => {
		if (accessible) setHoveredItem(hovered);
	};
	const hide = () => setHoveredItem(null);

	// Tap behaviour for touch: show this item; tap it again to dismiss; tap a
	// different item to replace it. Decided against the currently-shown item so
	// the three items don't need to coordinate local state.
	const toggle = () => {
		if (!accessible) return;
		setHoveredItem(prev => (prev && prev.name === name ? null : hovered));
	};

	return (
		<div
			className={itemClassName}
			style={{ backgroundImage }}
			data-image={image}
			data-name={name}
			data-description={description}
			data-item-container
			onMouseEnter={isTouch ? undefined : show}
			onMouseLeave={isTouch ? undefined : hide}
			onClick={isTouch ? toggle : undefined}
		>
			{import.meta.env.DEV && position !== undefined && (
				<span className={positionBadge}>{position}</span>
			)}
		</div>
	);
}

export default Item;
