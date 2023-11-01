import "../../../App.scss";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../../components/Admin/NavBarAdmin";
import SideBar from "../../../components/Admin/SideBar";

import CompShowUsu from "../../../components/Admin/ShowUsuarios";

export default function Addusu() {
  return (
    <div>
      <NavBar />
      <div className="flexadmin">
        <SideBar />
        <div className="addusu">
          <h2 className="title-admin">Usuarios</h2>
          <div className="tablausu">
            <CompShowUsu />
          </div>
        </div>
      </div>
    </div>
  );
}
