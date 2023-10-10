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


const verifyUser = (req,res,next) => {
    const token = req.cookies.token;
    console.log(token)
    if(!token){
        res.json({Error: "You are not authenticated"})
    } else{
        jwt.verify(token, "jwt-secret-key", (err, decoded)=> {
            if(err){
                res.json({Error: "Token is not okey"})
            } else {
                req.name = decoded.name;
                next();
            }
        })
    }
}


app.get('/', verifyUser,(req,res) => {
    return res.json({Status: "Success", name: req.name});
})

app.post('/login', (req,res) =>{
    
    const sql = 'SELECT * FROM ALLCRS_USUARIO WHERE ID_USUARIO = ?'
    db.query(sql, parseInt(req.body.rut), (err, data) =>{
        if(err) return res.json({Error: "Error en el servidor de login"})
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].PASSWORD, (err, response) => {
                if(err) return res.json({Error: 'password compare error'})
                if(response){
                    const name = data[0].NOMBRE_USUARIO;
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token, { httpOnly: true }); 
                    return res.json({Status: "Success"})
                } else {
                    return res.json({Error: "Password not matched"})
                }
            })
        } else {
            return res.json({Error: "No existe el email"})
        }
    })
})  





app.get('/logout', (req,res)=>{
    res.clearCookie('token');
    return res.json({Status: "Success"})
})





app.listen(8000, ()=> {
    console.log('Server Up running in http://localhost:8000/')
})