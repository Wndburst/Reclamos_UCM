// sidebar.js
import React, { useEffect, useState } from "react";

export default function SideBar({ onFilterChange }) {
  const [filtro, setFiltro] = useState("");

  const handleInputChange = (e) => {
    const nuevoFiltro = e.target.value;

    setFiltro(nuevoFiltro);

    if (typeof onFilterChange === "function") {
      onFilterChange(nuevoFiltro);
    }
  };

  useEffect(() => {
    console.log(filtro)
  },);

  return (
    <div className="sidebar-estudiante">
      <h4 className="title">Filtrar</h4>
      <div className="filterHome">
        <input
          placeholder="Buscar reclamo"
          value={filtro}
          onChange={handleInputChange}
        />
        </div>
    </div>
  );
}
