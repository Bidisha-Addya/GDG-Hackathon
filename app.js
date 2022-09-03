const express = require("express");
const session = require('express-session')
const https = require("https");
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser'); 
const MongoDBsession = require('connect-mongodb-session')(session); 
const User = require('./modals/userModel.js');
const { findOne } = require("./modals/userModel.js");
const userModel = require("./modals/userModel.js");
const bcrypt = require('bcryptjs')
mongoose.connect('mongodb://localhost:27017/user', {useNewUrlParser : true});

const port = 3000;


const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(session({
  secret : 'this is secret', 
  resave : false, 
  saveUninitialized : false
})
); 

app.get("/", function (req, res) {

    const apiKey = "5b0a54176fa482e4b0a92b9256bf2ea3"; 
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=london&appid=' + apiKey;

  //   https.get(url, function (response) {
  //     let data;
  //     response.on('data', function (chunk) {
  //         if (!data) {
  //             data = chunk;
  //         }
  //         else {
  //             data += chunk;
  //         }
  //     });
  //     response.on('end', function () {
  //         const newsData = JSON.parse(data);
  //         console.log(newsData);
  //     });
  // });
  res.render('index'); 
});

app.get("/signup",(req, res) => {
  res.render('signup'); 
}); 

app.post("/signup",async (req, res) => {

  const user = new User({
     fullName : req.body.name,
     email : req.body.email,
     phone : req.body.phone,
     gender : req.body.gender,
     pass : req.body.pass,
     geoLocation : {
      latitude : req.body.latitude, 
      longitude : req.body.longitude
    }
 });
 let userExist = await findOne({email});
 if(userExist){
  return res.redirect('/register'); 
 }
 const encryptedPass = await bcrypt.hash(pass, 12); 
  user = new userModel({
    fullName, 
    email, 
    phone, 
    gender, 
    pass : encryptedPass,  
    geoLocation : {
      latitude, 
      longitude
    }
  });

  await user.save(); 
  res.redirect('login');

}); 

app.get("/login", (req, res)=>{
  res.render('login');
}); 


app.post("/login", async (req, res)=>{
  const {email, pass} = req.body; 

  const user = await userModel.findOne({email}); 

  if(!user){
    res.redirect("/login"); 
  }

  const isMatch = bcrypt.compare(pass, user.pass); 
  if(!isMatch){
    res.redirect("/login"); 
  }
  res.redirect("/");
}); 


const isAuth = (req, res, next)=>{
  if(req.session.isAuth){
    next(); 
  }
  else{
    res.redirect("/login"); 
  }
}

app.post("/logout", (req,res)=>{
  req.session.destroy((err)=>{
    if(err){
      throw error; 
    }
    res.redirect("/"); 
  })
}); 
app.get("/chart", (req, res)=>{
  res.render('chart'); 
 }); 


app.listen(port, function () {
  console.log("Server is running at port " + port);
});
