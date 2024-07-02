import db from '../../../database/db.js'

export const updateUsuario = ({idUsuario,nuevoNombreUsuario,nuevoApellidoUsuario,nuevoCorreoUsuario,nuevoGeneracionUsuario,nuevoIdCarrera,nuevoIdTipoUsuario}, callback) => {
    const query = `
        UPDATE ALLNRS_USUARIO 
        SET ID_USUARIO = ?, NOMBRE_USUARIO = ?, APELLIDO_USUARIO = ?, CORREO_USUARIO = ?, GENERACION_USUARIO = ?, ID_CARRERA = ?, ID_TIPO_USUARIO = ?
        WHERE ID_USUARIO = ?`;
  
  db.query(query, [idUsuario, nuevoNombreUsuario, nuevoApellidoUsuario, nuevoCorreoUsuario,nuevoGeneracionUsuario,nuevoIdCarrera,nuevoIdTipoUsuario,idUsuario], callback);
};
