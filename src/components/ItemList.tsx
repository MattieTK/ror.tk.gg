import { type Dispatch, type SetStateAction, useMemo } from 'react';
import items, {
	isDisplayable,
	type Item as ItemData,
	type Rarity,
	resolveItemImage,
} from '~/items';
import type { ExpansionState } from './ExpansionToggle';
import Item, { type HoveredItem } from './Item';
import ItemGrid from './ItemGrid';
import { container, heading, tierHeading } from './ItemList.css';
import SearchField from './SearchField';

interface ItemListProps {
	rarity: Rarity;
	setHoveredItem: Dispatch<SetStateAction<HoveredItem | null>>;
	enabledExpansions: ExpansionState;
	searchTerm: string;
	onSearchChange: (value: string) => void;
}

export function matchesSearch(item: ItemData, searchTerm: string): boolean {
	const term = searchTerm.toLowerCase();
	if (term === '') return true;
	if (item.name.toLowerCase().includes(term)) return true;
	const desc = String(item.rawDescription ?? '').toLowerCase();
	if (desc.includes(term)) return true;
	if (item.category.some(c => c.toLowerCase().includes(term))) return true;
	if (item.expansion && item.expansion.toLowerCase().includes(term)) return true;
	return false;
}

export function ItemList({
	rarity,
	setHoveredItem,
	enabledExpansions,
	searchTerm,
	onSearchChange,
}: ItemListProps) {
	const isItemAccessible = (item: ItemData) => {
		if (item.expansion === '') {
			return enabledExpansions.base;
		}
		return enabledExpansions[item.expansion];
	};

	const buildItem = (item: ItemData) => {
		const accessible = isItemAccessible(item);
		return (
			<Item
				key={item.name}
				name={item.name}
				rarity={item.rarity}
				expansion={item.expansion}
				image={resolveItemImage(item)}
				description={String(item.rawDescription ?? '')}
				setHoveredItem={setHoveredItem}
				position={item.position}
				accessible={accessible}
				highlight={matchesSearch(item, searchTerm)}
			/>
		);
	};

	// Filtering the full item list and sorting it depends only on the selected
	// rarity, but hovering any tile re-renders this component (the hovered item
	// lives in the parent route). Memoising keeps that work off the hover path.
	const sortedItems = useMemo(
		() =>
			items
				.filter(item => item.rarity === rarity && isDisplayable(item))
				.sort((a, b) => a.position - b.position),
		[rarity],
	);

	if (rarity === 'Void') {
		return (
			<div className={container}>
				<SearchField value={searchTerm} onChange={onSearchChange} />
				<h2 className={heading}>Tier 1</h2>
				<ItemGrid>
					{sortedItems
						.filter(item => item.voidTier === 1)
						.map(buildItem)}
				</ItemGrid>
				<h2 className={heading}>Tier 2</h2>
				<ItemGrid>
					{sortedItems
						.filter(item => item.voidTier === 2)
						.map(buildItem)}
				</ItemGrid>
				<h2 className={tierHeading}>Tier 3</h2>
				<ItemGrid>
					{sortedItems
						.filter(item => item.voidTier === 3)
						.map(buildItem)}
				</ItemGrid>
			</div>
		);
	}

	if (rarity === 'Lunar') {
		return (
			<div className={container}>
				<SearchField value={searchTerm} onChange={onSearchChange} />
				<ItemGrid>
					{sortedItems
						.filter(item => item.type !== 'Equipment')
						.map(buildItem)}
				</ItemGrid>
				<h2 className={heading}>Equipment</h2>
				<ItemGrid>
					{sortedItems
						.filter(item => item.type === 'Equipment')
						.map(buildItem)}
				</ItemGrid>
			</div>
		);
	}

	return (
		<div className={container}>
			<SearchField value={searchTerm} onChange={onSearchChange} />
			<ItemGrid>{sortedItems.map(buildItem)}</ItemGrid>
		</div>
	);
}

export default ItemList;
