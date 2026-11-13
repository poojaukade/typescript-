
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
    <div className="mt-[22px] mb-3">
      <input
        type="search"
         className="w-full border border-[#cbd5e1] rounded-[7px] px-3 py-[11px] outline-none bg-white text-[#172b4d] focus:border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] dark:bg-[#334155] dark:text-white dark:border-[#64748b] dark:placeholder:text-[#cbd5e1]"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search your tasks..."
      />
    </div>
  );
}

export default SearchPanel;
