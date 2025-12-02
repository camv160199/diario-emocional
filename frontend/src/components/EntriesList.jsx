import { useEffect, useState } from "react";

function EntriesList({ reload }) {
  const [entries, setEntries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [emotionFilter, setEmotionFilter] = useState("todas");
  const [dateFilter, setDateFilter] = useState("todas");
  const [searchText, setSearchText] = useState("");

  const loadEntries = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:4000/api/entries", {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    const data = await res.json();
    setEntries(data);
    setFiltered(data);
  };

  useEffect(() => {
    loadEntries();
  }, [reload]);

  useEffect(() => {
    let list = [...entries];

    if (emotionFilter !== "todas") {
      list = list.filter(e => e.sentiment_label === emotionFilter);
    }

    if (dateFilter !== "todas") {
      const today = new Date();

      list = list.filter(e => {
        const entryDate = new Date(e.created_at);

        if (dateFilter === "hoy") {
          return entryDate.toDateString() === today.toDateString();
        }

        if (dateFilter === "semana") {
          const diff = today - entryDate;
          return diff <= 7 * 24 * 60 * 60 * 1000;
        }

        if (dateFilter === "mes") {
          return (
            entryDate.getMonth() === today.getMonth() &&
            entryDate.getFullYear() === today.getFullYear()
          );
        }

        return true;
      });
    }

    if (searchText.trim() !== "") {
      list = list.filter(e =>
        e.content.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFiltered(list);

  }, [emotionFilter, dateFilter, searchText, entries]);

  return (
    <div className="entries-section">
      <h2 className="entries-title">Mis entradas</h2>

      {/* Filtros */}
      <div className="entries-filters">
        <h3>Filtros</h3>

        <div className="filter-row">
          <label>Emoción:</label>
          <select
            value={emotionFilter}
            onChange={(e) => setEmotionFilter(e.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="positiva">Positivas</option>
            <option value="negativa">Negativas</option>
            <option value="neutral">Neutrales</option>
          </select>
        </div>

        <div className="filter-row">
          <label>Fecha:</label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="hoy">Hoy</option>
            <option value="semana">Última semana</option>
            <option value="mes">Este mes</option>
          </select>
        </div>

        <div className="filter-row">
          <label>Buscar:</label>
          <input
            type="text"
            placeholder="Texto..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Lista */}
      <div className="entries-list">
        {filtered.length === 0 && (
          <p className="entries-empty">No hay entradas que coincidan.</p>
        )}

        {filtered.map((e) => (
          <div key={e.id} className={`entry-item entry-${e.sentiment_label}`}>
            <p className="entry-date">{e.created_at}</p>
            <span className="entry-label">{e.sentiment_label}</span>
            <p className="entry-text">{e.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EntriesList;
