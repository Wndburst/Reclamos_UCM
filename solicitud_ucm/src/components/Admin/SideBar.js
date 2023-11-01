import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar() {
  return (
    <div className='sidebar-admin'>
      <p>Tablas disponibles</p>
          <ul>
              <li><Link to="/usu">Usuarios</Link>  </li>
              <li><Link to="/faq">Preguntas Frecuentes</Link>  </li>
              <li><Link to="/tipousu">Tipo Usuario</Link>  </li>
              <li><Link to="/area">Area</Link>  </li>

              <li><Link to="/categoria">Categoria</Link>  </li>
              <li><Link to="/carrera">Carrera</Link>  </li>
              <li><Link to="/facultad">Facultad</Link>  </li>
              <li><Link to="/sede">Sede</Link>  </li>

          </ul>

    </div>
  )
}