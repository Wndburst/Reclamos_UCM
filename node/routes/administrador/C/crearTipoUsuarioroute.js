import express from 'express';
import { crearTipoUsuario } from '../../../controllers/administrador/C/crearTipoUsuariocontroller.js'

const router = express.Router();

router.post('/crear-tipo-usuario', crearTipoUsuario);

export default router;
