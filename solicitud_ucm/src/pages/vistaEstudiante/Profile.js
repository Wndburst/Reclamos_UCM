import React, { useEffect, useState } from "react";
import Datos from "../../components/Estudiante/Datos";
import FPerfil from "../../img/noperfil.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/Estudiante/NavBar";
import Swal from 'sweetalert2';

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

  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState('');

  const [areas, setAreas] = useState([]);
  const [idArea, setIdArea] = useState('');
  
  useEffect(() => {
    axios
      .get("http://localhost:8000/ShowAreas")
      .then((res) => {
        setAreas(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    axios
      .get(`http://localhost:8000/ShowCategoria2?area=${idArea}`)
      .then((res) => {
        setCategorias(res.data);
      })
      .catch((err) => console.log(err));
  }, [idArea]);


  const handleCategoriaChange = (event) => {
    setIdCategoria(event.target.value);
  };

  const handleAreaChange = (event) => {
    setIdArea(event.target.value);
  };

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
          navigate('/login')
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
    const idArea = document.getElementById('idArea').value;
    const idCategoria = document.getElementById('idCategoria').value;
  
    try {
      const response = await axios.post('http://localhost:8000/crear-reclamo', {
        userid: userid,
        titulo: tituloReclamo,
        descripcion: descripcionReclamo,
        visibilidad: idVisibilidad,
        area: idArea,
        categoria: idCategoria,
      });
  
      // Aquí puedes manejar la respuesta del servidor, si es necesario
      console.log(response.data);

      setTimeout(() => {
        // Mostrar notificación de éxito después de 2 segundos
        Swal.fire({
          icon: 'success',
          title: 'Reclamo creado con éxito',
          showConfirmButton: false,
          timer: 1500, // Oculta automáticamente después de 1.5 segundos
        });
      }, 1000);

      setTimeout(() => {
        window.location.reload();
      }, 2000);

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
            <Datos />
          </div>

          {/* MODAL DE CREAR RECLAMO*/}
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
                      <label for="idVisibilidad" class="form-label">Visibilidad</label>
                      <select class="form-select" id="idVisibilidad">
                        <option value="1">Público</option>
                        <option value="2">Privado</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="idArea" className="form-label">AREA</label>
                      <select className="form-control" id="idArea" value={idArea} onChange={handleAreaChange}>
                        <option value="" disabled>Selecciona un Area</option>
                        {areas.map(areas => (
                          <option key={areas.ID_AREA} value={areas.ID_AREA}>{areas.NOMBRE_AREA}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="idCategoria" className="form-label">CATEGORIA</label>
                      <select className="form-control" id="idCategoria" value={idCategoria} onChange={handleCategoriaChange}>
                        <option value="" disabled>Selecciona una categoría</option>
                        {categorias.map(categoria => (
                          <option key={categoria.ID_CATEGORIA} value={categoria.ID_CATEGORIA}>{categoria.NOMBRE_CATEGORIA}</option>
                        ))}
                      </select>
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
