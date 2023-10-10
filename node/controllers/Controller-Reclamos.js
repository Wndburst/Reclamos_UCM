/*import Modelo from "../models/modeloReclamos.js";

// mostrar todos los registros
export const getAllUser = async(req, res) => {
    try {
        const reclamos = await Modelo.sequelize.query(
            'select r.ID_RECLAMO as ID,r.DESCRIPCION_RECLAMO as Descripcion , a.NOMBRE_AREA as Area,FECHA_RECLAMO as Fecha, ESTADO_RECLAMO as Estado from ALLCRS_RECLAMOS r join ALLCRS_RESPUESTA res on (res.ID_RESPUESTA = r.ID_RESPUESTA)join ALLCRS_AREA a on (r.ID_AREA = a.ID_AREA)',
            {type: Modelo.sequelize.QueryTypes.SELECT}
        )
        res.json(reclamos);
    } catch (error) {
        res.json({message: error.message})
    }
}*/