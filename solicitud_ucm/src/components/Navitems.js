import React from 'react'
import { Link } from 'react-router-dom'

export default function Navitems() {
  return (
    <div>
        <ul>
            <li>
                <Link to="/home">Inicio</Link>
            </li>
            <li>
                <Link to="/frecuentes">FAQ</Link>
            </li>
            <li>
                <Link to="/">Perfil</Link>
            </li>
        </ul>
    </div>
  )
}
