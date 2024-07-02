import express from 'express';
import { showFaq } from '../../../controllers/administrador/R/faqcontroller.js'

const router = express.Router();

router.get('/Showfaq', showFaq);

export default router;
