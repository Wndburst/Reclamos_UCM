import db from '../../../database/db.js'

export const updateTipoUsuario = ({ idTipoUsuario, nuevoNombreUsuario }, callback) => {
    const sql = 'UPDATE ALLNRS_TIPO_USUARIO SET NOMBRE_USUARIO = ? WHERE ID_TIPO_USUARIO = ?';

  
  db.query(sql, [nuevoNombreUsuario, idTipoUsuario], callback);
};
