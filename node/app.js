import express from 'express'
import cors from 'cors'
import db from "./database/db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';


const app = express()

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET","POST"],
    credentials:true,
    allowedHeaders: ["Content-Type", "Authorization"],

}))
app.use(express.json())

app.use(cookieParser());


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
  
      next();
    });
  };



// -- Consulta Login ----

app.post('/login', (req,res) =>{
    const sql = 'SELECT * FROM ALLNRS_USUARIO WHERE ID_USUARIO = ?'
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
                    const token = jwt.sign({userid,username,useremail,usertype}, "jwt-secret-key", {expiresIn: '1d'});
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
                    usertype: req.usertype});
})


app.get('/logout', (req,res)=>{
    res.clearCookie('token');
    return res.json({Status: "Success"})
})


app.get('/reclamos', (req, res) => {
    const sql = 'SELECT R.ID_RECLAMO, R.TITULO_RECLAMO, CA.NOMBRE_CATEGORIA, R.DESCRIPCION_RECLAMO, EST.NOMBRE_ESTADO, DATE_FORMAT(R.FECHA_CREACION_RECLAMO, "%m-%d-%Y") AS FECHA_FORMATEADA  FROM ALLNRS_RECLAMOS R JOIN ALLNRS_ESTADO EST ON (EST.ID_ESTADO = R.ID_ESTADO) JOIN ALLNRS_CATEGORIA CA ON (R.ID_CATEGORIA = CA.ID_CATEGORIA)';
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta SQL:', err);
            res.status(500).send('Error interno del servidor');
        } else {
            res.json(result);
        }
    });
});


app.get('/reclamos/:id', (req, res) => {
    const reclamoId = req.params.id;
    const sql = `SELECT R.ID_RECLAMO, R.TITULO_RECLAMO, CA.NOMBRE_CATEGORIA, R.DESCRIPCION_RECLAMO, EST.NOMBRE_ESTADO, R.FECHA_CREACION_RECLAMO FROM ALLNRS_RECLAMOS R JOIN ALLNRS_ESTADO EST ON (EST.ID_ESTADO = R.ID_ESTADO) JOIN ALLNRS_CATEGORIA CA ON (R.ID_CATEGORIA = CA.ID_CATEGORIA) WHERE R.ID_RECLAMO = ?`;
  
    db.query(sql, [reclamoId], (err, result) => {
      if (err) {
        console.error('Error al ejecutar la consulta SQL:', err);
        res.status(500).send('Error interno del servidor');
      } else {
        if (result.length > 0) {
          res.json(result[0]); // Devuelve solo el primer resultado (debería haber solo uno)
        } else {
          res.status(404).send('Reclamo no encontrado');
        }
      }
    });
  });




// Ruta para manejar la creación de reclamo
app.post('/crear-reclamo', (req, res) => {
  const { titulo, descripcion, visibilidad, categoria } = req.body;

  console.log(titulo, descripcion, visibilidad, categoria )
  // Consulta SQL para insertar un nuevo reclamo
  const sql = `INSERT INTO ALLNRS_RECLAMOS (ID_RECLAMO, TITULO_RECLAMO, DESCRIPCION_RECLAMO, ID_VISIBILIDAD, ID_ESTADO, FECHA_CREACION_RECLAMO, FECHA_UPDATE_RECLAMO, FECHA_FINALIZADO, ID_USUARIO, ID_CATEGORIA, ID_RESPUESTA) VALUES (6, ?, ?, ?, 1, CURRENT_DATE, CURRENT_DATE, NULL, 20759841, ?, NULL)`;

  // Ejecutar la consulta SQL
  db.query(sql, [titulo, descripcion, visibilidad, categoria], (err, result) => {
    if (err) {
      console.error('Error al insertar reclamo:', err);
      res.status(500).json({ error: 'Error al insertar reclamo' });
    } else {
      console.log('Reclamo insertado con éxito');
      res.status(200).json({ mensaje: 'Reclamo insertado con éxito' });
    }
  });
});






// ------------------ ADMINISTRADOR ------------------------------


