var Player = function(app) {
	
	var setTimeoutEvents = [];
	var messages = [];
	var parser = Parser(messages);
	var curMessage = 0;
	
	return {
		initialize: function(text) {
			// parser gets created, loads LIWC stuff, then calls createMessages
			parser.initialize(this.createMessages, text);
		},
	
		createMessages: function(lines) {
			console.log("load msgs");

			for (var i=0; i<lines.length; i++) {
				parser.parseLine(lines[i]);
			}
			parser.printStats();
		
		},
		
		printMessages: function() {
			for (var i=0; i<messages.length; i++) {
				console.log(i+" "+messages[i]);
			}
		},
		
		sendMessage: function(msg) {
			console.log("send msg");
		},
		
		
		playbackMessages: function() {
    	
    	console.log("playback messages ");
  		var startMsg = messages[curMessage];

      function runMessage(i) {
      
      	console.log("runmsg "+i);
        curMessage = i+1;
      
        var msg = messages[i];
      	app.handleMessage(msg);
        
        var lastMsg = (i == 0) ? startMsg : messages[i-1];

        //console.log("last msg "+lastMsg+" msg "+msg);
  			diff = Math.max(0, msg.time - lastMsg.time);
  			
      	//console.log("diff "+diff);
        //if (app.modifier) {
        //  diff = diff / app.modifier;
        //}
        
  			setTimeoutEvents.push(setTimeout(function() {
  				// trigger app.trigger("message:" + msg['type'], { msg: msg['attributes'] });

          if (messages.length > i+1) {
            runMessage(i+1);
          } else console.log("end of msgs");
        }, diff, this));
  			//console.log("settimeout "+msg.word+" "+diff);
	  		
      }

      runMessage(curMessage);
    },
    
    pausePlaybackMessages: function() {
    	console.log("pause playback");
	    for (var i=0; i<setTimeoutEvents.length; i++) {
		    clearTimeout(setTimeoutEvents[i]);
	    }
    }
	};

};

