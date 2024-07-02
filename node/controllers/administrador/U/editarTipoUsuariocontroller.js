
import { updateTipoUsuario } from '../../../models/administrador/U/editarTipoUsuariomodel.js'

export const editarTipoUsuario = (req, res) => {
    const { idTipoUsuario, nuevoNombreUsuario } = req.body;

  updateTipoUsuario({ nuevoNombreUsuario, idTipoUsuario}, (err, result) => {
    if (err) {
      console.error('Error al actualizar el tipo de usuario:', err);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    } else {
      res.status(200).json({ success: true, message: 'Tipo de usuario actualizado correctamente' });
    }
  });
};
