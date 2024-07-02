import db from "../../../database/db.js";

export const insertTipoUsuario = (tipoUsuario, callback) => {
    const { N_TIPOUSUARIO} = tipoUsuario;
    const sql = `INSERT INTO ALLNRS_TIPO_USUARIO (NOMBRE_USUARIO) VALUES (?)`;

    db.query(sql, [N_TIPOUSUARIO], callback);
  };