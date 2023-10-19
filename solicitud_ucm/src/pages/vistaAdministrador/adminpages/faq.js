import '../../App.scss';
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


export default function AddFaq () {
  return (
        <h2 className='title-admin'>Preguntas Frecuentes
        <div class="cardo" >
          <div class="card-bod">
            <img className="imgusu" src={imgusu} alt=''/> 
            <Link to="/usu">FAQ</Link>
          </div>

          <div class="card-bod">
            <img className="imgusu" src={faq} alt=''/> 
            <a href="#" class="btn btn-primary">FAQ</a>
          </div>
      </div>
      </h2>
    
  )
}