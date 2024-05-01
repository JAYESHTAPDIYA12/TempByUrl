const express = require("express");
const app = express();
const path = require("path");
// const hbs = require("hbs")
const requests = require("requests")

const temp = path.join(__dirname, "../template/views");

app.set("view engine", "hbs");
app.set("views", temp);

app.get("/", (req, res) => {
    requests(
        `http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&units=metric&appid=05d6282183e9898de37600270ddb8999` //  the api we use 
    )
        .on("data", (chunk) => {
            const objdata = JSON.parse(chunk);
            const arrData = [objdata];
            console.log(`city name is :${arrData[0].name} and temp is : ${arrData[0].main.temp}`);

            res.write(`city name is: ${arrData[0].name} and temp is :${arrData[0].main.temp}`);
            // console.log(realTimeData);
        })
        .on("end", (err) => {
            if (err) return console.log("connection closed due to errors", err);
            res.end();
        });
    // res.render("temp", {
    //     data: "hello"
    // })
});


app.listen(8000, (err) => {

    console.log("listine to port no : 8000");
    console.log(err)
})