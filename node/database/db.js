/*import { Sequelize } from "sequelize";

const db = new Sequelize('UCM_RECLAMOS', 'root', '',{
    host:'localhost',
    dialect: 'mysql'
})

export default db*/

import mysql from 'mysql'

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "UCM_RECLAMOS"
})

export default db