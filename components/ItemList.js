import Item from "./Item";
import items from "../items";
import ItemGrid from "./ItemGrid";

const ItemList = ({ rarity, setHoveredItem }) => {
  let rarityList = items.filter(
    item => item.rarity == rarity && item.hide != true
  );
  let sortedItems = rarityList.sort((a, b) => a.position - b.position);
  let itemElements = sortedItems.map((item, i) => {
    return (
      <Item
        key={i}
        name={item.name}
        image={
          item.image
            ? item.image
            : `${encodeURI(
                item.name.replaceAll(" ", "_").replaceAll("'", "%27")
              )}.webp`
        }
        description={item.rawDescription}
        setHoveredItem={setHoveredItem}
        position={item.position}
      />
    );
  });

  return <ItemGrid>{itemElements.map(item => item)}</ItemGrid>;
};

export default ItemList;
