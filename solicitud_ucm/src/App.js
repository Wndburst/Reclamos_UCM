import { BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom';
  import NavBar from './components/NavBar';
  import Home from './pages/Home';
  import Frecuentes from './pages/Frecuentes';
  import Profile from './pages/Profile';
  import Crear_reclamo from './pages/Crear_reclamo';
  import Login from './pages/Login';
  import React, { useState } from 'react';

  import './App.scss';
  import imagen from './img/ucm.jpg'

  function App() {
    

    return (
      <Router>
        <NavBar/>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/frecuentes' element={<Frecuentes />} />
            <Route path='/' element={<Profile />} />
            <Route path='/crear-reclamo' element={<Crear_reclamo />} />
        </Routes>
      </Router>
    );
  }

  export default App;