import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import imagen from '../img/ucm.jpg'
import logo from '../img/logo-ucm.jpg'


function Login(){

  const [values, setValues] = useState({
    rut: '',
    password: ''
  })

  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) =>{
    event.preventDefault();
    axios.post('http://localhost:8000/login', values) 
    .then(res => {
      console.log(res.data);
      if(res.data.Status === "Success"){
        navigate('/')
      } else{
        alert(res.data.Error);
      }
    })
    .then(err => console.log(err));
  }

  return (
    <div className='loginScreen' style={{ backgroundImage: `url(${imagen})` }}>


      <form onSubmit={handleSubmit} className='formulario-login' >

      <img className="logo-login" src={logo} alt=''/> 
      <h1>Portal reclamos <br/> y sugerencias</h1>


        <p>Usuario</p>
        <input type="number" name='rut'  placeholder='Ingrese su RUT' onChange={e => setValues({...values, rut: e.target.value})} />
        <br />


        <p>Contraseña</p>
          <input type="password" name='password' placeholder='Ingrese su contraseña' onChange={e => setValues({...values, password: e.target.value})} />
        <br />


        <div className='botoncito'> 
        <button type='submit'>
          Iniciar Sesión
        </button>


        </div>
        
      </form>
    </div>
  );
};

export default Login;
