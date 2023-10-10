import React from 'react'
import reclamosdata from '../json/reclamos.json'
import Datos from '../components/Datos'
import SideBar from '../components/SideBar';
import '../App.scss';
import Graphs from '../components/Graphs';

export default function () {
  return (
    <div className='flex'>
      <SideBar/>
      <div className='reclamos'>
        <h2 className='lsreclamos'>Lista de reclamos</h2>
        <Datos reclamos={reclamosdata.reclamos} />
      </div>

      <div className='graphs'>
          <Graphs/>
      </div>


    </div>
  )
}