function init() {



/*
	var line0 = [4, 15, "I wake up at about 10:30 in the morning. I work at home doing freelance writing and editing.  I make coffee, say hello to the cats."];
	var line1 = [20, 31, "My mother calls. She tells me about her trip to Death Valley. She repeats several times how my sister has paid for everything."];
	var line2 = [37, 43, "I take the subway uptown to a meeting at the Museum of the City of New York."];
	var line3 = [51, 77, "I walk through the neighborhood and I think of an old boyfriend of mine who lived up here. We dated during a ten-year separation with my husband. He dumped me and I still haven’t really gotten over that. Today, I put it out of my mind and I focus on the pleasant memories of being in that neighborhood."];
	var line4 = [84, 90, "I walk in the lobby of the museum and through an exhibit on micro-apartments for the future."];
	var line5 = [91, 100, "At the meeting, they want to know  my idea for the article. I tell them. They’re happy. The meeting ends."];
	var line6 = [103, 109, "I walk over to the Cathedral where I am going to an event organized by my friend, Lisa."];
	var line7 = [112, 116, "It is an interview with a woman who sees angels."];
	var line8 = [118, 163, "She talks about angels, how they are there right now, dozens of them, lining the walls of the Cathedral. Smiling and happy. Part of me wants to believe. Maybe things are completely different than I think. The event ends. I go to the restaurant to wait for Lisa. It’s 10:30. Lisa and I have been in a fight recently about work and our relationship. She shows up. We talk about the work problem. She doesn’t want to challenge me; she wants to soften things. We pay, we leave, we go home."];
	var line9 = [172, 181, "I’m doing a clinical trial where I wear a light mask that’s supposed to make my skin look younger and smoother and more radiant."];
	var line10 = [184, 187, "I think it’s working a little bit."];
	var line11 = [190, 228, "I read some climate blogs. I’ve been very depressed over the last two years and something about reading about how the world is going to end is comforting when you’re depressed. It’s like nobody else seems to get it, but in ten years, when the Arctic ice is completely gone and the sea has been heated up another ten degrees, then the temperature is going to go go up really fast, and people are gonna be really surprised, and they just don’t get it. I go to bed at 3."];
*/

/*
var line0 = [0, 10, "I remember the day I left my abusive ex-husband very clearly. It was in November, just before Thanksgiving, on a Sunday afternoon."];
var line1 = [10, 24, "We had a Homecoming event at church that morning. My best friend Emily was going to attend with us, so my ex-husband drove on to the church to set up the sound equipment, and I went to pick up Emily before driving there with her. "];
var line2 = [24, 29, "We got to the church, and Emily joined me in the classroom where I taught Sunday School for the teenagers."];
var line3 = [30, 46, "After Sunday School, we walked out into the “sanctuary”, which was actually the great room of the small apartment we used for a church (our Sunday School room was one of the bedrooms). My parents were there, because I was supposed to sing the special music for the service."];
var line4 = [47, 60, "Since it was our homecoming, we had a lot of people squeezed into that tiny space. When it was time for me to sing, I got up and sang a song about feeling like God had left me, asking why he had abandoned me."];
var line5 = [61, 70, "My marriage troubles had been coming to a head for months, and my voice trembled as I sang, tears streaming down my face."];
var line6 = [71, 88, "After the service, we had the homecoming meal. I had been given the honor of cooking the main ham for the dinner, an honor usually given to one of the elder ladies in the church. 5 years later, there is still a stain in my car from transporting that ham on that day."];
var line7 = [88, 100, "I ate very little at that meal. My mother-in-law noticed and asked my ex-husband about it—she had noticed for some time that I hadn’t been eating, and that I had lost an awful lot of weight."];
var line8 = [100, 106, "He brushed off her concern and said that I eat at home (which wasn’t true)."];
var line9 = [106, 114, "After the meal was over, and the majority of the people had left, I asked my ex-husband if he’d like me to help break down the sound equipment."];
var line10 = [115, 124, "He told me no, that I was to pick up my birth control at the pharmacy, take Emily home, and wait for him back at the house. Emily and I left without a word."];
var line11 = [124, 135, "On the way home, I started crying. I told Emily I didn’t want to go home anymore, that I was tired of the abuse and mistreatment. I told her I wanted to go to my parents' house."];
var line12 = [135, 151, "She said “Why don’t you just go there now?”, and I told her I was frightened about what my ex-husband would say if I wasn’t at home when he got there. She pointed out that I should never be afraid to go visit my parents—that something was obviously wrong with the situation."];
var line13 = [151, 167, "We pulled into the pharmacy drive-thru to pick up my birth control, and it hit me that she was right. I did have a choice. I looked at her, threw my birth control in the backseat of the car, and told her, “I’m going home…to Mom and Dad’s”. And I never went back."];
*/

var line0 = [7, 9, "So I wake up at 9:30."];
var line1 = [14, 27, "I have a small yogurt cup. I’m still kind of broke and lead a semi-bohemian lifestyle, dumpster diving for most of my food in Brooklyn Heights and various upscale neighborhoods throughout Brooklyn."];
var line2 = [31, 35, "I still don’t have a backpack because I left it on the subway a week prior."];
var line3 = [38, 53, "I was in a bad car accident like four years ago. I was hit by an SUV in Baltimore, shattering the left side of my pelvis, pretty much completely, and kind of ruining my life for about a year. So soccer is kind of my way of rehabilitating."];
var line4 = [69, 76, "I bike up Manhattan Avenue to the tip of Greenpoint to pick up money that I earned last week helping an architect named Garrett."];
var line5 = [80, 89, "I punch in the number for the building is 3125. I remember it because I always think of 31 25 year old ladies waving at me."];
var line6 = [94, 107, "Heading back out the stairs, this girl that worked last week. She’s like ‘Hey, you want to smoke a cigarette outside?’ That’s codeword for rolling up a joint."];
var line7 = [123, 124, "I get to my house."];
var line8 = [126, 131, "I have to move the trash bin to where the leaky roof is. Also, the toilet’s clogged."];
var line9 = [134, 136, "So I eat two more yogurt cups."];
var line10 = [142, 144, "And then I get a call from this girl I used to date."];
var line11 = [146, 150, "It was basically my biggest, well kind of my first relationship."];
var line12 = [154, 157, "I recently confessed that I’m still in love with her."];
var line13 = [164, 169, "Some guy she met at a party had just taken her on a trip to some stupid hotel in Puerto Rico."];
var line14 = [171, 176, "There’s a Facebook album of it that I was able to go through semi-regretfully."];
var line15 = [183, 185, "We get off the phone."];
var line16 = [191, 196, "I decide, because I got paid, to get a little half pint of whiskey."];
var line17 = [199, 205, "We walk past this drug store. It’s closed but for some reason they’ve decided to project green rave lighting all over the front."];
var line18 = [209, 213, "I think, this is one of those rare days when I feel connected to New York."];
var line19 = [215, 222, "I go home, get food and more beer and hang out and watch a movie with my projector."];

var lines = [line0, line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, line11, line12, line13, line14, line15, line16, line17, line18, line19];

var player = new Player();
	player.initialize(lines);
}





