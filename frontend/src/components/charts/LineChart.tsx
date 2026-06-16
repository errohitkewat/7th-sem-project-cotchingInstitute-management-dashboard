import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartPoint } from "../../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

type Props = {
  label: string;
  data: ChartPoint[];
  color?: string;
};

export const LineChart = ({
  label,
  data,
  color = "#111827",
}: Props) => {
  return (
    <Line
      data={{
        labels: data.map((point) => point.label),

        datasets: [
          {
            label,
            data: data.map((point) => point.value),

            borderColor: color,
            backgroundColor: `${color}20`,

            fill: true,

            tension: 0.4,

            borderWidth: 3,

            pointRadius: 5,
            pointHoverRadius: 7,

            pointBackgroundColor: "#ffffff",
            pointBorderColor: color,
            pointBorderWidth: 2,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,

        interaction: {
          intersect: false,
          mode: "index",
        },

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
            },
          },

          y: {
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
      }}
    />
  );
};