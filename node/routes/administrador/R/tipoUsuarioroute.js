import express from 'express';
import { showTipoUsuario } from '../../../controllers/administrador/R/tipoUsuariocontroller.js'

const router = express.Router();

router.get('/ShowTipoUsu', showTipoUsuario);

export default router;
