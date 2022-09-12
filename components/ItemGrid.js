import { Grid, Box } from "theme-ui";

const ItemGrid = ({ children }) => {
  return (
    <Box sx={{ marginBottom: "10px" }}>
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
    </Box>
  );
};

export default ItemGrid;
