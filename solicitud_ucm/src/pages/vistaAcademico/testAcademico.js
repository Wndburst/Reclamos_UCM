import React, { useEffect, useState } from 'react'

import reclamosdata from '../../json/reclamos.json'
import FPerfilTora from "../../img/noperfil.jpg"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../../components/Academico/NavbarAcademico'

import Datos from '../../components/Academico/Datosreclamos'
import Datos2 from '../../components/Academico/DatosStats'

axios.defaults.withCredentials = true;

export default function Academico() {
  
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('')
  const [userid, setUserId] = useState('')
  const [username, setUserName] = useState('')
  const [useremail, setUserEmail] = useState('')
  const [usertype, setUserType] = useState('')
  const navigate = useNavigate();



  useEffect(() => {
    axios.get('http://localhost:8000')
      .then(res => {
        console.log(res.data.UserID)
        if (res.data.Status === "Success") {
          setAuth(true);
          setUserId(res.data.userid);
          setUserName(res.data.username);
          setUserEmail(res.data.useremail);
          setUserType(res.data.usertype);
        } else {
          navigate('/login')
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
    <div>
      <NavBar/>
      { auth ?
      <div className='Academico'>
        <div className='CPerfil'>
          <div className='flex-1'>
            <div>
              <img className="FPerfilT" src={FPerfilTora} alt=''/> 
            </div>
  
            <div className='DPerfil'>
              <p>{username}</p>
              <p>{userid}</p>
              <p>{useremail}</p>
              <p>Academico en INGENIERÍA CIVIL INFORMÁTICA</p>
            </div>
          </div>
          <div className='flex'>
            <div className='OPerfil'>
              <ul>
                <li><Link  onClick={handleDelete}>Cerrar sesion</Link></li>
              </ul>
            </div>
          </div>
      </div>

      <div className='div-reclamos-academico'>
          <Datos/>
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

