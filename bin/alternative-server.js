// Alternative server is meant to generate an error dealing with same-origin policy restrictions

var express = require("express");

var app = express();

app.use(express.static(__dirname + '/../app'));

app.listen(3001);