//node.js configuration to express js
var express = require('express');           //get express
var app = express();                        //create express application

//debugging logs and helpers
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//database
var mongoose = require('mongoose');         //get mongoose module
mongoose.connect('mongodb://localhost:27017/myproject'); //connect to database
var db = mongoose.connection; //set to variable
db.on('error', console.error.bind(console, 'connection error:')); //


//routes
var archive = require('./routes/archive.js')(app);  
var marker = require('./routes/marker.js')(app); 
var map = require('./routes/map.js')(app);  
var mapDB = require('./models/maps.js');
var archiveDB = require('./models/archives.js');

var isPath = function(req, res){
           
            mapDB.findOne({path: req.params.path}, function(err, map){
                if(err) {
                    console.log( req.params.path + " DOES NOT exist");
                    return false;
                    
                    
                }else{
                
                    console.log( req.params.path + " exists");
                    return true; 
                }
               
                 
            }); 
           
        };

//set view engine to read ejs files instead of html
app.set("view engine", "ejs");

//set static views and load static files -- makes application aware that it needs to consider all these files
app.set("views", __dirname + "/public");
app.use(express.static('public'));

//set routes
app.set("view options", { layout: false } );
app.get('/', function(req, res) {
	res.render('index');					  
});

app.get('/maps/:path', function(req, res) {
	mapDB.count({path: req.params.path}, function (err, count){ 
        if(count>0){
             res.render('viewMode');
        }else{
            res.render('404');
        }
    });
});

app.get('/admin', function(req, res) {
	res.render('admin');					  
});

app.get('/pqw4ry', function(req, res) {
	res.render('adminpanel');					  
});


app.get('/pqw4ry/archive/:id', function(req, res) {
	mapDB.count({_id: req.params.id}, function (err, count){ 
        if(count>0){
             res.render('admin-archive');
        }else{
            res.render('404');
        }
    });
});

app.get('/pqw4ry/marker/:id', function(req, res) {
	mapDB.count({_id: req.params.id}, function (err, count){ 
        if(count>0){
             res.render('admin-markers');
        }else{
            res.render('404');
        }
        
    });
    
    
   					  
});

app.get('/pqw4ry/edit/:id', function(req, res) {
	archiveDB.count({_id: req.params.id}, function (err, count){ 
        if(count>0){
             res.render('admin-edit');
        }else{
            res.render('404');
        }
        
    });
    
    
   					  
});



//set new dynamic edit routes

app.get('/edit/:path', function(req , res){
    mapDB.count({path: req.params.path}, function (err, count){ 
        if(count>0){
            res.render('editor');
        }else{
            res.render('404');
        }
        
    }); 
    
});







app.route('/marker')
    .post(marker.post)
    .get(marker.getAll);
app.route('/marker/:id')
    .get(marker.getOne);

app.route('/db')
    .post(map.post)
    .get(map.getAll);
app.route('/db/:id')
    .get(map.getOne)
    .put(map.updateMap);
app.route('/db/title/:title')
    .get(map.getOneTitle);
app.route('/db/path/:path')
    .get(map.getOnePath);
app.route('/db/delete/:id')
    .delete(map.deleteOne);


app.route('/archive')
    .post(archive.post)
    .get(archive.getAll);
app.route('/archive/:id')
    .get(archive.getOne)
    .put(archive.editArchive);
app.route('/archive/delete/:id')
    .delete(archive.deleteOne);




//connect to localhost
app.listen(3000);
console.log('listening on port 3000'); //log to console 






 

