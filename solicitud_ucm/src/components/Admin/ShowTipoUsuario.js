import axios from 'axios';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'datatables.net/js/jquery.dataTables.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash  } from '@fortawesome/free-solid-svg-icons';
const CompShowTipoUsu = () => {
  const [tipoUsu, setTipoUsu] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTipoUsu, setSelectedTipoUsu] = useState({});
  const [editedNombreUsuario, setEditedNombreUsuario] = useState('');

  const [newTipoUsuarioNombre, setNewTipoUsuarioNombre] = useState('');

  useEffect(() => {
    getTipoUsu();
  }, []);

  const getTipoUsu = async () => {
    try {
      const response = await axios.get('http://localhost:8000/ShowTipoUsu');
      setTipoUsu(response.data);
    } catch (error) {
      console.error('Error al obtener los tipos de usuarios:', error);
    }
  };

  const handleDelete = async (idTipoUsuario) => {
    try {
      await axios.post('http://localhost:8000/borrar-tipo-usuario', { idTipoUsuario });
      // Actualizar la lista de tipos de usuarios después de borrar
      getTipoUsu();
    } catch (error) {
      console.error('Error al borrar el tipo de usuario:', error);
    }
  };

  const handleCreateTipoUsuario = async () => {
    try {
      // Enviar tanto el ID como el nombre del área al backend
      await axios.post('http://localhost:8000/crear-tipo-usuario', {
        N_TIPOUSUARIO: newTipoUsuarioNombre
      });

      setModalOpen(false);
      // Actualizar la lista de áreas después de crear
      getTipoUsu();
    } catch (error) {
      console.error('Error al crear el área:', error);
    }
  };

  const handleEdit = (tipo) => {
    setSelectedTipoUsu(tipo);
    setEditedNombreUsuario(tipo.NOMBRE_USUARIO);
    setModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post('http://localhost:8000/editar-tipo-usuario', {
        idTipoUsuario: selectedTipoUsu.ID_TIPO_USUARIO,
        nuevoNombreUsuario: editedNombreUsuario,
      });
      setModalOpen(false);
      // Actualizar la lista de tipos de usuarios después de editar
      getTipoUsu();
    } catch (error) {
      console.error('Error al editar el tipo de usuario:', error);
    }
  };

  useEffect(() => {
    if (tipoUsu.length > 0) {
      // Inicializa DataTables después de que los datos se hayan cargado
      $('#example').DataTable();
    }
  }, [tipoUsu]); // Asegura que se actualice cuando cambian los tipos de usuarios

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-2">
      Lanzar demo de modal
      </button>
      <table className='table' id='example'>
        <thead className="thead-dark">
          <tr>
            <th>ID_TIPO_USUARIO</th>
            <th>NOMBRE_USUARIO</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipoUsu.map((tipo) => (
            <tr key={tipo.ID_TIPO_USUARIO}>
              <td>{tipo.ID_TIPO_USUARIO}</td>
              <td>{tipo.NOMBRE_USUARIO}</td>
              <td>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(tipo.ID_TIPO_USUARIO)}><FontAwesomeIcon icon={faTrash} /></button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEdit(tipo)}
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
              <h5 className="modal-title" id="exampleModalLabel">Editar Tipo de Usuario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="editedNombreUsuario" className="form-label">Nuevo Nombre de Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedNombreUsuario"
                    value={editedNombreUsuario}
                    onChange={(e) => setEditedNombreUsuario(e.target.value)}
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
              <h5 className="modal-title" id="exampleModalLabel">Crear Nueva TipoUsuario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="newNombre" className="form-label">Nombre de TipoUsuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newNombre"
                    value={newTipoUsuarioNombre}
                    onChange={(e) => setNewTipoUsuarioNombre(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalOpen(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleCreateTipoUsuario}>Crear TipoUsuario</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompShowTipoUsu;
