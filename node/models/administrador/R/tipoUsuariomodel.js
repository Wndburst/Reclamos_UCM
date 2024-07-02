import db from "../../../database/db.js"

export const getTipoUsuario = (callback) => {
    const sql ='SELECT ID_TIPO_USUARIO, NOMBRE_USUARIO FROM ALLNRS_TIPO_USUARIO';

  db.query(sql, callback);
};
