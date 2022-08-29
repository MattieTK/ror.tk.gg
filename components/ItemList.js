import Item from "./Item";
import items from "../items";
import ItemGrid from "./ItemGrid";

const ItemList = ({ rarity, setHoveredItem }) => {
  const whiteItems = items.filter(item => item.rarity == rarity);
  const sortedItems = whiteItems.sort((a, b) => a.position - b.position);
  const itemElements = sortedItems.map((item, i) => {
    return (
      <Item
        key={i}
        name={item.name}
        image={`${encodeURI(
          item.name.replaceAll(" ", "_").replaceAll("'", "%27")
        )}.webp`}
        description={item.rawDescription}
        setHoveredItem={setHoveredItem}
      />
    );
  });

  return <ItemGrid>{itemElements.map(item => item)}</ItemGrid>;
};

export default ItemList;
