import db from '../../../database/db.js'

export const borrarFaq = (idFaq) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM ALLNRS_FAQ WHERE ID_FAQ = ?', [idFaq], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
