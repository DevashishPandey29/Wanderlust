const express=require("express");
const router=express.Router();

//Index User
router.get("/users",(req,res)=>{
    res.send("GET for users");
})

//SHOW users
router.get("/users/:id",(req,res)=>{
    res.send("GET for id");
});

//POST users
router.post("/users",(req,res)=>{
    res.send("POST for users");
});

//DELETE -users
router.delete("/users/:id",(req,res)=>{
    res.send("DELETE for users id");
});

module.exports=router;