import { Link } from '@tanstack/react-router';
import { rarityColors, rarityPill, rarityPillInner } from './RarityBox.css';

export type NavigableRarity = keyof typeof rarityColors;

interface RarityBoxProps {
	rarity: NavigableRarity;
	active?: string;
}

export function RarityBox({ rarity, active }: RarityBoxProps) {
	const isActive = active === rarity;
	const color = rarityColors[rarity];

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
			className={rarityPill}
			style={pillStyle}
			title={rarity}
			aria-current={isActive ? 'page' : undefined}
		>
			<span className={rarityPillInner}>{rarity}</span>
		</Link>
	);
}

export default RarityBox;
