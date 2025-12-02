import { useState } from "react";
import EntryForm from "../components/EntryForm";
import EntriesList from "../components/EntriesList";
import Stats from "../components/Stats";

function Dashboard({ onLogout }) {

  const [reload, setReload] = useState(0);  // 👈 ESTADO PARA RECARGAR LISTA

  return (
    <div className="dashboard">

      <header className="topbar">
        <h1>Diario Emocional</h1>
        <button className="logout-top" onClick={onLogout}>Cerrar sesión</button>
      </header>

      <div className="dashboard-content">

        <section className="card">
          <h2>Nueva entrada</h2>
          <EntryForm onSaved={() => setReload(reload + 1)} />   {/* 👈 */}
        </section>

        <section className="card">
          <h2>Estadísticas</h2>
          <Stats reload={reload} />     {/* Opcional: refresca stats */}
        </section>

        <section className="card">
          <h2>Mis entradas</h2>
          <EntriesList reload={reload} />  {/* 👈 RECIBE reload */}
        </section>

      </div>
    </div>
  );
}

export default Dashboard;
