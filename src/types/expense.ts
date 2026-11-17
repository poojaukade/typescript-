export type ExpenseCategory =
    | "Food"
    | "Travel"
    | "Shopping"
    | "Bills"
    | "Entertainment"
    | "Other";

export type Expense = {
    id: string;
    title: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
};