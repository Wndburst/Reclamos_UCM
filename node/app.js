import express from 'express'
import cors from 'cors'
import db from "./database/db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import reclamosPerfilRoutes from './routes/estudiante/R/reclamoPerfilroute.js';
import reclamosGeneralesRoute from './routes/estudiante/R/reclamoGeneralroute.js';
import borrarReclamo from './routes/estudiante/D/borrarReclamoroute.js'
import crearReclamo from './routes/estudiante/C/crearReclamoroute.js'
import editarReclamo from './routes/estudiante/U/editarReclamoroute.js'

import usuariosRoute from './routes/administrador/R/usuariosroute.js'
import crearUsuario from './routes/administrador/C/crearUsuarioroute.js'
import borrarUsuario from './routes/administrador/D/borrarUsuarioroute.js'
import editarUsuario from './routes/administrador/U/editarUsuarioroute.js'
import faqRoute from './routes/administrador/R/faqroute.js'
import crearFaq from './routes/administrador/C/crearFaqroute.js'
import borrarFaq from './routes/administrador/D/borrarFaqroute.js'
import editarFaq from './routes/administrador/U/editarFaqroute.js'
import tipoUsuarioroute from './routes/administrador/R/tipoUsuarioroute.js'
import crearTipoUsuario from './routes/administrador/C/crearTipoUsuarioroute.js'
import borrarTipoUsuario from './routes/administrador/D/borrarTipoUsuarioroute.js'
import editarTIpoUsuario from './routes/administrador/U/editarTipoUsuarioroute.js'

const app = express()

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET","POST"],
    credentials:true,
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json())
app.use(cookieParser());

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});





const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.json({ Error: "Token not provided" });
    }
  
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Invalid token" });
      }
  
      req.userid = decoded.userid;
      req.username = decoded.username;
      req.useremail = decoded.useremail;
      req.usertype = decoded.usertype;
      req.userCarrera = decoded.userCarrera;
  
      next();
    });
  };



// -- Consulta Login ---- Gonzalo Avendano

app.post('/login', (req,res) =>{


    const sql = 'select U.*, CA.NOMBRE_CARRERA as NOMBRE_CARRERA from ALLNRS_USUARIO U join ALLNRS_CARRERA CA on (CA.ID_CARRERA = U.ID_CARRERA) WHERE ID_USUARIO = ?';
    
    db.query(sql, parseInt(req.body.rut), (err, data) =>{
        if(err) return res.json({Error: "Error en el servidor de login"})
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].CONTRASENA_USUARIO, (err, response) => {
                if(err) return res.json({Error: 'password compare error'})
                if(response){
                    const userid = data[0].ID_USUARIO; 
                    const username = data[0].NOMBRE_USUARIO + ' ' + data[0].APELLIDO_USUARIO; 
                    const useremail = data[0].CORREO_USUARIO; 
                    const usertype = data[0].ID_TIPO_USUARIO; 
                    const userCarrera = data[0].NOMBRE_CARRERA; 
                    const token = jwt.sign({userid,username,useremail,usertype,userCarrera}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token, { httpOnly: true });
                    return res.json({Status: "Success"});

                } else {
                    return res.json({Error: "Password not matched"})
                }
            })
        } else {
            return res.json({Error: "No existe el email"})
        }
    })
})  


app.get('/', verifyUser,(req,res) => {
    return res.json({Status: "Success", 
                    userid: req.userid,
                    username: req.username,
                    useremail: req.useremail,
                    usertype: req.usertype,
                    userCarrera: req.userCarrera});
})


app.get('/logout', (req,res)=>{
    res.clearCookie('token');
    return res.json({Status: "Success"})
})

/*
 ------- SECCION DE RECLAMOS--------- 
*/
//RECLAMOS DEL PERFIL
app.use('/api', reclamosPerfilRoutes);

//RECLAMOS GENERALES
app.use('/api',reclamosGeneralesRoute)

//BORRAR RECLAMOS
app.use('/api', borrarReclamo)

//CREAR RECLAMOS
app.use('/api',crearReclamo)

//EDITAR RECLAMOS
app.use('/api',editarReclamo)



/*
---- SECCION ADMINISTRADOR -----
*/

//MOSTRAR USUARIOS
app.use('/api',usuariosRoute)

