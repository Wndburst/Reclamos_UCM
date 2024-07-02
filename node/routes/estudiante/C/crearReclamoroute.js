import express from 'express';
import { createReclamo } from '../../../controllers/estudiante/C/crearReclamocontroller.js'

const router = express.Router();

router.post('/crear-reclamo', createReclamo);

export default router;
