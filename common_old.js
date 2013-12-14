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
//var config = (process.env.NODE_ENV == 'production') ? require(__dirname + "/config_prod.json") : require(__dirname + "/config.json");

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
							title: "“Maybe there really are all these angels in here”",
							subtitle: "The Day of Conversations and Light",
							name: "Margaret",
							video: "Margaret_final_720p.mov",
							tags: ["sorrow", "joy"]
						},

						{
							title: "“I don’t feel as isolated as I do most days”",
							subtitle: "The Day Like a Lot of Others In My Still Semi-bohemian Life",
							name: "Sam",
							video: "Sam_Final_Final_720.mp4"
						},
						{
							title: "“So that was a little awkward”",
							subtitle: "The Day My Girlfriend Turned 21",
							name: "girlfriend",
							audio: "Girlfriend_turned2_final.wav"
						},
						{ 
							title: "“The reality is just now sinking in...”",
							subtitle: "Grandparents' Day",
							name: "grandparents",
							audio: "Grandparents_day_final_1-2.wav",
							tag: ["word1", "tag1"]
						},
						{
							title: "“Something was obviously wrong with this situation”",
							subtitle: "The Day I Left My Husband",
							name: "husband",
							audio: "TheDayILeftMyHusband_1-2.wav"
						},
						{
							title: "“I had only seen pictures”",
							subtitle: "I Day I Saw the Ocean",
							video: "margaret_storyboard.mp4"
						},
						{
							title: "The Day in Atlanta",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4"
						},
						{
							title: "The Day The Towers Went Down",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4"
						},
						{
							title: "The Day of Immolation",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4"
						},
						{
							title: "The Day I Left For My Backpacking Trip",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4"
						},
						{
							title: "The Day of the Driving Test",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4"
						},
						{
							title: "The Day of Great Surfing",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4"
						},
						{
							title: "The Day I Became a Mom",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4"
						},
						{
							title: "The Day We Picked Up Thor",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4"
						},
						{
							title: "The Day He Left Us",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4"
						},
						{
							title: "The Day I Traveled to Vegas",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4"
						},
						{
							title: "The Day of Graduation",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4"
						},
						{
							title: "The Day of the Interview",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4"
						},
						{
							title: "The Day I Began Physical Therapy",
							video: "margaret_storyboard.mp4",
							viz: "margaret-viz.mp4"
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

