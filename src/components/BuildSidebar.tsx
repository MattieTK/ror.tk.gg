import { type Dispatch, type SetStateAction, useMemo, useState } from 'react';
import { BUILDS } from '~/builds';
import { EXPANSIONS } from '~/expansions';
import items, { type Item as ItemData, resolveItemImage } from '~/items';
import { groupLabel } from '~/styles/theme.css';
import * as css from './BuildSidebar.css';
import Item, { type HoveredItem } from './Item';
import { rarityColors } from './RarityBox.css';
import SurvivorPicker from './SurvivorPicker';

// Display order for the rarity groups within a build.
const RARITY_ORDER = ['Common', 'Uncommon', 'Boss', 'Legendary'] as const;

const itemsByName = new Map<string, ItemData>(items.map(i => [i.name, i]));

interface BuildSidebarProps {
	setHoveredItem: Dispatch<SetStateAction<HoveredItem | null>>;
}

export function BuildSidebar({ setHoveredItem }: BuildSidebarProps) {
	// No survivor selected by default — show onboarding copy until one is picked.
	const [survivor, setSurvivor] = useState<string | null>(null);

	const build = survivor
		? (BUILDS.find(b => b.survivor === survivor) ?? null)
		: null;

	// Group the picker's survivors by expansion for the dropdown's group labels.
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

	const picks = build
		? build.items
				.map(bi => {
					const item = itemsByName.get(bi.name);
					return item ? { item, reason: bi.reason } : null;
				})
				.filter((p): p is { item: ItemData; reason: string } => p !== null)
		: [];

	return (
		<div className={css.sidebar}>
			<span className={groupLabel}>Build</span>
			<SurvivorPicker
				survivor={survivor}
				groups={groups}
				onSelect={setSurvivor}
			/>

			{build ? (
				<>
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
												image={resolveItemImage(item)}
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
				</>
			) : (
				<p className={css.onboarding}>
					Pick a survivor to see a recommended starter set — the items that
					pair best with their kit, grouped by rarity. Hover any pick to read
					why it fits.
				</p>
			)}
		</div>
	);
}

export default BuildSidebar;
