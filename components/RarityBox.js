import NextLink from "next/link";
import { rarityBox, rarityBoxActive, rarityColors } from './RarityBox.css';

export const RarityBox = ({ rarity, active }) => {
  return (
    <NextLink
      href={`/items/${rarity}`}
      className={`${rarityBox} ${active === rarity ? rarityBoxActive : ''}`}
      style={{
        backgroundColor: rarityColors[rarity],
      }}
      title={rarity}
    />
  );
};
