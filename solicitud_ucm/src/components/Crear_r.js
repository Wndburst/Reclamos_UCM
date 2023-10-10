/*import React from 'react'

export default function Crear_r() {
  return (
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
  )
}
*/

import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const URI = 'http://localhost:8000/reclamos'

const Crear_r = () =>{
    const [reclamos, setReclamos] = useState([])
    useEffect(()=>{
        getUsers()
    }, [])

    // procedimiento para mostrar todo

    const getUsers = async () => {
        const res = await axios.get(URI)
        setReclamos(res.data)
    }


    return(
        <div className='container'>
            <table className='table'>
                <thead className=''>
                    <tr>
                        <th>ID</th>
                        <th>Descripcion</th>
                        <th>Area</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                    </tr>

                </thead>
                <tbody>
                    {reclamos.map ((reclamos) => (
                        <tr key={reclamos.ID}>
                            <td>{reclamos.ID}</td>
                            <td>{reclamos.Descripcion}</td>
                            <td>{reclamos.Area}</td>
                            <td>{reclamos.Fecha}</td>
                            <td>{reclamos.Estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default Crear_r
