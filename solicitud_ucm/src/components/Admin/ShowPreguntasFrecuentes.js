import axios from 'axios';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'datatables.net/js/jquery.dataTables.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash  } from '@fortawesome/free-solid-svg-icons';
const CompShowfaq = () => {
  const [faqs, setFaqs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState({});
  const [editedPregunta, setEditedPregunta] = useState('');
  const [editedRespuesta, setEditedRespuesta] = useState('');
  const [editedActivo, setEditedActivo] = useState('');


  const [newFaqNombre, setNewFaqNombre] = useState('');
  const [newFaqRespuesta, setNewFaqRespuesta] = useState('');
  const [activo, setNewActivo] = useState('');


  useEffect(() => {
    getFaq();
  }, []);

  const getFaq = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Showfaq');
      setFaqs(response.data);
    } catch (error) {
      console.error('Error al obtener las preguntas frecuentes:', error);
    }
  };

  const handleDelete = async (idFaq) => {
    try {
      await axios.post('http://localhost:8000/borrar-faq', { idFaq });
      // Actualizar la lista de preguntas frecuentes después de borrar
      getFaq();
    } catch (error) {
      console.error('Error al borrar la pregunta frecuente:', error);
    }
  };

  const handleEdit = (faq) => {
    setSelectedFaq(faq);
    setEditedPregunta(faq.PREGUNTAS_FAQ);
    setEditedRespuesta(faq.RESPUESTA_FAQ);
    setEditedActivo(faq.ACTIVO);
    setModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post('http://localhost:8000/editar-faq', {
        idFaq: selectedFaq.ID_FAQ,
        nuevaPregunta: editedPregunta,
        nuevaRespuesta: editedRespuesta,
        nuevoActivo: editedActivo,
      });
      setModalOpen(false);
      // Actualizar la lista de preguntas frecuentes después de editar
      getFaq();
    } catch (error) {
      console.error('Error al editar la pregunta frecuente:', error);
    }
  };

  const handleCreateFaq = async () => {
    try {
      // Enviar tanto el ID como el nombre del área al backend
      await axios.post('http://localhost:8000/crear-faq', {
        PREGUNTA: newFaqNombre,
        RESPUESTA: newFaqRespuesta,
        ACTIVO: activo
      });

      setModalOpen(false);
      // Actualizar la lista de áreas después de crear
      getFaq();
    } catch (error) {
      console.error('Error al crear el área:', error);
    }
  };
  useEffect(() => {
    if (faqs.length > 0) {
      // Inicializa DataTables después de que los datos se hayan cargado
      $('#example').DataTable();
    }
  }, [faqs]); // Asegura que se actualice cuando cambian las preguntas frecuentes

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-2">
      Lanzar demo de modal
      </button>
      <table className='table' id='example'>
        <thead className="thead-dark">
          <tr>
            <th>ID_FAQ</th>
            <th>PREGUNTAS_FAQ</th>
            <th>RESPUESTA_FAQ</th>
            <th>ACTIVO</th>
            <th>FECHA_FAQ</th>
            <th>FECHA_UPDATE</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.ID_FAQ}>
              <td>{faq.ID_FAQ}</td>
              <td>{faq.PREGUNTAS_FAQ}</td>
              <td>{faq.RESPUESTA_FAQ}</td>
              <td>{faq.ACTIVO}</td>
              <td>{faq.FECHA_FAQ}</td>
              <td>{faq.FECHA_UPDATE}</td>
              <td>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(faq.ID_FAQ)}><FontAwesomeIcon icon={faTrash} /></button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEdit(faq)}
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
              <h5 className="modal-title" id="exampleModalLabel">Editar Pregunta Frecuente</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="editedPregunta" className="form-label">Nueva Pregunta</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedPregunta"
                    value={editedPregunta}
                    onChange={(e) => setEditedPregunta(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedRespuesta" className="form-label">Nueva Respuesta</label>
                  <input
                    className="form-control"
                    id="editedRespuesta"
                    rows="3"
                    value={editedRespuesta}
                    onChange={(e) => setEditedRespuesta(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="editedActivo" className="form-label">Nuevo Estado</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedActivo"
                    value={editedActivo}
                    onChange={(e) => setEditedActivo(e.target.value)}
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
              <h5 className="modal-title" id="exampleModalLabel">Crear Nueva Faq</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="newNombre" className="form-label">Pregunta</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newNombre"
                    value={newFaqNombre}
                    onChange={(e) => setNewFaqNombre(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="newNombre" className="form-label">Respuesta</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newNombre"
                    value={newFaqRespuesta}
                    onChange={(e) => setNewFaqRespuesta(e.target.value)}
                  />
                </div>

                
                <div className="mb-3">
                  <label htmlFor="newNombre" className="form-label">ACTIVO</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newNombre"
                    value={activo}
                    onChange={(e) => setNewActivo(e.target.value)}
                  />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalOpen(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleCreateFaq}>Crear Faq</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompShowfaq;
