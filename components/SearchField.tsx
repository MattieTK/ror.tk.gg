import { FunctionComponent } from "react";

import * as styles from "./SearchField.css";

export const SearchField: FunctionComponent<{
  value: string;
  onChange: (newValue: string) => void;
}> = ({ value, onChange }) => {
  return (
    <input
      type="search"
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search items..."
    />
  );
};
