import db from '../../../database/db.js'

export const updateReclamoById = ({ idReclamo, titulo, descripcion, idArea, idCategoria, visibilidad, estadoReclamo }, callback) => {
  const query = `
    UPDATE ALLNRS_RECLAMOS 
    SET TITULO_RECLAMO = ?, DESCRIPCION_RECLAMO = ?, ID_AREA = ?, ID_CATEGORIA = ?, ID_VISIBILIDAD = ?, ID_ESTADO = ? 
    WHERE ID_RECLAMO = ?
  `;
  
  db.query(query, [titulo, descripcion, idArea, idCategoria, visibilidad, estadoReclamo, idReclamo], callback);
};
