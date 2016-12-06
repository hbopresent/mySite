var socket = io();
// var openSocket = function() {
//   console.log("open socket!!");
//   socket.on("rouletteWork", function(msg) {mySite.workHandler.showProjectDetail(msg)});
//   socket.on("baccaratWork", function(msg) {mySite.workHandler.showProjectDetail(msg)});
//   socket.on("zootopiaWork", function(msg) {mySite.workHandler.showProjectDetail(msg)});
// }
// openSocket();
// var socketHandler = (function(global) {
//   var openSocket = function() {
//     console.log("open socket!!");
//     socket.on("rouletteWork", function(msg) {mySite.workHandler.showProjectDetail(msg)});
//     socket.on("baccaratWork", function(msg) {mySite.workHandler.showProjectDetail(msg)});
//     socket.on("zootopiaWork", function(msg) {mySite.workHandler.showProjectDetail(msg)});
//   }
//
//   return {
//     init: openSocket
//   }
// }(window));
// socketHandler.init();


SocketHandler.prototype = {
  init: function() {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhh");
    socket.on("rouletteWork", function(msg) {mySite.workHandler});
    socket.on("baccaratWork", function(msg) {mySite.workHandler.showProjectDetail(msg)});
    socket.on("zootopiaWork", function(msg) {mySite.workHandler.showProjectDetail(msg)});
  }
}
function SocketHandler() {}

var socketHandler = new SocketHandler();
socketHandler.init();
