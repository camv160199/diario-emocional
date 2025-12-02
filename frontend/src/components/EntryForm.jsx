import { useState } from "react";

function EntryForm({ onSaved }) {
  const [content, setContent] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setLoading(true);
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:4000/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ content })
    });

    const data = await res.json();
    setResponse(data);
    setLoading(false);

    // Avisar al Dashboard que se creó una entrada
    if (onSaved) onSaved();

    // Limpiar textarea
    setContent("");
  };

  return (
    <div className="entry-form">

      <textarea
        className="entry-textarea"
        rows="4"
        placeholder="Escribe cómo te sientes hoy..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Guardando..." : "Guardar entrada"}
      </button>

      {response && (
        <div className="entry-response">
          <p>Entrada guardada ✔</p>
          <p><strong>Emoción:</strong> {response.sentiment.label}</p>
          <p><strong>Puntaje:</strong> {response.sentiment.score}</p>
        </div>
      )}
    </div>
  );
}

export default EntryForm;
