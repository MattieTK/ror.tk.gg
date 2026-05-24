import type {
	Dispatch,
	FocusEvent,
	KeyboardEvent,
	SetStateAction,
} from 'react';
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
	// Fixed screen point to pin the tooltip to, set when a tile is reached by
	// keyboard focus (there's no cursor to follow). Absent for mouse hover.
	anchor?: { x: number; y: number };
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

	// Keyboard focus reveals the tooltip pinned to the tile (no cursor to track).
	// Guarded on :focus-visible so a mouse click that incidentally focuses the
	// tile doesn't fight the hover handlers.
	const onFocus = (e: FocusEvent<HTMLDivElement>) => {
		if (!accessible || !e.currentTarget.matches(':focus-visible')) return;
		const r = e.currentTarget.getBoundingClientRect();
		setHoveredItem({
			...hovered,
			anchor: { x: r.left + r.width / 2, y: r.bottom },
		});
	};
	const onBlur = () =>
		setHoveredItem(prev => (prev && prev.name === name ? null : prev));

	const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (accessible && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			onBlur();
		}
	};

	const label = accessible
		? description
			? `${name}. ${description}`
			: name
		: `${name} (not available in the enabled expansions)`;

	return (
		// biome-ignore lint/a11y/useSemanticElements: a grid of image tiles, not buttons
		<div
			className={itemClassName}
			style={{ backgroundImage }}
			data-image={image}
			data-name={name}
			data-description={description}
			data-item-container
			role="img"
			aria-label={label}
			tabIndex={accessible ? 0 : undefined}
			onMouseEnter={isTouch ? undefined : show}
			onMouseLeave={isTouch ? undefined : hide}
			onClick={isTouch ? toggle : undefined}
			onFocus={accessible ? onFocus : undefined}
			onBlur={accessible ? onBlur : undefined}
			onKeyDown={accessible ? onKeyDown : undefined}
		>
			{import.meta.env.DEV && position !== undefined && (
				<span className={positionBadge}>{position}</span>
			)}
		</div>
	);
}

export default Item;
