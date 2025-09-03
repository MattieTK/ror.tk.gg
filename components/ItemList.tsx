import Item from "./Item";
import items, { ItemType } from "../items";
import ItemGrid from "./ItemGrid";
import { container, heading, tierHeading } from "./ItemList.css";
import { SearchField } from "./SearchField";
import { useState } from "react";

const shouldHighlightItem = (item: ItemType, searchTerm: string) => {
  const lowercaseSearchTerm = searchTerm.toLowerCase();

  // No search term, highlight everything
  if (lowercaseSearchTerm === "") {
    return true;
  }

  // Name match
  if (item.name.toLowerCase().includes(lowercaseSearchTerm)) {
    return true;
  }

  // Description match
  if (item.rawDescription.toLowerCase().includes(lowercaseSearchTerm)) {
    return true;
  }

  // Category match
  if (
    item.category.some((cat) => cat.toLowerCase().includes(lowercaseSearchTerm))
  ) {
    return true;
  }

  // Expansion match
  if (
    item.expansion &&
    item.expansion.toLowerCase().includes(lowercaseSearchTerm)
  ) {
    return true;
  }

  return false;
};

const ItemList = ({ rarity, setHoveredItem, enabledExpansions }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const isItemAccessible = (item) => {
    if (item.expansion === "") {
      return enabledExpansions["base"];
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
        highlight={shouldHighlightItem(item, searchTerm)}
      />
    );
  };

  const rarityList = items.filter(
    (item) => item.rarity == rarity && item.hide != true
  );
  const sortedItems = rarityList.sort((a, b) => a.position - b.position);
  const itemElements = sortedItems.map((item, i) => {
    return buildItem(item, i);
  });

  if (rarity == "Void") {
    return (
      <div className={container}>
        <SearchField value={searchTerm} onChange={setSearchTerm} />
        <h2 className={heading}>Tier 1</h2>
        <ItemGrid>
          {sortedItems
            .filter((item) => item.voidTier == 1)
            .map((item, i) => buildItem(item, i))}
        </ItemGrid>
        <h2 className={heading}>Tier 2</h2>
        <ItemGrid>
          {sortedItems
            .filter((item) => item.voidTier == 2)
            .map((item, i) => buildItem(item, i))}
        </ItemGrid>
        <h2 className={tierHeading}>Tier 3</h2>
        <ItemGrid>
          {sortedItems
            .filter((item) => item.voidTier == 3)
            .map((item, i) => buildItem(item, i))}
        </ItemGrid>
      </div>
    );
  }
  if (rarity == "Lunar") {
    return (
      <div className={container}>
        <SearchField value={searchTerm} onChange={setSearchTerm} />
        <ItemGrid>
          {sortedItems
            .filter((item) => item.type !== "Equipment")
            .map((item, i) => buildItem(item, i))}
        </ItemGrid>
        <h2 className={heading}>Equipment</h2>
        <ItemGrid>
          {sortedItems
            .filter((item) => item.type == "Equipment")
            .map((item, i) => buildItem(item, i))}
        </ItemGrid>
      </div>
    );
  }

  return (
    <div className={container}>
      <SearchField value={searchTerm} onChange={setSearchTerm} />
      <ItemGrid>{itemElements}</ItemGrid>
    </div>
  );
};

export default ItemList;
