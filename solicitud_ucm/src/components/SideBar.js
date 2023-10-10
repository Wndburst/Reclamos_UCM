import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar() {
  return (
    <div className='sidebar'>
        <p className='title'>Filtrar</p>
        <form>
            <input placeholder='Buscar'/>
            
            <p>Area</p>
            <ul>
                <li>Bliblioteca</li>
                <li>Finanzas</li>
                <li>Administracion</li>
            </ul>

            <p>Otro filtro</p>
            <ul>
                <li>Bliblioteca</li>
                <li>Financiera</li>
                <li>Toma de ramos</li>
            </ul>
        </form>
    </div>
  )
}
