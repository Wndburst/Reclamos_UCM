import React from "react";
import ListaFrecuentes from "../../components/Estudiante/Lista-frecuentes";
import NavBar from "../../components/Estudiante/NavBar";
export default function Frecuentes() {
  return (
    <div>
      <NavBar />
      <div className="flex">
        <div className="box-faq">
          <h2 className="title-faq">Preguntas Frecuentes</h2>
          <ListaFrecuentes />
        </div>
      </div>
    </div>
  );
}
