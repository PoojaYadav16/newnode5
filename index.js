const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const mysql2 = require("mysql2");
const cors=require("cors");
const conn=require("./dbconnection/connection")
app.use(cors([
    "http://localhost:4200"
])); 
app.use(express.json());

app.listen(3000);

app.use("/state",require("./routes/state")); 

app.use("/city",require("./routes/city")); 
app.use("/college",require("./routes/college")); 

app.get("/allemp", (request, response) => 
{
    conn.query("select *from login", (error, result) => 
    {
        response.json(result);
    });
});
app.post("/login", (req, res) => {
    console.log(req.body);
    conn.query("select *from login where email=? and password=?", [req.body.email, req.body.password], (error, result) => {
        if (result.length == 0) {
            res.json({ "error": "true", "status": "404" });
        }
        else {
            res.json({ "error": "false", "status": "200" });

        }
        // res.json(result);
    });
});
app.post("/newuser", (req, res) => {
    conn.query("insert into login (email,password,name) values (?,?,?) ", [req.body.email, req.body.password, req.name], (err, result) => {
        if (err)
            res.json({ "error": "true", "status": "404" });
        else
            res.json({ "error": "false", "status": "200" });

    });
});

app.post("/adminlogin", (req, res) => {
    console.log(req.body);
    conn.query("select *from login where email=? and password=? and role=1", [req.body.email, req.body.password], (error, result) => {
      console.log(result);
        if (result.length == 0) {
            res.json({ "error": "true", "status": "404" });
        }
        else {
            res.json({ "error": "false", "status": "200" });

        }
        
    });
});


// app.listen(3000);
// app.get("/allcities", (request, response) => 
// {
//     conn.query("select *from cities", (error, result) => 
//     {
//         response.json(result);
//     });
// });




// app.get("/allcities/:sid", (request, response) => 
// {
//     console.log(request.params);
//     conn.query("select *from cities where state_id="+request.params.sid, (error, result) => 
//     {
//         response.json(result);
//     });
// });

app.get("/allcollege/:cid", (request, response) => 
{
    console.log(request.params);
    conn.query("select *from college where city_id="+request.params.cid, (error, result) => 
    {
        response.json(result);
    });
});
app.get("/allcolleges", (request, response) => 
{
    console.log(request.params);
    conn.query("select *from college", (error, result) => 
    {
        response.json(result);
    });
});
// app.get("/getcollegebycid/:cid", (request, response) => 
// {
//     console.log(request.params);
//     conn.query("select college.*,college_details.* from college inner join college_details on college.id=college_details.clg_id where college.id="+request.params.cid, (error, result) => 
//     {
//         response.json(result);
//         console.log(error);
//     });
// });
app.get("/gettransportationbycid/:cid", (request, response) => 
{
    console.log(request.params);
    console.log(request.params);
    conn.query("select *from transportation where city_id="+request.params.cid, (error, result) => 
    {
        response.json(result);
    });
});

