import express from 'express';
import { getReclamosGenerales } from '../../../controllers/estudiante/R/reclamosGeneralcontroller.js'

const router = express.Router();

router.get('/reclamos-generales/:estado/:area', getReclamosGenerales);

export default router;