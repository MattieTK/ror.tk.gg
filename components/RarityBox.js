import NextLink from "next/link";
import { Link } from "theme-ui";

export const RarityBox = ({ rarity, active }) => {
  const rarityColor = (rarity) => {
    switch (rarity) {
      case "Common":
        return "#c3c7ca";
      case "Uncommon":
        return "#77c842";
      case "Equipment":
        return "#d59235";
      case "Legendary":
        return "#f75b47";
      case "Boss":
        return "#b5cf29";
      case "Void":
        return "#c267a9";
    }
  };

  return (
    <NextLink href={`/items/${rarity}`} passHref>
      <Link
        sx={{
          height: "20px",
          width: "20px",
          margin: "4px",
          backgroundColor: rarityColor(rarity),
          border: active == rarity ? "1px white solid" : "",
          cursor: "pointer",
        }}
        title={rarity}
      />
    </NextLink>
  );
};
