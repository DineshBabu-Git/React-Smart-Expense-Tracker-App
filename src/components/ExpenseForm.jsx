import React, { useState } from "react";

export default function ExpenseForm({ categories = [], onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories?.[0]?.key || "others");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return alert("Please enter a valid amount");
    const expense = { amount: Number(amount).toFixed(2), category, date: new Date(date).toISOString(), note };
    onAdd(expense);
    setAmount("");
    setNote("");
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm text-gray-700">Amount</label>
        <input
          className="mt-1 block w-full border rounded px-3 py-2"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"/>
      </div>

      <div>
        <label className="block text-sm text-gray-700">Category</label>
        <select className="mt-1 block w-full border rounded px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-700">Date</label>
        <input className="mt-1 block w-full border rounded px-3 py-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div>
        <label className="block text-sm text-gray-700">Note</label>
        <input className="mt-1 block w-full border rounded px-3 py-2" type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Rent, Coffee, Taxi, Electricity..." />
      </div>

      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Expense
        </button>
      </div>
    </form>
  );
}
