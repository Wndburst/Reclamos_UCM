/*/importar base de datos
import db from "../database/db.js";

import {DataTypes} from "sequelize";

const Modelo = db.define('reclamos', {
    ID: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        },
    Descripcion: { type: DataTypes.STRING },
    Area: { type: DataTypes.STRING },
    Fecha: { type: DataTypes.DATE },
    Estado: { type: DataTypes.STRING },
}, {
    timestamps: false, // Deshabilita las columnas createdAt y updatedAt en este modelo
});

export default Modelo;*/