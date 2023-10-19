import { BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom';
  import NavBar from './components/NavBar';
  import Home from './pages/vistaEstudiante/Home';
  import Frecuentes from './pages/vistaEstudiante/Frecuentes';
  import Profile from './pages/vistaEstudiante/Profile';
  import Crear_reclamo from './pages/vistaEstudiante/Crear_reclamo';
  import Login from './pages/Login';
  import React, { useState } from 'react';
  import DetalleReclamo from './components/DetalleReclamo';

  import Administrador from './pages/vistaAdministrador/administrador';


  import './App.scss';
  import imagen from './img/ucm.jpg'


  function App() {
    

    return (
      <Router>
        
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/frecuentes' element={<Frecuentes />} />
            <Route path='/' element={<Profile />} />
            <Route path='/crear-reclamo' element={<Crear_reclamo />} />
            <Route path='/detalle-reclamo/:id' element={<DetalleReclamo />} />


            
            <Route path='/administrador' element={<Administrador />} />



        </Routes>
      </Router>
    );
  }

  export default App;