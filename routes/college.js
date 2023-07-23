let express = require("express")
let route = express.Router();
const conn = require("../dbconnection/connection")
route.get("/allcollege/:cid", (request, response) => {
    console.log(request.params);
    conn.query("select *from college where city_id=" + request.params.cid, (error, result) => {
        response.json(result);
    });
});
route.get("/getallcollege", (request, response) => {
    console.log(request.params);
    conn.query("select *from college ", (error, result) => {
        response.json(result);
    });
});
route.get("/getallcolleges", (request, response) => {
    console.log(request.params);
    conn.query("select *from college ", (error, result) => {
        response.json(result);
    })
});

route.post("/save", (req, res) => {
    console.log(req.body);
    conn.query("insert into college (state_id,city_id,clg_name,full_address,iframe) values(?,?,?,?,?)",
        [req.body.state_id,req.body.city_id,req.body.clg_name, req.body.address, req.body.iframe], (error, result) => {
           console.log(result.insertId);
           console.log(error);
            conn.query("insert into college_details (clg_id,website,virtual_tour,vr_pics,status,degree,facilities,placement,cutoff) values(?,?,?,?,?,?,?,?,?)",
            [result.insertId,req.body.website, req.body.virtual_tour, req.body.vrpics, req.body.status, req.body.degree, req.body.facilities, req.body.placement, req.body.cutoff], (error, result) => {
                if (result != null) {
                    res.json({ error: false });
                }
                else {
                    res.json({ error: true });
    
                }
                console.log(result);
                console.log(error);
            });
    

        });
   });

   route.get("/getcollegebycid/:cid", (request, response) => 
{
    console.log(request.params);
    conn.query("select college.*,college_details.* from college inner join college_details on college.id=college_details.clg_id where college.id="+request.params.cid, (error, result) => 
    {
        response.json(result);
        console.log(error);
    });
});

module.exports = route;




