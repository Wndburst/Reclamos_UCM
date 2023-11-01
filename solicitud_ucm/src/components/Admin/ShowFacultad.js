import axios from 'axios';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'datatables.net/js/jquery.dataTables.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash  } from '@fortawesome/free-solid-svg-icons';
const CompShowFacu = () => {
  const [facultades, setFacultad] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFacultad, setSelectedFacultad] = useState({});
  const [editedNombreFacultad, setEditedNombreFacultad] = useState('');
  const [editedIdSede, setEditedIdSede] = useState('');


  const [newFacultadNombre, setNewFacultadNombre] = useState('');
  const [newID, setNewID] = useState('');


  useEffect(() => {
    getFacultad();
  }, []);

  const getFacultad = async () => {
    try {
      const response = await axios.get('http://localhost:8000/ShowFacultad');
      setFacultad(response.data);
    } catch (error) {
      console.error('Error al obtener las facultades:', error);
    }
  };

  const handleDelete = async (idFacultad) => {
    try {
      await axios.post('http://localhost:8000/borrar-facultad', { idFacultad });
      // Actualizar la lista de facultades después de borrar
      getFacultad();
    } catch (error) {
      console.error('Error al borrar la facultad:', error);
    }
  };

  const handleEdit = (facultad) => {
    setSelectedFacultad(facultad);
    setEditedNombreFacultad(facultad.NOMBRE_FACULTAD);
    setEditedIdSede(facultad.ID_SEDE.toString()); // Convierte a cadena para mostrarlo en el input
    setModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post('http://localhost:8000/editar-facultad', {
        idFacultad: selectedFacultad.ID_FACULTAD,
        nuevoNombreFacultad: editedNombreFacultad,
        nuevoIdSede: editedIdSede,
      });
      setModalOpen(false);
      // Actualizar la lista de facultades después de editar
      getFacultad();
    } catch (error) {
      console.error('Error al editar la facultad:', error);
    }
  };

  const handleCreateFacultad = async () => {
    try {
      // Enviar tanto el ID como el nombre del área al backend
      await axios.post('http://localhost:8000/crear-facultad', {
        N_FACULTAD: newFacultadNombre,
        ID: newID
      });

      setModalOpen(false);
      // Actualizar la lista de áreas después de crear
      getFacultad();
    } catch (error) {
      console.error('Error al crear el área:', error);
    }
  };

  useEffect(() => {
    if (facultades.length > 0) {
      // Inicializa DataTables después de que los datos se hayan cargado
      $('#example').DataTable();
    }
  }, [facultades]); // Asegura que se actualice cuando cambian las facultades

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-2">
      Lanzar demo de modal
      </button>
      <table className='table' id='example'>
        <thead className="thead-dark">
          <tr>
            <th>ID_FACULTAD</th>
            <th>NOMBRE_FACULTAD</th>
            <th>ID_SEDE</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facultades.map((facultad) => (
            <tr key={facultad.ID_FACULTAD}>
              <td>{facultad.ID_FACULTAD}</td>
              <td>{facultad.NOMBRE_FACULTAD}</td>
              <td>{facultad.ID_SEDE}</td>
              <td>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(facultad.ID_FACULTAD)}><FontAwesomeIcon icon={faTrash} /></button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEdit(facultad)}
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
              <h5 className="modal-title" id="exampleModalLabel">Editar Facultad</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="editedNombreFacultad" className="form-label">Nuevo Nombre de Facultad</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedNombreFacultad"
                    value={editedNombreFacultad}
                    onChange={(e) => setEditedNombreFacultad(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedIdSede" className="form-label">Nuevo ID de Sede</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedIdSede"
                    value={editedIdSede}
                    onChange={(e) => setEditedIdSede(e.target.value)}
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
              <h5 className="modal-title" id="exampleModalLabel">Crear Nueva Facultad</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="newNombre" className="form-label">Nombre de Facultad</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newNombre"
                    value={newFacultadNombre}
                    onChange={(e) => setNewFacultadNombre(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="newNombre" className="form-label">ID sede</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newNombre"
                    value={newID}
                    onChange={(e) => setNewID(e.target.value)}
                  />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalOpen(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleCreateFacultad}>Crear Facultad</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompShowFacu;
