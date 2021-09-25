const express=require("express");

const app=express();

const https=require("https");

const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

res.sendFile(__dirname +"/index.html");

})

app.post("/",function(req,res){
  const query=req.body.CityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=metric&appid=1b2b89b11203de3f344127f05a341dd4";
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherdata=JSON.parse(data)
      const weather=weatherdata.main.temp;
      const state=weatherdata.weather[0].description;
      const icon=weatherdata.weather[0].icon;
      const image="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<h1> The temperture in "+ query +" is " + weather + "</h1>");
      res.write("<p> The weather is currently "+ state + "<p>");
      res.write("<img src="  + image + ">");
      res.send();



  })
  })
})



app.listen(3000)
