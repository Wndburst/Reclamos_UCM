import { insertUsuario } from '../../../models/administrador/C/crearUsuariomodel.js'
import bcrypt from 'bcrypt';

export const crearUsuario = async (req, res) => {
  const { R_USUARIO, N_USUARIO, A_USUARIO, P_USUARIO, G_USUARIO, ID_CARR, ID_TIPOUSU } = req.body;

  // Verificar si algún campo está vacío
  if (!R_USUARIO || !N_USUARIO || !A_USUARIO || !P_USUARIO || !G_USUARIO || !ID_CARR || !ID_TIPOUSU) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  
  try {
    // Encriptar la contraseña con bcrypt
    const hashedPassword = await bcrypt.hash(P_USUARIO, 10);
    const usuario = { R_USUARIO, N_USUARIO, A_USUARIO, hashedPassword, G_USUARIO, ID_CARR, ID_TIPOUSU };

    // Ejecutar la consulta SQL
    insertUsuario(usuario, (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta SQL:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        console.log('Usuario creado exitosamente');
        res.status(200).json({ message: 'Usuario creado exitosamente' });
      }
    });
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
