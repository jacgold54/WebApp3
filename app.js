/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'html');
  res.end("HomePage.html");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

const bodyParser = require("body-parser");
const express = require("express");
const fs = require('fs');
const app = express();
var port = 8080;

app.listen(port, () => {
    console.log("Application started and Listening on port 3000");
});

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/mystyle.css", (req, res) => {
  res.sendFile(__dirname + "/mystyle.css");
});

app.get("/index.html", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/TestPage.html", (req, res) => {
  res.sendFile(__dirname + "/TestPage.html");
});

app.get("/Controls.html", (req, res) => {
  res.sendFile(__dirname + "/Controls.html");
});

app.get("/Forum.html", (req, res) => {
  res.sendFile(__dirname + "/Forum.html");
});

app.get("/data", (req, res) => {
  fs.readFile(__dirname +  "/info.txt", 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

app.post("/", (req, res) => {
  //const dateObject = new Date();

  const dateObject = new Date();
  var date = (`0 ${dateObject.getDate()}`).slice(-2);
  date = parseInt(date);
  date = Math.floor(date / 10).toString() + (date % 10).toString(); 
  var month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);
  month = parseInt(month);
  month = Math.floor(month / 10).toString() + (month % 10).toString(); 
  const year = dateObject.getFullYear();
  var hours = dateObject.getHours();
  hours = parseInt(hours);
  hours = Math.floor(hours / 10).toString() + (hours % 10).toString(); 
  var minutes = dateObject.getMinutes();
  minutes = parseInt(minutes);
  minutes = Math.floor(minutes / 10).toString() + (minutes % 10).toString(); 
  var seconds = dateObject.getSeconds();
  seconds = parseInt(seconds);
  seconds = Math.floor(seconds / 10).toString() + (seconds % 10).toString(); 

  // prints date & time in YYYY-MM-DD HH:MM:SS format
  const timeStamp = (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
  fs.appendFile(__dirname + '/info.txt', req.body.name + "\t" + req.body.comment + "\t" + timeStamp + "\n", err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
});

