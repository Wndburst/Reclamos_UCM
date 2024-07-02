import { getUsuarios } from '../../../models/administrador/R/usuariosmodel.js'

export const showUsuarios = (req, res) => {
  getUsuarios((err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(result);
    }
  });
};
