import { Grid } from "theme-ui";

const ItemGrid = ({ children }) => {
  return (
    <Grid
      gap={2}
      columns={"repeat(5, 1fr)"}
      sx={{
        gridTemplateColumns: "repeat(5, 128px)",
        maxWidth: [],
        width: "auto",
        backgroundColor: "#1a1616",
      }}
    >
      {children}
    </Grid>
  );
};

export default ItemGrid;
