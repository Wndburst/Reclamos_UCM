import'../../App.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import area from '../../img/admin/area.png'
import sede from '../../img/admin/sede.png'
import categoria from '../../img/admin/lista.png'
import carrera from '../../img/admin/carrera.png'
import faq from '../../img/admin/faq.png'
import tipo from '../../img/admin/tipousu.png'
import facultad from '../../img/admin/facultad.png'
import imgusu from '../../img/admin/usuario.png'

import NavBar from '../../components/Admin/NavBarAdmin'

export default function Administrador () {
  return (
        <div>
        <NavBar/>
        <h2 className='title-admin'>Administrador</h2>
        <div class="cardo" >
          <div class="card-bod">
            <img className="imgusu" src={imgusu} alt=''/> 
            <button>
            <Link to="/usu">Usuarios</Link>  
            </button> 
          </div>

          <div class="card-bod">
            <img className="imgusu" src={faq} alt=''/> 
            <button>
            <Link to="/faq">FAQ</Link>  
            </button> 
          </div>
          <div class="card-bod">
            <img className="imgusu" src={tipo} alt=''/> 
            <button>
            <Link to="/tipousu">Tipo Usuarios</Link>  
            </button> 
          </div>
          <div class="card-bod">
            <img className="imgusu" src={area} alt=''/> 
            <button>
            <Link to="/area">Area</Link>  
            </button> 
          </div>
          <div class="card-bod">
            <img className="imgusu" src={categoria} alt=''/> 
            <a href="#" class="btn btn-primary">Categoria</a>
          </div>
          <div class="card-bod">
            <img className="imgusu" src={carrera} alt=''/> 
            <a href="#" class="btn btn-primary">Carrera</a>
          </div>
          <div class="card-bod">
            <img className="imgusu" src={facultad} alt=''/> 
            <a href="#" class="btn btn-primary">Facultad</a>
          </div>
          <div class="card-bod">
            <img className="imgusu" src={sede} alt=''/> 
            <a href="#" class="btn btn-primary">Sede</a>
          </div>
          
      </div>
      </div>
    
  )
}
