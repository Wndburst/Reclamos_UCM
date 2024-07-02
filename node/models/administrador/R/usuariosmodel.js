import db from "../../../database/db.js"

export const getUsuarios = (callback) => {
  const sql = `SELECT ID_USUARIO, NOMBRE_USUARIO, APELLIDO_USUARIO, CORREO_USUARIO, CONTRASENA_USUARIO, GENERACION_USUARIO, ID_CARRERA, ID_TIPO_USUARIO, DATE_FORMAT(FECHA_CREACION_USUARIO, "%m-%d-%Y") AS FECHA_CREACION_USUARIO 
               FROM ALLNRS_USUARIO`;
  db.query(sql, callback);
};
