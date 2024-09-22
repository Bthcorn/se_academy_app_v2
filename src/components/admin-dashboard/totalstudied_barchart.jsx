import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TotalStudiedBarChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Studied',
        data: data.studied,
        backgroundColor: '#22D3EE', // Blue bars
        borderRadius: 5,
        barPercentage: 0.4,
      },
    ],
  };

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
          color: '#9CA3AF',
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
    <div className="p-4 bg-[#1E293B] rounded-lg shadow-lg w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-lg">Total Studied</h2>
        <p className="text-green-400 text-sm">24.7% ↑</p>
      </div>
      <h3 className="text-white text-2xl mb-2">120</h3>
      <Bar data={chartData} options={options} height={100} />
      <div className="flex justify-between text-gray-400 text-xs mt-4">
        <p>Last 12 months</p>
        <a href="#" className="text-purple-400">View report</a>
      </div>
    </div>
  );
}
