import db from '../../../database/db.js'

export const updateFaq = ({ idFaq, nuevaPregunta, nuevaRespuesta, nuevoActivo }, callback) => {
    const query = 'UPDATE ALLNRS_FAQ SET PREGUNTAS_FAQ = ?, RESPUESTA_FAQ = ?, FECHA_UPDATE = current_date, ACTIVO = ? WHERE ID_FAQ = ?';

  
  db.query(query, [nuevaPregunta, nuevaRespuesta, nuevoActivo, idFaq], callback);
};
