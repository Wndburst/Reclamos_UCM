import db from '../../../database/db.js'

export const borrarUsuario = (idUsuario) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM ALLNRS_USUARIO WHERE ID_USUARIO = ?', [idUsuario], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
