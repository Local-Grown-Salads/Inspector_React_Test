import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register necessary Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = 'line' | 'bar';

interface ReusableChartProps {
  data: any;
  options?: any;
  type: ChartType;
}

const Chart: React.FC<ReusableChartProps> = ({ data, options, type }) => {
  const ChartComponent = type === 'line' ? Line : Bar;


  return <ChartComponent data={data} options={options} />;
};

export default Chart;