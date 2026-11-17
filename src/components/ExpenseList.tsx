
import type { Expense } from "../types/expense";
import ExpenseItem from "./ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
};

function ExpenseList({
  expenses,
  onDelete,
  onEdit,
}: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-xl">
        <p className="text-gray-500">
          No expenses found.
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Add your first expense to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-800">
        Recent Expenses
      </h2>

      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default ExpenseList;
