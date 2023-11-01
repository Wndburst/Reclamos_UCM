import "../../../App.scss";
import React from "react";

import NavBar from "../../../components/Admin/NavBarAdmin";
import SideBar from "../../../components/Admin/SideBar";
import { Link, useNavigate } from "react-router-dom";
import CompShowSede from "../../../components/Admin/ShowSede";

export default function Addsede() {
  return (
    <div>
      <NavBar />
      <div className="flexadmin">
        <SideBar />
        <div className="addusu">
          <h2 className="title-admin">Sede</h2>
          <div className="tablausu">
            <CompShowSede />
          </div>
        </div>
      </div>
    </div>
  );
}
