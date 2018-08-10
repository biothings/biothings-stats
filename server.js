// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var methodOverride = require('method-override');
// Initialize Express
var app = express();

const PORT = process.env.PORT || 3000;

// Listen on port 3000
app.listen(PORT, function(err, res) {
	if (err) throw err;
  console.log("App running on port 3000!");
});

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride("_method"));

// Make public a static dir
app.use(express.static("static"));

// Import routes and give the server access to them.
var routes = require("./controllers/routes.js");

app.use('/',routes);
