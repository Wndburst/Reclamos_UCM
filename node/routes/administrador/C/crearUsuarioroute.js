import express from 'express';
import { crearUsuario } from '../../../controllers/administrador/C/crearUsuariocontroller.js'

const router = express.Router();

router.post('/crear-usuario', crearUsuario);

export default router;
