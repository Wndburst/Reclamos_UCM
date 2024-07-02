import express from 'express';

import { editarUsuario } from '../../../controllers/administrador/U/editarUsuariocontroller.js';
const router = express.Router();

router.post('/editar-usuario', editarUsuario);

export default router;
