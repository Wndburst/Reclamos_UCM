import express from 'express';
import { deleteReclamo } from '../../../controllers/estudiante/D/borrarReclamocontroller.js'

const router = express.Router();

router.post('/borrar-reclamo', deleteReclamo);

export default router;
