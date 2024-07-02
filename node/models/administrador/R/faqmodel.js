import db from "../../../database/db.js"

export const getFaq = (callback) => {
    const sql ='SELECT ID_FAQ, PREGUNTAS_FAQ, RESPUESTA_FAQ, ACTIVO, FECHA_FAQ , FECHA_UPDATE FROM ALLNRS_FAQ;';

  db.query(sql, callback);
};
