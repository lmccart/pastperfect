var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;


MemoryStorage = function() {
  this.db = new Db('memories', new Server(config.mongo.host, config.mongo.port, {strict:true, auto_reconnect:true}), {w: 1});

  // open mongo connect
  this.db.open(function(err, p_client) {
    if (err) { throw err; }
    console.log('mongo open '+this.db);
    // this.db.authenticate(config.mongo.user, config.mongo.pass, function (err, replies) {
    //   // You are now connected and authenticated.
    //   console.log('mongo authenticated');
      
    // });
  });
};


  


MemoryStorage.prototype.getCollection= function(callback) {
  this.db.collection('memories', function(error, memory_collection) {
    if( error ) callback(error);
    else callback(null, memory_collection);
  });
};

//find all memories
MemoryStorage.prototype.findAll = function(callback) {
    this.getCollection(function(error, memory_collection) {
      if( error ) callback(error)
      else {
        memory_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};


exports.MemoryStorage = MemoryStorage;