// datos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Datos = ({ filtro }) => {
  const [reclamos, setReclamos] = useState([]);
  
  useEffect(() => {
    getReclamos();
  }, []);

  const getReclamos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/reclamos');
      setReclamos(response.data);
    } catch (error) {
      console.error('Error al obtener los reclamos:', error);
    }
  };

  const filtrarReclamos = () => {
    if (!filtro) {
      return reclamos;
    }

    return reclamos.filter(
      (reclamo) =>
        reclamo.TITULO_RECLAMO.toLowerCase().includes(filtro.toLowerCase()) ||
        reclamo.NOMBRE_CATEGORIA.toLowerCase().includes(filtro.toLowerCase())
    );
  };

  return (
    <div className='reclamo-general'>
      {filtrarReclamos().length === 0 ? (
        <p className='noFoundfilter'>No se han encontrado reclamos.</p>
      ) : (
        <ul>
          {filtrarReclamos().map((reclamo) => (
            <li key={reclamo.TITULO_RECLAMO}>
              <div>
                <h3>{reclamo.TITULO_RECLAMO}</h3>
                <p>Categoría: {reclamo.NOMBRE_CATEGORIA}</p>
                <p>Descripción: {reclamo.DESCRIPCION_RECLAMO}</p>
                <p>Estado: {reclamo.NOMBRE_ESTADO}</p>
                <p>Fecha: {reclamo.FECHA_FORMATEADA}</p>

                <Link to={`/detalle-reclamo/${reclamo.ID_RECLAMO}`}>
                  <FontAwesomeIcon icon={faEye} /> Ver más
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Datos;
