import React from 'react'
import reclamosdata from '../../json/reclamos.json'
import Datos from '../../components/Datos'
import SideBar from '../../components/SideBar';
import '../../App.scss';
import Graphs from '../../components/Graphs';
import NavBar from '../../components/NavBar';

export default function () {
  return (
    <div>
      <NavBar/>
      <h1 className='lsreclamos'>Lista de reclamos</h1>
      <div className='flex'>
        <Datos reclamos={reclamosdata.reclamos} />  
      </div>

    </div>
  )
}
