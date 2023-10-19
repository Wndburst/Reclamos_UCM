import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import imagen from '../img/ucm.jpg'
import logo from '../img/logo-ucm.jpg'


function Login(){

  const [values, setValues] = useState({
    rut: '',
    password: ''
  })

  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/login', values) 
      .then(res => {
        if(res.data.Status === "Success"){
          // Ahora, después de iniciar sesión con éxito, consultamos el tipo de usuario
          axios.get('http://localhost:8000/', {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          })
          .then(userRes => {
            const userType = userRes.data.usertype;
            console.log(userType)
  
            // Redirigir según el tipo de usuario
            switch (userType) {
              case 1:
                navigate('/');
                break;
              case 2:
                navigate('/academico');
                break;
              case 5:
                navigate('/administrador');
                break;

            }
          })
          .catch(err => {
            console.error(err);
          });
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='loginScreen' style={{ backgroundImage: `url(${imagen})` }}>
      


      <form onSubmit={handleSubmit} className='formulario-login' >

      <img className="logo-login" src={logo} alt=''/> 
      <h1>Portal reclamos <br/> y sugerencias</h1>


        <p>Usuario</p>
        <input type="text" name='rut'  placeholder='Ingrese su RUT' onChange={e => setValues({...values, rut: e.target.value})} />
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
