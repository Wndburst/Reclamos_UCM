import "../../../App.scss";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../../components/Admin/NavBarAdmin";
import SideBar from "../../../components/Admin/SideBar";

import CompShowArea from "../../../components/Admin/ShowArea";

export default function Addarea() {
  return (
    <div>
      <NavBar />
      <div className="flexadmin">
        <SideBar />
        <div className="addusu">
          <h2 className="title-admin">Area</h2>
          <div className="tablausu">
            <CompShowArea />
          </div>
        </div>
      </div>
    </div>
  );
}
