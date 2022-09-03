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

app.listen(port, function () {
  console.log("Server is running at port " + port);
});
