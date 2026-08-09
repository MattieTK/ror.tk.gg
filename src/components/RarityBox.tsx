import { Link } from '@tanstack/react-router';
import {
  rarityColors,
  rarityCount,
  rarityCountOpen,
  rarityPill,
  rarityPillInner,
} from './RarityBox.css';

export type NavigableRarity = keyof typeof rarityColors;

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
      title={rarity}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={rarityPillInner}>{rarity}</span>
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
