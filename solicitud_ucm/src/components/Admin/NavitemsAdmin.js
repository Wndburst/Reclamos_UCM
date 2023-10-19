import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Navitems() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleDelete = () =>{
    axios.get('http://localhost:8000/logout')
    .then(res => {
      navigate('/login', { replace: true }); 
    }).catch(err => console.log(err));
  }

  return (
    <div className={`navitems ${isNavOpen ? 'open' : ''}`}>
      <button className="nav-toggle" onClick={toggleNav}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <ul>
        <li><Link  onClick={handleDelete}>Cerrar sesion</Link></li>
      </ul>
    </div>
  );
}
