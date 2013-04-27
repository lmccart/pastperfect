/*
 * common.js
 *
 * Copyright 2012 (c) Sosolimited http://sosolimited.com
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 */


// Require the configuration file
//var config = require(__dirname + "/config_prod.json");
var config = (process.env.NODE_ENV == 'production') ? require(__dirname + "/config_prod.json") : require(__dirname + "/config.json");

// Config mongo
var Db = require('mongodb').Db;
var MongoServer = require('mongodb').Server;
var mongo = new Db(config.mongo.db, new MongoServer(config.mongo.host, config.mongo.port, {strict:true, auto_reconnect:true}), {w: 1});


mongo.getCollection= function(callback) {
  mongo.collection('memories', function(error, memory_collection) {
    if( error ) callback(error);
    else callback(null, memory_collection);
  });
};

//find all memories
mongo.findAll = function(callback) {
   mongo.getCollection(function(error, memory_collection) {
    if( error ) callback(error)
    else {
      memory_collection.find().toArray(function(error, results) {
        if( error ) callback(error)
        else callback(null, results)
      });
    }
  });
};

start = function() {
		// open mongo connect
	mongo.open(function(err, p_client) {
	  if (err) { throw err; }
	  console.log('mongo open');
	  mongo.authenticate(config.mongo.user, config.mongo.pass, function (err, replies) {
			// You are now connected and authenticated.
			console.log('mongo authenticated');

			mongo.collection('memories', function(e, c) {	
				
			  c.remove({},function(rerr, removed){

					console.log("mongo cleared");
					c.insert([
						{
							title: "I will never forget this day and shall treasure it as long as I live.",
							name: "Margaret",
							video: "margaret_storyboard.mp4",
							date: "May 8, 2004",
							viz: "margaret-viz.mp4",
							joy: 0.2,
							sorrow: 0.4
						},

						{
							title: "However, the reality is just now sinking in and I am just now starting to grieve.",
							name: "Sam",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4",
							date: "May 8, 2004",
							joy: 0.2,
							sorrow: 0.4
						},

						{
							title: "I crawled into my bed and watched 2 cycles of SportsCenter before finally falling asleep.",
							name: "John",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4",
							date: "May 8, 2004",
							joy: 0.2,
							sorrow: 0.4
						},

						{
							title: "I quickly settled into my room to get some much needed rest, as I had plenty of more to see and do in the days to come.",
							name: "Eureka",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4",
							date: "May 8, 2004",
							joy: 0.2,
							sorrow: 0.4
						},
												{
							title: "I will never forget this day and shall treasure it as long as I live.",
							name: "Margaret",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4",
							joy: 0.2,
							sorrow: 0.4
						},

						{
							title: "However, the reality is just now sinking in and I am just now starting to grieve.",
							name: "Sam",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4",
							joy: 0.2,
							sorrow: 0.4
						},

						{
							title: "I crawled into my bed and watched 2 cycles of SportsCenter before finally falling asleep.",
							name: "John",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4",
							joy: 0.2,
							sorrow: 0.4
						},

						{
							title: "I quickly settled into my room to get some much needed rest, as I had plenty of more to see and do in the days to come.",
							name: "Eureka",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4",
							joy: 0.2,
							sorrow: 0.4
						},
												{
							title: "I will never forget this day and shall treasure it as long as I live.",
							name: "Margaret",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4",
							joy: 0.2,
							sorrow: 0.4
						},

						{
							title: "However, the reality is just now sinking in and I am just now starting to grieve.",
							name: "Sam",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4",
							joy: 0.2,
							sorrow: 0.4
						},

						{
							title: "I crawled into my bed and watched 2 cycles of SportsCenter before finally falling asleep.",
							name: "John",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4",
							joy: 0.2,
							sorrow: 0.4
						},

						{
							title: "I quickly settled into my room to get some much needed rest, as I had plenty of more to see and do in the days to come.",
							name: "Eureka",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4",
							joy: 0.2,
							sorrow: 0.4
						},
												{
							title: "I will never forget this day and shall treasure it as long as I live.",
							name: "Margaret",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4",
							joy: 0.2,
							sorrow: 0.4
						},

						{
							title: "However, the reality is just now sinking in and I am just now starting to grieve.",
							name: "Sam",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4",
							joy: 0.2,
							sorrow: 0.4
						},

						{
							title: "I crawled into my bed and watched 2 cycles of SportsCenter before finally falling asleep.",
							name: "John",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4",
							joy: 0.2,
							sorrow: 0.4
						},

						{
							title: "I quickly settled into my room to get some much needed rest, as I had plenty of more to see and do in the days to come.",
							name: "Eureka",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4",
							joy: 0.2,
							sorrow: 0.4
						}
					], function(ierr, inserted) {
						console.log("mongo EVERYTING INSERTED!");

					});
			  });
			});
		});
	});
}

start();

// Exports
module.exports = {
	url : require('url'),
	net : require('net'),
	qs: require('querystring'),
	fs : require('fs'),
	config : config,
	mongo : mongo
 	
};

