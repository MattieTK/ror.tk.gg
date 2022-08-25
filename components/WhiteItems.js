import Item from "./Item";
import items from "../items";
import ItemGrid from "./ItemGrid";

const WhiteItems = () => {
  const whiteItems = items.filter(item => item.rarity == "Common");
  const sortedItems = whiteItems.sort((a, b) => a.position - b.position);
  console.log(sortedItems);
  const itemElements = sortedItems.map((item, i) => {
    return (
      <Item
        key={i}
        name={item.name}
        image={`${encodeURI(
          item.name.replaceAll(" ", "_").replaceAll("'", "%27")
        )}.webp`}
        description={item.rawDescription}
      />
    );
  });

  return <ItemGrid>{itemElements.map(item => item)}</ItemGrid>;
};

export default WhiteItems;
