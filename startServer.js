var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use("/views", express.static(__dirname + "/views/"));

app.get("/", function(req, res) {
    res.sendfile("index.html");
});
http.listen(9527, function() {
    console.log("listening on: port 9527!!");
});
