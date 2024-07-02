import axios from 'axios';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'datatables.net/js/jquery.dataTables.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash  } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
const CompShowUsu = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState({});
  const [editedNombreUsuario, setEditedNombreUsuario] = useState('');
  const [editedApellidoUsuario, setEditedApellidoUsuario] = useState('');
  const [editedCorreoUsuario, setEditedCorreoUsuario] = useState('');
  const [editedGeneracionUsuario, setEditedGeneracionUsuario] = useState('');
  const [editedIdCarrera, setEditedIdCarrera] = useState('');
  const [editedIdTipoUsuario, setEditedIdTipoUsuario] = useState('');


  const [rutUsuario, setNewRutUsuario] = useState('');
  const [passUsuario, setNewPassUsuario] = useState('');
  const [nombreUsuario, setNewNombreUsuario] = useState('');
  const [apellidoUsuario, setNewApellidoUsuario] = useState('');
  const [gUsuario, setNewGUsuario] = useState('');
  const [idCarr, setNewIdCarr] = useState('');
  const [idTipoUsu, setNewIdTipoUsu] = useState('');

  useEffect(() => {
    getUsuarios();
  }, []);

  const getUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/ShowUsuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const handleDelete = async (idUsuario) => {
    try {
      const result = await Swal.fire({
        title: "¿Deseas eliminar el usuario?",
        text: "No podrás volver a ver este usuario.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, bórralo",
      });

      if (result.isConfirmed) {
        // El usuario confirmó, procedemos con la eliminación del reclamo
        await axios.post('http://localhost:8000/api/borrar-usuario', { idUsuario });
  
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
      console.error('Error al borrar el usuario:', error);
    }
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setEditedNombreUsuario(usuario.NOMBRE_USUARIO);
    setEditedApellidoUsuario(usuario.APELLIDO_USUARIO);
    setEditedCorreoUsuario(usuario.CORREO_USUARIO);
    setEditedGeneracionUsuario(usuario.GENERACION_USUARIO);
    setEditedIdCarrera(usuario.ID_CARRERA);
    setEditedIdTipoUsuario(usuario.ID_TIPO_USUARIO);
    setModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post('http://localhost:8000/api/editar-usuario', {
        idUsuario: selectedUsuario.ID_USUARIO,
        nuevoNombreUsuario: editedNombreUsuario,
        nuevoApellidoUsuario: editedApellidoUsuario,
        nuevoCorreoUsuario: editedCorreoUsuario,
        nuevoGeneracionUsuario: editedGeneracionUsuario,
        nuevoIdCarrera: editedIdCarrera,
        nuevoIdTipoUsuario: editedIdTipoUsuario,
      });
      setTimeout(() => {
        // Mostrar notificación de éxito después de 2 segundos
        Swal.fire({
          title: "Actualizado",
          text: "El usuario ha sido Actualizado correctamente.",
          icon: "success",
        });
      }, 1000);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error al editar el usuario:', error);
    }
  };

  const handleCreateUsuario = async () => {
    try {
      // Enviar tanto el ID como el nombre del área al backend
      await axios.post('http://localhost:8000/api/crear-usuario', {
        R_USUARIO: rutUsuario,
        N_USUARIO: nombreUsuario,
        A_USUARIO: apellidoUsuario,
        P_USUARIO: passUsuario,
        G_USUARIO: gUsuario,
        ID_CARR: idCarr,
        ID_TIPOUSU: idTipoUsu
      });

      //setModalOpen(false);
      // Actualizar la lista de áreas después de crear
      setTimeout(() => {
        // Mostrar notificación de éxito después de 2 segundos
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado con éxito',
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

  useEffect(() => {
    if (usuarios.length > 0) {
      // Inicializa DataTables después de que los datos se hayan cargado
      $('#example').DataTable();
    }
  }, [usuarios]); // Asegura que se actualice cuando cambian los usuarios

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-2">
      CREAR USUARIO
      </button>
      <table className='table' id='example'>
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>APELLIDO</th>
            <th>CORREO</th>
            <th>GENERACION</th>
            <th>ID CARRERA</th>
            <th>ID TIPO USUARIO</th>
            <th>FECHA DE CREACION</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.ID_USUARIO}>
              <td>{usuario.ID_USUARIO}</td>
              <td>{usuario.NOMBRE_USUARIO}</td>
              <td>{usuario.APELLIDO_USUARIO}</td>
              <td>{usuario.CORREO_USUARIO}</td>
              <td>{usuario.GENERACION_USUARIO}</td>
              <td>{usuario.ID_CARRERA}</td>
              <td>{usuario.ID_TIPO_USUARIO}</td>
              <td>{usuario.FECHA_CREACION_USUARIO}</td>
              <td>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(usuario.ID_USUARIO)}><FontAwesomeIcon icon={faTrash} /></button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEdit(usuario)}
                ><FontAwesomeIcon icon={faPenToSquare} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal  EDITAR */}
      <div className={`modal fade ${modalOpen ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!modalOpen}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar Usuario</h5>
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
                <div className="mb-3">
                  <label htmlFor="editedApellidoUsuario" className="form-label">Nuevo Apellido de Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedApellidoUsuario"
                    value={editedApellidoUsuario}
                    onChange={(e) => setEditedApellidoUsuario(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedCorreoUsuario" className="form-label">Nuevo Correo de Usuario</label>
                  <input
                    type="email"
                    className="form-control"
                    id="editedCorreoUsuario"
                    value={editedCorreoUsuario}
                    onChange={(e) => setEditedCorreoUsuario(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedGeneracionUsuario" className="form-label">Nueva Generación de Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedGeneracionUsuario"
                    value={editedGeneracionUsuario}
                    onChange={(e) => setEditedGeneracionUsuario(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedIdCarrera" className="form-label">Nuevo ID de Carrera</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedIdCarrera"
                    value={editedIdCarrera}
                    onChange={(e) => setEditedIdCarrera(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedIdTipoUsuario" className="form-label">Nuevo ID de Tipo de Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedIdTipoUsuario"
                    value={editedIdTipoUsuario}
                    onChange={(e) => setEditedIdTipoUsuario(e.target.value)}
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


      {/* Modal  CREAR 2 */}
      <div className="modal fade" id="modal-2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!modalOpen}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Crear nuevo usuario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
              <div className="mb-3">
                  <label htmlFor="RUT" className="form-label">RUT</label>
                  <input
                    type="text"
                    className="form-control"
                    id="RUT"
                    value={rutUsuario}
                    onChange={(e) => setNewRutUsuario(e.target.value.replace(/\D/g, '').slice(0, 8))}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Nombre" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Nombre"
                    value={nombreUsuario}
                    onChange={(e) => setNewNombreUsuario(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Apellido" className="form-label">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Apellido"
                    value={apellidoUsuario}
                    onChange={(e) => setNewApellidoUsuario(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Clave" className="form-label">Clave</label>
                  <input
                    type="password"
                    className="form-control"
                    id="Clave"
                    value={passUsuario}
                    onChange={(e) => setNewPassUsuario(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Generacion" className="form-label">Generacion</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Generacion"
                    value={gUsuario}
                    onChange={(e) => setNewGUsuario(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ID CARRERA" className="form-label">ID CARRERA</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ID CARRERA"
                    value={idCarr}
                    onChange={(e) => setNewIdCarr(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ID TIPO USUARIO" className="form-label">ID TIPO USUARIO</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ID TIPO USUARIO"
                    value={idTipoUsu}
                    onChange={(e) => setNewIdTipoUsu(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalOpen(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleCreateUsuario}>Crear usuario</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompShowUsu;
