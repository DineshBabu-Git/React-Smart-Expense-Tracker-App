import React, { useEffect, useMemo, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Filters from "./components/Filters";
import SummaryCards from "./components/SummaryCards";
import ExpenseChart from "./components/ExpenseChart";

const STORAGE_KEY = "expense_tracker_v1";

const DEFAULT_CATEGORIES = [
  { key: "rent", label: "Rent", color: "#8A02AF" },
  { key: "food", label: "Food", color: "#18BC2F" },
  { key: "travel", label: "Travel", color: "#EF4444" },
  { key: "bills", label: "Bills", color: "#F59E0B" },
  { key: "shopping", label: "Shopping", color: "#A646AF" },
  { key: "others", label: "Others", color: "#8B5CF6" },
];

function App() {
  const [categories] = useState(DEFAULT_CATEGORIES);
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    searchText: "",
    fromDate: "",
    toDate: "",
    minAmount: "",
    maxAmount: "",
    sortBy: "recent",
  });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setExpenses(parsed);
      } catch (e) {
        console.error("Failed to parse stored expenses:", e);
      }
    } else {
      const seed = [
        { id: Date.now(), amount: 12.5, category: "food", date: new Date().toISOString(), note: "Coffee" },
      ];
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prev) => [{ id: Date.now().toString(), ...expense }, ...prev]);
  };

  const deleteExpense = (id) => {
    if (!confirm("Delete this expense?")) return;
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const filteredExpenses = useMemo(() => {
    const { category, searchText, fromDate, toDate, minAmount, maxAmount, sortBy } = filters;
    let list = [...expenses];

    if (category && category !== "all") {
      list = list.filter((e) => e.category === category);
    }

    if (searchText) {
      const q = searchText.toLowerCase();
      list = list.filter(
        (e) =>
          (e.note && e.note.toLowerCase().includes(q)) ||
          (e.category && e.category.toLowerCase().includes(q))
      );
    }

    if (fromDate) {
      const from = new Date(fromDate);
      list = list.filter((e) => new Date(e.date) >= from);
    }
    if (toDate) {
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      list = list.filter((e) => new Date(e.date) <= to);
    }

    if (minAmount) {
      const min = parseFloat(minAmount);
      list = list.filter((e) => Number(e.amount) >= min);
    }
    if (maxAmount) {
      const max = parseFloat(maxAmount);
      list = list.filter((e) => Number(e.amount) <= max);
    }

    if (sortBy === "recent") {
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "amount") {
      list.sort((a, b) => Number(b.amount) - Number(a.amount));
    }
    return list;
  }, [expenses, filters]);

  const totals = useMemo(() => {
    const byCategory = {};
    let overall = 0;
    for (const c of categories) byCategory[c.key] = 0;
    for (const e of expenses) {
      const amt = Number(e.amount) || 0;
      overall += amt;
      if (byCategory[e.category] !== undefined) byCategory[e.category] += amt;
      else byCategory["others"] = (byCategory["others"] || 0) + amt;
    }
    return { byCategory, overall };
  }, [expenses, categories]);

  return (
    <div className="min-h-screen text-gray-900 bg-gray-200">
      <header className="bg-green-100 shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">Smart Expense Tracking App</div>
          <div className="hidden md:flex gap-4 items-center">
            <div className="text-sm text-gray-600">Track Your Spending...</div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-blue-100">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Add Expense</h3>
              <ExpenseForm categories={categories} onAdd={addExpense} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Summary</h3>
              <SummaryCards totals={totals} categories={categories} />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <Filters categories={categories} filters={filters} setFilters={setFilters} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Expenses ({filteredExpenses.length})</h3>
              <ExpenseList expenses={filteredExpenses} categories={categories} onDelete={deleteExpense} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Spending Chart</h3>
              <ExpenseChart totals={totals.byCategory} categories={categories} />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        Built with React • Data stored in localStorage
      </footer>
    </div>
  );
}

export default App;
