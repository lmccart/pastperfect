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
							title: "“Maybe there really are all these angels in here”",
							subtitle: "The Day of Conversations and Light",
							name: "Margaret",
							video: "Margaet video+graph_515pm.mp4",
							tag: ["Longing", "Loneliness", "Loss", "Wonder", "Sadness", "Depression"]
						},

						{
							title: "“I don’t feel as isolated as I do most days”",
							subtitle: "The Day Like a Lot of Others In My Still Semi-Bohemian Life",
							name: "Sam",
							video: "Sam_Final_Final_720.mp4",
							tag: ["Love", "Isolation", "Excitement", "Frustration" ]
						},
						{
							title: "“So that was a little awkward”",
							subtitle: "The Day My Girlfriend Turned 21",
							name: "girlfriend",
							audio: "Girlfriend_turned2_final.wav",
							tag: ["Ambivalence", "Disgust", "Discomfort", "Acceptance"]

						},
						{ 
							title: "“The reality is just now sinking in...”",
							subtitle: "Grandparents' Day",
							name: "grandparents",
							audio: "Grandparents_day_final_1-2.wav",
							tag: ["Grief", "Pain","Horror","Sadness"]
						},
						{
							title: "“Something was obviously wrong with this situation”",
							subtitle: "The Day I Left My Husband",
							name: "husband",
							audio: "TheDayILeftMyHusband_1-2.wav",
							tag: ["Frustration", "Resolve","Fear","Hunger"]
						},
						{
							title: "“I had only seen pictures”",
							subtitle: "I Day I Saw the Ocean",
							video: "margaret_storyboard.mp4",
							tag: ["Wonder", "Anticipation", "Excitement", "Bliss"]
						},
						{
							title: "“But we had something in mind”",
							subtitle: "The Day in Atlanta",
							video: "margaret_storyboard.mp4",
							tag: ["Excitement","Wonder","Anticipation"]

						},
						{
							title: "“Kids in the classroom were talking about some sort of accident”",
							subtitle: "The Day I remember most",
							tag: ["Fear", "Anxiety", "Confusion"]
						},
					
						{
							title: "“The airport was small”",
							subtitle: "The Day I Left For My Backpacking Trip",
							tag: ["Wonder", "Anticipation", "Excitement"]
						},
						{
							title: "“I thanked them for praying”",
							subtitle: "The Day of the Driving Test",
							tag: ["Accomplishment", "Anxiety", "Hesitation"]
						},
						{
							title: "“Perfect conditions”",
							subtitle: "The Day of Great Surfing",
							tag: ["Bliss","Joy","Excitement","Anticipation"]
						},
						{
							title: "“Smelling of heaven and all the innocent things from above”",
							subtitle: "The Day I Became a Mom",
							tag: ["Joy","Love","Curiosity","Anxiety","Anticipation","Wonder"]
						},
						{
							title: "“Lo and behold, it was the little rascal”",
							subtitle: "The Day We Picked Up Thor",
							tag: ["Joy","Anticipation","Wonder","Love","Affection","Warmth"]
						},
						{
							title: "“What a handsome young man he was”",
							subtitle: "The Day They Went to the Pool",
							tag: ["Pride","Love","Affection","Grief","Sadness"]
						},
						{
							title: "“I had endless sights and sounds to take in”",
							subtitle: "The Day I Traveled To Vegas",
							tag: ["Wonder","Awe","Fatigue","Bliss","Ecstasy"]
						},
						{
							title: "“I felt a sense of relief and accomplishment”",
							subtitle: "The Day of Graduation",
							tag: ["Relief","Accomplishment","Excitement", "Pride"]
						},
						{
							title: "“It was quite a busy day for me!”",
							subtitle: "The Day of the Interview",
							tag: ["Anxiety","Distraction","Lost"]
						},

						{
							title: "“I even felt good enough to take my dog on a walk”",
							subtitle: "The Day I Began Physical Therapy",
							tag: ["Uncertainty","Fatigu","Defeat"]
						},

						{
							title: "“I was concerned the others wouldn't like it”",
							subtitle: "Brooklyn Day",
							tag: ["Uncertainty", "Warmth", "Kinship"]
						},

						{
							title: "“It was nice to relax”",
							subtitle: "The Day in Rothenberg",
							tag: ["Comfort", "Warmth", "Love", "Curiosity", "Contentment",]
						},

						{
							title: "“I couldn't talk I just cried”",
							subtitle: "The Day of The Attack",
							tag: ["Confusion","Fear","Anger",]
						},

						{
							title: "“It is my favorite”",
							subtitle: "The Day in Chelsea",
							tag: ["Comfort",]
						},

						{
							title: "“The process continues, as I continue my treatment”",
							subtitle: "The Day of the Broken Tooth",
							tag: ["Hestitation", "Pain","Acceptance"]
						},

						{
							title: "“It was a strangely fun day, a little nerve-wracking but purposeful for or relationship”",
							subtitle: "The Day My Family Met My Wife's",
							tag: ["Anxiety", "Confusion"]
						},

						{
							title: "“Ultimately, this final letter on deaf ears”",
							subtitle: "The Day I Went On The Run",
							tag: ["Fear","Frustration","Anxiety"]
						},

						{
							title: "“But he did not get it”",
							subtitle: "Job Search Day",
							tag: ["Searching", "Uncertainty", "Affection"]
						},

						{
							title: "“I needed something spiritual to keep me afloat”",
							subtitle: "Day of Frustrations",
							tag: ["Frustration","Searching","Anger","Uncertainty","Disgust","Wonder"]
						},

						{
							title: "“We silently vowed not to ride back with them no matter what”",
							subtitle: "The Day of Traveling",
							tag: ["Frustration","Confusion","Impatience"]
						},

						{
							title: "“All I could do was cry”",
							subtitle: "The Day of the Phone Call",
							tag: ["Grief", "Pain", "Confusion", "Fear"]
						},

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

