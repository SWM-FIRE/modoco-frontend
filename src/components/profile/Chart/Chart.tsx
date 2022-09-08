import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { faker } from '@faker-js/faker';
import { Line } from 'react-chartjs-2';
import { calculateLabels } from './calculateLabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
  },
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
};

export default function Chart({ type }: { type: string }) {
  const labels = calculateLabels(type);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: '#F4C952',
        backgroundColor: '#e9c76b',
      },
    ],
  };
  return <Line options={options} data={data} width="894px" height="320px" />;
}
