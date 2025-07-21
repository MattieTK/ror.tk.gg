import Item from "./Item";
import items from "../items";
import ItemGrid from "./ItemGrid";
import { container, heading, tierHeading } from "./ItemList.css";

const ItemList = ({ rarity, setHoveredItem, enabledExpansions }) => {
  const isItemAccessible = (item) => {
    if (item.expansion === '') {
      return enabledExpansions['base'];
    }
    return enabledExpansions[item.expansion];
  };

  const buildItem = (item, i) => {
    const accessible = isItemAccessible(item);
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
        accessible={accessible}
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
      <div className={container}>
        <h2 className={heading}>Tier 1</h2>
        <ItemGrid>
          {sortedItems
            .filter(item => item.voidTier == 1)
            .map((item, i) => buildItem(item, i))}
        </ItemGrid>
        <h2 className={heading}>Tier 2</h2>
        <ItemGrid>
          {sortedItems
            .filter(item => item.voidTier == 2)
            .map((item, i) => buildItem(item, i))}
        </ItemGrid>
        <h2 className={tierHeading}>Tier 3</h2>
        <ItemGrid>
          {sortedItems
            .filter(item => item.voidTier == 3)
            .map((item, i) => buildItem(item, i))}
        </ItemGrid>
      </div>
    );
  }
  if (rarity == "Lunar") {
    return (
      <div className={container}>
        <ItemGrid>
          {sortedItems
            .filter(item => item.type !== "Equipment")
            .map((item, i) => buildItem(item, i))}
        </ItemGrid>
        <h2 className={heading}>Equipment</h2>
        <ItemGrid>
          {sortedItems
            .filter(item => item.type == "Equipment")
            .map((item, i) => buildItem(item, i))}
        </ItemGrid>
      </div>
    );
  } else return <ItemGrid>{itemElements.map(item => item)}</ItemGrid>;
};

export default ItemList;
