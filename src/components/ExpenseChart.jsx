import React, { useMemo } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function ExpenseChart({ totals = {}, categories = [] }) {
  const labels = categories.map((c) => c.label);
  const dataValues = categories.map((c) => totals[c.key] || 0);
  const colors = categories.map((c) => c.color);

  const pieData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: colors,
          borderWidth: 0,
        },
      ],
    }),
    [labels, dataValues, colors]
  );

  const barData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Amount",
          data: dataValues,
          backgroundColor: colors,
        },
      ],
    }),
    [labels, dataValues, colors]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-2">
        <div className="text-sm text-gray-600 mb-2">Category Distribution</div>
        <div className="bg-white p-3 rounded">
          <Pie data={pieData} />
        </div>
      </div>

      <div className="p-2">
        <div className="text-sm text-gray-600 mb-2">Category Totals</div>
        <div className="bg-white p-3 rounded">
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}
