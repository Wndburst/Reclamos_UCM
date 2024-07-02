import db from '../../../database/db.js'
export const getReclamosByUserIdAndEstado = (userid, estado, callback) => {
  const filtroEstado = estado == '0' ? '' : ` AND EST.ID_ESTADO = ${estado} `;
  const sql = `SELECT R.ID_RECLAMO, U.ID_USUARIO, U.NOMBRE_USUARIO, R.ID_RECLAMO, R.TITULO_RECLAMO, R.ID_AREA, A.NOMBRE_AREA, CA.ID_CATEGORIA, CA.NOMBRE_CATEGORIA, R.DESCRIPCION_RECLAMO, EST.NOMBRE_ESTADO, EST.ID_ESTADO, DATE_FORMAT(fecha_creacion_reclamo, '%Y-%m-%d %H:%i:%s') AS FECHA_FORMATEADA, RES.RESPUESTA, R.ID_VISIBILIDAD
               FROM ALLNRS_RECLAMOS R
               JOIN ALLNRS_USUARIO U ON (U.ID_USUARIO = R.ID_USUARIO)
               JOIN ALLNRS_ESTADO EST ON (EST.ID_ESTADO = R.ID_ESTADO)
               JOIN ALLNRS_CATEGORIA CA ON (R.ID_CATEGORIA = CA.ID_CATEGORIA)
               JOIN ALLNRS_RESPUESTA RES ON (RES.ID_RESPUESTA = R.ID_RESPUESTA)
               JOIN ALLNRS_AREA A ON (A.ID_AREA = R.ID_AREA)
               WHERE U.ID_USUARIO = ? ${filtroEstado}
               ORDER BY R.FECHA_CREACION_RECLAMO DESC`;

  db.query(sql, [userid], callback);
};
