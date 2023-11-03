// datos.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "datatables.net/js/jquery.dataTables.js";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Datos = ({ filtro }) => {
  const [reclamos, setReclamos] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [visibilidad, setVisibilidad] = useState("");

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [userid, setUserId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000")
      .then((res) => {
        console.log(res.data.userid);
        if (res.data.Status === "Success") {
          setAuth(true);
          setUserId(res.data.userid);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  
  useEffect(() => {
    if (auth) {
      getReclamos();
    }
  }, [auth, userid]);
  

  const getReclamos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/reclamosAcademico');
      setReclamos(response.data);
    } catch (error) {
      console.error("Error al obtener los reclamos:", error);
    }
  };


  const respuestReclamo = async () => {
    try {
      const data = {
        userid: userid,
        idReclamo: reclamoSeleccionado.ID_RECLAMO,
        respuesta: respuesta,
      };

      const response = await axios.post('http://localhost:8000/respuesta-reclamo', data);

      // Manejar la respuesta del backend si es necesario
      window.location.reload();
      console.log('Respuesta del backend:', response.data);

      // Cerrar el modal o hacer cualquier otra acción después de enviar la respuesta
    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
    }
  };
  
  const filtrarReclamos = () => {
    if (!filtro) {
      return reclamos;
    }

    return reclamos.filter(
      (reclamo) =>
        reclamo.TITULO_RECLAMO.toLowerCase().includes(filtro.toLowerCase()) ||
        reclamo.NOMBRE_CATEGORIA.toLowerCase().includes(filtro.toLowerCase())
    );
  };

  const [reclamoSeleccionado, setReclamoSeleccionado] = useState(null);

  const abrirModal = (reclamo) => {
    setReclamoSeleccionado(reclamo);
  };

  const abrirModal2 = (reclamo) => {
    setReclamoSeleccionado(reclamo);
    setTitulo(reclamo.TITULO_RECLAMO);
    setDescripcion(reclamo.DESCRIPCION_RECLAMO);
    setCategoria(reclamo.ID_CATEGORIA);
    setVisibilidad(reclamo.ID_VISIBILIDAD);
  };

  return (
    <div className="reclamo-general">
      {filtrarReclamos().length === 0 ? (
        <p className="noFoundfilter">No se han encontrado reclamos.</p>
      ) : (
        <ul>
          {filtrarReclamos().map((reclamo) => (
            <li key={reclamo.TITULO_RECLAMO}>
              <div>
                <h3>{reclamo.TITULO_RECLAMO}</h3>
                <p>Categoría: {reclamo.NOMBRE_CATEGORIA}</p>
                <p>Descripción: {reclamo.DESCRIPCION_RECLAMO}</p>
                <p>Estado: {reclamo.NOMBRE_ESTADO}</p>
                <p>Fecha: {reclamo.FECHA_FORMATEADA}</p>
                <div className="flex-reclamos-usuarios">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-1"
                    onClick={() => abrirModal(reclamo)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-2"
                    onClick={() => abrirModal2(reclamo)}
                  >
                    Responder
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/*MODAL 1*/}
      <div
        class="modal fade"
        id="modal-1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Detalles del reclamo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {reclamoSeleccionado && (
                <>
                  <h6>Titulo:</h6>
                  <div className="form-control">
                    {reclamoSeleccionado.TITULO_RECLAMO}
                  </div>
                  <p> </p>
                  <h6>Estudiante:</h6>
                  <div className="form-control">
                    {reclamoSeleccionado.NOMBRE_USUARIO}
                  </div>
                  <p> </p>
                  <h6>CATEGORIA:</h6>
                  <div className="form-control">
                    {reclamoSeleccionado.NOMBRE_CATEGORIA}
                  </div>
                  <p> </p>
                  <h6>DESCRIPCION:</h6>
                  <div className="form-control">
                    {reclamoSeleccionado.DESCRIPCION_RECLAMO}
                  </div>
                  <p> </p>
                  <h6>ESTADO:</h6>
                  <div className="form-control">
                    {reclamoSeleccionado.NOMBRE_ESTADO}
                  </div>
                  <p> </p>
                  <h6>RESPUESTA:</h6>
                  <div className="form-control">
                    {reclamoSeleccionado.RESPUESTA}
                  </div>
                  <p> </p>
                  <h6>FECHA:</h6>
                  <div className="form-control">
                    {reclamoSeleccionado.FECHA_FORMATEADA}
                  </div>
                </>
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*MODAL 2*/}
      <div
        class="modal fade"
        id="modal-2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Responder reclamo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {reclamoSeleccionado && (
                <>
                  <h6>Titulo:</h6>
                  <div className="form-control">
                  {reclamoSeleccionado.TITULO_RECLAMO}
                  </div>
                  <p> </p>
                  <h6>Estudiante:</h6>
                  <div className="form-control">
                    {reclamoSeleccionado.NOMBRE_USUARIO}
                  </div>
                  <p> </p>
                  <h6>Descripción:</h6>
                  <div className="form-control">
                    {reclamoSeleccionado.DESCRIPCION_RECLAMO}
                  </div>
                  <div className="mb-3">
                     <p> </p>
                    <label htmlFor="newNombre" className="form-label">
                      Responder 
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="newNombre"
                      value={respuesta}
                      onChange={(e) => setRespuesta(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={respuestReclamo}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datos;
