import { input } from './SearchField.css';

interface SearchFieldProps {
  value: string;
  onChange: (newValue: string) => void;
}

export function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <input
      type="search"
      className={input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search items..."
      aria-label="Search items"
    />
  );
}

export default SearchField;
