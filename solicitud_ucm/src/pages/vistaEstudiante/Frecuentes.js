import React, { useEffect, useState } from "react";
import ListaFrecuentes from "../../components/Estudiante/Lista-frecuentes";
import NavBar from "../../components/Estudiante/NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Frecuentes() {

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
        <div className="box-faq">
          <ListaFrecuentes />
        </div>
      </div>
    </div>
  );
}
