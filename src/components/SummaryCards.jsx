import React from "react";

export default function SummaryCards({ totals = { byCategory: {}, overall: 0 }, categories = [] }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500">Total spent</div>
          <div className="text-2xl font-bold">₹{Number(totals.overall).toFixed(2)}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {categories.map((c) => (
          <div key={c.key} className="p-3 rounded border flex items-center gap-3">
            <div className="w-3 h-3 rounded" style={{ background: c.color }} />
            <div>
              <div className="text-sm font-medium">{c.label}</div>
              <div className="text-sm text-gray-600">₹{(totals.byCategory[c.key] || 0).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
