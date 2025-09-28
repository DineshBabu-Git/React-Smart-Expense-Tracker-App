import React from "react";

export default function Filters({ categories = [], filters, setFilters }) {
  const update = (obj) => setFilters((s) => ({ ...s, ...obj }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="space-y-2">
        <label className="text-sm text-gray-600">Category</label>
        <select value={filters.category} onChange={(e) => update({ category: e.target.value })} className="w-full border rounded px-3 py-2">
          <option value="all">All</option>
          {categories.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-600">Date range</label>
        <div className="flex gap-2">
          <input type="date" value={filters.fromDate} onChange={(e) => update({ fromDate: e.target.value })} className="w-1/2 border rounded px-2 py-2" />
          <input type="date" value={filters.toDate} onChange={(e) => update({ toDate: e.target.value })} className="w-1/2 border rounded px-2 py-2" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-600">Amount range</label>
        <div className="flex gap-2">
          <input type="number" placeholder="min" value={filters.minAmount} onChange={(e) => update({ minAmount: e.target.value })} className="w-1/2 border rounded px-2 py-2" />
          <input type="number" placeholder="max" value={filters.maxAmount} onChange={(e) => update({ maxAmount: e.target.value })} className="w-1/2 border rounded px-2 py-2" />
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 space-y-2">
        <label className="text-sm text-gray-600">Search (note or category)</label>
        <input type="text" value={filters.searchText} onChange={(e) => update({ searchText: e.target.value })} className="w-full border rounded px-3 py-2" placeholder="Search notes or category" />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-600">Sort</label>
        <select value={filters.sortBy} onChange={(e) => update({ sortBy: e.target.value })} className="w-full border rounded px-3 py-2">
          <option value="recent">Most recent</option>
          <option value="amount">Highest amount</option>
        </select>
      </div>
    </div>
  );
}
