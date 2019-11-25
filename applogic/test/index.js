"use strict"

const express = require('express');
const https   = require("https");     // https server core module
const fs      = require("fs");        // file system core module
const io      = require("socket.io"); // web socket external module
const path = require('path');
const easyrtc = require("./webrtc"); // EasyRTC internal module

const app = express();
app.use(express.json());

// app.get("/", (request, response) => {
//
// 	// отправляем ответ
// 	response.send("<h2>Привет Expresss!</h2>");
// });
app.use('/app', express.static(path.join(__dirname, '../../client/dist')));
app.get("/redux", (request, response) => {
	response.send("<h2>Привет Expresss!</h2>");
});
app.use(express.static(__dirname + "/static/"));

let webServer = https.createServer(app);

let socketServer = io.listen(webServer, {"log level":1});

// Start EasyRTC server
let rtc = easyrtc.listen(app, socketServer);

module.exports = app;

