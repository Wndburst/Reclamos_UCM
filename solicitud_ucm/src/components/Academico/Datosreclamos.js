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
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

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
  const [usertype, setUserType] = useState("");



  const [textoFiltro, setTextoFiltro] = useState('');
  const [selectedOptions, setSelectedOptions] = useState('0');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Número de elementos por página


  useEffect(() => {
    axios
      .get("http://localhost:8000")
      .then((res) => {
        console.log(res.data.userid);
        if (res.data.Status === "Success") {
          setAuth(true);
          setUserId(res.data.userid);
          setUserType(res.data.usertype);
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
  }, [auth, userid,selectedOptions]);
  

  const getReclamos = async () => {
    try {
      const estado = selectedOptions;
      const response = await axios.get(`http://localhost:8000/reclamosAcademico/${usertype}/${estado}`);
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

      setTimeout(() => {
        // Mostrar notificación de éxito después de 2 segundos
        Swal.fire({
          icon: 'success',
          title: 'Respuesta creada con éxito',
          showConfirmButton: false,
          timer: 1500, // Oculta automáticamente después de 1.5 segundos
        });
      }, 1000);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
      // Cerrar el modal o hacer cualquier otra acción después de enviar la respuesta
    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
    }
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

  const handleEncargado = async (reclamo) => {
    try {
      const data = {
        usertype: usertype,
        idReclamo: reclamo.ID_RECLAMO,
      };

      const result = await Swal.fire({
        title: "¿Deseas cambiar el encargado del reclamo?",
        text: "No podrás volver a ver este reclamo.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
      });
  
      if (result.isConfirmed) {
        // El usuario confirmó, procedemos con la eliminación del reclamo
        await axios.post('http://localhost:8000/cambiar-encargado', data);
  
        // Muestra la alerta de éxito después de borrar el reclamo
        Swal.fire({
          title: "Listo",
          text: "Se ha modificado el encargado del reclamo.",
          icon: "success",
        });
  
        // Actualiza la lista de reclamos después de la eliminación
        getReclamos();
      }
    } catch (error) {
      console.error("Error al borrar el reclamo:", error);
    }

  };

  const handlePageChange = ({ selected }) => {
    window.scrollTo(0, 0);
    setCurrentPage(selected);
  };
  const filtrarReclamos = () => {
    const filteredReclamos = reclamos.filter((reclamo) =>
      reclamo.TITULO_RECLAMO.toLowerCase().includes(textoFiltro.toLowerCase())
    );
    const startIndex = currentPage * itemsPerPage;
    return filteredReclamos.slice(startIndex, startIndex + itemsPerPage);
  };
  const pageCount = Math.ceil(
    reclamos.filter((reclamo) =>
      reclamo.TITULO_RECLAMO.toLowerCase().includes(textoFiltro.toLowerCase())
    ).length / itemsPerPage
  );

  const handleTextoFiltroChange = (e) => {
    setTextoFiltro(e.target.value);
  };
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptions(selectedValue);
  };

  useEffect(() => {
    getReclamos();
    console.log(textoFiltro)

  }, [textoFiltro]);
  

  return (
    <div>
      <div className="barraFiltradoraAcademico">
        <h2 className="lsreclamosacademico">Reclamos asociados</h2>
          <ul>
            <li>
            <input
                type="text"
                placeholder="Buscar reclamo"
                value={textoFiltro}
                onChange={handleTextoFiltroChange}
              />

              <select value={selectedOptions} onChange={handleSelectChange}>
                <option disabled>Seleccionar estado</option>
                <option value="0">Todos</option>
                <option value="1">Pendiente</option>
                <option value="2">En proceso</option>
                <option value="3">Solucionado</option>
              </select>

              </li>
          </ul>
      </div>
    
    <div className="reclamo-general-academico">
      {filtrarReclamos().length === 0 ? (
        <p className="noFoundfilter">No se han encontrado reclamos.</p>
      ) : (
        <ul>
          {filtrarReclamos().map((reclamo) => (
            <li key={reclamo.ID_RECLAMO}>
              <div>
                <h3>{reclamo.TITULO_RECLAMO}</h3>
                <p>Categoría: {reclamo.NOMBRE_CATEGORIA}</p>
                <p>Descripción: {reclamo.DESCRIPCION_RECLAMO}</p>
                <p>Estado: {reclamo.NOMBRE_ESTADO}</p>
                <p>Fecha: {reclamo.FECHA_FORMATEADA}</p>
                <div className="flex-reclamos-usuarios">

                  <div className="boton-encargado">
                  <button 
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleEncargado(reclamo)}
                    >
                    Cambiar encargado
                  </button>
                  </div>

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
                    {reclamoSeleccionado.NOMBRE_USUARIO +' '+ reclamoSeleccionado.APELLIDO_USUARIO}
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
                    {reclamoSeleccionado.NOMBRE_USUARIO +' '+ reclamoSeleccionado.APELLIDO_USUARIO}
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
    <div className="pagg"> 
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          /> 
      </div>
    </div>
  );
};

export default Datos;
