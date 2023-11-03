// sidebar.js
import React, { useState } from "react";

export default function SideBar({ onFilterChange }) {
  const [filtro, setFiltro] = useState("");

  const handleInputChange = (e) => {
    const nuevoFiltro = e.target.value;
    setFiltro(nuevoFiltro);

    if (typeof onFilterChange === "function") {
      onFilterChange(nuevoFiltro);
    }
  };

  return (
    <div className="sidebar-estudiante">
      <p className="title">Filtrar</p>
      <form>
        <input
          placeholder="Buscar"
          value={filtro}
          onChange={handleInputChange}
        />

        <p>Area</p>
        <ul>{/* Opciones del filtro de área */}</ul>

        <p>Otro filtro</p>
        <ul>{/* Opciones del otro filtro */}</ul>
      </form>
    </div>
  );
}
