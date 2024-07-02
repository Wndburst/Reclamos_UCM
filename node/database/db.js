import mysql from 'mysql'

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "UCM_RECLAMOS",
    port: 3306,
})

export default db