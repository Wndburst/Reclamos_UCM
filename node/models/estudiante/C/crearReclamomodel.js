import db from '../../../database/db.js'


export const insertReclamo = ({ userid, titulo, descripcion, visibilidad, area, categoria }, callback) => {

    const sql = `
    INSERT INTO ALLNRS_RECLAMOS (ID_RECLAMO, TITULO_RECLAMO, DESCRIPCION_RECLAMO, ID_VISIBILIDAD, ID_ESTADO, FECHA_CREACION_RECLAMO, FECHA_UPDATE_RECLAMO, FECHA_FINALIZADO, ID_USUARIO, ID_AREA, ID_CATEGORIA, ID_RESPUESTA) 
    VALUES (6, ?, ?, ?, 1, CURRENT_TIMESTAMP(), '', NULL, ?, ?, ?, 1)`;
  db.query(sql, [titulo, descripcion, visibilidad,userid, area ,categoria], callback);
};

