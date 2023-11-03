import React, { useEffect, useState } from "react";
import Datos from "../../components/Estudiante/Datos";
import FPerfil from "../../img/perfil.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/Estudiante/NavBar";
axios.defaults.withCredentials = true;

export default function Profile() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [userid, setUserId] = useState("");
  const [username, setUserName] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [usertype, setUserType] = useState("");
  const [userCarrera, setUserCarrera] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000")
      .then((res) => {
        console.log(res.data.UserID);
        if (res.data.Status === "Success") {
          setAuth(true);
          setUserId(res.data.userid);
          setUserName(res.data.username);
          setUserEmail(res.data.useremail);
          setUserType(res.data.usertype);
          setUserCarrera(res.data.userCarrera);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = () => {
    axios
      .get("http://localhost:8000/logout")
      .then((res) => {
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const handleCrearReclamo = async () => {
    const tituloReclamo = document.getElementById('tituloReclamo').value;
    const descripcionReclamo = document.getElementById('descripcionReclamo').value;
    const idVisibilidad = document.getElementById('idVisibilidad').value;
    const idCategoria = document.getElementById('idCategoria').value;
  
    try {
      const response = await axios.post('http://localhost:8000/crear-reclamo', {
        userid: userid,
        titulo: tituloReclamo,
        descripcion: descripcionReclamo,
        visibilidad: idVisibilidad,
        categoria: idCategoria,
      });
  
      // Aquí puedes manejar la respuesta del servidor, si es necesario
      console.log(response.data);
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <NavBar />
      {auth ? (
        <div className="flex">
          <div className="CPerfil">
            <div className="flex-1">
              <div>
                <img className="FPerfil" src={FPerfil} alt="" />
              </div>

              <div className="DPerfil">
                <p>{username}</p>
                <p>{userid}</p>
                <p>{useremail}</p>
                <p>Regular en {userCarrera}</p>
              </div>
            </div>
            <div className="flex">
              <div className="OPerfil">
                <ul>
                  <li type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                      Crear reclamo
                  </li>
                  <li type="button" class="btn btn-primary" onClick={handleDelete}>
                    Cerrar sesion
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="lsreclamos">Mis reclamos</h2>
            <Datos />
          </div>

          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Crear reclamo
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="mb-3">
                      <label for="tituloReclamo" class="form-label">Título del reclamo</label>
                      <input type="text" class="form-control" id="tituloReclamo" />
                    </div>
                    <div class="mb-3">
                      <label for="descripcionReclamo" class="form-label">Descripción del reclamo</label>
                      <textarea class="form-control" id="descripcionReclamo" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                      <label for="idVisibilidad" class="form-label">ID de visibilidad</label>
                      <input type="text" class="form-control" id="idVisibilidad" />
                    </div>
                    <div class="mb-3">
                      <label for="idCategoria" class="form-label">ID de categoría</label>
                      <input type="text" class="form-control" id="idCategoria" />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>

                  <button type="button" class="btn btn-primary" onClick={handleCrearReclamo}>
                    Crear reclamo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      ) : (
        <div>
          <h3>{message}</h3>
          <h3>Inicia sesion :/</h3>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
}
