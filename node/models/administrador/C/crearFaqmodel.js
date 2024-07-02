import db from "../../../database/db.js";

export const insertFaq = (faq, callback) => {
    const { PREGUNTA, RESPUESTA,ACTIVO } = faq;
    const sql = `INSERT INTO ALLNRS_FAQ(PREGUNTAS_FAQ, RESPUESTA_FAQ, ACTIVO, FECHA_FAQ) VALUES (?, ?, ?, Current_date)`;

    db.query(sql, [PREGUNTA, RESPUESTA, ACTIVO], callback);
  };