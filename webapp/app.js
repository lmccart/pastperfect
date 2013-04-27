
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
	, common = require('./common.js');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
app.get('/users', user.list);


//Routes

app.get('/', function(req, res){
  common.mongo.findAll(function(error, mems){
    res.render('index', {
    	title: 'Memories',
      memories: mems
    });
  });
});


app.get('/about', function(req, res){
  common.mongo.findAll(function(error, mems){
    res.render('about', {
    	title: 'About',
    });
  });
});

app.get('/memory/:id', function(req, res){
	console.log("hi");
	common.mongo.collection('memories', function(e, c) {	
		c.findOne({name: req.params.id}, function(err, doc) {
	    if (doc) {
		    res.render('memory', {
		    	title: req.params.id,
		      memory: doc
		    });
		  }
		});
  });
});


app.listen(3000);
