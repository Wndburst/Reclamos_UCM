// home.js
import React, { useState } from "react";
import Datos_inicio from "../../components/Estudiante/Datos_inicio";
import SideBar from "../../components/Estudiante/SideBar";
import "../../App.scss";
import NavBar from "../../components/Estudiante/NavBar";

export default function Home() {
  const [filtro, setFiltro] = useState("");

  const handleFilterChange = (filtro) => {
    setFiltro(filtro);
  };

  return (
    <div>
      <NavBar />
      <h1 className="lsreclamos">Lista de reclamos</h1>
      <div className="flex">
        <SideBar onFilterChange={handleFilterChange} />
        <Datos_inicio filtro={filtro} />
      </div>
    </div>
  );
}
