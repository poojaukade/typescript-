
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

// Define the component props
type RecipeSearchProps = {
  onSearch: (value: string) => void;
  initialValue: string;
};

function RecipeSearch({ onSearch, initialValue }: RecipeSearchProps) {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      return;
    }

    onSearch(trimmedValue);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value);
  }

  return (
    <form
      className="flex gap-3 max-w-[600px] mx-auto my-6 max-[600px]:flex-col"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search recipes..."
        value={inputValue}
        onChange={handleInputChange}
        className="flex-1 min-w-0 px-[15px] py-[13px] border border-[#d1d5db] rounded-lg text-[15px] outline-none focus:border-[#e47745] focus:shadow-[0_0_0_3px_rgba(228,119,69,0.12)]"
      />

      <button
        type="submit"
        className="px-6 py-3 bg-[#e47745] text-white border-0 rounded-lg text-[15px] font-semibold cursor-pointer transition-colors duration-200 hover:bg-[#c85e30] max-[600px]:w-full"
      >
        Search
      </button>
    </form>
  );
}
export default RecipeSearch;
