import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "../ThemeContext";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function EnrolledVsStudiedLineGraph({ data }) {
  const { darkMode } = useTheme(); // Access the current theme state

  // Line chart data and options
  const chartData = {
    labels: data.labels, // X-axis labels (e.g., months)
    datasets: [
      {
        label: "Enrolled",
        data: data.enrolled, // Y-axis data for Enrolled
        borderColor: darkMode ? "#A855F7" : "#ff3bb2", // Purple for dark mode, Lime for light mode
        backgroundColor: darkMode
          ? "rgba(168, 85, 247, 0.1)" // Light purple background
          : "rgba(173, 208, 87, 0.1)", // Light green background for light mode
        pointBackgroundColor: darkMode ? "#A855F7" : "#ff3bb2",
        tension: 0.4, // Smooth curve
        fill: true, // Fill the area under the curve
      },
      {
        label: "Studied",
        data: data.studied, // Y-axis data for Studied
        borderColor: darkMode ? "#22D3EE" : "#ffb7fe", // Aqua for dark mode, Turquoise for light mode
        backgroundColor: darkMode
          ? "rgba(34, 211, 238, 0.1)" // Light blue background
          : "rgba(0, 188, 163, 0.1)", // Light turquoise background for light mode
        pointBackgroundColor: darkMode ? "#22D3EE" : "#ffb7fe",
        tension: 0.4, // Smooth curve
        fill: true, // Fill the area under the curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Let the chart resize to fill the container
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: darkMode ? "white" : "#111827", // White for dark mode, Black for light mode
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    layout: {
      padding: 0, // Remove padding to make sure chart fills the entire area
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#9CA3AF" : "#4B5563", // Gray for dark mode, Darker gray for light mode
        },
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
      y: {
        ticks: {
          color: darkMode ? "#9CA3AF" : "#4B5563", // Gray for dark mode, Darker gray for light mode
          beginAtZero: true,
        },
        grid: {
          color: darkMode ? "#374151" : "#D1D5DB", // Dark gray for dark mode, Light gray for light mode
        },
      },
    },
  };

  return (
    <div
      className={`h-full w-full rounded-lg p-4 shadow-lg ${
        darkMode ? "bg-[#1E293B]" : "bg-[#FFDCE6]"
      }`}
    >
      <h2
        className={`mb-2 text-lg ${
          darkMode ? "text-white" : "text-light-foreground"
        }`}
      >
        Total Hours Studied
      </h2>
      {/* Set a fixed height for the chart */}
      <div className="h-[600px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
