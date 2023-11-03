import axios from 'axios';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'datatables.net/js/jquery.dataTables.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const CompShowArea = () => {
  const [areas, setAreas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState({});
  const [editedNombre, setEditedNombre] = useState('');
  const [newAreaNombre, setNewAreaNombre] = useState('');
  const [tuNuevoID, setTuNuevoID] = useState(''); // Agrega un estado para almacenar el nuevo ID

  useEffect(() => {
    getAreas();
  }, []);

  const getAreas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/ShowAreas');
      setAreas(response.data);
    } catch (error) {
      console.error('Error al obtener las áreas:', error);
    }
  };

  const handleDelete = async (idArea) => {
    try {
      await axios.post('http://localhost:8000/borrar-area', { idArea });
      // Actualizar la lista de áreas después de borrar
      getAreas();
    } catch (error) {
      console.error('Error al borrar el área:', error);
    }
  };

  const handleEdit = (area) => {
    setSelectedArea(area);
    setEditedNombre(area.NOMBRE_AREA);
    setModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post('http://localhost:8000/editar-area', {
        idArea: selectedArea.ID_AREA,
        nuevoNombre: editedNombre,
      });
      setModalOpen(false);
      // Actualizar la lista de áreas después de editar
      getAreas();
    } catch (error) {
      console.error('Error al editar el área:', error);
    }
  };

  const handleCreateArea = async () => {
    try {
      // Enviar tanto el ID como el nombre del área al backend
      await axios.post('http://localhost:8000/crear-area', {
        NOMBRE_AREA: newAreaNombre,
      });

      setModalOpen(false);
      // Actualizar la lista de áreas después de crear
      getAreas();
    } catch (error) {
      console.error('Error al crear el área:', error);
    }
  };

  useEffect(() => {
    if (areas.length > 0) {
      // Inicializa DataTables después de que los datos se hayan cargado
      $('#example').DataTable();
    }
  }, [areas]); // Asegura que se actualice cuando cambian las áreas

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-2">
        CREAR AREA
      </button>

      <table className='table' id='example'>
        <thead className="thead-dark">
          <tr>
            <th>ID_AREA</th>
            <th>NOMBRE_AREA</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((area) => (
            <tr key={area.ID_AREA}>
              <td>{area.ID_AREA}</td>
              <td>{area.NOMBRE_AREA}</td>
              <td>
                <button type="button" className="btn btn-danger " onClick={() => handleDelete(area.ID_AREA)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEdit(area)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal 1 */}
      <div className={`modal fade ${modalOpen ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!modalOpen}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar Área</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="editedNombre" className="form-label">Nuevo Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedNombre"
                    value={editedNombre}
                    onChange={(e) => setEditedNombre(e.target.value)}
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
              <h5 className="modal-title" id="exampleModalLabel">Crear Nueva Área</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="newNombre" className="form-label">Nombre del Área</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newNombre"
                    value={newAreaNombre}
                    onChange={(e) => setNewAreaNombre(e.target.value)}
                  />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalOpen(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleCreateArea}>Crear Área</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompShowArea;
