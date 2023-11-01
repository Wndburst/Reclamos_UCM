import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/Estudiante/NavBar';

const CrearReclamo = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [visibilidad, setVisibilidad] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleVisibilidadChange = (e) => {
    setVisibilidad(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validar que se haya seleccionado una opción
      if (!visibilidad || !categoria) {
        alert('Por favor, seleccione una opción para Visibilidad y Categoría.');
        return;
      }

      // Realizar la solicitud al servidor Express
      const response = await axios.post('http://localhost:8000/crear-reclamo', {
        titulo,
        descripcion,
        visibilidad,
        categoria,
      });

      console.log(response.data); // Mensaje del servidor (éxito o error)
    } catch (error) {
      console.error('Error al enviar el reclamo:', error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div className='crear-rek'>
      <form className="form-crear-reclamo" onSubmit={handleSubmit}>
        <label className='reclamo-titulo-input'>
          Título <br/>
          <input type="text" value={titulo} onChange={handleTituloChange} required />
        </label>

        <br />

        <label className='reclamo-desc-input'>
          Descripción <br/>
          <textarea value={descripcion} onChange={handleDescripcionChange} required />
        </label>

        <br />
        <div className='flex-vis-cat'>
          <label>
            Visibilidad <br/>
            <select value={visibilidad} onChange={handleVisibilidadChange} required>
              <option value="">Seleccionar una opción</option>
              <option value={1}>Publico</option>
              <option value={2}>Privado</option>
            </select>
          </label>

          <br />

          <label>
            Categoría <br/>
            <select value={categoria} onChange={handleCategoriaChange} required>
              <option value="">Seleccionar una opción</option>
              <option value={1}>Problemas de Inscripción</option>
              <option value={2}>Cambios de Carrera</option>
              <option value={3}>Documentación Académica</option>
            </select>
          </label>
        </div>
        <br />
        <div className="button-reclamo" >
        <button>Cancelar</button>
        <button type="submit">Crear Reclamo</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CrearReclamo;
