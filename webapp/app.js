
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
	, common = require('./common.js');



if (common.aws) {
  var AWS = require('aws-sdk');
  var s3 = new AWS.S3();

  AWS.config.update({accessKeyId: common.aws.accessKeyId, secretAccessKey: common.aws.secretAccessKey});
  AWS.config.update({region: aws.config.region});

  s3.createBucket({Bucket: 'pastperfect'}, function() {
    var params = {Bucket: 'pastperfect', Key: 'myKey', Body: 'Hello!'};
    s3.putObject(params, function(err, data) {
      if (err)
        console.log(err)
      else
        console.log("Successfully uploaded data to myBucket/myKey");
    });
  });
}

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
  res.render('intro', {
    title: "Intro"
  });
});


app.get('/archive', function(req, res){
  common.mongo.findAll(function(error, mems){
    res.render('index', {
      title: 'Memories',
      memories: mems,
      emotion: "Anything"
    });
  });
});


app.get('/archive/:emotion', function(req, res){
  common.mongo.collection('memories', function(e, c) {  
    c.find({tag: req.params.emotion}).toArray(function(error, mems){
      console.log(mems);
      res.render('index', {
      	title: 'Memories',
        memories: mems,
        emotion: req.params.emotion
      });
    });
  });
});


app.get('/consultation', function(req, res){
  common.mongo.findAll(function(error, mems){
    res.render('consultation', {
    	title: 'Consultation',
    });
  });
});

app.get('/memory/:id', function(req, res){
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
