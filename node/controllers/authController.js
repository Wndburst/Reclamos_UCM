
/*
import User from "../models/userModel.js";

export const checkCredentials = async (req, res) => {
  console.log('Ejecutando consulta SQL');
  const { username, password } = req.body;

  try {
    
    const query = `
    SELECT *
    FROM ALLCRS_USUARIO
    WHERE ID_USUARIO = :username AND CONTRASEÑA = :password
  `;
    
  console.log('Resultado de la consulta:', query);

    const user = await User.sequelize.query(query, {
      replacements: { username, password },
      type: User.sequelize.QueryTypes.SELECT,
    });
    

    console.log('Resultado de la consulta:', user);


    if (user.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

    // Usuario autenticado con éxito
    return res.json({ message: 'Inicio de sesión exitoso' });
  } catch (sqlError) {
    console.error('Error en la consulta SQL:', sqlError);
  return res.status(500).json({ error: 'Error de servidor al ejecutar la consulta SQL' });
  }
};
*/