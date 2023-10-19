import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Datos = () => {
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

  return (
    <div className='reclamo-general'>
      <ul>
        {reclamos.map((reclamo) => (
          <li key={reclamo.TITULO_RECLAMO}>
            <div>
              <h3>{reclamo.TITULO_RECLAMO}</h3>
              <p>Categoría: {reclamo.NOMBRE_CATEGORIA}</p>
              <p>Descripción: {reclamo.DESCRIPCION_RECLAMO}</p>
              <p>Estado: {reclamo.NOMBRE_ESTADO}</p>
              <Link to={`/detalle-reclamo/${reclamo.ID_RECLAMO}`}>
                <FontAwesomeIcon icon={faEye} /> Ver más
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Datos;
