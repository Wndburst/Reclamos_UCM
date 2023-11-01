import axios from 'axios';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'datatables.net/js/jquery.dataTables.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash  } from '@fortawesome/free-solid-svg-icons';
const CompShowCategoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState({});
  const [editedNombreCategoria, setEditedNombreCategoria] = useState('');
  const [editedIdArea, setEditedIdArea] = useState('');


  const [newCategoriaNombre, setNewCategoriaNombre] = useState('');
  const [newID, setNewID] = useState('');

  useEffect(() => {
    getCategorias();
  }, []);

  const getCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8000/ShowCategoria');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  const handleDelete = async (idCategoria) => {
    try {
      await axios.post('http://localhost:8000/borrar-categoria', { idCategoria });
      // Actualizar la lista de categorías después de borrar
      getCategorias();
    } catch (error) {
      console.error('Error al borrar la categoría:', error);
    }
  };

  const handleEdit = (categoria) => {
    setSelectedCategoria(categoria);
    setEditedNombreCategoria(categoria.NOMBRE_CATEGORIA);
    setEditedIdArea(categoria.ID_AREA.toString()); // Convierte a cadena para mostrarlo en el input
    setModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post('http://localhost:8000/editar-categoria', {
        idCategoria: selectedCategoria.ID_CATEGORIA,
        nuevoNombreCategoria: editedNombreCategoria,
        nuevoIdArea: editedIdArea,
      });
      setModalOpen(false);
      // Actualizar la lista de categorías después de editar
      getCategorias();
    } catch (error) {
      console.error('Error al editar la categoría:', error);
    }
  };

  const handleCreateCategoria = async () => {
    try {
      // Enviar tanto el ID como el nombre del área al backend
      await axios.post('http://localhost:8000/crear-categoria', {
        N_CATEGORIA: newCategoriaNombre,
        ID: newID
      });

      setModalOpen(false);
      // Actualizar la lista de áreas después de crear
      getCategorias();
    } catch (error) {
      console.error('Error al crear el área:', error);
    }
  };


  useEffect(() => {
    if (categorias.length > 0) {
      // Inicializa DataTables después de que los datos se hayan cargado
      $('#example').DataTable();
    }
  }, [categorias]); // Asegura que se actualice cuando cambian las categorías

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-2">
      Lanzar demo de modal
      </button>

      <table className='table' id='example'>
        <thead className="thead-dark">
          <tr>
            <th>ID_CATEGORIA</th>
            <th>NOMBRE_CATEGORIA</th>
            <th>ID_AREA</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.ID_CATEGORIA}>
              <td>{categoria.ID_CATEGORIA}</td>
              <td>{categoria.NOMBRE_CATEGORIA}</td>
              <td>{categoria.ID_AREA}</td>
              <td>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(categoria.ID_CATEGORIA)}><FontAwesomeIcon icon={faTrash} /></button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal1"
                  onClick={() => handleEdit(categoria)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <div className={`modal fade ${modalOpen ? 'show' : ''}`} id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!modalOpen}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar Categoría</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="editedNombreCategoria" className="form-label">Nuevo Nombre de Categoría</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedNombreCategoria"
                    value={editedNombreCategoria}
                    onChange={(e) => setEditedNombreCategoria(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedIdArea" className="form-label">Nuevo ID de Área</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedIdArea"
                    value={editedIdArea}
                    onChange={(e) => setEditedIdArea(e.target.value)}
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
              <h5 className="modal-title" id="exampleModalLabel">Crear Nueva categoria</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="newNombre" className="form-label">Nombre de categoria</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newNombre"
                    value={newCategoriaNombre}
                    onChange={(e) => setNewCategoriaNombre(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="newNombre" className="form-label">ID Area</label>
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
              <button type="button" className="btn btn-primary" onClick={handleCreateCategoria}>Crear Categoria</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompShowCategoria;
