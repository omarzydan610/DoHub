const mysql = require("mysql2");


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "toDoApp"
}).promise();


module.exports = pool;