//CREAR USUARIOS
app.use('/api',crearUsuario)

//BORRAR USUARIOS
app.use('/api', borrarUsuario)

//EDITAR USUARIOS
app.use('/api', editarUsuario)


//MOSTRAR FAQ
app.use('/api', faqRoute)

//CREAR FAQ
app.use('/api', crearFaq)

//BORRAR FAQ
app.use('/api', borrarFaq)
//EDITAR FAQ
app.use('/api', editarFaq)




//MOSTRAR TIPO USUARIO
app.use('/api', tipoUsuarioroute)


//CREAR TIPO USUARIO
app.use('/api', crearTipoUsuario)

//BORRAR TIPO USUARIO
app.use('/api', borrarTipoUsuario)

//EDITAR TIPO USUARIO
app.use('/api', editarTIpoUsuario)




// MOSTRAR CATEGORIA Sebastian Salinas
app.get('/ShowCategoria', (req, res) => {
const sql ='SELECT ID_CATEGORIA, NOMBRE_CATEGORIA,ID_AREA FROM ALLNRS_CATEGORIA';
db.query(sql, (err, result) => {
    if (err) {
        console.error('Error al ejecutar la consulta SQL:', err);
        res.status(500).send('Error interno del servidor');
    } else {
        res.json(result);
    }
  });
});


app.get('/ShowCategoria2', (req, res) => {
  const area = req.query.area;

  // Puedes usar el parámetro area para filtrar tus resultados en la consulta SQL
  const sql ='SELECT ID_CATEGORIA, NOMBRE_CATEGORIA, ID_AREA FROM ALLNRS_CATEGORIA WHERE ID_AREA = ?';
  db.query(sql, [area], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(result);
    }
  });
});
  

// CREAR CATEGORIA Sebastian Salinas
app.post('/crear-categoria', (req, res) => {
  const {N_CATEGORIA, ID } = req.body;

  const sql = `INSERT INTO ALLNRS_CATEGORIA (NOMBRE_CATEGORIA, ID_AREA) VALUES (?, ?)`;

  db.query(sql, [N_CATEGORIA, ID], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Categoria creada exitosamente');
      res.status(200).send('Categoria creada exitosamente');
    }
  });
});

// BORRAR CATEGORIA Sebastian Salinas
app.post('/borrar-categoria', (req, res) => {
  const { idCategoria } = req.body;

  const query = `DELETE FROM ALLNRS_CATEGORIA WHERE ID_CATEGORIA = ${idCategoria}`;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al eliminar la categoría:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.status(200).json({ message: 'Categoría eliminada con éxito' });
    }
  });
});


// EDITAR CATEGORIA Sebastian Salinas
app.post('/editar-categoria', (req, res) => {
  const { idCategoria, nuevoNombreCategoria, nuevoIdArea } = req.body;

  const sql = 'UPDATE ALLNRS_CATEGORIA SET NOMBRE_CATEGORIA = ?, ID_AREA = ? WHERE ID_CATEGORIA = ?';

  db.query(sql, [nuevoNombreCategoria, nuevoIdArea, idCategoria], (err, result) => {
    if (err) {
      console.error('Error al editar la categoría:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Categoría editada correctamente');
      res.status(200).send('Categoría editada correctamente');
    }
  });
});






// MOSTRAR CARRERA Claudio Lazo
app.get('/ShowCarrera', (req, res) => {
const sql ='SELECT ID_CARRERA, NOMBRE_CARRERA, ID_FACULTAD FROM ALLNRS_CARRERA';
db.query(sql, (err, result) => {
    if (err) {
        console.error('Error al ejecutar la consulta SQL:', err);
        res.status(500).send('Error interno del servidor');
    } else {
        res.json(result);
    }
});
});


// CREAR CARRERA Claudio Lazo
app.post('/crear-carrera', (req, res) => {
  const { N_CARRERA, ID } = req.body;
  const sql = 'INSERT INTO ALLNRS_CARRERA(NOMBRE_CARRERA, ID_FACULTAD) VALUES (?, ?)';
  const values = [N_CARRERA, ID];
  console.log(values)
  

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Carrera creada exitosamente');
      res.status(200).json({ success: true });
    }
  });
});



