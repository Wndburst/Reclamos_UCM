import { getTipoUsuario } from '../../../models/administrador/R/tipoUsuariomodel.js'

export const showTipoUsuario = (req, res) => {
    getTipoUsuario((err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(result);
    }
  });
};
