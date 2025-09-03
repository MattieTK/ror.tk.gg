import { FunctionComponent, useState } from "react";
import {
  itemBox,
  itemAccessible,
  itemInaccessible,
  positionText,
  itemDisabled,
  itemEnabled,
} from "./Item.css";
import { ItemType } from "../items";

const Item: FunctionComponent<{
  image: string;
  name: string;
  description: string;
  setHoveredItem: (
    item: {
      name: string;
      description: string;
      image: string;
    } | null
  ) => void;
  position: number;
  accessible?: boolean;
  highlight?: boolean;
}> = ({
  image,
  name,
  description,
  setHoveredItem,
  position,
  accessible = true,
  highlight = true,
}) => {
  const [hover, setHover] = useState(false);
  const [tapped, setTapped] = useState(false);

  const itemClassName = `${itemBox} ${
    accessible ? itemAccessible : itemInaccessible
  } ${highlight ? itemEnabled : itemDisabled}`;
  const backgroundImage = accessible
    ? `url(/images/${image})`
    : `url(/images/Locked_Item.png)`;

  const showTooltip = () => {
    if (accessible) {
      setHover(true);
      setHoveredItem({
        name,
        description,
        image,
      });
    }
  };

  const hideTooltip = () => {
    setHover(false);
    setTapped(false);
    setHoveredItem(null);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (accessible) {
      if (tapped) {
        hideTooltip();
      } else {
        setTapped(true);
        showTooltip();
      }
    }
  };

  return (
    <div
      className={itemClassName}
      style={{ backgroundImage }}
      data-image={image}
      data-name={name}
      data-description={description}
      data-item-container
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onClick={handleClick}
      onTouchStart={handleClick}
    ></div>
  );
};

export default Item;
