import { Box, Image } from "theme-ui";
import { useState } from "react";
import { Popover, Whisper } from "rsuite";

const Item = ({ image, name, description, classes }) => {
  const [hover, setHover] = useState(false);

  return (
    // Stick a <Box> below and you get the overlay, but the performance falls apart. idk why the Popover doesn't stick with the mouse.
    // I think perf requires this to be hoisted along with the data, hence the data- attrs...
    <Whisper
      hover
      followCursor
      delay="0"
      delayClose="0"
      speaker={<Popover>{name}</Popover>}
    >
      <Box
        data-image={image}
        data-name={name}
        data-description={description}
        onMouseOver={e => {
          setHover(true);
        }}
        onMouseOut={e => {
          setHover(false);
        }}
        sx={{ border: "#7e7f7f 1px solid", margin: "4px", padding: "4px" }}
      >
        <Image
          sx={{ width: "inherit", height: "auto" }}
          src={`images/${image}`}
        ></Image>
      </Box>
    </Whisper>
  );
};

export default Item;
