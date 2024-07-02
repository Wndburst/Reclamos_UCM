import express from 'express';
import { deleteTipoUsuario } from '../../../controllers/administrador/D/borrarTipoUsuariocontroller.js'

const router = express.Router();

router.post('/borrar-tipo-usuario', deleteTipoUsuario);

export default router;
