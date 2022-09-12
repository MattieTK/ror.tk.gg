import { Box, Heading } from "theme-ui";
import Item from "./Item";
import items from "../items";
import ItemGrid from "./ItemGrid";

const ItemList = ({ rarity, setHoveredItem }) => {
  const buildItem = (item, i) => {
    return (
      <Item
        key={i}
        name={item.name}
        image={
          item.image
            ? item.image
            : `${encodeURI(
                item.name.replace(/ /g, "_").replace(/'/g, "%27")
              )}.webp`
        }
        description={item.rawDescription}
        setHoveredItem={setHoveredItem}
        position={item.position}
      />
    );
  };

  let rarityList = items.filter(
    item => item.rarity == rarity && item.hide != true
  );
  let sortedItems = rarityList.sort((a, b) => a.position - b.position);
  let itemElements = sortedItems.map((item, i) => {
    return buildItem(item, i);
  });

  if (rarity == "Void") {
    return (
      <Box>
        <Heading>Tier 1</Heading>
        <ItemGrid>
          {sortedItems
            .filter(item => item.voidTier == 1)
            .map((item, i) => buildItem(item, i))}
        </ItemGrid>
        <Heading>Tier 2</Heading>
        <ItemGrid>
          {sortedItems
            .filter(item => item.voidTier == 2)
            .map((item, i) => buildItem(item, i))}
        </ItemGrid>
        <Heading>Tier 3</Heading>
        <ItemGrid sx={{ marginTop: 4 }}>
          {sortedItems
            .filter(item => item.voidTier == 3)
            .map((item, i) => buildItem(item, i))}
        </ItemGrid>
      </Box>
    );
  }
  if (rarity == "Lunar") {
    return (
      <Box>
        <ItemGrid>
          {sortedItems
            .filter(item => item.type !== "Equipment")
            .map((item, i) => buildItem(item, i))}
        </ItemGrid>
        <Heading>Equipment</Heading>
        <ItemGrid>
          {sortedItems
            .filter(item => item.type == "Equipment")
            .map((item, i) => buildItem(item, i))}
        </ItemGrid>
      </Box>
    );
  } else return <ItemGrid>{itemElements.map(item => item)}</ItemGrid>;
};

export default ItemList;
