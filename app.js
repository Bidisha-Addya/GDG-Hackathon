const express = require("express");
// const parse = require('node-html-parser'); not using this.
const https = require("https");

const port = 3000;


const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function (req, res) {

    const apiKey = "5b0a54176fa482e4b0a92b9256bf2ea3"; 
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=london&appid=' + apiKey;

    https.get(url, function (response) {
      let data;
      response.on('data', function (chunk) {
          if (!data) {
              data = chunk;
          }
          else {
              data += chunk;
          }
      });
      response.on('end', function () {
          const newsData = JSON.parse(data);
          console.log(newsData);
      });
  });
  res.render('index'); 
});

app.get("/signup",(req, res) => {
  res.render('signup'); 
}); 

app.post("/signup",(req, res) => {
  
  const userSchema = new mongoose.Schema({
    fullName : String, 
    email : String, 
    phone : String, 
    gender : String, 
    pass : String, 
    geoLocation : {
      latitude : Number, 
      longitude : Number
    }
  }); 

  const User = mongoose.model('User', userSchema); 

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
 
 app.get("/chart", (req, res)=>{
  res.render('chart'); 
 })

}); 

app.listen(port, function () {
  console.log("Server is running at port " + port);
});
