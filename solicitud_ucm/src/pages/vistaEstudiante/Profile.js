import React, { useEffect, useState } from 'react'
import Datos from '../../components/Estudiante/Datos'
import reclamosdata from '../../json/reclamos.json'
import FPerfil from "../../img/perfil.jpg"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../../components/Estudiante/NavBar'
axios.defaults.withCredentials = true;

export default function Profile() {
  
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
    <div>
      <NavBar/>
      { auth ?
      <div className='flex'>
        <div className='CPerfil'>
          <div className='flex-1'>
            <div>
              <img className="FPerfil" src={FPerfil} alt=''/> 
            </div>
  
            <div className='DPerfil'>
              <p>{username}</p>
              <p>{userid}</p>
              <p>{useremail}</p>
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

      <div>
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

