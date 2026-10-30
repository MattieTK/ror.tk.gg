import { type Dispatch, type SetStateAction, useMemo, useState } from 'react';
import { BUILD_SLOTS, BUILDS } from '~/builds';
import { EXPANSIONS } from '~/expansions';
import items, {
  isDisplayable,
  type Item as ItemData,
  resolveItemImage,
} from '~/items';
import { groupLabel } from '~/styles/theme.css';
import * as css from './BuildSidebar.css';
import type { ExpansionState } from './ExpansionToggle';
import Item, { type HoveredItem } from './Item';
import { rarityColors } from './RarityBox.css';
import SurvivorPicker from './SurvivorPicker';

// Display order for the rarity groups within a build.
const RARITY_ORDER = [
  'Common',
  'Uncommon',
  'Boss',
  'Legendary',
  'Hallowed',
] as const;

const itemsByName = new Map<string, ItemData>(items.map((i) => [i.name, i]));

interface BuildSidebarProps {
  setHoveredItem: Dispatch<SetStateAction<HoveredItem | null>>;
  // Jump to a pick in the main grid (clears search, switches rarity, flashes).
  onSelectItem: (name: string, rarity: string) => void;
  enabledExpansions: ExpansionState;
}

export function BuildSidebar({
  setHoveredItem,
  onSelectItem,
  enabledExpansions,
}: BuildSidebarProps) {
  // No survivor selected by default — show onboarding copy until one is picked.
  const [survivor, setSurvivor] = useState<string | null>(null);

  // Group the picker's survivors by expansion for the dropdown's group labels.
  // A DLC's survivors are only offered while that expansion is active and
  // enabled; base-game survivors are always available.
  const groups = useMemo(
    () =>
      EXPANSIONS.filter(
        (exp) => exp.active && (exp.key === '' || enabledExpansions[exp.key]),
      )
        .map((exp) => ({
          label: exp.name,
          survivors: BUILDS.filter((b) => b.expansion === exp.key).map(
            (b) => b.survivor,
          ),
        }))
        .filter((g) => g.survivors.length > 0),
    [enabledExpansions],
  );

  // Disabling a survivor's expansion drops them from the picker, so fall back
  // to the onboarding copy rather than showing a build that can't be played.
  const selectable =
    survivor !== null && groups.some((g) => g.survivors.includes(survivor));
  const build = selectable
    ? (BUILDS.find((b) => b.survivor === survivor) ?? null)
    : null;

  // Mirror ItemList's accessibility rule: only show picks from expansions the
  // user currently has enabled (base game keyed separately).
  const isEnabled = (item: ItemData): boolean => {
    if (item.expansion === '') return enabledExpansions.base;
    return enabledExpansions[item.expansion];
  };

  // Build picks are ranked within each rarity, so take the first enabled ones
  // up to that rarity's slot count. Disabling an expansion backfills its picks
  // with the next-best ones rather than leaving the group short.
  const picks = build
    ? RARITY_ORDER.flatMap((rarity) =>
        build.items
          .map((bi) => {
            const item = itemsByName.get(bi.name);
            return item &&
              item.rarity === rarity &&
              isDisplayable(item) &&
              isEnabled(item)
              ? { item, reason: bi.reason }
              : null;
          })
          .filter((p): p is { item: ItemData; reason: string } => p !== null)
          .slice(0, BUILD_SLOTS[rarity] ?? 0),
      )
    : [];

  return (
    <div className={css.sidebar}>
      <span className={groupLabel}>Build</span>
      <SurvivorPicker
        survivor={build ? survivor : null}
        groups={groups}
        onSelect={setSurvivor}
      />

      {build && picks.length === 0 ? (
        <p className={css.onboarding}>
          None of {build.survivor}'s recommended items are in the expansions you
          have enabled. Enable more expansions to see this build.
        </p>
      ) : build ? (
        <>
          <p className={css.identity}>{build.identity}</p>
          {RARITY_ORDER.map((rarity) => {
            const inGroup = picks.filter((p) => p.item.rarity === rarity);
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
                        onActivate={() => onSelectItem(item.name, item.rarity)}
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
          Pick a survivor to see a recommended starter set — the items that pair
          best with their kit, grouped by rarity. Hover any pick to read why it
          fits.
        </p>
      )}
    </div>
  );
}

export default BuildSidebar;
