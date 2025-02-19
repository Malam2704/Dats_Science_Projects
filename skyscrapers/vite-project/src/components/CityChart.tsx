// components/CityChart.tsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
} from 'chart.js';

// 1. Import the data labels plugin
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// 2. Register the data labels plugin
ChartJS.register(ChartDataLabels);

// Define a TypeScript interface for our city counts
interface CityCounts {
    [key: string]: number;
}

// Manually sorted data from highest to lowest (example data)
const cityCounts: CityCounts = {
    "New York City": 31,
    "Chicago": 10,
    "London": 4,
    "Moscow": 4,
    "Atlanta": 3,
    "Shanghai": 3,
    "Shenzhen": 3,
    "Boston": 2,
    "Dubai": 2,
    "Frankfurt": 2,
    "Guangzhou": 2,
    "None": 2,
    "Panama City": 2,
    "Philadelphia": 2,
    "Pyongyang": 2,
    "Seattle": 2,
    "Toronto": 2,
    "Albany": 1,
    "Austin": 1,
    "Baghdad": 1,
    "Chongqing": 1,
    "Detroit": 1,
    "Gold Coast": 1,
    "Jersey City": 1,
    "Limassol": 1,
    "Los Angeles": 1,
    "Manila": 1,
    "Mecca": 1,
    "Miami": 1,
    "Monterrey": 1,
    "Montreal": 1,
    "Mumbai": 1,
    "Nairobi": 1,
    "Paris": 1,
    "Pittsbrugh": 1,
    "Rome": 1,
    "Saint Petersburg": 1,
    "San Jose": 1,
    "The Hague": 1,
    "Vancouver": 1,
    "West Hollywood": 1,
};

// Prepare chart labels and values
const labels: string[] = Object.keys(cityCounts);
const dataValues: number[] = Object.values(cityCounts);

// Create the chart data
const data: ChartData<'bar'> = {
    labels,
    datasets: [
        {
            label: 'Number of Posts',
            data: dataValues,
            // Adjust these to control bar width and spacing
            barPercentage: 0.6,      // 1.0 means full width, lower = more spacing
            categoryPercentage: 0.6, // 1.0 means no spacing between categories
            backgroundColor: function (context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) return '#4BC0C0'; // fallback if chart hasn't rendered

                // Create a vertical gradient from bottom to top
                const gradient = ctx.createLinearGradient(
                    0,
                    chartArea.bottom,
                    0,
                    chartArea.top
                );
                gradient.addColorStop(0, '#42A5F5');
                gradient.addColorStop(1, '#1E88E5');
                return gradient;
            },
            borderColor: '#1E88E5',
            borderWidth: 1,
            borderRadius: 5,
        },
    ],
};

// Configure chart options
const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    // Configure your axes, colors, etc.
    scales: {
        x: {
            ticks: { color: '#FFFFFF' },
            grid: { display: false },
        },
        y: {
            ticks: { color: '#FFFFFF' },
            grid: { color: 'rgba(255,255,255,0.2)' },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Most Posted Cities in r/skyscrapers',
            color: '#FFFFFF',
            font: { size: 18 },
            padding: { top: 10, bottom: 30 },
        },
        // 3. Configure data labels
        datalabels: {
            anchor: 'end',       // position label at the end of the bar
            align: 'end',        // place label above the bar
            offset: 4,           // extra spacing above bar
            color: '#FFFFFF',    // label color
            font: {
                weight: 'bold',
                size: 12,
            },
            formatter: (value) => value, // Show raw number
        },
    },
    layout: {
        padding: {
            left: 20,
            right: 20,
            top: 0,
            bottom: 0,
        },
    },
};

const CityChart: React.FC = () => {
    return (
        <div
            style={{
                background: 'linear-gradient(135deg, #19203D 0%, #1A243B 100%)',
                borderRadius: '8px',
                padding: '2rem',
                maxWidth: '1000px',
                margin: '0 auto',
                height: '500px',
            }}
        >
            <Bar data={data} options={options} />
        </div>
    );
};

export default CityChart;
