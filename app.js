require('dotenv').config()

const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");

const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const saltRounds=10;

const app=express();
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

app.get("/logout",function(req,res){
  res.redirect("/");
})

//post
app.post("/register",function(req,res){
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const newUser = new User({
    email:req.body.username,
     password:hash
    });
     newUser.save(function(err){
       if(!err)
       res.render("secrets");
     });
  });


});

app.post("/login",function(req,res){
  User.findOne({email:req.body.username},function(err,foundUser){
    if(err){
    console.log("errot");
    }
    else{
    if(foundUser){
      bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
    // result == true
    if(result==true)
    res.render("secrets");
});

    }
    }
  });
});
app.listen(3000,function(){
  console.log("server started on port 3000");
});
