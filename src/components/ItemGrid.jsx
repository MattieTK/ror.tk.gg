import { container, grid } from "./ItemGrid.css";

const ItemGrid = ({ children }) => {
  return (
    <div className={container}>
      <div className={grid}>
        {children}
      </div>
    </div>
  );
};

export default ItemGrid;
