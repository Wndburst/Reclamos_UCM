import React from 'react'
import PreguntasFrecuentes from '../../components/Estudiante/BuscadorFiltro'
import NavBar from '../../components/Estudiante/NavBar'
export default function Frecuentes() {
  return (
    <div>
      <NavBar/>
      <div className='flex'>
        
        
        <div className='box-faq'>
        <h2 className='title-faq'>Preguntas Frecuentes</h2>
          <PreguntasFrecuentes/>
        </div>

      </div>
    </div>
  )
}
