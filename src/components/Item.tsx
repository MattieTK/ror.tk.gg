import {
	type CSSProperties,
	type Dispatch,
	type FocusEvent,
	type KeyboardEvent,
	type SetStateAction,
	useEffect,
	useRef,
} from 'react';
import useIsTouchDevice from '~/lib/useIsTouchDevice';
import {
	itemAccessible,
	itemBox,
	itemDisabled,
	itemEnabled,
	itemFlash,
	itemInaccessible,
	positionBadge,
} from './Item.css';
import { rarityColors } from './RarityBox.css';

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
	// When set, clicking (or pressing Enter/Space on) the tile runs this instead
	// of the tooltip toggle — used by build picks to jump to the item in the grid.
	onActivate?: () => void;
	// Briefly pulse the tile's border to draw the eye after a jump.
	flash?: boolean;
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
	onActivate,
	flash = false,
	accessible = true,
	highlight = true,
}: ItemProps) {
	// On touch devices, hover is replaced by tap-to-toggle (see below).
	const isTouch = useIsTouchDevice();
	const ref = useRef<HTMLDivElement>(null);

	// Bring a freshly-flashed tile into view (it may be far down the grid, or on
	// a rarity tab the user just landed on).
	useEffect(() => {
		if (flash && ref.current) {
			ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}, [flash]);

	const flashColor =
		(rarityColors as Record<string, string>)[rarity] ?? '#c9d8db';

	const itemClassName = `${itemBox} ${accessible ? itemAccessible : itemInaccessible} ${highlight ? itemEnabled : itemDisabled} ${flash ? itemFlash : ''}`;
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

	// Activatable tiles (build picks) navigate on click; everything else falls
	// back to the touch tooltip toggle.
	const handleClick = () => {
		if (!accessible) return;
		if (onActivate) onActivate();
		else if (isTouch) toggle();
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
			if (onActivate) onActivate();
			else onBlur();
		}
	};

	const label = accessible
		? description
			? `${name}. ${description}`
			: name
		: `${name} (not available in the enabled expansions)`;

	// `--flash-color` feeds the border-pulse keyframes (see Item.css).
	const style = {
		backgroundImage,
		cursor: onActivate && accessible ? 'pointer' : undefined,
		...(flash ? { '--flash-color': flashColor } : {}),
	} as CSSProperties;

	return (
		// biome-ignore lint/a11y/useSemanticElements: a grid of image tiles
		<div
			ref={ref}
			className={itemClassName}
			style={style}
			data-image={image}
			data-name={name}
			data-description={description}
			data-item-container
			role={onActivate ? 'button' : 'img'}
			aria-label={label}
			tabIndex={accessible ? 0 : undefined}
			onMouseEnter={isTouch ? undefined : show}
			onMouseLeave={isTouch ? undefined : hide}
			onClick={accessible ? handleClick : undefined}
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
