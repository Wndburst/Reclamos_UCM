import axios from 'axios';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'datatables.net/js/jquery.dataTables.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash  } from '@fortawesome/free-solid-svg-icons';
const CompShowCarrera = () => {
  const [carreras, setCarreras] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCarrera, setSelectedCarrera] = useState({});
  const [editedNombreCarrera, setEditedNombreCarrera] = useState('');
  const [editedIdFacultad, setEditedIdFacultad] = useState('');

  const [newCarreraNombre, setnewCarreraNombre] = useState('');
  const [newID, setnewID] = useState('');

  useEffect(() => {
    getCarreras();
  }, []);

  const getCarreras = async () => {
    try {
      const response = await axios.get('http://localhost:8000/ShowCarrera');
      setCarreras(response.data);
    } catch (error) {
      console.error('Error al obtener las carreras:', error);
    }
  };

  const handleDelete = async (idCarrera) => {
    try {
      await axios.post('http://localhost:8000/borrar-carrera', { idCarrera });
      // Actualizar la lista de carreras después de borrar
      getCarreras();
    } catch (error) {
      console.error('Error al borrar la carrera:', error);
    }
  };

  const handleEdit = (carrera) => {
    setSelectedCarrera(carrera);
    setEditedNombreCarrera(carrera.NOMBRE_CARRERA);
    setEditedIdFacultad(carrera.ID_FACULTAD.toString()); // Convierte a cadena para mostrarlo en el input
    setModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post('http://localhost:8000/editar-carrera', {
        idCarrera: selectedCarrera.ID_CARRERA,
        nuevoNombreCarrera: editedNombreCarrera,
        nuevoIdFacultad: editedIdFacultad,
      });
      setModalOpen(false);
      // Actualizar la lista de carreras después de editar
      getCarreras();
    } catch (error) {
      console.error('Error al editar la carrera:', error);
    }
  };

  const handleCreateCarrera = async () => {
    try {
      // Enviar tanto el ID como el nombre del área al backend
      await axios.post('http://localhost:8000/crear-carrera', {
        N_CARRERA: newCarreraNombre,
        ID: newID,
      });

      setModalOpen(false);
      // Actualizar la lista de áreas después de crear
      getCarreras();
    } catch (error) {
      console.error('Error al crear el área:', error);
    }
  };

  useEffect(() => {
    if (carreras.length > 0) {
      // Inicializa DataTables después de que los datos se hayan cargado
      $('#example').DataTable();
    }
  }, [carreras]); // Asegura que se actualice cuando cambian las carreras

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-2">
        CREAR CARRERA
      </button>
      <table className='table' id='example'>
        <thead className="thead-dark">
          <tr>
            <th>ID_CARRERA</th>
            <th>NOMBRE_CARRERA</th>
            <th>ID_FACULTAD</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carreras.map((carrera) => (
            <tr key={carrera.ID_CARRERA}>
              <td>{carrera.ID_CARRERA}</td>
              <td>{carrera.NOMBRE_CARRERA}</td>
              <td>{carrera.ID_FACULTAD}</td>
              <td>
                <button type="button" className="btn btn-danger"onClick={() => handleDelete(carrera.ID_CARRERA)}><FontAwesomeIcon icon={faTrash} /></button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEdit(carrera)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <div className={`modal fade ${modalOpen ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!modalOpen}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar Carrera</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="editedNombreCarrera" className="form-label">Nuevo Nombre de Carrera</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedNombreCarrera"
                    value={editedNombreCarrera}
                    onChange={(e) => setEditedNombreCarrera(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedIdFacultad" className="form-label">Nuevo ID de Facultad</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedIdFacultad"
                    value={editedIdFacultad}
                    onChange={(e) => setEditedIdFacultad(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalOpen(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>


        {/* Modal 2 */}
            <div className="modal fade" id="modal-2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!modalOpen}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Crear Nueva Carrera</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="newNombre" className="form-label">Nombre del la carrera</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newNombre"
                    value={newCarreraNombre}
                    onChange={(e) => setnewCarreraNombre(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="newFacultad" className="form-label">ID Facultad</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newFacultad"
                    value={newID}
                    onChange={(e) => setnewID(e.target.value)}
                  />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalOpen(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleCreateCarrera}>Crear Carrera</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompShowCarrera;
