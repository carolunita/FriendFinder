// Initializes body-parser, express, and path Node.js packages
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");

// Initializes the Server
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Loads static files
app.use(express.static("./app/public"));

// Routes files
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// Starts server
app.listen(PORT, function() {
  console.log("This App is listening on PORT: " + PORT);
});