// BORRAR CARRERA Claudio Lazo
app.post('/borrar-carrera', (req, res) => {
  const { idCarrera } = req.body;

  const query = `DELETE FROM ALLNRS_CARRERA WHERE ID_CARRERA = ${idCarrera}`;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al eliminar la carrera:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.status(200).json({ message: 'Carrera eliminada con éxito' });
    }
  });
});

// EDITAR CARRERA Claudio Lazo
app.post('/editar-carrera', (req, res) => {
  const { idCarrera, nuevoNombreCarrera, nuevoIdFacultad } = req.body;

  const sql = 'UPDATE ALLNRS_CARRERA SET NOMBRE_CARRERA = ?, ID_FACULTAD = ? WHERE ID_CARRERA = ?';

  db.query(sql, [nuevoNombreCarrera, nuevoIdFacultad, idCarrera], (err, result) => {
    if (err) {
      console.error('Error al editar la carrera:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Carrera editada correctamente');
      res.status(200).send('Carrera editada correctamente');
    }
  });
});






// MOSTRAR FACULTAD Claudio Lazo
app.get('/ShowFacultad', (req, res) => {
const sql ='SELECT ID_FACULTAD, NOMBRE_FACULTAD, ID_SEDE FROM ALLNRS_FACULTAD';
db.query(sql, (err, result) => {
    if (err) {
        console.error('Error al ejecutar la consulta SQL:', err);
        res.status(500).send('Error interno del servidor');
    } else {
        res.json(result);
    }
});
});


// CREAR FACULTAD Claudio Lazo
app.post('/crear-facultad', (req, res) => {
  const {N_FACULTAD, ID } = req.body;

  // Insertar datos en la base de datos
  const sql = `INSERT INTO ALLNRS_FACULTAD (NOMBRE_FACULTAD, ID_SEDE) VALUES (?, ?)`;
  const values = [N_FACULTAD, ID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL:', err);
      res.status(500).send('Error al procesar la solicitud');
    } else {
      console.log('Registro insertado correctamente');
      res.status(200).send('Registro insertado correctamente');
    }
  });
});



// BORRAR FACULTAD Claudio Lazo
app.post('/borrar-facultad', (req, res) => {
  const { idFacultad } = req.body;

  const query = `DELETE FROM ALLNRS_FACULTAD WHERE ID_FACULTAD = ${idFacultad}`;  

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al eliminar la facultad:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.status(200).json({ message: 'Facultad eliminada con éxito' });
    }
  });
});

// EDITAR FACULTAD Claudio Lazo
app.post('/editar-facultad', (req, res) => {
  const { idFacultad, nuevoNombreFacultad, nuevoIdSede } = req.body;

  const sql = 'UPDATE ALLNRS_FACULTAD SET NOMBRE_FACULTAD = ?, ID_SEDE = ? WHERE ID_FACULTAD = ?';

  db.query(sql, [nuevoNombreFacultad, nuevoIdSede, idFacultad], (err, result) => {
    if (err) {
      console.error('Error al editar la facultad:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Facultad editada correctamente');
      res.status(200).send('Facultad editada correctamente');
    }
  });
});









// MOSTRAR SEDE Sebastian Salinas
app.get('/ShowSede', (req, res) => {
const sql ='SELECT ID_SEDE, NOMBRE_SEDE FROM ALLNRS_SEDE';
db.query(sql, (err, result) => {
    if (err) {
        console.error('Error al ejecutar la consulta SQL:', err);
        res.status(500).send('Error interno del servidor');
    } else {
        res.json(result);
    }
});
});


// CREAR SEDE Sebastian Salinas
app.post('/crear-sede', (req, res) => {
  const { N_SEDE } = req.body;

  // Consulta SQL para insertar en la base de datos
  const sql = 'INSERT INTO ALLNRS_SEDE(NOMBRE_SEDE) VALUES (?)';

  // Ejecutar la consulta con los valores del formulario
  db.query(sql, [N_SEDE], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Usuario creado con éxito:', results);
      res.status(200).json({ message: 'Usuario creado con éxito' });
    }
  });
});


// BORRAR SEDE Sebastian Salinas
app.post('/borrar-sede', (req, res) => {
  const { idSede } = req.body;

  const query = `DELETE FROM ALLNRS_SEDE WHERE ID_SEDE = ${idSede}`;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al eliminar la sede:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.status(200).json({ message: 'Sede eliminada con éxito' });
    }
  });
});

