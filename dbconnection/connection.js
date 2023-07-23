let mysql2=require("mysql2");
let conn = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "final_hackathon",
});
// conn.connect();
module.exports  =conn;