
import React, { useState } from 'react';
import Logo from "../../img/Logo.png"
import Navitems from './Navitems'

export default function NavBar() {

  return (

    <div className='navbar'>
      
      <img className="logo" src={Logo} alt=''/> 

      <div className='titulo-pagina'>
        <p>Portal de reclamos <br/> UCM</p>
      </div>

      <div className='navitems'>
        <Navitems/>
      </div>
   
    </div>
  )
}
