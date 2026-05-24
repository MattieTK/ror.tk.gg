import { useMemo, useState } from 'react';
import { BUILDS } from '~/builds';
import { EXPANSIONS } from '~/expansions';
import items, { type Item as ItemData } from '~/items';
import { groupLabel } from '~/styles/theme.css';
import * as css from './BuildSidebar.css';
import Item, { type HoveredItem } from './Item';
import { rarityColors } from './RarityBox.css';
import SurvivorPicker from './SurvivorPicker';

// Display order for the rarity groups within a build.
const RARITY_ORDER = ['Common', 'Uncommon', 'Boss', 'Legendary'] as const;

const itemsByName = new Map<string, ItemData>(items.map(i => [i.name, i]));

// Mirror ItemList's image resolution: explicit image, else derive the webp name
// from the item name (spaces to underscores; special chars kept literal).
function resolveImage(item: ItemData): string {
	return item.image ? item.image : `${item.name.replace(/ /g, '_')}.webp`;
}

interface BuildSidebarProps {
	setHoveredItem: (item: HoveredItem | null) => void;
}

export function BuildSidebar({ setHoveredItem }: BuildSidebarProps) {
	const [survivor, setSurvivor] = useState(BUILDS[0].survivor);

	const build = BUILDS.find(b => b.survivor === survivor) ?? BUILDS[0];

	// Group the picker's survivors by expansion for <optgroup> labels.
	const groups = useMemo(
		() =>
			EXPANSIONS.map(exp => ({
				label: exp.name,
				survivors: BUILDS.filter(b => b.expansion === exp.key).map(
					b => b.survivor,
				),
			})).filter(g => g.survivors.length > 0),
		[],
	);

	const picks = build.items
		.map(bi => {
			const item = itemsByName.get(bi.name);
			return item ? { item, reason: bi.reason } : null;
		})
		.filter((p): p is { item: ItemData; reason: string } => p !== null);

	return (
		<div className={css.sidebar}>
			<span className={groupLabel}>Build</span>
			<SurvivorPicker
				survivor={survivor}
				groups={groups}
				onSelect={setSurvivor}
			/>
			<p className={css.identity}>{build.identity}</p>

			{RARITY_ORDER.map(rarity => {
				const inGroup = picks.filter(p => p.item.rarity === rarity);
				if (inGroup.length === 0) return null;
				const color = (rarityColors as Record<string, string>)[rarity];
				return (
					<div key={rarity} className={css.group}>
						<span className={css.groupHeading} style={{ color }}>
							{rarity}
						</span>
						<div className={css.row}>
							{inGroup.map(({ item, reason }) => (
								<div key={item.name} className={css.tile}>
									<Item
										name={item.name}
										rarity={item.rarity}
										expansion={item.expansion}
										image={resolveImage(item)}
										description={String(item.rawDescription ?? '')}
										reason={reason}
										setHoveredItem={setHoveredItem}
									/>
								</div>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default BuildSidebar;
