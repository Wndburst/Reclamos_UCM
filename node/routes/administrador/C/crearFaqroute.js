import express from 'express';
import { crearFaq } from '../../../controllers/administrador/C/crearFaqcontroller.js'

const router = express.Router();

router.post('/crear-faq', crearFaq);

export default router;
