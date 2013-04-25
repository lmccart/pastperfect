
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

// open mongo connect
common.mongo.open(function(err, p_client) {
  if (err) { throw err; }
  console.log('mongo open');
  common.mongo.authenticate(common.config.mongo.user, common.config.mongo.pass, function (err, replies) {
    // You are now connected and authenticated.
    console.log('mongo authenticated');
    
  });
});
	
//Routes

app.get('/', function(req, res){
  common.mongo.findAll(function(error, mems){
    res.render('index', {
    	title: 'Memories',
      memories: mems
    });
  });
});


app.listen(3000);
