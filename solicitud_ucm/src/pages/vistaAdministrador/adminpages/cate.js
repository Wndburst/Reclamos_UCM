import "../../../App.scss";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../../components/Admin/NavBarAdmin";
import SideBar from "../../../components/Admin/SideBar";
import CompShowCategoria from "../../../components/Admin/ShowCategoria";

export default function Addcate() {

  return (
    <div>
      <NavBar />
      <div className="flexadmin">
        <SideBar />
        <div className="addusu">
          <h2 className="title-admin">Categoria</h2>
          <div className="tablausu">
            <CompShowCategoria />
          </div>
        </div>
      </div>
    </div>
  );
}
