import { Link } from "@tanstack/react-router";
import { rarityBox, rarityBoxActive, rarityColors } from './RarityBox.css';

export const RarityBox = ({ rarity, active }) => {
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
};
