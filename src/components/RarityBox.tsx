import { Link } from '@tanstack/react-router';
import {
  rarityColors,
  rarityCount,
  rarityCountOpen,
  rarityPill,
  rarityPillInner,
} from './RarityBox.css';

export type NavigableRarity = keyof typeof rarityColors;

// Display names for tabs whose rarity key isn't the label shown in-game. The
// key stays the URL segment (/items/Page).
const RARITY_LABELS: Partial<Record<NavigableRarity, string>> = {
  Hex: 'Hexes',
  Page: "N'tormat",
};

export function rarityLabel(rarity: NavigableRarity): string {
  return RARITY_LABELS[rarity] ?? rarity;
}

interface RarityBoxProps {
  rarity: NavigableRarity;
  active?: string;
  // Number of search matches in this rarity. undefined = no active search, so
  // the count slot stays collapsed.
  count?: number;
}

export function RarityBox({ rarity, active, count }: RarityBoxProps) {
  const isActive = active === rarity;
  const color = rarityColors[rarity];
  const showCount = count !== undefined;
  const label = rarityLabel(rarity);

  // Inactive pills carry the rarity colour only on their slanted leading edge.
  // The active pill fills with a translucent tint, takes a full coloured
  // border, and lifts with a glow in the same colour.
  const pillStyle = isActive
    ? {
        backgroundColor: `${color}33`,
        borderColor: color,
        boxShadow: `0 0 10px ${color}66`,
      }
    : { borderLeftColor: color };

  return (
    <Link
      to="/items/$rarity"
      params={{ rarity }}
      // Carry the active search (?q=) across rarity changes.
      search={(prev) => prev}
      className={rarityPill}
      style={pillStyle}
      title={label}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={rarityPillInner}>{label}</span>
      <span
        className={`${rarityCount} ${showCount ? rarityCountOpen : ''}`}
        aria-hidden={!showCount}
      >
        <span className={rarityPillInner}>{count}</span>
      </span>
    </Link>
  );
}

export default RarityBox;
