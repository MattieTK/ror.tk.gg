import { Link } from '@tanstack/react-router';
import { rarityBox, rarityBoxActive, rarityColors } from './RarityBox.css';

export type NavigableRarity = keyof typeof rarityColors;

interface RarityBoxProps {
	rarity: NavigableRarity;
	active?: string;
}

export function RarityBox({ rarity, active }: RarityBoxProps) {
	return (
		<Link
			to="/items/$rarity"
			params={{ rarity }}
			className={`${rarityBox} ${active === rarity ? rarityBoxActive : ''}`}
			style={{
				backgroundColor: rarityColors[rarity],
			}}
			title={rarity}
		/>
	);
}

export default RarityBox;
