const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/posts.js");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");

const sessionOptions={secret:"mysupersecretstring",resave:false,saveUninitialized:true,};

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
    let{ name="anonymous" }=req.query;
    req.session.name = name;
    if(name==="anonymous"){
        req.flash("error","user not recognizes");
    }else{
    req.flash("success","user registered successfully");
    }
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name: req.session.name});
});



/*app.get("/reqcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count=1;
    }
    res.send(`you sent a request ${req.session.count} times`);
});*/

/*const cookieParser=require("cookie-parser");

app.use(cookieParser("secretcode"));

app.get("/getsignedcookie",(req,res)=>{
    res.cookie("made-in","Bharat",{signed:true});
    res.send("signed cookie send");
});

app.get("/getcookies",(req,res)=>{
    res.cookie("greet","namaste");
    res.cookie("madeIn","Bharat");
    res.send("sent you some cookies");
});

app.get("/greet",(req,res)=>{
    let { name="anonymous"}=req.params;
    res.send(`Hi,${name}`);
});

app.get("/",(req,res)=>{
    console.dir(req.cookies);
    res.send("Hi,I am root")
});

app.get("/",(req,res)=>{
    res.send("Hi,I am root");
});

app.use("/users",users);
app.use("/posts",posts);*/

app.listen(3000,()=>{
    console.log("server is listening to 3000");
})





