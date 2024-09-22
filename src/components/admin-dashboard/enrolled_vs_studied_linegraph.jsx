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

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

export default function EnrolledVsStudiedLineGraph({ data }) {
  // Line chart data and options
  const chartData = {
    labels: data.labels, // X-axis labels (e.g., months)
    datasets: [
      {
        label: "Enrolled",
        data: data.enrolled, // Y-axis data for Enrolled
        borderColor: "#A855F7", // Color for Enrolled line (purple)
        backgroundColor: "rgba(168, 85, 247, 0.1)", // Light purple background
        pointBackgroundColor: "#A855F7",
        tension: 0.4, // Smooth curve
        fill: true, // Fill the area under the curve
      },
      {
        label: "Studied",
        data: data.studied, // Y-axis data for Studied
        borderColor: "#22D3EE", // Color for Studied line (blue)
        backgroundColor: "rgba(34, 211, 238, 0.1)", // Light blue background
        pointBackgroundColor: "#22D3EE",
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
          color: "white",
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
          color: "#9CA3AF", // X-axis tick color (gray)
        },
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
      y: {
        ticks: {
          color: "#9CA3AF", // Y-axis tick color (gray)
          beginAtZero: true,
        },
        grid: {
          color: "#374151", // Dark gray grid lines
        },
      },
    },
  };

  return (
    <div className="h-full w-full rounded-lg bg-[#1E293B] p-4 shadow-lg">
      <h2 className="mb-2 text-lg text-white">Total Hours Studied</h2>
      {/* Set a fixed height for the chart */}
      <div className="h-[600px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
