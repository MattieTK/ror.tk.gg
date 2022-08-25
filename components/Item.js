import { Box, Image } from "theme-ui";
import { useState } from "react";

const Item = ({ image, name, description, classes }) => {
  const [hover, setHover] = useState(false);

  return (
    <Box
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
      {hover ? <Box>{name}</Box> : ""}
    </Box>
  );
};

export default Item;
