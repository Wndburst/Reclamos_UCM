import React, { useEffect, useState } from 'react'
import Datos from '../components/Datos'
import reclamosdata from '../json/reclamos.json'
import FPerfil from "../img/perfil.jpg"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true;

export default function Profile() {
  
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate();



  useEffect(() => {
    axios.get('http://localhost:8000')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);
 
  const handleDelete = () =>{
    axios.get('http://localhost:8000/logout')
    .then(res => {
      navigate('/login', { replace: true }); 
    }).catch(err => console.log(err));
  }

  return (
    <div className='flex'>
      { auth ?
      <div>
        <div className='flex'>
        <div className='CPerfil'>
          <div className='flex-1'>
            <div>
              <img className="FPerfil" src={FPerfil} alt=''/> 
            </div>
  
            <div className='DPerfil'>
              <p>Thomas Andreus Riffo Araya</p>
              <p>20.759.841-0</p>
              <p>Thomas@alu.ucm.cl</p>
              <p>Regular en INGENIERÍA CIVIL INFORMÁTICA</p>
            </div>
          </div>
          <div className='flex'>
            <div className='OPerfil'>
              <ul>
                <li><Link to="/crear-reclamo">Crear un reclamo</Link></li>
                <li><Link  onClick={handleDelete}>Cerrar sesion</Link></li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
        
        <div className='misReclamos'>
          <h2 className='lsreclamos'>Mis reclamos</h2>
          <Datos reclamos={reclamosdata.reclamos} />
        </div>
      </div>
      :
      <div>
        <h3>{message}</h3>
        <h3>Inicia sesion :/</h3>
        <Link to="/login">Login</Link>
      </div>
    }
    </div>
  )
}

