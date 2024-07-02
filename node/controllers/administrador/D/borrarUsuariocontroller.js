import { borrarUsuario } from "../../../models/administrador/D/borrarUsuariomodel.js";

export const deleteUsuario = async (req, res) => {
  const { idUsuario } = req.body;

  try {
    await borrarUsuario(idUsuario);
    res.json({ success: true, message: 'Usuario borrado exitosamente' });
  } catch (error) {
    console.error('Error al borrar el usuario:', error);
    res.status(500).json({ success: false, message: 'Error al borrar el usuario' });
  }
};
