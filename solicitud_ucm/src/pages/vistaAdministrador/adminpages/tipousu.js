import "../../../App.scss";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import NavBar from "../../../components/Admin/NavBarAdmin";
import SideBar from "../../../components/Admin/SideBar";
import CompShowTipoUsu from "../../../components/Admin/ShowTipoUsuario";

export default function Addfaq() {
  return (
    <div>
      <NavBar />
      <div className="flexadmin">
        <SideBar />
        <div className="addusu">
          <h2 className="title-admin">Tipos de Usuario</h2>

          <div className="tablausu">
            <CompShowTipoUsu />
          </div>
        </div>
      </div>
    </div>
  );
}
