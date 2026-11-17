
import type { Expense } from "../types/expense";

type ExpenseItemProps = {
  expense: Expense;
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
};

function ExpenseItem({
  expense,
  onDelete,
  onEdit,
}: ExpenseItemProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-200 rounded-lg p-4 bg-white">
      <div>
        <h3 className="font-semibold text-gray-800">
          {expense.title}
        </h3>

        <p className="text-sm text-gray-500">
          {expense.category} · {expense.date}
        </p>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4">
        <span className="font-semibold text-gray-900">
          ₹{expense.amount.toLocaleString("en-IN")}
        </span>

        <button
          onClick={() => onEdit(expense)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(expense.id)}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;
