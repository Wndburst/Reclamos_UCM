// home.js
import React, { useState } from 'react';
import reclamosdata from '../../json/reclamos.json';
import Datos from '../../components/Estudiante/Datos';
import SideBar from '../../components/Estudiante/SideBar';
import '../../App.scss';
import NavBar from '../../components/Estudiante/NavBar';

export default function Home() {
  const [filtro, setFiltro] = useState('');

  const handleFilterChange = (filtro) => {
    setFiltro(filtro);
  };

  return (
    <div>
      <NavBar />
      <h1 className='lsreclamos'>Lista de reclamos</h1>
      <div className='flex'>
        <SideBar onFilterChange={handleFilterChange} />
        <Datos filtro={filtro} />
      </div>
    </div>
  );
}
