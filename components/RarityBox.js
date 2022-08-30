import { Box } from "theme-ui";

const RarityBox = ({ rarity, setRarity, active }) => {
  const rarityColor = rarity => {
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
    <Box
      sx={{
        height: "20px",
        width: "20px",
        margin: "4px",
        backgroundColor: rarityColor(rarity),
        border: active == rarity ? "1px white solid" : "",
        cursor: "pointer",
      }}
      onClick={() => {
        setRarity(rarity);
      }}
      title={rarity}
    ></Box>
  );
};

export default RarityBox;
