import axios from 'axios';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'datatables.net/js/jquery.dataTables.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash  } from '@fortawesome/free-solid-svg-icons';
const CompShowSede = () => {
  const [sedes, setSedes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSede, setSelectedSede] = useState({});
  const [editedNombreSede, setEditedNombreSede] = useState('');

  const [newSedeNombre, setNewSedeNombre] = useState('');

  useEffect(() => {
    getSedes();
  }, []);

  const getSedes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/ShowSede');
      setSedes(response.data);
    } catch (error) {
      console.error('Error al obtener las sedes:', error);
    }
  };

  const handleDelete = async (idSede) => {
    try {
      await axios.post('http://localhost:8000/borrar-sede', { idSede });
      // Actualizar la lista de sedes después de borrar
      getSedes();
    } catch (error) {
      console.error('Error al borrar la sede:', error);
    }
  };

  const handleEdit = (sede) => {
    setSelectedSede(sede);
    setEditedNombreSede(sede.NOMBRE_SEDE);
    setModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post('http://localhost:8000/editar-sede', {
        idSede: selectedSede.ID_SEDE,
        nuevoNombreSede: editedNombreSede,
      });
      setModalOpen(false);
      // Actualizar la lista de sedes después de editar
      getSedes();
    } catch (error) {
      console.error('Error al editar la sede:', error);
    }
  };

  const handleCreateSede = async () => {
    try {
      // Enviar tanto el ID como el nombre del área al backend
      await axios.post('http://localhost:8000/crear-sede', {
        N_SEDE: newSedeNombre
      });

      setModalOpen(false);
      // Actualizar la lista de áreas después de crear
      getSedes();
    } catch (error) {
      console.error('Error al crear el área:', error);
    }
  };

  useEffect(() => {
    if (sedes.length > 0) {
      // Inicializa DataTables después de que los datos se hayan cargado
      $('#example').DataTable();
    }
  }, [sedes]); // Asegura que se actualice cuando cambian las sedes

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-2">
      CREAR SEDE
      </button>
      
      <table className='table' id='example'>
        <thead className="thead-dark">
          <tr>
            <th>ID_SEDE</th>
            <th>NOMBRE_SEDE</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sedes.map((sede) => (
            <tr key={sede.ID_SEDE}>
              <td>{sede.ID_SEDE}</td>
              <td>{sede.NOMBRE_SEDE}</td>
              <td>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(sede.ID_SEDE)}><FontAwesomeIcon icon={faTrash} /></button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEdit(sede)}
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
              <h5 className="modal-title" id="exampleModalLabel">Editar Sede</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="editedNombreSede" className="form-label">Nuevo Nombre de Sede</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedNombreSede"
                    value={editedNombreSede}
                    onChange={(e) => setEditedNombreSede(e.target.value)}
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
              <h5 className="modal-title" id="exampleModalLabel">Crear Nueva Sede</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="newNombre" className="form-label">Nombre de Sede</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newNombre"
                    value={newSedeNombre}
                    onChange={(e) => setNewSedeNombre(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalOpen(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleCreateSede}>Crear Sede</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompShowSede;
