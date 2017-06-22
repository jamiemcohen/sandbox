var express = require('express');
var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static('public'));

app.set("view options", { layout: false } );
app.get('/', function(req, res) {
	res.render('index', {title="Sandbox"});					  
});

app.listen(3000);

