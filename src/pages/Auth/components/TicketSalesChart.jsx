import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const colors = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444', '#ec4899', '#0ea5e9'];

const TicketSalesChart = ({ salesData }) => {
  const ticketTypes = salesData.length > 0
    ? Object.keys(salesData[0]).filter(key => key !== 'date')
    : [];

  const datasets = ticketTypes.map((type, idx) => ({
    label: type,
    data: salesData.map(item => item[type]),
    backgroundColor: colors[idx % colors.length],
  }));

  const data = {
    labels: salesData.map(item => item.date),
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Ticket Sales by Type Over Time',
      },
      legend: {
        position: 'top',
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Tickets Sold',
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default TicketSalesChart;
