import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navitems() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className={`navitems ${isNavOpen ? 'open' : ''}`}>
      <button className="nav-toggle" onClick={toggleNav}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
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
  );
}