// EDITAR SEDE Sebastian Salinas
app.post('/editar-sede', (req, res) => {
  const { idSede, nuevoNombreSede } = req.body;

  const sql = 'UPDATE ALLNRS_SEDE SET NOMBRE_SEDE = ? WHERE ID_SEDE = ?';

  db.query(sql, [nuevoNombreSede, idSede], (err, result) => {
    if (err) {
      console.error('Error al editar la sede:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Sede editada correctamente');
      res.status(200).send('Sede editada correctamente');
    }
  });
});







// MOSTRAR AREA Sebastian Salinas
app.get('/ShowAreas', (req, res) => {
const sql ='SELECT ID_AREA, NOMBRE_AREA, ENCARGADO FROM ALLNRS_AREA';
db.query(sql, (err, result) => {
    if (err) {
        console.error('Error al ejecutar la consulta SQL:', err);
        res.status(500).send('Error interno del servidor');
    } else {
        res.json(result);
    }
});

});

// CREAR AREA Sebastian Salinas
app.post('/crear-area', (req, res) => {
  const {NOMBRE_AREA } = req.body;

  // Verificar que se proporcionaron ID y Nombre de Área
  if (!NOMBRE_AREA) {
    return res.status(400).json({ error: 'Se requieren ID y Nombre de Área' });
  }

  // Consulta SQL para insertar un área
  const sql = 'INSERT INTO ALLNRS_AREA (NOMBRE_AREA) VALUES (?)';
  const values = [NOMBRE_AREA];

  // Ejecutar la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    console.log('Área creada con éxito');
    res.status(200).json({ message: 'Área creada con éxito' });
  });
});

//  BORRRAR AREA Sebastian Salinas
app.post('/borrar-area', (req, res) => {
  const { idArea } = req.body;

  const query = `DELETE FROM ALLNRS_AREA WHERE ID_AREA = ${idArea}`;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al eliminar el área:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.status(200).json({ message: 'Área eliminada con éxito' });
    }
  });
});

// EDITAR AREA Sebastian Salinas
app.post('/editar-area', (req, res) => {
  const { idArea, nuevoNombre, nuevoEncargado } = req.body;

  const sql = 'UPDATE ALLNRS_AREA SET NOMBRE_AREA = ?, ENCARGADO = ? WHERE ID_AREA = ?';

  db.query(sql, [nuevoNombre,nuevoEncargado, idArea], (err, result) => {
    if (err) {
      console.error('Error al actualizar el área:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Área actualizada correctamente');
      res.status(200).send('Área actualizada correctamente');
    }
  });
});



/// RECLAMOS ACADEMICO Sebastian Salinas
app.get('/reclamosAcademico/:usertype/:estado', (req, res) => {
  const { usertype, estado } = req.params;
  const filtroEstado = estado == '0' ? '' : ` AND EST.ID_ESTADO = ${estado} `
  const sql = `
  SELECT R.ID_RECLAMO,U.NOMBRE_USUARIO,U.APELLIDO_USUARIO, R.TITULO_RECLAMO, CA.NOMBRE_CATEGORIA, R.DESCRIPCION_RECLAMO, EST.NOMBRE_ESTADO, DATE_FORMAT(R.FECHA_CREACION_RECLAMO, "%m-%d-%Y") AS FECHA_FORMATEADA ,  RES.RESPUESTA
  FROM ALLNRS_RECLAMOS R 
    JOIN ALLNRS_ESTADO EST ON (EST.ID_ESTADO = R.ID_ESTADO) 
    JOIN ALLNRS_CATEGORIA CA ON (R.ID_CATEGORIA = CA.ID_CATEGORIA) 
    join ALLNRS_USUARIO U ON (R.ID_USUARIO = U.ID_USUARIO) 
    JOIN ALLNRS_CARRERA CARRE ON (CARRE.ID_CARRERA = U.ID_CARRERA) 
	JOIN ALLNRS_RESPUESTA RES ON (RES.ID_RESPUESTA = R.ID_RESPUESTA)
  WHERE CARRE.ID_CARRERA = 1 AND R.ENCARGADO_RECLAMO = ? ${filtroEstado}
  ORDER BY R.FECHA_CREACION_RECLAMO DESC`
  db.query(sql, [usertype],(err, result) => {
      if (err) {
          console.error('Error al ejecutar la consulta SQL:', err);
          res.status(500).send('Error interno del servidor');
      } else {
          res.json(result);
      }
  });
});




