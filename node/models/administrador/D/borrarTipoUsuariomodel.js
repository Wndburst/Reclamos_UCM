import db from '../../../database/db.js'

export const borrarTipoUsuario = (idTipoUsuario) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM ALLNRS_TIPO_USUARIO WHERE ID_TIPO_USUARIO = ?', [idTipoUsuario], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
