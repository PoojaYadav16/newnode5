let express=require("express")
let route=express.Router();
const conn=require("../dbconnection/connection")
route.get("/allstate", (request, response) => 
{
    conn.query("select *from states where country_id=101", (error, result) => 
    {
        response.json(result);
    });
});
route.get("/statebyid/:id", (request, response) => 
{
    console.log(request.params);
    conn.query("select *from states where id="+request.params.id, (error, result) => 
    {
        console.log(error);
        response.json(result);
    });
});
module.exports=route;