// CREAR RESPUESTA RECLAMO Gonzalo Avendano

app.post('/respuesta-reclamo', (req, res) => {
  const { userid, idReclamo, respuesta } = req.body;
  console.log(req.body);
  
  const sql = `INSERT INTO ALLNRS_RESPUESTA (RESPUESTA, ID_USUARIO_RESPUESTA) VALUES (?, ?)`;
  
  db.query(sql, [respuesta, userid], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL:', err);
      return res.status(500).send('Error interno del servidor');
    }
    
    const sql2 = `UPDATE ALLNRS_RECLAMOS SET ID_RESPUESTA = (SELECT MAX(ID_RESPUESTA) FROM ALLNRS_RESPUESTA) WHERE ID_RECLAMO = ?`;
    
    db.query(sql2, [idReclamo], (err, result) => {
      if (err) {
        console.error('Error al ejecutar la consulta SQL UPDATE:', err);
        return res.status(500).send('Error interno del servidor');
      }
      
      const sql3 = `UPDATE ALLNRS_RECLAMOS SET ID_ESTADO = 2 WHERE ID_RECLAMO = ?`;
      
      db.query(sql3, [idReclamo], (err, result) => {
        if (err) {
          console.error('Error al ejecutar la consulta SQL UPDATE:', err);
          return res.status(500).send('Error interno del servidor');
        }
        
        res.status(200).send('Reclamo respondido y notificado');
      });
    });
  });
});

// Cambiar encargado 
app.post('/cambiar-encargado', (req, res) => {
  const {idReclamo } = req.body;
  // Aquí deberías realizar la lógica para cambiar el encargado en tu base de datos
  // Por ejemplo, puedes ejecutar una consulta SQL de actualización

  const sql = `
  UPDATE ALLNRS_RECLAMOS
  SET ENCARGADO_RECLAMO = 
    CASE 
      WHEN ENCARGADO_RECLAMO = 2 THEN 3
      WHEN ENCARGADO_RECLAMO = 3 THEN 2
      ELSE ENCARGADO_RECLAMO
    END
  WHERE ID_RECLAMO = ?;`

  db.query(sql, [idReclamo], (error, results) => {
    if (error) {
      console.error('Error al cambiar el encargado:', error);
      res.status(500).json({ status: 'Error', message: 'Error al cambiar el encargado' });
    } else {
      console.log('Encargado cambiado con éxito');
      res.json({ status: 'Success', message: 'Encargado cambiado con éxito' });
    }
  });
});



// ESTADISTICAS


// PRUEBA INFO Sebastian Salinas
app.get('/RXCATEGORIA/:dateInicio/:dateFin', (req, res) => {
  const { dateInicio, dateFin } = req.params;
  const filtroFecha = dateInicio === '01-01-2023' && dateFin === '01-01-2024' ? '' : ` AND R.fecha_creacion_reclamo BETWEEN '${dateInicio}' AND '${dateFin}'`;
  
  const sql = `SELECT CATE.NOMBRE_CATEGORIA, COUNT(CATE.NOMBRE_CATEGORIA) 
  FROM ALLNRS_RECLAMOS R 
  JOIN ALLNRS_CATEGORIA CATE ON (R.ID_CATEGORIA = CATE.ID_CATEGORIA) 
  JOIN ALLNRS_USUARIO U ON (R.ID_USUARIO = U.ID_USUARIO) 
  JOIN ALLNRS_CARRERA CARRE ON (CARRE.ID_CARRERA = U.ID_CARRERA) 
  WHERE CARRE.ID_CARRERA = 1 ${filtroFecha}
  GROUP BY R.ID_CATEGORIA `;
  
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error al ejecutar la consulta SQL:', err);
          res.status(500).send('Error interno del servidor');
      } else {
          res.json(result);
      }
  });
});


