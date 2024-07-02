import express from 'express';
import { updateReclamo } from '../../../controllers/estudiante/U/editarReclamocontroller.js'

const router = express.Router();

router.post('/editar-reclamo', updateReclamo);

export default router;
