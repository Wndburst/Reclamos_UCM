import "../../../App.scss";
import React from "react";

import NavBar from "../../../components/Admin/NavBarAdmin";
import SideBar from "../../../components/Admin/SideBar";
import CompShowfaq from "../../../components/Admin/ShowPreguntasFrecuentes";

export default function Addfaq() {
  return (
    <div>
      <NavBar />
      <div className="flexadmin">
        <SideBar />
        <div className="addusu">
          <h2 className="title-admin">Preguntas Frecuentes</h2>
          <div className="tablausu">
            <CompShowfaq />
          </div>
        </div>
      </div>
    </div>
  );
}