app.get('/RXAREAS/:dateInicio/:dateFin', (req, res) => {
  const { dateInicio, dateFin } = req.params;
  const filtroFecha = dateInicio === '01-01-2023' && dateFin === '01-01-2024' ? '' : ` AND R.fecha_creacion_reclamo BETWEEN '${dateInicio}' AND '${dateFin}'`;
  
  const sql = `SELECT A.NOMBRE_AREA, COUNT(A.NOMBRE_AREA) 
  FROM ALLNRS_RECLAMOS R 
    JOIN ALLNRS_AREA A ON (R.ID_AREA = A.ID_AREA) 
    JOIN ALLNRS_USUARIO U ON (R.ID_USUARIO = U.ID_USUARIO) 
    JOIN ALLNRS_CARRERA CARRE ON (CARRE.ID_CARRERA = U.ID_CARRERA) 
  WHERE CARRE.ID_CARRERA = 1 ${filtroFecha}
  GROUP BY R.ID_AREA `;
  
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error al ejecutar la consulta SQL:', err);
          res.status(500).send('Error interno del servidor');
      } else {
          res.json(result);
      }
  });
});

app.get('/RXTOTAL/:dateInicio/:dateFin', (req, res) => {
  const { dateInicio, dateFin } = req.params;
  const filtroFecha = dateInicio === '01-01-2023' && dateFin === '01-01-2024' ? '' : ` AND R.fecha_creacion_reclamo BETWEEN '${dateInicio}' AND '${dateFin}'`;
  
  const sql = `SELECT COUNT(R.ID_RECLAMO)
  FROM ALLNRS_RECLAMOS R 
    JOIN ALLNRS_AREA A ON (R.ID_AREA = A.ID_AREA) 
    JOIN ALLNRS_USUARIO U ON (R.ID_USUARIO = U.ID_USUARIO) 
    JOIN ALLNRS_CARRERA CARRE ON (CARRE.ID_CARRERA = U.ID_CARRERA) 
  WHERE CARRE.ID_CARRERA = 1 ${filtroFecha}`;
  
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error al ejecutar la consulta SQL:', err);
          res.status(500).send('Error interno del servidor');
      } else {
          res.json(result);
      }
  });
});
app.get('/RXTOTALRESUELTOS/:dateInicio/:dateFin', (req, res) => {
  const { dateInicio, dateFin } = req.params;
  const filtroFecha = dateInicio === '01-01-2023' && dateFin === '01-01-2024' ? '' : ` AND R.fecha_creacion_reclamo BETWEEN '${dateInicio}' AND '${dateFin}'`;
  
  const sql = `SELECT COUNT(R.ID_RECLAMO) 
  FROM ALLNRS_RECLAMOS R 
    JOIN ALLNRS_AREA A ON (R.ID_AREA = A.ID_AREA) 
    JOIN ALLNRS_USUARIO U ON (R.ID_USUARIO = U.ID_USUARIO) 
    JOIN ALLNRS_CARRERA CARRE ON (CARRE.ID_CARRERA = U.ID_CARRERA) 
  WHERE CARRE.ID_CARRERA = 1 AND R.ID_ESTADO = 3 ${filtroFecha}`;
  
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error al ejecutar la consulta SQL:', err);
          res.status(500).send('Error interno del servidor');
      } else {
          res.json(result);
      }
  });
});
app.get('/RXTOTALPENDIENTES/:dateInicio/:dateFin', (req, res) => {
  const { dateInicio, dateFin } = req.params;
  const filtroFecha = dateInicio === '01-01-2023' && dateFin === '01-01-2024' ? '' : ` AND R.fecha_creacion_reclamo BETWEEN '${dateInicio}' AND '${dateFin}'`;
  
  const sql = `SELECT COUNT(R.ID_RECLAMO) 
  FROM ALLNRS_RECLAMOS R 
    JOIN ALLNRS_AREA A ON (R.ID_AREA = A.ID_AREA) 
    JOIN ALLNRS_USUARIO U ON (R.ID_USUARIO = U.ID_USUARIO) 
    JOIN ALLNRS_CARRERA CARRE ON (CARRE.ID_CARRERA = U.ID_CARRERA) 
  WHERE CARRE.ID_CARRERA = 1 AND R.ID_ESTADO = 1 ${filtroFecha}`;
  
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error al ejecutar la consulta SQL:', err);
          res.status(500).send('Error interno del servidor');
      } else {
          res.json(result);
      }
  });
});

