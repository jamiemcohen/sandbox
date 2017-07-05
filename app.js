
var express = require('express');           //get express
var app = express();                        //create express application
var mongoose = require('mongoose');         //get database
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
mongoose.connect('mongodb://localhost:27017/myproject'); //connect to database
var Marker = require('./models/markers.js');         //get schema  


//set server specifications
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static('public'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.set("view options", { layout: false } );
app.get('/', function(req, res) {
	res.render('index');					  
});


//connect to localhost
app.listen(3000);



Marker.find({}, function(err, markers) {
  if (err) throw err;

  // object of all the users
  console.log(markers);
});





 

