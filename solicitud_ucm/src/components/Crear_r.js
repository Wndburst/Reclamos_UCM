import React from 'react'
import NavBar from './NavBar'
export default function Crear_r() {
  return (
    <div>
        <NavBar/>
    <div>
        
        <h1>Publicar un reclamo</h1>
    <form>
        <ul>
            <li>
            <div>
            <label>Area</label>
            <select> 
                    <option value="value1">Selecciona un area</option>
                    <option value="value1">Biblioteca</option>
                    <option value="value1">Toma de ramos</option>
                    <option value="value1">Profesor</option>
            </select>
            </div>
        </li>

        
        <li>
            <div>
            <label>Motivo del reclamo</label>
            <input/>
            </div>
        </li>

        
        <li>
            <div>
            <label>Descripcion</label>
            <input className='desc-rec'/>
            </div>
        </li>
        

        </ul>
    </form>
        
    </div>
    </div>
  )
}


