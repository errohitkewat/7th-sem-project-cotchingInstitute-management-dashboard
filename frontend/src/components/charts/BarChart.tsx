import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartPoint } from "../../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

type Props = {
  label: string;
  data: ChartPoint[];
  color?: string;
};

export const BarChart = ({
  label,
  data,
  color = "#111827",
}: Props) => {
  return (
    <Bar
      data={{
        labels: data.map((point) => point.label),

        datasets: [
          {
            label,
            data: data.map((point) => point.value),

            backgroundColor: color,

            borderRadius: 12,

            borderSkipped: false,

            maxBarThickness: 45,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false,
          },

          tooltip: {
            backgroundColor: "#111827",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            padding: 12,
            cornerRadius: 12,
          },
        },

        scales: {
          x: {
            grid: {
              display: false,
            },

            ticks: {
              color: "#64748b",
              font: {
                size: 12,
              },
            },

            border: {
              display: false,
            },
          },

          y: {
            beginAtZero: true,

            grid: {
              color: "#e2e8f0",
            },

            ticks: {
              color: "#64748b",
            },

            border: {
              display: false,
            },
          },
        },

        animation: {
          duration: 1200,
        },
      }}
    />
  );
};