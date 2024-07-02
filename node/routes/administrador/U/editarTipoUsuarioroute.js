import express from 'express';

import { editarTipoUsuario } from '../../../controllers/administrador/U/editarTipoUsuariocontroller.js';
const router = express.Router();

router.post('/editar-tipo-usuario', editarTipoUsuario);

export default router;
