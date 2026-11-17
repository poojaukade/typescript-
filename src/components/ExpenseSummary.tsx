
import type { Expense } from "../types/expense";

type ExpenseSummaryProps = {
  expenses: Expense[];
};

function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const categoryTotals = expenses.reduce<Record<string, number>>(
    (totals, expense) => {
      totals[expense.category] =
        (totals[expense.category] || 0) + expense.amount;

      return totals;
    },
    {}
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
      <div>
        <p className="text-sm text-gray-500 font-medium">
          Total Expenses
        </p>

        <h2 className="text-3xl font-bold text-green-600 mt-1">
          ₹{totalExpenses.toLocaleString("en-IN")}
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          {expenses.length} expenses recorded
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-3">
          Category-wise Spending
        </h3>

        {Object.entries(categoryTotals).length === 0 ? (
          <p className="text-sm text-gray-400">
            No expenses recorded yet.
          </p>
        ) : (
          <div className="space-y-3">
            {Object.entries(categoryTotals).map(
              ([category, amount]) => (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">
                      {category}
                    </span>

                    <span className="font-medium text-gray-800">
                      ₹{amount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${
                          totalExpenses > 0
                            ? (amount / totalExpenses) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseSummary;
