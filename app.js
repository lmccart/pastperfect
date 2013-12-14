
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');


// Config mongo
var Db = require('mongodb').Db;
var MongoServer = require('mongodb').Server;
var mongo = new Db(process.env.MONGO_NAME, new MongoServer(process.env.MONGO_HOST, process.env.MONGO_PORT, {strict:true, auto_reconnect:true}), {w: 1});



/*
var AWS = require('aws-sdk');

if (config.aws) {
  console.log('connecting to aws');
  AWS.config.update({accessKeyId: process.env.AWS_aws.accessKeyId, secretAccessKey: process.env.AWS_aws.secretAccessKey});
  AWS.config.update({region: process.env.AWS_aws.region});

  var s3 = new AWS.S3();
  s3.listBuckets(function(error, data) {
    if (error) {
      console.log(error); // error is Response.error
    } else {
      console.log(data); // data is Response.data
    }
  });
}
*/
var app = express();

// all environments
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
// app.use(require('stylus').middleware(__dirname + '/public'));
// app.use(express.static(path.join(__dirname, 'public')));

// app.locals.pretty = true;


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
app.get('/users', user.list);





//Routes


app.get('/', function(req, res){
  // res.render('intro', {
  //   title: "Intro"
  // });

  res.send('Hello World!');
});


// app.get('/archive', function(req, res){
//   mongo.collection('memories', function(e, c) { 
//     c.find().toArray(function(error, mems){
//       if (error) console.log(error);
//       res.render('index', {
//         title: 'Memories',
//         memories: mems,
//         emotion: "[Sort by emotion]"
//       });
//     });
//   });
// });


// app.get('/archive/:emotion', function(req, res){
//   mongo.collection('memories', function(e, c) {  
//     c.find({tag: req.params.emotion}).toArray(function(error, mems){
//       console.log(mems);
//       res.render('index', {
//       	title: 'Memories',
//         memories: mems,
//         emotion: req.params.emotion
//       });
//     });
//   });
// });


// app.get('/consultation', function(req, res){
//   res.render('consultation', {
//   	title: 'Consultation',
//   });
// });

// app.get('/memory/:id', function(req, res){
//   if(req.params.id != "undefined") {
//   	mongo.collection('memories', function(e, c) {	
//   		c.findOne({name: req.params.id}, function(err, doc) {
//   	    if (doc) {
//   		    res.render('memory', {
//   		    	title: req.params.id,
//   		      memory: doc
//   		    });
//   		  }
//   		});
//     });
//   } else {
//     res.render('memory', {
//       title: "Coming soon",
//       memory: {}
//     });
//   }
// });


//   // open mongo connect
// mongo.open(function(err, p_client) {
//   if (err) { throw err; }
//   console.log('mongo open '+process.env.MONGO_USER);

//   mongo.authenticate(process.env.MONGO_USER, process.env.MONGO_PASS, function (err, replies) {
//     // You are now connected and authenticated.
//     console.log('mongo authenticated');
//   });
// });

function makeid()
{
    var text = "";
    var possible = "0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