// MOSTRAR USUARIO
app.get('/ShowUsuarios', (req, res) => {
  const sql ='SELECT ID_USUARIO,NOMBRE_USUARIO,APELLIDO_USUARIO,CORREO_USUARIO,CONTRASENA_USUARIO,GENERACION_USUARIO,ID_CARRERA,ID_TIPO_USUARIO, DATE_FORMAT(FECHA_CREACION_USUARIO, "%m-%d-%Y") AS FECHA_CREACION_USUARIO from ALLNRS_USUARIO';
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error al ejecutar la consulta SQL:', err);
          res.status(500).send('Error interno del servidor');
      } else {
          res.json(result);
      }
  });
});


db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// CREAR USUARIO
app.post('/crear-usuario', async (req, res) => {
  const { R_USUARIO, N_USUARIO, A_USUARIO, P_USUARIO, G_USUARIO, ID_CARR, ID_TIPOUSU } = req.body;
  // Encriptar la contraseña con bcrypt
  const hashedPassword = await bcrypt.hash(P_USUARIO, 10);

  // Ejecutar la consulta SQL
  const sql = `INSERT INTO ALLNRS_USUARIO(ID_USUARIO, NOMBRE_USUARIO, APELLIDO_USUARIO, CORREO_USUARIO,CONTRASENA_USUARIO, GENERACION_USUARIO, ID_CARRERA, ID_TIPO_USUARIO, FECHA_CREACION_USUARIO) VALUES (?, ?, ?, CONCAT(UPPER(NOMBRE_USUARIO), '.', UPPER(APELLIDO_USUARIO), '@ALU.UCM.CL'), ?, ?, ?, ?, Current_date)`;

  db.query(sql, [R_USUARIO, N_USUARIO, A_USUARIO, hashedPassword, G_USUARIO, ID_CARR, ID_TIPOUSU], (error, results) => {
    if (error) { // Aquí cambié 'err' por 'error'
      console.error('Error al ejecutar la consulta SQL:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Usuario creado exitosamente');
      res.status(200).json({ message: 'Usuario creado exitosamente' });
    }
  });
});



  // BORRAR USUARIO
  app.post('/borrar-usuario', (req, res) => {
    const { idUsuario } = req.body;
  
    const query = `DELETE FROM ALLNRS_USUARIO WHERE ID_USUARIO = ${idUsuario}`;
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
      }
    });
  });



// MOSTRAR FAQ
app.get('/Showfaq', (req, res) => {
const sql ='SELECT ID_FAQ, PREGUNTAS_FAQ, RESPUESTA_FAQ, ACTIVO, FECHA_FAQ , FECHA_UPDATE FROM ALLNRS_FAQ;';
db.query(sql, (err, result) => {
    if (err) {
        console.error('Error al ejecutar la consulta SQL:', err);
        res.status(500).send('Error interno del servidor');
    } else {
        res.json(result);
    }
});
});

// CREAR FAQ
app.post('/crear-faq', (req, res) => {
  const { PREGUNTA, RESPUESTA,ACTIVO } = req.body;

  // Query SQL para insertar en la base de datos
  const sql = `INSERT INTO ALLNRS_FAQ(PREGUNTAS_FAQ, RESPUESTA_FAQ, ACTIVO, FECHA_FAQ) VALUES (?, ?, ?, Current_date)`;

  // Ejecutar la consulta SQL
  db.query(sql, [PREGUNTA, RESPUESTA, ACTIVO], (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Usuario creado con éxito');
      res.json({ message: 'Usuario creado con éxito' });
    }
  });
});
// BORRAR FAQ
app.post('/borrar-faq', (req, res) => {
  const { idFaq } = req.body;

  const query = `DELETE FROM ALLNRS_FAQ WHERE ID_FAQ = ${idFaq}`;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al eliminar la pregunta frecuente:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.status(200).json({ message: 'Pregunta frecuente eliminada con éxito' });
    }
  });
});

