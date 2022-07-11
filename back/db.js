const sql = require("mysql2")
// Create a connection to the database
module.exports = sql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: "groupomania"
});
