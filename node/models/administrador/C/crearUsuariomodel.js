import db from "../../../database/db.js";

export const insertUsuario = (usuario, callback) => {
    const { R_USUARIO, N_USUARIO, A_USUARIO, hashedPassword, G_USUARIO, ID_CARR, ID_TIPOUSU } = usuario;
    const sql = `INSERT INTO ALLNRS_USUARIO (ID_USUARIO, NOMBRE_USUARIO, APELLIDO_USUARIO, CORREO_USUARIO, CONTRASENA_USUARIO, GENERACION_USUARIO, ID_CARRERA, ID_TIPO_USUARIO, FECHA_CREACION_USUARIO)
                 VALUES (?, ?, ?, CONCAT(UPPER(TRIM(SUBSTRING_INDEX(NOMBRE_USUARIO, ' ', 1))), '.', UPPER(SUBSTRING_INDEX(APELLIDO_USUARIO, ' ', 1)), '@ALU.UCM.CL'), ?, ?, ?, ?, CURRENT_DATE)`;
  
    db.query(sql, [R_USUARIO, N_USUARIO, A_USUARIO, hashedPassword, G_USUARIO, ID_CARR, ID_TIPOUSU], callback);
  };