import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler, Legend);

export default function LineChart({ labels, values }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Daily Calls',
        data: values,
        fill: true,
        borderColor: '#E11D48',
        backgroundColor: 'rgba(225, 29, 72, 0.12)',
        pointBackgroundColor: '#E11D48',
        pointBorderColor: '#fff',
        tension: 0.25,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, ticks: { precision: 0 } },
    },
  };
  return <Line data={data} options={options} height={80} />;
}