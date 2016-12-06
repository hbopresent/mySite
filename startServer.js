var express = require("express");
var app = express();
var http = require("http").Server(app);
var projectData = require("./views/js/project.js");
var io = require("socket.io")(http);


io.on("connection", function(socket) {
  // send back data to client side
  socket.on("roulette", function() {
    console.log("get roulette message!!");
    socket.emit("rouletteWork", {data: projectData.roulette});
  });
  socket.on("baccarat", function() {
    console.log("get baccarat message!!");
    socket.emit("baccaratWork", {data: projectData.baccarat});
  });
  socket.on("zootopia", function() {
    console.log("get zootopia message!!");
    socket.emit("zootopiaWork", {data: projectData.zootopia});
  });
  socket.on("sicbo", function() {
    console.log("get sicbo message!!");
    socket.emit("sicboWork", {data: projectData.sicbo});
  });
});


app.use("/views", express.static(__dirname + "/views/"));

app.get("/", function(req, res) {
    res.sendfile("index.html");
});
http.listen(9527, function() {
    console.log("listening on: port 9527!!");
});
