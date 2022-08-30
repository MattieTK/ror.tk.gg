import { Box, Image } from "theme-ui";
import { useState } from "react";

const Item = ({
  image,
  name,
  description,
  classes,
  setHoveredItem,
  position,
}) => {
  const [hover, setHover] = useState(false);

  return (
    // Stick a <Box> below and you get the overlay, but the performance falls apart. idk why the Popover doesn't stick with the mouse.
    // I think perf requires this to be hoisted along with the data, hence the data- attrs...

    <Box
      data-image={image}
      data-name={name}
      data-description={description}
      onMouseEnter={e => {
        setHover(true);
        setHoveredItem({
          name: name,
          description: description,
          classes: classes,
          image: image,
        });
        console.log("enter", position);
      }}
      onMouseOut={e => {
        if (hover) {
          setHoveredItem(null);
          // console.log("out!", e);
          setHover(false);
        } else {
        }
      }}
      sx={{
        border: "#7e7f7f 1px solid",
        margin: "4px",
        padding: "2px",
        height: "128px",
        backgroundImage: `url(images/${image})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <Image
        sx={{ width: "inherit", height: "auto" }}
        src={`images/${image}`}
      ></Image> */}
    </Box>
  );
};

export default Item;
