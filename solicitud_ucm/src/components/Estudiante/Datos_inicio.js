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
      const response = await axios.get(`http://localhost:8000/reclamos-generales/${estado}/${area}`);
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
            <ul>
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
                  <h6>AREA:</h6>
                  <div className="form-control">
                    {reclamoSeleccionado.NOMBRE_AREA}
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
