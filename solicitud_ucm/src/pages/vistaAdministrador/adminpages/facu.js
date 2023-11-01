import "../../../App.scss";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../../components/Admin/NavBarAdmin";
import SideBar from "../../../components/Admin/SideBar";

import CompShowFacu from "../../../components/Admin/ShowFacultad";

export default function Addfacu() {
  return (
    <div>
      <NavBar />
      <div className="flexadmin">
        <SideBar />
        <div className="addusu">
          <h2 className="title-admin">Facultad</h2>
          <div className="tablausu">
            <CompShowFacu />
          </div>
        </div>
      </div>
    </div>
  );
}
