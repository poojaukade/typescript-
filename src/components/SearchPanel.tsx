
import type { ChangeEvent } from "react";

// Component props
type SearchPanelProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

function SearchPanel({ searchTerm, onSearchChange }: SearchPanelProps) {
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    onSearchChange(event.target.value);
  }

  return (
    <div className="search-panel">
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search your tasks..."
      />
    </div>
  );
}

export default SearchPanel;
