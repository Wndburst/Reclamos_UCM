import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imagen from "../img/ucm.jpg";
import logo from "../img/logo-ucm.jpg";
import { AuthContext } from "./AuthContext";

function Login() {
  const [values, setValues] = useState({
    rut: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // Usar el contexto de autenticación

  axios.defaults.withCredentials = true;
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          axios
            .get("http://localhost:8000/", {
              headers: {
                Authorization: `Bearer ${res.data.token}`,
              },
            })
            .then((userRes) => {
              const usertype = userRes.data.usertype;
              setUser({
                userid: userRes.data.userid,
                username: userRes.data.username,
                useremail: userRes.data.useremail,
                usertype: userRes.data.usertype,
                userCarrera: userRes.data.userCarrera,
              });

              // Redirigir según el tipo de usuario
              switch (usertype) {
                case 1:
                  navigate("/");
                  break;
                case 2:
                case 3:
                  navigate("/academico");
                  break;
                case 5:
                  navigate("/usu");
                  break;
                default:
                  navigate("/login");
              }
            })
            .catch((err) => {
              console.error(err);
              alert("Error al obtener la información del usuario");
            });
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="loginScreen" style={{ backgroundImage: `url(${imagen})` }}>
      <form onSubmit={handleSubmit} className="formulario-login">
        <img className="logo-login" src={logo} alt="" />
        <h1>
          Portal reclamos <br /> y sugerencias
        </h1>

        <p>Usuario</p>
        <input
          type="text"
          name="rut"
          placeholder="Ingrese su RUT"
          onChange={(e) => setValues({ ...values, rut: e.target.value })}
        />
        <br />

        <p>Contraseña</p>
        <input
          type="password"
          name="password"
          placeholder="Ingrese su contraseña"
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
        <br />

        <div className="botoncito">
          <button type="submit">Iniciar Sesión</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
