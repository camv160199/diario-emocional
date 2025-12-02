import { useEffect, useState } from "react";
import StatsChart from "./StatsChart";

function Stats({ reload }) {
  const [stats, setStats] = useState(null);

  const loadStats = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:4000/api/entries/stats", {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    const data = await res.json();

    console.log("ESTADISTICAS DEL BACKEND:", data);

    // Adaptar al formato EXACTO del backend
    setStats({
      total: data.total_entries,
      positivas: data.by_emotion.positiva,
      negativas: data.by_emotion.negativa,
      neutrales: data.by_emotion.neutral
    });
  };

  // 🔥 Recargar estadísticas cuando cambie reload
  useEffect(() => {
    loadStats();
  }, [reload]); // 👈 SE ACTUALIZA EN TIEMPO REAL

  if (!stats) return <p>Cargando estadísticas...</p>;

  return (
    <div
      style={{
        marginTop: "1rem",
        padding: "1rem",
        border: "1px solid #aaa",
        borderRadius: "6px",
        backgroundColor: "#ffffff",
        color: "#111",
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)"
      }}
    >
      <h3>Estadísticas emocionales</h3>

      <p><strong>Total de entradas:</strong> {stats.total}</p>
      <p><strong style={{ color: "#1e7d32" }}>Positivas:</strong> {stats.positivas}</p>
      <p><strong style={{ color: "#c62828" }}>Negativas:</strong> {stats.negativas}</p>
      <p><strong style={{ color: "#424242" }}>Neutrales:</strong> {stats.neutrales}</p>

      <StatsChart stats={stats} />
    </div>
  );
}

export default Stats;
