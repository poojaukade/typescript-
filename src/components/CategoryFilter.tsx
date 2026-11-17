
import type { ExpenseCategory } from "../types/expense";

type CategoryFilterProps = {
  selectedCategory: ExpenseCategory | "All";
  onCategoryChange: (category: ExpenseCategory | "All") => void;
};

const categories: (ExpenseCategory | "All")[] = [
  "All",
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
];

function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <label
        htmlFor="category-filter"
        className="text-sm font-medium text-gray-700"
      >
        Filter by Category:
      </label>

      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) =>
          onCategoryChange(
            e.target.value as ExpenseCategory | "All"
          )
        }
        className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
