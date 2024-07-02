import express from 'express';

import { editarFaq } from '../../../controllers/administrador/U/editarFaqcontroller.js';
const router = express.Router();

router.post('/editar-faq', editarFaq);

export default router;
