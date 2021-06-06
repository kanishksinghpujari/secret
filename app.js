require('dotenv').config()

const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app=express();
const mongoose=require("mongoose");
const md5 = require('md5');


mongoose.connect('mongodb://localhost/userDB', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.static("public"));

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({
  extended:true
}));

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});





const User = mongoose.model('User', userSchema);
 //get
 app.get("/",function(req,res){
   res.render("home");
 });
 app.get("/login",function(req,res){
   res.render("login");
 });

 app.get("/register",function(req,res){
   res.render("register");
 });;


//post
app.post("/register",function(req,res){
  const newUser = new User({
  email:req.body.username,
   password:md5(req.body.password) });
   newUser.save(function(err){
     if(!err)
     res.render("secrets");
   });
});

app.post("/login",function(req,res){
  User.findOne({email:req.body.username},function(err,foundUser){
    if(err){
    console.log("errot");
    }
    else{
      if(foundUser.password===md5(req.body.password))
      {
        res.render("secrets");
      }
      else{
      console.log("error");
      }
    }
  });
});
app.listen(3000,function(){
  console.log("server started on port 3000");
});
