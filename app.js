const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname +"/index.html");
});

app.post("/", function(req, res){
  console.log("post request recieved");

  const query = req.body.cityName;
  const unit="metric";
  const apikey = "dac6f43823bc60e47767209443027530";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+"&appid="+ apikey+"&units="+unit;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1> The temperature in "+query+" is "+temp+" degree celsius</h1>" );
      res.write("<p> The weather here is "+ weatherDescription +"</p>");
      res.write("<img src="+ imageURL +">");
      res.send()
    });
  });
});
app.listen(3000, function(){
  console.log("Server started on port 3000");
});
