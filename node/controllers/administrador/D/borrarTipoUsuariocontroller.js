
import { borrarTipoUsuario } from "../../../models/administrador/D/borrarTipoUsuariomodel.js"

export const deleteTipoUsuario = async (req, res) => {
    const { idTipoUsuario } = req.body;

  try {
    await borrarTipoUsuario(idTipoUsuario);
    res.json({ success: true, message: 'Tipo de usuario borrado exitosamente' });
  } catch (error) {
    console.error('Error al borrar el tipo de usuario:', error);
    res.status(500).json({ success: false, message: 'Error al borrar el tipo de usuario' });
  }
};