// EDITAR FAQ
app.post('/editar-faq', async (req, res) => {
  try {
    const { idFaq, nuevaPregunta, nuevaRespuesta, nuevoActivo } = req.body;

    // Realizar la actualización en la base de datos
    const query = 'UPDATE ALLNRS_FAQ SET PREGUNTAS_FAQ = ?, RESPUESTA_FAQ = ?, FECHA_UPDATE = current_date, ACTIVO = ? WHERE ID_FAQ = ?';
    await db.query(query, [nuevaPregunta, nuevaRespuesta, nuevoActivo, idFaq]);

    res.status(200).json({ success: true, message: 'Pregunta frecuente actualizada correctamente.' });
  } catch (error) {
    console.error('Error al editar la pregunta frecuente:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
});




// MOSTRAR TIPO USUARIO
app.get('/ShowTipoUsu', (req, res) => {
const sql ='SELECT ID_TIPO_USUARIO, NOMBRE_USUARIO FROM ALLNRS_TIPO_USUARIO';
db.query(sql, (err, result) => {
    if (err) {
        console.error('Error al ejecutar la consulta SQL:', err);
        res.status(500).send('Error interno del servidor');
    } else {
        res.json(result);
    }
});
});

// CREAR TIPO USUARIO
app.post('/crear-tipo-usuario', (req, res) => {
  const {N_TIPOUSUARIO } = req.body;

  // Query SQL para insertar en la base de datos
  const sql = `INSERT INTO ALLNRS_TIPO_USUARIO (NOMBRE_USUARIO) VALUES (?)`;

  // Ejecutar la consulta SQL
  db.query(sql, [N_TIPOUSUARIO], (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Usuario creado con éxito');
      res.json({ message: 'Usuario creado con éxito' });
    }
  });
});


// BORRAR TIPO USUARIO
app.post('/borrar-tipo-usuario', (req, res) => {
  const { idTipoUsuario } = req.body;

  const query = `DELETE FROM ALLNRS_TIPO_USUARIO WHERE ID_TIPO_USUARIO = ${idTipoUsuario}`;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al eliminar el tipo de usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.status(200).json({ message: 'Tipo de usuario eliminado con éxito' });
    }
  });
});

// EDITAR TIPO USUARIO
app.post('/editar-tipo-usuario', (req, res) => {
  const { idTipoUsuario, nuevoNombreUsuario } = req.body;

  const sql = 'UPDATE ALLNRS_TIPO_USUARIO SET NOMBRE_USUARIO = ? WHERE ID_TIPO_USUARIO = ?';

  db.query(sql, [nuevoNombreUsuario, idTipoUsuario], (err, result) => {
    if (err) {
      console.error('Error al editar el tipo de usuario:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Tipo de usuario editado correctamente');
      res.status(200).send('Tipo de usuario editado correctamente');
    }
  });
});




// MOSTRAR CATEGORIA
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

// CREAR CATEGORIA
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

// BORRAR CATEGORIA
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


// EDITAR CATEGORIA
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






// MOSTRAR CARRERA
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


// CREAR CARRERA
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



// BORRAR CARRERA
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

// EDITAR CARRERA
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






// MOSTRAR FACULTAD
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


// CREAR FACULTAD
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



// BORRAR FACULTAD
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

// EDITAR FACULTAD
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









// MOSTRAR SEDE
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


// CREAR SEDE
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


// BORRAR SEDE
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

// EDITAR SEDE
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







// MOSTRAR AREA
app.get('/ShowAreas', (req, res) => {
const sql ='SELECT ID_AREA, NOMBRE_AREA FROM ALLNRS_AREA';
db.query(sql, (err, result) => {
    if (err) {
        console.error('Error al ejecutar la consulta SQL:', err);
        res.status(500).send('Error interno del servidor');
    } else {
        res.json(result);
    }
});

});

// CREAR AREA
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

//  BORRRAR AREA
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

// EDITAR AREA
app.post('/editar-area', (req, res) => {
  const { idArea, nuevoNombre } = req.body;

  const sql = 'UPDATE ALLNRS_AREA SET NOMBRE_AREA = ? WHERE ID_AREA = ?';

  db.query(sql, [nuevoNombre, idArea], (err, result) => {
    if (err) {
      console.error('Error al actualizar el área:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Área actualizada correctamente');
      res.status(200).send('Área actualizada correctamente');
    }
  });
});










app.listen(8000, ()=> {
    console.log('Server Up running in http://localhost:8000/')
})