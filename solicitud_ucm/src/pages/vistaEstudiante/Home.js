// home.js
import React, { useEffect,useState } from "react";
import Datos_inicio from "../../components/Estudiante/Datos_inicio";
import SideBar from "../../components/Estudiante/SideBar";
import "../../App.scss";
import NavBar from "../../components/Estudiante/NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [filtro, setFiltro] = useState("");

  const handleFilterChange = (filtro) => {
    setFiltro(filtro);
  };
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000")
      .then((res) => {
        setAuth(true);
        if (res.data.Status === "Success") {
        } else {
          setAuth(false);
          navigate('/login')
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex">
        <Datos_inicio filtro={filtro} />
      </div>
    </div>
  );
}
