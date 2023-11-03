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
const Datos_inicio = ({ filtro }) => {
  const [reclamos, setReclamos] = useState([]);
  const [reclamoSeleccionado, setReclamoSeleccionado] = useState(null);

  useEffect(() => {
    getReclamos();
  }, []);

  const getReclamos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/reclamos");
      setReclamos(response.data);
    } catch (error) {
      console.error("Error al obtener los reclamos:", error);
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

  const abrirModal = (reclamo) => {
    setReclamoSeleccionado(reclamo);
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
    </div>
  );
};

export default Datos_inicio;
