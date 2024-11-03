// RadarChart.js
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const RadarChart = ({ data }) => {
  const labels = ['Лидерство', 'Коммуникативность', 'Решение проблем', 'Командная работа', 'Адаптивность'];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Оценки',
        backgroundColor: 'rgba(34, 139, 34, 0.2)',
        borderColor: 'rgba(34, 139, 34, 1)',
        pointBackgroundColor: 'rgba(34, 139, 34, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(34, 139, 34, 1)',
        data: data,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1, // Aspect ratio for scaling the chart size
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          backdropColor: 'transparent',
          color: '#3554B9',
        },
        angleLines: {
          color: '#333232',
        },
        grid: {
          color: '#333232',
        },
        pointLabels: {
          font: {
            size: 18,
          },
          color: '#111',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="radar-chart-container" > {/* Увеличили размеры */}
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
