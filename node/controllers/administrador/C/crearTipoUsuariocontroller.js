import { insertTipoUsuario } from '../../../models/administrador/C/crearTipoUsuariomodel.js'

export const crearTipoUsuario = (req, res) => {
    const { N_TIPOUSUARIO} = req.body;

  // Verificar que todos los campos necesarios estén presentes
  if (!N_TIPOUSUARIO) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Llamar a la función del modelo para insertar el reclamo en la base de datos
  insertTipoUsuario({ N_TIPOUSUARIO}, (err, result) => {
    if (err) {
      console.error('Error al insertar Tipo de usuario:', err);
      res.status(500).json({ success: false, message: 'Error al insertar tipo de usuario' });
    } else {
      res.status(200).json({ success: true, message: 'Tipo de usuario insertado con éxito' });
    }
  });
};
