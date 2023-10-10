import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Datos = () => {
  const [reclamos, setReclamos] = useState([]);

  useEffect(() => {
    getReclamos();
  }, []);

  const getReclamos = async () => {
    try {
        const response = await axios.get('http://localhost:3000/reclamos'); // Ajusta la URL según tu configuración
        setReclamos(response.data);
        console.log(response.data);
    } catch (error) {
        console.error('Error al obtener los reclamos:', error);
    }
};

  return (
    <div>
      <table className='tablareclamos'>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Área</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reclamos.map((reclamo) => (
            <tr key={reclamo.ID}>
              <td>{reclamo.Descripcion}</td>
              <td>{reclamo.Area}</td>
              <td>{reclamo.Fecha}</td>
              <td>{reclamo.Estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datos;
