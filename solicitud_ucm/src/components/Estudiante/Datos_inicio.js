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
import ReactPaginate from "react-paginate";


const Datos_inicio = ({ filtro }) => {
  const [reclamos, setReclamos] = useState([]);
  const [reclamoSeleccionado, setReclamoSeleccionado] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Número de elementos por página

  const [areas, setAreas] = useState([]);
  const [textoFiltro, setTextoFiltro] = useState('');
  
  const [selectedOptions, setSelectedOptions] = useState('0');
  const [idArea, setIdArea] = useState('0');



  useEffect(() => {
    axios
      .get("http://localhost:8000/ShowAreas")
      .then((res) => {
        setAreas(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getReclamos = async () => {
    try {
      const estado = selectedOptions;
      const area = idArea;
      const response = await axios.get(`http://localhost:8000/api/reclamos-generales/${estado}/${area}`);
      setReclamos(response.data);
    } catch (error) {
      console.error("Error al obtener los reclamos:", error);
    }
  };

  useEffect(() => {
    getReclamos();
  },[selectedOptions,idArea]);


  const abrirModal = (reclamo) => {
    setReclamoSeleccionado(reclamo);
  };

    
  const filtrarReclamos = () => {
    const filteredReclamos = reclamos.filter((reclamo) =>
      reclamo.TITULO_RECLAMO.toLowerCase().includes(textoFiltro.toLowerCase())
    );
    const startIndex = currentPage * itemsPerPage;
    return filteredReclamos.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = ({ selected }) => {
    window.scrollTo(0, 0);
    setCurrentPage(selected);
  };
  
  const pageCount = Math.ceil(
    reclamos.filter((reclamo) =>
      reclamo.TITULO_RECLAMO.toLowerCase().includes(textoFiltro.toLowerCase())
    ).length / itemsPerPage
  );
  
  
  const handleTextoFiltroChange = (e) => {
    setTextoFiltro(e.target.value);
  };
  
  
  useEffect(() => {
    console.log(textoFiltro);
  }, [textoFiltro]);
  
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptions(selectedValue);
  };

  const handleAreaChange = (event) => {
    const selectedArea = event.target.value
    console.log('teste: ', event.target.value)
    setIdArea(selectedArea);

  };

  return (
    <div className="flexHome">
      <div className="bgBr">
      <h1 className="lsreclamos">Lista de reclamos</h1>
      <div className="barraFiltradoraHome">
        <div className="inputfilter">
          <input
            type="text"
            placeholder="Buscar reclamo"
            value={textoFiltro}
            onChange={handleTextoFiltroChange}
          />
        </div>
          <div className="filterType">
            <ul className="filterInicio">
              <li>
                <div className="labelFilter">
                <label>Seleccionar estado </label><br/>
                <select placeholder="Seleccionar estado" value={selectedOptions} onChange={handleSelectChange}>
                  <option disabled>Seleccionar estado</option>
                  <option value="0">Todos</option>
                  <option value="1">Pendiente</option>
                  <option value="2">En proceso</option>
                  <option value="3">Solucionado</option>
              </select>
              </div>
              </li>
              <li>
                <div className="labelFilter">
                  <label>Selecionar Area</label> <br/>
              <select
                value={idArea}
                onChange={handleAreaChange}
              >
                <option disabled>Seleccionar Area</option>
                <option value="0">Todas</option>
                {areas.map(area => (
                  <option key={area.ID_AREA} value={area.ID_AREA}>{area.NOMBRE_AREA}</option>
                ))}
              </select>
              </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

    <div className="reclamo-general">
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
        
      )
      }
      {/*MODAL 1*/}
      <div
      class="modal fade"
      id="modal-1"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              Detalles del Reclamo
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
                <div className="mb-3">
                  <label htmlFor="tituloReclamo" className="form-label fw-bold">
                    Título:
                  </label>
                  <div class="card p-2">
                    <div className="form-control" id="tituloReclamo">
                      {reclamoSeleccionado.TITULO_RECLAMO}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="nombreUsuario" className="form-label fw-bold">
                    Estudiante:
                  </label>
                  <div class="card p-2">
                    <div className="form-control" id="nombreUsuario">
                      {reclamoSeleccionado.NOMBRE_USUARIO}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="nombreArea" className="form-label fw-bold">
                    Área:
                  </label>
                  <div class="card p-2">
                    <div className="form-control" id="nombreArea">
                      {reclamoSeleccionado.NOMBRE_AREA}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="nombreCategoria" className="form-label fw-bold">
                    Categoría:
                  </label>
                  <div class="card p-2">
                    <div className="form-control" id="nombreCategoria">
                      {reclamoSeleccionado.NOMBRE_CATEGORIA}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="descripcionReclamo" className="form-label fw-bold">
                    Descripción:
                  </label>
                  <div class="card p-2">
                    <div className="form-control" id="descripcionReclamo">
                      {reclamoSeleccionado.DESCRIPCION_RECLAMO}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="nombreEstado" className="form-label fw-bold">
                    Estado:
                  </label>
                  <div class="card p-2">
                    <div className="form-control" id="nombreEstado">
                      {reclamoSeleccionado.NOMBRE_ESTADO}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="respuestaReclamo" className="form-label fw-bold">
                    Respuesta:
                  </label>
                  <div class="card p-2">
                    <div className="form-control" id="respuestaReclamo">
                      {reclamoSeleccionado.RESPUESTA}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="fechaFormateada" className="form-label fw-bold">
                    Fecha:
                  </label>
                  <div class="card p-2">
                    <div className="form-control" id="fechaFormateada">
                      {reclamoSeleccionado.FECHA_FORMATEADA}
                    </div>
                  </div>
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

export default Datos_inicio;
