import express from 'express';
import { showUsuarios } from '../../../controllers/administrador/R/usuarioscontroller.js'

const router = express.Router();

router.get('/ShowUsuarios', showUsuarios);

export default router;
