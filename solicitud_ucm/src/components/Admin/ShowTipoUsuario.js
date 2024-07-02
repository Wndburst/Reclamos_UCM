import axios from 'axios';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'datatables.net/js/jquery.dataTables.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
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
      const response = await axios.get('http://localhost:8000/api/ShowTipoUsu');
      setTipoUsu(response.data);
    } catch (error) {
      console.error('Error al obtener los tipos de usuarios:', error);
    }
  };

  const handleDelete = async (idTipoUsuario) => {
    try {
      const result = await Swal.fire({
        title: "¿Deseas eliminar el tipo de usuario?",
        text: "No podrás volver a ver este tipo de usuario.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, bórralo",
      });

      if (result.isConfirmed) {
        // El usuario confirmó, procedemos con la eliminación del reclamo
        await axios.post('http://localhost:8000/api/borrar-tipo-usuario', { idTipoUsuario });
  
        // Muestra la alerta de éxito después de borrar el reclamo
        setTimeout(() => {
          // Mostrar notificación de éxito después de 2 segundos
          Swal.fire({
            title: "Eliminado",
            text: "El usuario ha sido eliminado.",
            icon: "success",
          });
        }, 1000);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error('Error al borrar el tipo de usuario:', error);
    }
  };

  const handleCreateTipoUsuario = async () => {
    try {
      // Enviar tanto el ID como el nombre del área al backend
      await axios.post('http://localhost:8000/api/crear-tipo-usuario', {
        N_TIPOUSUARIO: newTipoUsuarioNombre
      });

      setTimeout(() => {
        // Mostrar notificación de éxito después de 2 segundos
        Swal.fire({
          icon: 'success',
          title: 'Tipo de usuario creado con éxito',
          showConfirmButton: false,
          timer: 1500, // Oculta automáticamente después de 1.5 segundos
        });
      }, 1000);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.response.data.error || 'Error desconocido',
        showConfirmButton: false,
        timer: 1500, // Oculta automáticamente después de 1.5 segundos
      });
    }
  };

  const handleEdit = (tipo) => {
    setSelectedTipoUsu(tipo);
    setEditedNombreUsuario(tipo.NOMBRE_USUARIO);
    setModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post('http://localhost:8000/api/editar-tipo-usuario', {
        idTipoUsuario: selectedTipoUsu.ID_TIPO_USUARIO,
        nuevoNombreUsuario: editedNombreUsuario,
      });
      setTimeout(() => {
        // Mostrar notificación de éxito después de 2 segundos
        Swal.fire({
          title: "Actualizado",
          text: "Tipo de usuario Actualizado correctamente.",
          icon: "success",
        });
      }, 1000);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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
      CREAR TIPO DE USUARIO
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
