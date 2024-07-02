import { updateUsuario } from '../../../models/administrador/U/editarUsuariomodel.js'

export const editarUsuario = (req, res) => {
    const {idUsuario,nuevoNombreUsuario,nuevoApellidoUsuario,nuevoCorreoUsuario,nuevoGeneracionUsuario,nuevoIdCarrera,nuevoIdTipoUsuario} = req.body

  updateUsuario({ idUsuario,nuevoNombreUsuario,nuevoApellidoUsuario,nuevoCorreoUsuario,nuevoGeneracionUsuario,nuevoIdCarrera,nuevoIdTipoUsuario }, (err, result) => {
    if (err) {
      console.error('Error al actualizar el usuario:', err);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    } else {
      res.status(200).json({ success: true, message: 'usuario actualizado correctamente' });
    }
  });
};
