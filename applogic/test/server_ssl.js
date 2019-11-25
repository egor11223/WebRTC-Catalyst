'use strict';
// Load required modules
var https = require("https");     // https server core module
var fs = require("fs");        // file system core module
var express = require("express");   // web framework external module
var io = require("socket.io"); // web socket external module
var path = require('path');

// This sample is using the easyrtc from parent folder.
// To use this server_example folder only without parent folder:
// 1. you need to replace this "require("../");" by "require("open-easyrtc");"
// 2. install easyrtc (npm i open-easyrtc --save) in server_example/package.json

var easyrtc = require("./webrtc/"); // EasyRTC internal module

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();
httpApp.use('/', express.static(__dirname + "/webrtc/server_example/static/"));
httpApp.use('/app', express.static(path.join(__dirname, '../../client/dist')));
// httpApp.use('/redux', express.static(path.join(__dirname, '../../client/src')));

// Start Express https server on port 8443
var webServer = https.createServer({
    key: fs.readFileSync(__dirname + "/certs/privkey.pem"),
    cert: fs.readFileSync(__dirname+"/certs/fullchain.pem")
}, httpApp);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level": 1});

// Start EasyRTC servers
var rtc = easyrtc.listen(httpApp, socketServer);

// Listen on port 8443
webServer.listen(3000, function () {
    console.log('listening on https://localhost:3000');
});
// module.exports = webServer;