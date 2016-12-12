var express = require("express");
var app = express();
var http = require("http").Server(app);
var projectData = require("./views/js/project.js");
var io = require("socket.io")(http);

// open socket
io.on("connection", function(socket) {
  // send back data to client side
  socket.on("roulette", function() {
    socket.emit("rouletteWork", {data: projectData.roulette});
  });
  socket.on("baccarat", function() {
    socket.emit("baccaratWork", {data: projectData.baccarat});
  });
  socket.on("zootopia", function() {
    socket.emit("zootopiaWork", {data: projectData.zootopia});
  });
  socket.on("sicbo", function() {
    socket.emit("sicboWork", {data: projectData.sicbo});
  });
});

// set path for server side
app.use("/views", express.static(__dirname + "/views/"));

app.get("/", function(req, res) {
    res.sendfile("index.html");
});
http.listen(9527, function() {
    console.log("listening on: port 9527!!");
});
