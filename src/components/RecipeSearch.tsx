
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
    <form className="recipe-search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search recipes..."
        value={inputValue}
        onChange={handleInputChange}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default RecipeSearch;
