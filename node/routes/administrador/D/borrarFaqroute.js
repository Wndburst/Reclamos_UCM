import express from 'express';
import { deleteFaq } from '../../../controllers/administrador/D/borrarFaqcontroller.js'

const router = express.Router();

router.post('/borrar-faq', deleteFaq);

export default router;
