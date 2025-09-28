import React from "react";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ExpenseList({ expenses = [], categories = [], onDelete }) {
  const catMap = {};
  categories.forEach((c) => (catMap[c.key] = c));

  if (!expenses.length) {
    return <div className="text-sm text-gray-500">No expenses match the filter.</div>;
  }
  return (
    <ul className="space-y-2">
      {expenses.map((e) => (
        <li key={e.id} className="flex items-center justify-between border rounded p-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded flex items-center justify-center text-white font-semibold" style={{ background: catMap[e.category]?.color || "#6b7280" }}>
              {catMap[e.category]?.label?.[0] || "O"}
            </div>
            <div>
              <div className="font-semibold">{catMap[e.category]?.label || e.category} • ₹{Number(e.amount).toFixed(2)}</div>
              <div className="text-xs text-gray-500">{e.note || "—"}</div>
              <div className="text-xs text-gray-400">{formatDate(e.date)}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => onDelete(e.id)} className="text-xs px-3 py-1 rounded bg-red-50 text-red-600 border border-red-100">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
