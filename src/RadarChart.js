// RadarChart.js
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register all necessary components

const RadarChart = ({ data }) => {
  const labels = ['Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Adaptability'];

  const chartData = {
    labels: labels,
    datasets: [
      {
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light green area fill
        borderColor: 'rgba(75, 192, 192, 1)', // Darker green for the border
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
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
            size: 14,
          },
          color: '#333', // Customize label color
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
