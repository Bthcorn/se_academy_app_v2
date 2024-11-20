import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "../ThemeContext"; // Import ThemeContext

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TotalStudiedBarChart({ data }) {
  const { darkMode } = useTheme(); // Access the theme state

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Studied",
        data: data.studied,
        backgroundColor: darkMode ? "#22D3EE" : "#ffb7fe", // Blue in dark mode, Lime green in light mode
        borderRadius: 5,
        barPercentage: 0.4,
      },
    ],
  };

  const totalStudied = data.studied.reduce((a, b) => a + b, 0);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#9CA3AF" : "#6B7280", // Gray in both modes, lighter for light mode
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-lg w-full ${
        darkMode ? "bg-[#1E293B]" : "bg-[#FFDCE6]"
      }`}
    >
      <div className="flex items-center justify-between">
        <h2
          className={`text-lg ${
            darkMode ? "text-white" : "text-[#111827]"
          }`}
        >
          Total Studied
        </h2>
      </div>
      <h3
        className={`text-2xl mb-2 ${
          darkMode ? "text-white" : "text-[#111827]"
        }`}
      >
        {totalStudied}
      </h3>
      <Bar data={chartData} options={options} height={100} />
      <div
        className={`flex justify-between text-xs mt-4 ${
          darkMode ? "text-gray-400" : "text-[#6B7280]"
        }`}
      >
        <p>Last 12 months</p>
      </div>
    </div>
  );
}
