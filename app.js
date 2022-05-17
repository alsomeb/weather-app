const express = require("express");
const https = require("https");
// need npm install body-parser        to receive the text submitted in form
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true})); // needs to be like this to snag post req
app.use(express.static(__dirname)); // searches for style.css in current dir


// make GET request to openweather api and fetch it back as JSON and parse
// USING native HTTPS node module
app.get("/", function(req,res) {
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const apiKey = "69c0cc1bb55169c15793bfa66d206cdc";
    const units = req.body.metric;
    console.log(req.body.metric);
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+ apiKey + "&units=" + units +"";
    
    // GET REQUEST 
    https.get(url, function(response){
        console.log("Request Status: " + response.statusCode);
        //console.log("Headers: " + response.headers);

        // DATA from REQUEST, CONVERTING DATA (JSON IN STRING FORMAT) TO JS OBJECT.
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
            console.log("Temp Celsius: " + temp);
            console.log("Desc: " + desc);
            // res, refers to our app.get response
            // CAN ONLY HAVE 1 RES.SEND , WRITE IN MULTIPLE RES.WRITE + Res.send() at end
            res.write("<h1>The weather in " + query + " is currently " + desc + "</h1>");
            res.write("<h2>The temperature is " + temp + " degrees</h2>");
            res.write("<img src= " + imageURL + ">");
            res.send();
        })
    })

});


app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});








// ------- ANNAT
// TURN JS OBJECT TO JSON
// const object = {
//     name: "Alex",
//     hobby: "Coding",
//     age: 30
// }

// console.log(JSON.stringify(object));