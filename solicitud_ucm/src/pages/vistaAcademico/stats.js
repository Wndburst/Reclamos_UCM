import React, { useEffect, useState } from "react";
import NavBar from "../../components/Academico/NavbarAcademico";
import Datos from "../../components/Academico/DatosStats";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Stats() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:8000')
      .then(res => {
        console.log(res.data.UserID)
        if (res.data.Status === "Success") {
          setAuth(true);
        } else {
          navigate('/login')
        }
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div>
      <NavBar />
      <div className="flex">
        <div className="box-faq">
          <h2 className="title-faq">Indicadores principales</h2>
          <Datos />
        </div>
      </div>
    </div>
  );
}