import express from 'express';
import { getReclamos } from '../../../controllers/estudiante/R/reclamoPerfilcontroller.js'

const router = express.Router();

router.get('/reclamos/:userid/:estado', getReclamos);

export default router;
