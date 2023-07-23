let express = require("express")
let route = express.Router();
const conn = require("../dbconnection/connection")
route.get("/allcities/:sid", (request, response) => {
    console.log(request.params);
    conn.query("select *from cities where state_id=" + request.params.sid, (error, result) => {
        response.json(result);
    });
});
route.get("/getallcities", (request, response) => {
    console.log(request.params);
    conn.query("SELECT cities.* ,states.name 'sname' from cities INNER JOIN states on cities.state_id=states.id", (error, result) => {
        response.json(result);
    });
});

route.post("/save", (req, res) => {
    console.log(req.body);
    conn.query("insert into cities (name,iframe,status) values(?,?,?)", [req.body.cname, req.body.iframe, req.body.status], (error, result) => {
        // res.json(result);
        if (result != null) {
            res.json({error:false});
        }
        else {
            res.json({error:true});

        }
        console.log(result);
        console.log(error);
    });
});
module.exports = route;