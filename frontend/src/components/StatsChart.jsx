import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function StatsChart({ stats }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!stats) return;

    const ctx = chartRef.current.getContext("2d");

    // Destruir gráfico previo si existe
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Positivas", "Negativas", "Neutrales"],
        datasets: [
          {
            label: "Entradas emocionales",
            data: [stats.positivas, stats.negativas, stats.neutrales],
            backgroundColor: [
              "#4caf50", // verde
              "#e53935", // rojo
              "#757575"  // gris
            ]
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }, [stats]);

  return (
  <div className="stats-chart-container">
    <h3>Gráfica emocional</h3>
    <canvas ref={chartRef}></canvas>
  </div>
);
}

export default StatsChart;
