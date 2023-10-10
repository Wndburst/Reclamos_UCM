import React from 'react'
import PreguntasFrecuentes from '../components/BuscadorFiltro'
export default function Frecuentes() {
  return (
      <div className='flex'>
        <h2 className='title-faq'>Preguntas Frecuentes</h2>
        
        <div className='box-faq'>
          <PreguntasFrecuentes/>
        </div>

      </div>
  )
}
