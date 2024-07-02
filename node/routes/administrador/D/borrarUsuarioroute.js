import express from 'express';
import { deleteUsuario } from '../../../controllers/administrador/D/borrarUsuariocontroller.js';

const router = express.Router();

router.post('/borrar-usuario', deleteUsuario);

export default router;
