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
    const sql = 'SELECT R.ID_RECLAMO, R.TITULO_RECLAMO, CA.NOMBRE_CATEGORIA, R.DESCRIPCION_RECLAMO, EST.NOMBRE_ESTADO, R.FECHA_CREACION_RECLAMO FROM ALLNRS_RECLAMOS R JOIN ALLNRS_ESTADO EST ON (EST.ID_ESTADO = R.ID_ESTADO) JOIN ALLNRS_CATEGORIA CA ON (R.ID_CATEGORIA = CA.ID_CATEGORIA)';
    
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












app.listen(8000, ()=> {
    console.log('Server Up running in http://localhost:8000/')
})