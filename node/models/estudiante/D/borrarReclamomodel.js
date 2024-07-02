import db from '../../../database/db.js'

export const deleteReclamoById = (idReclamo) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM ALLNRS_RECLAMOS WHERE ID_RECLAMO = ?', [idReclamo], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
