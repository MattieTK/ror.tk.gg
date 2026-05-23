import { useState } from 'react';
import { isExpansionActive } from '~/expansions';
import items, {
	isCommandable,
	type Item as ItemData,
	type Rarity,
} from '~/items';
import type { ExpansionState } from './ExpansionToggle';
import Item, { type HoveredItem } from './Item';
import ItemGrid from './ItemGrid';
import { container, heading, tierHeading } from './ItemList.css';
import SearchField from './SearchField';

interface ItemListProps {
	rarity: Rarity;
	setHoveredItem: (item: HoveredItem | null) => void;
	enabledExpansions: ExpansionState;
}

function matchesSearch(item: ItemData, searchTerm: string): boolean {
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
}: ItemListProps) {
	const [searchTerm, setSearchTerm] = useState('');

	const isItemAccessible = (item: ItemData) => {
		if (item.expansion === '') {
			return enabledExpansions.base;
		}
		return enabledExpansions[item.expansion];
	};

	const buildItem = (item: ItemData, i: number) => {
		const accessible = isItemAccessible(item);
		return (
			<Item
				key={i}
				name={item.name}
				rarity={item.rarity}
				expansion={item.expansion}
				image={
					item.image
						? item.image
						: `${encodeURI(
								item.name.replace(/ /g, '_').replace(/'/g, '%27'),
							)}.webp`
				}
				description={String(item.rawDescription ?? '')}
				setHoveredItem={setHoveredItem}
				position={item.position}
				accessible={accessible}
				highlight={matchesSearch(item, searchTerm)}
			/>
		);
	};

	const rarityList = items.filter(
		item =>
			item.rarity === rarity &&
			item.hide !== true &&
			isCommandable(item) &&
			isExpansionActive(item.expansion),
	);
	const sortedItems = [...rarityList].sort((a, b) => a.position - b.position);

	if (rarity === 'Void') {
		return (
			<div className={container}>
				<SearchField value={searchTerm} onChange={setSearchTerm} />
				<h2 className={heading}>Tier 1</h2>
				<ItemGrid>
					{sortedItems
						.filter(item => item.voidTier === 1)
						.map((item, i) => buildItem(item, i))}
				</ItemGrid>
				<h2 className={heading}>Tier 2</h2>
				<ItemGrid>
					{sortedItems
						.filter(item => item.voidTier === 2)
						.map((item, i) => buildItem(item, i))}
				</ItemGrid>
				<h2 className={tierHeading}>Tier 3</h2>
				<ItemGrid>
					{sortedItems
						.filter(item => item.voidTier === 3)
						.map((item, i) => buildItem(item, i))}
				</ItemGrid>
			</div>
		);
	}

	if (rarity === 'Lunar') {
		return (
			<div className={container}>
				<SearchField value={searchTerm} onChange={setSearchTerm} />
				<ItemGrid>
					{sortedItems
						.filter(item => item.type !== 'Equipment')
						.map((item, i) => buildItem(item, i))}
				</ItemGrid>
				<h2 className={heading}>Equipment</h2>
				<ItemGrid>
					{sortedItems
						.filter(item => item.type === 'Equipment')
						.map((item, i) => buildItem(item, i))}
				</ItemGrid>
			</div>
		);
	}

	return (
		<div className={container}>
			<SearchField value={searchTerm} onChange={setSearchTerm} />
			<ItemGrid>{sortedItems.map((item, i) => buildItem(item, i))}</ItemGrid>
		</div>
	);
}

export default ItemList;
