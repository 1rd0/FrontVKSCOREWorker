// RadarChart.js
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register all necessary components

const RadarChart = ({ data }) => {
  const labels = ['Лидерство', 'Коммуникативность', 'Решение проблем', 'Командная работа', 'Адаптивность'];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Оценки',
        backgroundColor: 'rgba(34, 139, 34, 0.2)', // Светло-зеленый цвет для заполнения области
        borderColor: 'rgba(34, 139, 34, 1)', // Темно-зеленый цвет для границы
        pointBackgroundColor: 'rgba(34, 139, 34, 1)', // Темно-зеленый цвет для точек
        pointBorderColor: '#fff', // Белый цвет для границы точек
        pointHoverBackgroundColor: '#fff', // Белый цвет при наведении на точки
        pointHoverBorderColor: 'rgba(34, 139, 34, 1)', // Темно-зеленый цвет границы при наведении
        data: data,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 5, // Set max value to match expected data range (assuming scores out of 5)
        ticks: {
          stepSize: 1,
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.2)', // Customize angle lines color
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Customize grid color
        },
        pointLabels: {
          font: {
            size: 10,
          },
          color: '#3554B9 ', // Customize label color
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Turn off the legend to remove "undefined" label and rectangle
      },
    },
  };

  return (
    <div className="radar-chart-container" style={{ width: '100%', height: '400px' }}>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