app.get('/RXTOTALPROCESO/:dateInicio/:dateFin', (req, res) => {
  const { dateInicio, dateFin } = req.params;
  const filtroFecha = dateInicio === '01-01-2023' && dateFin === '01-01-2024' ? '' : ` AND R.fecha_creacion_reclamo BETWEEN '${dateInicio}' AND '${dateFin}'`;
  
  const sql = `SELECT COUNT(R.ID_RECLAMO) 
  FROM ALLNRS_RECLAMOS R 
    JOIN ALLNRS_AREA A ON (R.ID_AREA = A.ID_AREA) 
    JOIN ALLNRS_USUARIO U ON (R.ID_USUARIO = U.ID_USUARIO) 
    JOIN ALLNRS_CARRERA CARRE ON (CARRE.ID_CARRERA = U.ID_CARRERA) 
  WHERE CARRE.ID_CARRERA = 1 AND R.ID_ESTADO = 2 ${filtroFecha}`;
  
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error al ejecutar la consulta SQL:', err);
          res.status(500).send('Error interno del servidor');
      } else {
          res.json(result);
      }
  });
});


// respuestas hechas por jefe de carrera 
app.get('/RXRESJEFE/:dateInicio/:dateFin', (req, res) => {
  const { dateInicio, dateFin } = req.params;
  const filtroFecha = dateInicio === '01-01-2023' && dateFin === '01-01-2024' ? '' : ` AND R.fecha_creacion_reclamo BETWEEN '${dateInicio}' AND '${dateFin}'`;
  
  const sql = `select COUNT(R.ID_RECLAMO) 
  from ALLNRS_RECLAMOS R
      JOIN ALLNRS_AREA A ON (R.ID_AREA = A.ID_AREA) 
      JOIN ALLNRS_USUARIO U ON (R.ID_USUARIO = U.ID_USUARIO) 
      JOIN ALLNRS_CARRERA CARRE ON (CARRE.ID_CARRERA = U.ID_CARRERA) 
      JOIN ALLNRS_RESPUESTA RES ON (RES.ID_RESPUESTA = R.ID_RESPUESTA)
  WHERE CARRE.ID_CARRERA = 1 AND ID_USUARIO_RESPUESTA = 159487	${filtroFecha}
  `;
  
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error al ejecutar la consulta SQL:', err);
          res.status(500).send('Error interno del servidor');
      } else {
          res.json(result);
      }
  });
});

// respuestas hechas por secretaria

app.get('/RXRESSEC/:dateInicio/:dateFin', (req, res) => {
  const { dateInicio, dateFin } = req.params;
  const filtroFecha = dateInicio === '01-01-2023' && dateFin === '01-01-2024' ? '' : ` AND R.fecha_creacion_reclamo BETWEEN '${dateInicio}' AND '${dateFin}'`;
  
  const sql = `
    SELECT COUNT(R.ID_RECLAMO) 
    FROM ALLNRS_RECLAMOS R
    JOIN ALLNRS_AREA A ON (R.ID_AREA = A.ID_AREA) 
    JOIN ALLNRS_USUARIO U ON (R.ID_USUARIO = U.ID_USUARIO) 
    JOIN ALLNRS_CARRERA CARRE ON (CARRE.ID_CARRERA = U.ID_CARRERA) 
    JOIN ALLNRS_RESPUESTA RES ON (RES.ID_RESPUESTA = R.ID_RESPUESTA)
    WHERE CARRE.ID_CARRERA = 1 AND ID_USUARIO_RESPUESTA = 159263 ${filtroFecha}
  `;
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error al ejecutar la consulta SQL:', err);
          res.status(500).send('Error interno del servidor');
      } else {
          res.json(result);
      }
  });
});
app.get('/RXRECLAMOSMES', (req, res) => {
  const sql = `
    SELECT MONTH(FECHA_CREACION_RECLAMO) AS mes, COUNT(*) AS cantidad FROM ALLNRS_RECLAMOS GROUP BY mes;
  `;
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error al ejecutar la consulta SQL:', err);
          res.status(500).send('Error interno del servidor');
      } else {
          res.json(result);
      }
  });
});





app.listen(8000, ()=> {
    console.log('Server Up running in http://localhost:8000/')
})