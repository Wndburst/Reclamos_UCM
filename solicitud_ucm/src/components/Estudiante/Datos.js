// datos.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import { faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";

import ReactPaginate from 'react-paginate';


const Datos = () => {
  const [reclamos, setReclamos] = useState([]);



  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [visibilidad, setVisibilidad] = useState("");
  const [estadoReclamo, setEstadoReclamo] = useState("");

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [userid, setUserId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState('');

  const [areas, setAreas] = useState([]);
  const [idArea, setIdArea] = useState('');
  const [selectedOptions, setSelectedOptions] = useState('0');

  const [textoFiltro, setTextoFiltro] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Número de elementos por página
  
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

  const handleAreaChange = (event) => {
    setIdArea(event.target.value);

  };

  const handleCatChange = (event) => {
    setIdCategoria(event.target.value);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveChanges();
  };


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
  }, [auth, userid,selectedOptions]);


  
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptions(selectedValue);
  };





  const getReclamos = async () => {
    try {
      const estado = selectedOptions;
      const response = await axios.get(`http://localhost:8000/api/reclamos/${userid}/${estado}`);
      setReclamos(response.data);

    } catch (error) {
      console.error("Error al obtener los reclamos:", error);
    }
  };
  
  

  const handleDelete = async (idReclamo) => {
    try {
      const result = await Swal.fire({
        title: "¿Deseas eliminar el reclamo?",
        text: "No podrás volver a ver este reclamo.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, bórralo",
      });
  
      if (result.isConfirmed) {
        // El usuario confirmó, procedemos con la eliminación del reclamo
        await axios.post("http://localhost:8000/api/borrar-reclamo", { idReclamo });
  
        // Muestra la alerta de éxito después de borrar el reclamo
        Swal.fire({
          title: "Eliminado",
          text: "El reclamo ha sido eliminado.",
          icon: "success",
        });
  
        // Actualiza la lista de reclamos después de la eliminación
        getReclamos();
      }
    } catch (error) {
      console.error("Error al borrar el reclamo:", error);
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
    setIdArea(reclamo.ID_AREA);
    setIdCategoria(reclamo.ID_CATEGORIA);
    setVisibilidad(reclamo.ID_VISIBILIDAD);
    setEstadoReclamo(reclamo.ID_ESTADO);

    console.log('asdsad:', categoria)
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/editar-reclamo",
        {
          idReclamo: reclamoSeleccionado.ID_RECLAMO,
          titulo,
          descripcion,
          idArea, 
          idCategoria,
          visibilidad,
          estadoReclamo,
        }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error al editar el reclamo:", error);
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

useEffect(() => {
  console.log(textoFiltro);
}, [textoFiltro]);



  return (
    <div>
      <div className="barraFiltradoraPerfil">
        <h2 className="lsreclamosacademico">Mis reclamos</h2>
          <ul className="filterInicio">
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
    <div className="reclamo-general-perfil">
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
                    Visualizar
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(reclamo.ID_RECLAMO)}
                  >
                    Borrar
                    <FontAwesomeIcon icon={faTrash} />
                  </button>

                  <button
                    data-testid="modificar-button"
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-2"
                    onClick={() => abrirModal2(reclamo)}
                  >
                    Modificar
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </div>
              </div>
            </li>
            
          ))}

        </ul>
        
      )}   

     </div>  
      <div>
      <div className="pagg"> 
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          /> 
      </div>  
      {/*MODAL 1 MOSTRAR RECLAMO*/}
      <div
        class="modal fade"
        id="modal-1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
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
                  <div class="mb-3">
                    <h6 class="fw-bold">Titulo:</h6>
                    <div class="card p-2">
                      {reclamoSeleccionado.TITULO_RECLAMO}
                    </div>
                  </div>
                  <div class="mb-3">
                    <h6 class="fw-bold">Estudiante:</h6>
                    <div class="card p-2">
                      {reclamoSeleccionado.NOMBRE_USUARIO}
                    </div>
                  </div>
                  <div class="mb-3">
                    <h6 class="fw-bold">Área:</h6>
                    <div class="card p-2">
                      {reclamoSeleccionado.NOMBRE_AREA}
                    </div>
                  </div>
                  <div class="mb-3">
                    <h6 class="fw-bold">Categoría:</h6>
                    <div class="card p-2">
                      {reclamoSeleccionado.NOMBRE_CATEGORIA}
                    </div>
                  </div>
                  <div class="mb-3">
                    <h6 class="fw-bold">Descripción:</h6>
                    <div class="card p-2">
                      {reclamoSeleccionado.DESCRIPCION_RECLAMO}
                    </div>
                  </div>
                  <div class="mb-3">
                    <h6 class="fw-bold">Estado:</h6>
                    <div class="card p-2">
                      {reclamoSeleccionado.NOMBRE_ESTADO}
                    </div>
                  </div>
                  <div class="mb-3">
                    <h6 class="fw-bold">Respuesta:</h6>
                    <div class="card p-2">
                      {reclamoSeleccionado.RESPUESTA}
                    </div>
                  </div>
                  <div class="mb-3">
                    <h6 class="fw-bold">Fecha:</h6>
                    <div class="card p-2">
                      {reclamoSeleccionado.FECHA_FORMATEADA}
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

      {/*MODAL 2 EDITAR RECLAMO*/}
      <div
        class="modal fade"
        id="modal-2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={handleSubmit}>
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                  Editar Reclamo
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
                      <label htmlFor="newNombre" className="form-label fw-bold">
                        Nuevo Titulo Reclamo
                      </label>
                      <div class="card p-2">
                        <input
                          type="text"
                          className="form-control"
                          id="newNombre"
                          value={titulo}
                          onChange={(e) => setTitulo(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="newDescripcion" className="form-label fw-bold">
                        Nueva Descripción
                      </label>
                      <div class="card p-2">
                        <input
                          type="text"
                          className="form-control"
                          id="newDescripcion"
                          value={descripcion}
                          onChange={(e) => setDescripcion(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="newArea" className="form-label fw-bold">
                        Nueva Área
                      </label>
                      <div class="card p-2">
                        <select
                          type="text"
                          className="form-control"
                          id="newArea"
                          value={idArea}
                          onChange={handleAreaChange}
                          required
                        >
                          <option value="" disabled>Selecciona un Área</option>
                          {areas.map(area => (
                            <option key={area.ID_AREA} value={area.ID_AREA}>{area.NOMBRE_AREA}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="newCategoria" className="form-label fw-bold">
                        Nueva Categoría
                      </label>
                      <div class="card p-2">
                        <select
                          type="text"
                          className="form-control"
                          id="newCategoria"
                          value={idCategoria}
                          onChange={handleCatChange}
                          required
                        >
                          <option value="" disabled>Selecciona una Categoría</option>
                          {categorias.map(categoria => (
                            <option key={categoria.ID_CATEGORIA} value={categoria.ID_CATEGORIA}>{categoria.NOMBRE_CATEGORIA}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="newVisibilidad" className="form-label fw-bold">
                        Visibilidad
                      </label>
                      <div class="card p-2">
                        <select
                          className="form-select"
                          id="newVisibilidad"
                          value={visibilidad}
                          onChange={(e) => setVisibilidad(e.target.value)}
                          required
                        >
                          <option value="1">Público</option>
                          <option value="2">Privado</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="newEstado" className="form-label fw-bold">
                        Estado
                      </label>
                      <div class="card p-2">
                        <select
                          className="form-select"
                          id="newEstado"
                          value={estadoReclamo}
                          onChange={(e) => setEstadoReclamo(e.target.value)}
                          required
                        >
                          <option value="1">Pendiente</option>
                          <option value="2">En proceso</option>
                          <option value="3">Solucionado</option>
                        </select>
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
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={handleSaveChanges}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

    </div>
    </div>
  );
};

export default Datos;
