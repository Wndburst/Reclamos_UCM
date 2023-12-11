import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
  import Home from './pages/vistaEstudiante/Home';
  import Frecuentes from './pages/vistaEstudiante/Frecuentes';
  import Profile from './pages/vistaEstudiante/Profile';
  import Login from './pages/Login';
  import React from 'react';
  import DetalleReclamo from './components/Estudiante/DetalleReclamo';
  import 'bootstrap/dist/css/bootstrap.min.css';



  //ACADEMICO
  import Academico from './pages/vistaAcademico/testAcademico';
  import Stats from './pages/vistaAcademico/stats';
  //Admin
  import Administrador from './pages/vistaAdministrador/administrador';
  import Usu from './pages/vistaAdministrador/adminpages/usu';
  import Faq from './pages/vistaAdministrador/adminpages/faq';
  import Tipousu from './pages/vistaAdministrador/adminpages/tipousu';
  import Area from './pages/vistaAdministrador/adminpages/area';
  import Categoria from './pages/vistaAdministrador/adminpages/cate';
  import Carrera from './pages/vistaAdministrador/adminpages/carre';
  import Facultad from './pages/vistaAdministrador/adminpages/facu';
  import Sede from './pages/vistaAdministrador/adminpages/sede';
  import './App.scss';


  function App() {
    

    return (
      <Router>
        
          <Routes>
            {/*LOGIN*/}
            <Route path='/login' element={<Login />} />

            {/*ESTUDIANTE*/}
            <Route path='/home' element={<Home />} />
            <Route path='/frecuentes' element={<Frecuentes />} />
            <Route path='/' element={<Profile />} />
            <Route path='/detalle-reclamo/:id' element={<DetalleReclamo />} />

            {/*ACADEMICO*/}
            <Route path='/academico' element={<Academico />} />
            <Route path='/stats' element={< Stats/>} />


            {/*ADMINISTRADOR*/}
            <Route path='/administrador' element={<Administrador />} />
            <Route path='/usu' element={<Usu />} />
            <Route path='/tipousu' element={<Tipousu />} />
            <Route path='/area' element={<Area />} />
            <Route path='/faq' element={<Faq />} />
            <Route path='/categoria' element={<Categoria />} />
            <Route path='/carrera' element={<Carrera />} />
            <Route path='/facultad' element={<Facultad />} />
            <Route path='/sede' element={<Sede />} />


        </Routes>
      </Router>
    );
  }

  export default App;