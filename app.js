var express = require("express"),
	app = express(),
	bodyParser = require("body-parser")
	https = require('https');

var query = "London";
const apikey = "23f6b3ff8c89e029dcdc537f9e9d63e2";
var unit="metric",unitname="degree celcius";
var mode="Celcius";

app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")

app.get("/",(req,res)=>{
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
	
	https.get(url,(response)=>{
		response.on("data",(data)=>{
			const weatherdata=JSON.parse(data);
			const temp = weatherdata.main.temp;
			const descr = weatherdata.weather[0].description;
			const icon = weatherdata.weather[0].icon;
			const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
			res.render("index",{temp:temp,descr:descr,imgurl:imgurl,query:query,unit:unit,unitname:unitname,mode:mode});
		});
	});
});

app.post("/",(req,res)=>{
	query = req.body.cityName;
	mode=req.body.tempunit;
	if(mode=="Kelvin"){
		unit="kelvin";
		unitname="kelvin";
	}
	else if(mode=="Fahrenheit"){
		unit="imperial";
		unitname="degree fahrenheit";
	}
	else{
		unit="metric";
		unitname="degree celcius";
	}
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
	
	https.get(url,(response)=>{
		response.on("data",(data)=>{
			const weatherdata=JSON.parse(data);
			const temp = weatherdata.main.temp;
			const descr = weatherdata.weather[0].description;
			const icon = weatherdata.weather[0].icon;
			const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
			res.render("index",{temp:temp,descr:descr,imgurl:imgurl,query:query,unit:unit,unitname:unitname,mode:mode});
		});
	});
})
	

app.listen(process.env.PORT||3000,()=>{
	console.log("Server Started");
})