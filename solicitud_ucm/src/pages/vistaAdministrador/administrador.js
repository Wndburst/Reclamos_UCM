import '../../App.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import area from '../../img/admin/area.png';
import sede from '../../img/admin/sede.png';
import categoria from '../../img/admin/lista.png';
import carrera from '../../img/admin/carrera.png';
import faq from '../../img/admin/faq.png';
import tipo from '../../img/admin/tipousu.png';
import facultad from '../../img/admin/facultad.png';
import imgusu from '../../img/admin/usuario.png';

import NavBar from '../../components/Admin/NavBarAdmin';

export default function Administrador() {
  return (
    <div>
      <NavBar />
      <h2 className='title-admin'>Administrador</h2>
      <div className="cardo">
        <ul className="card-list">
          <li className="card-bod">
            <Link to="/usu">
              <img className="imgusu" src={imgusu} alt=''/>
              <br/>
              Usuarios
            </Link>
          </li>
          <li className="card-bod">
            <Link to="/faq">
              <img className="imgusu" src={faq} alt=''/>
              <br/>
              FAQ
            </Link>
          </li>
          <li className="card-bod">
            <Link to="/tipousu">
              <img className="imgusu" src={tipo} alt=''/>
              <br/>
              Tipos de Usuarios
            </Link>
          </li>
          <li className="card-bod">
            <Link to="/area">
              <img className="imgusu" src={area} alt=''/>
              <br/>
              Area
            </Link>
          </li>
          <li className="card-bod">
            <Link to="/categoria">
              <img className="imgusu" src={categoria} alt=''/>
              <br/>
              Categoria
            </Link>
          </li>
          <li className="card-bod">
            <Link to="/carrera">
              <img className="imgusu" src={carrera} alt=''/>
              <br/>
              Carrera
            </Link>
          </li>
          <li className="card-bod">
            <Link to="/facultad">
              <img className="imgusu" src={facultad} alt=''/>
              <br/>
              Facultad
            </Link>
          </li>
          <li className="card-bod">
            <Link to="/sede">
              <img className="imgusu" src={sede} alt=''/>
              <br/>
              Sede
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}