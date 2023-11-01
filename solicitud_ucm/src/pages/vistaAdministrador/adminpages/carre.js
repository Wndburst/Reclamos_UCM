import "../../../App.scss";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../../components/Admin/NavBarAdmin";
import SideBar from "../../../components/Admin/SideBar";

import CompShowCarrera from "../../../components/Admin/ShowCarrera";

export default function Addcate() {
  return (
    <div>
      <NavBar />
      <div className="flexadmin">
        <SideBar />
        <div className="addusu">
          <h2 className="title-admin">Carrera</h2>
          <div className="tablausu">
            <CompShowCarrera />
          </div>
        </div>
      </div>
    </div>
  );
}
