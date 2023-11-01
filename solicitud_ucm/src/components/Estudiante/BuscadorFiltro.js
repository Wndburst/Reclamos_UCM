import React, { useState } from 'react';
import ListaFrecuentes from './Lista-frecuentes';

function PreguntasFrecuentes() {
  const [filter, setFilter] = useState('');
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value.toUpperCase());
  };

  return (
    <div>
      <input
        type="text"
        id="myInput"
        onChange={handleFilterChange}
        placeholder="¿Que buscas?"
        title="¿Que buscas?"
      /> 

      <div>
        <ListaFrecuentes filter={filter} />
      </div>
    </div>
  );
}

export default PreguntasFrecuentes;
